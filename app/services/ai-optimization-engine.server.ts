import { db } from "../db.server";
import { MachineLearningService } from "./machine-learning.server";
import { FacebookAdsService } from "./facebook.server";
import { AnalyticsDashboardService } from "./analytics-dashboard.server";

export interface OptimizationJob {
  id: string;
  shop: string;
  type: 'budget' | 'bid' | 'audience' | 'creative' | 'schedule' | 'placement';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'running' | 'completed' | 'failed';
  campaignId?: string;
  adSetId?: string;
  adId?: string;
  currentValue: any;
  recommendedValue: any;
  expectedImprovement: number;
  confidence: number;
  reasoning: string;
  createdAt: Date;
  executedAt?: Date;
  result?: OptimizationResult;
}

export interface OptimizationResult {
  success: boolean;
  oldValue: any;
  newValue: any;
  actualImprovement?: number;
  error?: string;
  metrics: {
    before: PerformanceMetrics;
    after?: PerformanceMetrics;
  };
}

export interface PerformanceMetrics {
  roas: number;
  ctr: number;
  cpc: number;
  cvr: number;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  frequency: number;
}

export interface OptimizationRule {
  id: string;
  name: string;
  type: 'budget' | 'bid' | 'audience' | 'creative' | 'schedule' | 'placement';
  condition: RuleCondition;
  action: RuleAction;
  isActive: boolean;
  priority: number;
  cooldown: number; // hours
  maxExecutions: number;
  executionCount: number;
  lastExecuted?: Date;
}

export interface RuleCondition {
  metric: string;
  operator: '>' | '<' | '>=' | '<=' | '==' | '!=';
  value: number;
  timeframe: number; // hours
  minDataPoints: number;
}

export interface RuleAction {
  type: 'increase' | 'decrease' | 'set' | 'pause' | 'activate' | 'test';
  value: number | string;
  unit: 'percentage' | 'absolute' | 'multiplier';
  maxChange: number; // maximum change allowed
}

export interface OptimizationStrategy {
  id: string;
  name: string;
  description: string;
  rules: OptimizationRule[];
  isActive: boolean;
  aggressiveness: 'conservative' | 'moderate' | 'aggressive';
  riskTolerance: 'low' | 'medium' | 'high';
  objectives: string[];
}

export interface AIOptimizationConfig {
  shop: string;
  isEnabled: boolean;
  strategies: OptimizationStrategy[];
  globalSettings: {
    maxBudgetChange: number; // percentage
    maxBidChange: number; // percentage
    minConfidenceThreshold: number;
    optimizationFrequency: number; // hours
    emergencyPauseThreshold: number; // ROAS threshold
  };
  notifications: {
    email: string[];
    webhook?: string;
    slackChannel?: string;
  };
}

export class AIOptimizationEngine {
  private mlService: MachineLearningService;
  private analyticsService: AnalyticsDashboardService;
  private isRunning: boolean = false;
  private optimizationInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.mlService = new MachineLearningService();
    this.analyticsService = new AnalyticsDashboardService();
  }

  async startOptimizationEngine(): Promise<void> {
    if (this.isRunning) {
      console.log('Optimization engine is already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting 24/7 AI Optimization Engine...');

    // Run optimization every hour
    this.optimizationInterval = setInterval(async () => {
      await this.runOptimizationCycle();
    }, 60 * 60 * 1000); // 1 hour

    // Run initial optimization
    await this.runOptimizationCycle();
  }

  async stopOptimizationEngine(): Promise<void> {
    if (!this.isRunning) {
      console.log('Optimization engine is not running');
      return;
    }

    this.isRunning = false;
    if (this.optimizationInterval) {
      clearInterval(this.optimizationInterval);
      this.optimizationInterval = null;
    }

    console.log('🛑 AI Optimization Engine stopped');
  }

  private async runOptimizationCycle(): Promise<void> {
    console.log('🔄 Running optimization cycle...');

    try {
      // Get all shops with optimization enabled
      const shops = await this.getOptimizationEnabledShops();

      for (const shop of shops) {
        await this.optimizeShop(shop);
      }

      console.log('✅ Optimization cycle completed');
    } catch (error) {
      console.error('❌ Error in optimization cycle:', error);
    }
  }

  private async optimizeShop(shop: string): Promise<void> {
    console.log(`🎯 Optimizing shop: ${shop}`);

    // Get optimization configuration
    const config = await this.getOptimizationConfig(shop);
    if (!config.isEnabled) {
      return;
    }

    // Get all active campaigns
    const campaigns = await db.campaign.findMany({
      where: {
        shop,
        status: 'ACTIVE'
      },
      include: {
        adSets: {
          include: {
            ads: true
          }
        }
      }
    });

    // Analyze each campaign for optimization opportunities
    for (const campaign of campaigns) {
      await this.analyzeCampaignForOptimization(campaign, config);
    }

    // Execute pending optimization jobs
    await this.executePendingOptimizations(shop);
  }

  private async analyzeCampaignForOptimization(
    campaign: any,
    config: AIOptimizationConfig
  ): Promise<void> {
    
    // Get current performance metrics
    const performance = await this.getCampaignPerformance(campaign);
    
    // Check emergency pause conditions
    if (performance.roas < config.globalSettings.emergencyPauseThreshold && performance.spend > 100) {
      await this.createOptimizationJob({
        shop: campaign.shop,
        type: 'schedule',
        priority: 'critical',
        campaignId: campaign.id,
        currentValue: 'ACTIVE',
        recommendedValue: 'PAUSED',
        expectedImprovement: 0,
        confidence: 0.95,
        reasoning: `Emergency pause: ROAS (${performance.roas.toFixed(2)}) below threshold (${config.globalSettings.emergencyPauseThreshold})`
      });
      return;
    }

    // Run ML analysis for optimization recommendations
    const mlRecommendations = await this.getMLOptimizationRecommendations(campaign, performance);

    // Apply optimization strategies
    for (const strategy of config.strategies) {
      if (!strategy.isActive) continue;

      await this.applyOptimizationStrategy(campaign, performance, strategy, config);
    }

    // Process ML recommendations
    for (const recommendation of mlRecommendations) {
      if (recommendation.confidence >= config.globalSettings.minConfidenceThreshold) {
        await this.createOptimizationJob({
          shop: campaign.shop,
          type: recommendation.type,
          priority: recommendation.priority,
          campaignId: campaign.id,
          adSetId: recommendation.adSetId,
          adId: recommendation.adId,
          currentValue: recommendation.currentValue,
          recommendedValue: recommendation.recommendedValue,
          expectedImprovement: recommendation.expectedImprovement,
          confidence: recommendation.confidence,
          reasoning: recommendation.reasoning
        });
      }
    }
  }

  private async getMLOptimizationRecommendations(
    campaign: any,
    performance: PerformanceMetrics
  ): Promise<any[]> {
    
    const recommendations = [];

    // Get ML predictions for different optimization scenarios
    const currentFeatures = {
      budget: campaign.budget,
      roas: performance.roas,
      ctr: performance.ctr,
      cpc: performance.cpc,
      spend: performance.spend,
      frequency: performance.frequency
    };

    // Budget optimization
    const budgetRecommendation = await this.mlService.getReinforcementLearningAction(
      campaign.id,
      currentFeatures,
      ['budget_increase', 'budget_decrease', 'budget_maintain']
    );

    if (budgetRecommendation.action === 'budget_increase' && budgetRecommendation.confidence > 0.7) {
      recommendations.push({
        type: 'budget',
        priority: 'medium',
        currentValue: campaign.budget,
        recommendedValue: campaign.budget * (1 + budgetRecommendation.magnitude),
        expectedImprovement: budgetRecommendation.expectedReward,
        confidence: budgetRecommendation.confidence,
        reasoning: 'ML model predicts improved performance with budget increase'
      });
    } else if (budgetRecommendation.action === 'budget_decrease' && budgetRecommendation.confidence > 0.7) {
      recommendations.push({
        type: 'budget',
        priority: 'medium',
        currentValue: campaign.budget,
        recommendedValue: campaign.budget * (1 - budgetRecommendation.magnitude),
        expectedImprovement: budgetRecommendation.expectedReward,
        confidence: budgetRecommendation.confidence,
        reasoning: 'ML model suggests budget reduction to improve efficiency'
      });
    }

    // Bid optimization
    if (performance.cpc > 2.0 && performance.cvr < 2.0) {
      recommendations.push({
        type: 'bid',
        priority: 'medium',
        currentValue: 'current_bid',
        recommendedValue: 'lower_bid',
        expectedImprovement: 0.15,
        confidence: 0.8,
        reasoning: 'High CPC with low CVR suggests bid reduction needed'
      });
    }

    // Creative optimization
    if (performance.ctr < 1.0 && performance.frequency > 3.0) {
      recommendations.push({
        type: 'creative',
        priority: 'high',
        currentValue: 'current_creatives',
        recommendedValue: 'refresh_creatives',
        expectedImprovement: 0.25,
        confidence: 0.85,
        reasoning: 'Low CTR with high frequency indicates creative fatigue'
      });
    }

    // Audience optimization
    if (performance.frequency > 5.0) {
      recommendations.push({
        type: 'audience',
        priority: 'medium',
        currentValue: 'current_audience',
        recommendedValue: 'expand_audience',
        expectedImprovement: 0.2,
        confidence: 0.75,
        reasoning: 'High frequency suggests audience expansion needed'
      });
    }

    return recommendations;
  }

  private async applyOptimizationStrategy(
    campaign: any,
    performance: PerformanceMetrics,
    strategy: OptimizationStrategy,
    config: AIOptimizationConfig
  ): Promise<void> {
    
    for (const rule of strategy.rules) {
      if (!rule.isActive) continue;

      // Check if rule has exceeded max executions
      if (rule.executionCount >= rule.maxExecutions) continue;

      // Check cooldown period
      if (rule.lastExecuted) {
        const hoursSinceLastExecution = (Date.now() - rule.lastExecuted.getTime()) / (1000 * 60 * 60);
        if (hoursSinceLastExecution < rule.cooldown) continue;
      }

      // Evaluate rule condition
      if (await this.evaluateRuleCondition(rule.condition, performance)) {
        await this.executeRuleAction(campaign, rule, config);
      }
    }
  }

  private async evaluateRuleCondition(
    condition: RuleCondition,
    performance: PerformanceMetrics
  ): Promise<boolean> {
    
    const metricValue = (performance as any)[condition.metric];
    if (metricValue === undefined) return false;

    switch (condition.operator) {
      case '>':
        return metricValue > condition.value;
      case '<':
        return metricValue < condition.value;
      case '>=':
        return metricValue >= condition.value;
      case '<=':
        return metricValue <= condition.value;
      case '==':
        return metricValue === condition.value;
      case '!=':
        return metricValue !== condition.value;
      default:
        return false;
    }
  }

  private async executeRuleAction(
    campaign: any,
    rule: OptimizationRule,
    config: AIOptimizationConfig
  ): Promise<void> {
    
    let newValue: any;
    let currentValue: any;

    switch (rule.type) {
      case 'budget':
        currentValue = campaign.budget;
        if (rule.action.type === 'increase') {
          const increase = rule.action.unit === 'percentage' 
            ? currentValue * (rule.action.value as number / 100)
            : rule.action.value as number;
          newValue = Math.min(currentValue + increase, currentValue * (1 + config.globalSettings.maxBudgetChange / 100));
        } else if (rule.action.type === 'decrease') {
          const decrease = rule.action.unit === 'percentage'
            ? currentValue * (rule.action.value as number / 100)
            : rule.action.value as number;
          newValue = Math.max(currentValue - decrease, currentValue * (1 - config.globalSettings.maxBudgetChange / 100));
        }
        break;

      case 'schedule':
        currentValue = campaign.status;
        if (rule.action.type === 'pause') {
          newValue = 'PAUSED';
        } else if (rule.action.type === 'activate') {
          newValue = 'ACTIVE';
        }
        break;

      default:
        return;
    }

    // Create optimization job
    await this.createOptimizationJob({
      shop: campaign.shop,
      type: rule.type,
      priority: 'medium',
      campaignId: campaign.id,
      currentValue,
      recommendedValue: newValue,
      expectedImprovement: 0.1, // Default improvement expectation
      confidence: 0.8,
      reasoning: `Rule-based optimization: ${rule.name}`
    });

    // Update rule execution count
    rule.executionCount++;
    rule.lastExecuted = new Date();
  }

  private async createOptimizationJob(jobData: Omit<OptimizationJob, 'id' | 'status' | 'createdAt'>): Promise<void> {
    const job: OptimizationJob = {
      id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date(),
      ...jobData
    };

    // Save to database (would need OptimizationJob model)
    console.log(`📝 Created optimization job: ${job.type} for campaign ${job.campaignId}`);
    
    // For now, store in memory or log
    // In production, this would be saved to database
  }

  private async executePendingOptimizations(shop: string): Promise<void> {
    // Get pending optimization jobs for the shop
    const pendingJobs = await this.getPendingOptimizationJobs(shop);

    // Sort by priority
    const sortedJobs = pendingJobs.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Execute jobs
    for (const job of sortedJobs) {
      await this.executeOptimizationJob(job);
    }
  }

  private async executeOptimizationJob(job: OptimizationJob): Promise<void> {
    console.log(`🔧 Executing optimization job: ${job.id}`);

    try {
      job.status = 'running';
      job.executedAt = new Date();

      // Get Facebook service
      const facebookService = await FacebookAdsService.getForShop(job.shop);
      if (!facebookService) {
        throw new Error('Facebook service not available');
      }

      // Get current performance metrics
      const beforeMetrics = job.campaignId 
        ? await this.getCampaignPerformance({ id: job.campaignId })
        : null;

      let result: OptimizationResult;

      // Execute the optimization based on type
      switch (job.type) {
        case 'budget':
          result = await this.executeBudgetOptimization(job, facebookService);
          break;
        case 'bid':
          result = await this.executeBidOptimization(job, facebookService);
          break;
        case 'schedule':
          result = await this.executeScheduleOptimization(job, facebookService);
          break;
        case 'creative':
          result = await this.executeCreativeOptimization(job, facebookService);
          break;
        case 'audience':
          result = await this.executeAudienceOptimization(job, facebookService);
          break;
        default:
          throw new Error(`Unknown optimization type: ${job.type}`);
      }

      result.metrics.before = beforeMetrics!;
      job.result = result;
      job.status = 'completed';

      console.log(`✅ Optimization job completed: ${job.id}`);

      // Send notification if significant improvement
      if (result.actualImprovement && result.actualImprovement > 0.1) {
        await this.sendOptimizationNotification(job);
      }

    } catch (error) {
      console.error(`❌ Optimization job failed: ${job.id}`, error);
      job.status = 'failed';
      job.result = {
        success: false,
        oldValue: job.currentValue,
        newValue: job.recommendedValue,
        error: error instanceof Error ? error.message : 'Unknown error',
        metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
      };
    }
  }

  private async executeBudgetOptimization(
    job: OptimizationJob,
    facebookService: FacebookAdsService
  ): Promise<OptimizationResult> {
    
    // Update campaign budget in database
    await db.campaign.update({
      where: { id: job.campaignId! },
      data: { budget: job.recommendedValue }
    });

    // Update budget in Facebook (would call actual Facebook API)
    console.log(`Updated budget from ${job.currentValue} to ${job.recommendedValue}`);

    return {
      success: true,
      oldValue: job.currentValue,
      newValue: job.recommendedValue,
      metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
    };
  }

  private async executeBidOptimization(
    job: OptimizationJob,
    facebookService: FacebookAdsService
  ): Promise<OptimizationResult> {
    
    // Update bid strategy (would call Facebook API)
    console.log(`Updated bid strategy for campaign ${job.campaignId}`);

    return {
      success: true,
      oldValue: job.currentValue,
      newValue: job.recommendedValue,
      metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
    };
  }

  private async executeScheduleOptimization(
    job: OptimizationJob,
    facebookService: FacebookAdsService
  ): Promise<OptimizationResult> {
    
    // Update campaign status
    await db.campaign.update({
      where: { id: job.campaignId! },
      data: { status: job.recommendedValue }
    });

    console.log(`Updated campaign status from ${job.currentValue} to ${job.recommendedValue}`);

    return {
      success: true,
      oldValue: job.currentValue,
      newValue: job.recommendedValue,
      metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
    };
  }

  private async executeCreativeOptimization(
    job: OptimizationJob,
    facebookService: FacebookAdsService
  ): Promise<OptimizationResult> {
    
    // Refresh creatives (would generate new creatives and update ads)
    console.log(`Refreshing creatives for campaign ${job.campaignId}`);

    return {
      success: true,
      oldValue: job.currentValue,
      newValue: job.recommendedValue,
      metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
    };
  }

  private async executeAudienceOptimization(
    job: OptimizationJob,
    facebookService: FacebookAdsService
  ): Promise<OptimizationResult> {
    
    // Expand or modify audience targeting
    console.log(`Optimizing audience for campaign ${job.campaignId}`);

    return {
      success: true,
      oldValue: job.currentValue,
      newValue: job.recommendedValue,
      metrics: { before: await this.getCampaignPerformance({ id: job.campaignId! }) }
    };
  }

  private async sendOptimizationNotification(job: OptimizationJob): Promise<void> {
    // Send notification about successful optimization
    console.log(`📧 Sending optimization notification for job ${job.id}`);
    
    // Would integrate with email service, Slack, etc.
  }

  // Helper methods
  private async getOptimizationEnabledShops(): Promise<string[]> {
    // Get shops with optimization enabled
    const campaigns = await db.campaign.findMany({
      select: { shop: true },
      distinct: ['shop']
    });
    
    return campaigns.map(c => c.shop);
  }

  private async getOptimizationConfig(shop: string): Promise<AIOptimizationConfig> {
    // Get optimization configuration for shop
    // For now, return default config
    return {
      shop,
      isEnabled: true,
      strategies: this.getDefaultOptimizationStrategies(),
      globalSettings: {
        maxBudgetChange: 50, // 50% max change
        maxBidChange: 30, // 30% max change
        minConfidenceThreshold: 0.7,
        optimizationFrequency: 1, // every hour
        emergencyPauseThreshold: 0.5 // ROAS below 0.5
      },
      notifications: {
        email: ['admin@shop.com']
      }
    };
  }

  private getDefaultOptimizationStrategies(): OptimizationStrategy[] {
    return [
      {
        id: 'conservative_budget',
        name: 'Conservative Budget Optimization',
        description: 'Safely optimize budgets based on performance',
        aggressiveness: 'conservative',
        riskTolerance: 'low',
        objectives: ['maximize_roas', 'minimize_risk'],
        isActive: true,
        rules: [
          {
            id: 'increase_budget_high_roas',
            name: 'Increase Budget for High ROAS',
            type: 'budget',
            condition: {
              metric: 'roas',
              operator: '>',
              value: 3.0,
              timeframe: 24,
              minDataPoints: 100
            },
            action: {
              type: 'increase',
              value: 20,
              unit: 'percentage',
              maxChange: 50
            },
            isActive: true,
            priority: 1,
            cooldown: 24,
            maxExecutions: 3,
            executionCount: 0
          },
          {
            id: 'decrease_budget_low_roas',
            name: 'Decrease Budget for Low ROAS',
            type: 'budget',
            condition: {
              metric: 'roas',
              operator: '<',
              value: 1.5,
              timeframe: 24,
              minDataPoints: 50
            },
            action: {
              type: 'decrease',
              value: 15,
              unit: 'percentage',
              maxChange: 30
            },
            isActive: true,
            priority: 2,
            cooldown: 12,
            maxExecutions: 5,
            executionCount: 0
          }
        ]
      }
    ];
  }

  private async getCampaignPerformance(campaign: { id: string }): Promise<PerformanceMetrics> {
    const campaignData = await db.campaign.findUnique({
      where: { id: campaign.id }
    });

    if (!campaignData) {
      throw new Error('Campaign not found');
    }

    const impressions = campaignData.impressions || 1;
    const clicks = campaignData.clicks || 0;
    const conversions = campaignData.conversions || 0;
    const spend = campaignData.spend || 0.01;
    const revenue = campaignData.revenue || 0;

    return {
      roas: spend > 0 ? revenue / spend : 0,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? spend / clicks : 0,
      cvr: clicks > 0 ? (conversions / clicks) * 100 : 0,
      spend,
      revenue,
      impressions,
      clicks,
      conversions,
      frequency: 2.5 // Default frequency
    };
  }

  private async getPendingOptimizationJobs(shop: string): Promise<OptimizationJob[]> {
    // Get pending optimization jobs from database
    // For now, return empty array
    return [];
  }
}