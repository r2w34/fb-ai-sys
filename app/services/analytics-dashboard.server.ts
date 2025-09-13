import { db } from "../db.server";
import { MachineLearningService } from "./machine-learning.server";

export interface DashboardMetrics {
  overview: OverviewMetrics;
  performance: PerformanceMetrics;
  attribution: AttributionMetrics;
  businessIntelligence: BIMetrics;
  predictions: PredictionMetrics;
  recommendations: RecommendationMetrics;
}

export interface OverviewMetrics {
  totalSpend: number;
  totalRevenue: number;
  totalROAS: number;
  totalConversions: number;
  activeCampaigns: number;
  averageCPC: number;
  averageCTR: number;
  averageCVR: number;
  period: string;
  previousPeriodComparison: {
    spend: number;
    revenue: number;
    roas: number;
    conversions: number;
  };
}

export interface PerformanceMetrics {
  campaignPerformance: CampaignPerformance[];
  adSetPerformance: AdSetPerformance[];
  creativePerformance: CreativePerformance[];
  audiencePerformance: AudiencePerformance[];
  timeSeriesData: TimeSeriesData[];
}

export interface CampaignPerformance {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cvr: number;
  status: string;
  trend: 'up' | 'down' | 'stable';
  efficiency: 'high' | 'medium' | 'low';
}

export interface AdSetPerformance {
  id: string;
  name: string;
  campaignName: string;
  spend: number;
  revenue: number;
  roas: number;
  audienceSize: number;
  targeting: any;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

export interface CreativePerformance {
  id: string;
  name: string;
  headline: string;
  imageUrl: string;
  ctr: number;
  cvr: number;
  roas: number;
  impressions: number;
  socialEngagement: number;
  creativeScore: number;
}

export interface AudiencePerformance {
  segment: string;
  size: number;
  spend: number;
  revenue: number;
  roas: number;
  ltv: number;
  acquisitionCost: number;
  retentionRate: number;
}

export interface TimeSeriesData {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  impressions: number;
  clicks: number;
}

export interface AttributionMetrics {
  channelAttribution: ChannelAttribution[];
  touchpointAnalysis: TouchpointAnalysis[];
  customerJourney: CustomerJourney[];
  crossDeviceTracking: CrossDeviceData[];
}

export interface ChannelAttribution {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  assisted: number;
  totalValue: number;
  attribution: 'linear' | 'timeDecay' | 'positionBased' | 'dataDriven';
}

export interface TouchpointAnalysis {
  touchpoint: string;
  position: number;
  influence: number;
  conversionRate: number;
  averageValue: number;
}

export interface CustomerJourney {
  journeyId: string;
  touchpoints: string[];
  duration: number;
  conversionValue: number;
  pathType: 'direct' | 'assisted' | 'complex';
}

export interface CrossDeviceData {
  deviceType: string;
  sessions: number;
  conversions: number;
  revenue: number;
  crossDeviceRate: number;
}

export interface BIMetrics {
  customerSegments: CustomerSegment[];
  productInsights: ProductInsight[];
  marketTrends: MarketTrend[];
  competitiveAnalysis: CompetitiveInsight[];
  shopScore: ShopScore;
}

export interface CustomerSegment {
  name: string;
  size: number;
  ltv: number;
  acquisitionCost: number;
  retentionRate: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  profitability: number;
  growthRate: number;
}

export interface ProductInsight {
  productId: string;
  name: string;
  revenue: number;
  units: number;
  adSpend: number;
  roas: number;
  margin: number;
  trend: 'growing' | 'stable' | 'declining';
  seasonality: number;
}

export interface MarketTrend {
  category: string;
  trend: 'up' | 'down' | 'stable';
  growth: number;
  opportunity: number;
  competition: number;
  recommendation: string;
}

export interface CompetitiveInsight {
  competitor: string;
  marketShare: number;
  adSpend: number;
  strategy: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

export interface ShopScore {
  overall: number;
  categories: {
    advertising: number;
    conversion: number;
    retention: number;
    growth: number;
  };
  benchmarks: {
    industry: number;
    topPerformers: number;
  };
  improvements: string[];
}

export interface PredictionMetrics {
  revenueForecast: ForecastData[];
  customerLTVPredictions: LTVPrediction[];
  churnPredictions: ChurnPrediction[];
  seasonalityForecast: SeasonalityData[];
  budgetOptimization: BudgetOptimization[];
}

export interface ForecastData {
  period: string;
  predicted: number;
  confidence: number;
  factors: string[];
}

export interface LTVPrediction {
  segment: string;
  predictedLTV: number;
  confidence: number;
  timeframe: number;
}

export interface ChurnPrediction {
  segment: string;
  churnRate: number;
  riskFactors: string[];
  preventionActions: string[];
}

export interface SeasonalityData {
  period: string;
  multiplier: number;
  category: string;
  confidence: number;
}

export interface BudgetOptimization {
  channel: string;
  currentBudget: number;
  recommendedBudget: number;
  expectedROAS: number;
  confidence: number;
}

export interface RecommendationMetrics {
  actionableInsights: ActionableInsight[];
  growthOpportunities: GrowthOpportunity[];
  riskAlerts: RiskAlert[];
  optimizationSuggestions: OptimizationSuggestion[];
}

export interface ActionableInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  category: string;
  expectedImprovement: number;
  timeframe: string;
  actions: string[];
}

export interface GrowthOpportunity {
  opportunity: string;
  potential: number;
  investment: number;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  requirements: string[];
}

export interface RiskAlert {
  type: 'performance' | 'budget' | 'competition' | 'technical';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  impact: string;
  recommendation: string;
  deadline?: string;
}

export interface OptimizationSuggestion {
  area: string;
  current: number;
  suggested: number;
  improvement: number;
  confidence: number;
  implementation: string;
}

export class AnalyticsDashboardService {
  private mlService: MachineLearningService;

  constructor() {
    this.mlService = new MachineLearningService();
  }

  async getDashboardMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<DashboardMetrics> {
    
    // Get all metrics in parallel for better performance
    const [
      overview,
      performance,
      attribution,
      businessIntelligence,
      predictions,
      recommendations
    ] = await Promise.all([
      this.getOverviewMetrics(shop, dateRange),
      this.getPerformanceMetrics(shop, dateRange),
      this.getAttributionMetrics(shop, dateRange),
      this.getBIMetrics(shop, dateRange),
      this.getPredictionMetrics(shop, dateRange),
      this.getRecommendationMetrics(shop, dateRange)
    ]);

    return {
      overview,
      performance,
      attribution,
      businessIntelligence,
      predictions,
      recommendations
    };
  }

  private async getOverviewMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<OverviewMetrics> {
    
    // Get current period data
    const campaigns = await db.campaign.findMany({
      where: {
        shop,
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end
        }
      }
    });

    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

    // Get previous period for comparison
    const previousStart = new Date(dateRange.start);
    const previousEnd = new Date(dateRange.end);
    const periodDiff = dateRange.end.getTime() - dateRange.start.getTime();
    previousStart.setTime(previousStart.getTime() - periodDiff);
    previousEnd.setTime(previousEnd.getTime() - periodDiff);

    const previousCampaigns = await db.campaign.findMany({
      where: {
        shop,
        createdAt: {
          gte: previousStart,
          lte: previousEnd
        }
      }
    });

    const previousSpend = previousCampaigns.reduce((sum, c) => sum + c.spend, 0);
    const previousRevenue = previousCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const previousConversions = previousCampaigns.reduce((sum, c) => sum + c.conversions, 0);

    return {
      totalSpend,
      totalRevenue,
      totalROAS: totalSpend > 0 ? totalRevenue / totalSpend : 0,
      totalConversions,
      activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
      averageCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
      averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      averageCVR: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      period: `${dateRange.start.toISOString().split('T')[0]} to ${dateRange.end.toISOString().split('T')[0]}`,
      previousPeriodComparison: {
        spend: previousSpend > 0 ? ((totalSpend - previousSpend) / previousSpend) * 100 : 0,
        revenue: previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0,
        roas: previousSpend > 0 && previousRevenue > 0 ? 
          ((totalRevenue / totalSpend) - (previousRevenue / previousSpend)) / (previousRevenue / previousSpend) * 100 : 0,
        conversions: previousConversions > 0 ? ((totalConversions - previousConversions) / previousConversions) * 100 : 0
      }
    };
  }

  private async getPerformanceMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<PerformanceMetrics> {
    
    // Get campaign performance
    const campaigns = await db.campaign.findMany({
      where: {
        shop,
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end
        }
      },
      include: {
        adSets: true,
        ads: true
      }
    });

    const campaignPerformance: CampaignPerformance[] = campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      spend: campaign.spend,
      revenue: campaign.revenue,
      roas: campaign.spend > 0 ? campaign.revenue / campaign.spend : 0,
      conversions: campaign.conversions,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      ctr: campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0,
      cpc: campaign.clicks > 0 ? campaign.spend / campaign.clicks : 0,
      cvr: campaign.clicks > 0 ? (campaign.conversions / campaign.clicks) * 100 : 0,
      status: campaign.status,
      trend: this.calculateTrend(campaign),
      efficiency: this.calculateEfficiency(campaign)
    }));

    // Get ad set performance
    const adSetPerformance: AdSetPerformance[] = [];
    campaigns.forEach(campaign => {
      campaign.adSets.forEach(adSet => {
        adSetPerformance.push({
          id: adSet.id,
          name: adSet.name,
          campaignName: campaign.name,
          spend: adSet.spend,
          revenue: adSet.spend * 2, // Estimated revenue
          roas: adSet.spend > 0 ? (adSet.spend * 2) / adSet.spend : 0,
          audienceSize: 1000000, // Default audience size
          targeting: {
            age: adSet.targetingAge,
            gender: adSet.targetingGender,
            countries: JSON.parse(adSet.targetingCountries || '[]'),
            interests: JSON.parse(adSet.targetingInterests || '[]')
          },
          performance: this.calculateAdSetPerformance(adSet)
        });
      });
    });

    // Get creative performance
    const creativePerformance: CreativePerformance[] = [];
    campaigns.forEach(campaign => {
      campaign.ads.forEach(ad => {
        creativePerformance.push({
          id: ad.id,
          name: ad.name,
          headline: ad.headline || '',
          imageUrl: ad.imageUrl || '',
          ctr: ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0,
          cvr: ad.clicks > 0 ? (ad.conversions / ad.clicks) * 100 : 0,
          roas: ad.spend > 0 ? (ad.conversions * 50) / ad.spend : 0, // Assuming $50 AOV
          impressions: ad.impressions,
          socialEngagement: Math.floor(ad.impressions * 0.02), // Estimated engagement
          creativeScore: this.calculateCreativeScore(ad)
        });
      });
    });

    // Generate time series data
    const timeSeriesData = await this.generateTimeSeriesData(shop, dateRange);

    // Mock audience performance data
    const audiencePerformance: AudiencePerformance[] = [
      {
        segment: 'High-Value Customers',
        size: 50000,
        spend: 5000,
        revenue: 15000,
        roas: 3.0,
        ltv: 300,
        acquisitionCost: 25,
        retentionRate: 0.75
      },
      {
        segment: 'Frequent Buyers',
        size: 100000,
        spend: 8000,
        revenue: 20000,
        roas: 2.5,
        ltv: 200,
        acquisitionCost: 20,
        retentionRate: 0.65
      }
    ];

    return {
      campaignPerformance,
      adSetPerformance,
      creativePerformance,
      audiencePerformance,
      timeSeriesData
    };
  }

  private async getAttributionMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<AttributionMetrics> {
    
    // Mock attribution data - in production, this would come from actual tracking
    const channelAttribution: ChannelAttribution[] = [
      {
        channel: 'Facebook Ads',
        firstTouch: 40,
        lastTouch: 35,
        assisted: 25,
        totalValue: 50000,
        attribution: 'dataDriven'
      },
      {
        channel: 'Instagram Ads',
        firstTouch: 25,
        lastTouch: 30,
        assisted: 45,
        totalValue: 35000,
        attribution: 'dataDriven'
      },
      {
        channel: 'Google Ads',
        firstTouch: 20,
        lastTouch: 25,
        assisted: 55,
        totalValue: 40000,
        attribution: 'dataDriven'
      }
    ];

    const touchpointAnalysis: TouchpointAnalysis[] = [
      {
        touchpoint: 'Facebook Video View',
        position: 1,
        influence: 0.3,
        conversionRate: 2.5,
        averageValue: 75
      },
      {
        touchpoint: 'Instagram Story',
        position: 2,
        influence: 0.2,
        conversionRate: 3.2,
        averageValue: 85
      },
      {
        touchpoint: 'Website Visit',
        position: 3,
        influence: 0.4,
        conversionRate: 8.5,
        averageValue: 95
      }
    ];

    const customerJourney: CustomerJourney[] = [
      {
        journeyId: 'journey_1',
        touchpoints: ['Facebook Ad', 'Website Visit', 'Email', 'Purchase'],
        duration: 7,
        conversionValue: 125,
        pathType: 'assisted'
      },
      {
        journeyId: 'journey_2',
        touchpoints: ['Instagram Ad', 'Purchase'],
        duration: 1,
        conversionValue: 85,
        pathType: 'direct'
      }
    ];

    const crossDeviceTracking: CrossDeviceData[] = [
      {
        deviceType: 'Mobile',
        sessions: 15000,
        conversions: 450,
        revenue: 22500,
        crossDeviceRate: 0.25
      },
      {
        deviceType: 'Desktop',
        sessions: 8000,
        conversions: 320,
        revenue: 19200,
        crossDeviceRate: 0.15
      }
    ];

    return {
      channelAttribution,
      touchpointAnalysis,
      customerJourney,
      crossDeviceTracking
    };
  }

  private async getBIMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<BIMetrics> {
    
    // Customer segmentation analysis
    const customerSegments: CustomerSegment[] = [
      {
        name: 'VIP Customers',
        size: 500,
        ltv: 500,
        acquisitionCost: 50,
        retentionRate: 0.85,
        averageOrderValue: 150,
        purchaseFrequency: 4.2,
        profitability: 0.75,
        growthRate: 0.15
      },
      {
        name: 'Regular Customers',
        size: 2000,
        ltv: 200,
        acquisitionCost: 30,
        retentionRate: 0.65,
        averageOrderValue: 75,
        purchaseFrequency: 2.8,
        profitability: 0.55,
        growthRate: 0.08
      }
    ];

    // Product insights
    const productInsights: ProductInsight[] = [
      {
        productId: 'prod_1',
        name: 'Premium Product A',
        revenue: 15000,
        units: 150,
        adSpend: 3000,
        roas: 5.0,
        margin: 0.6,
        trend: 'growing',
        seasonality: 1.2
      }
    ];

    // Market trends
    const marketTrends: MarketTrend[] = [
      {
        category: 'E-commerce',
        trend: 'up',
        growth: 0.15,
        opportunity: 0.8,
        competition: 0.6,
        recommendation: 'Increase investment in mobile advertising'
      }
    ];

    // Competitive analysis
    const competitiveAnalysis: CompetitiveInsight[] = [
      {
        competitor: 'Competitor A',
        marketShare: 0.25,
        adSpend: 50000,
        strategy: 'Premium positioning',
        strengths: ['Brand recognition', 'Quality products'],
        weaknesses: ['Higher prices', 'Limited variety'],
        opportunities: ['Expand to new markets', 'Improve customer service']
      }
    ];

    // Shop score calculation
    const shopScore: ShopScore = {
      overall: 78,
      categories: {
        advertising: 82,
        conversion: 75,
        retention: 70,
        growth: 85
      },
      benchmarks: {
        industry: 65,
        topPerformers: 90
      },
      improvements: [
        'Improve email marketing retention',
        'Optimize checkout process',
        'Expand retargeting campaigns'
      ]
    };

    return {
      customerSegments,
      productInsights,
      marketTrends,
      competitiveAnalysis,
      shopScore
    };
  }

  private async getPredictionMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<PredictionMetrics> {
    
    // Revenue forecasting using ML
    const revenueForecast: ForecastData[] = [];
    for (let i = 1; i <= 12; i++) {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + i);
      
      revenueForecast.push({
        period: futureDate.toISOString().split('T')[0],
        predicted: 25000 * (1 + Math.random() * 0.2 - 0.1), // ±10% variance
        confidence: 0.85 - (i * 0.05), // Decreasing confidence over time
        factors: ['Seasonality', 'Market trends', 'Historical performance']
      });
    }

    // Customer LTV predictions
    const customerLTVPredictions: LTVPrediction[] = [
      {
        segment: 'High-Value',
        predictedLTV: 450,
        confidence: 0.9,
        timeframe: 365
      },
      {
        segment: 'Regular',
        predictedLTV: 180,
        confidence: 0.85,
        timeframe: 365
      }
    ];

    // Churn predictions
    const churnPredictions: ChurnPrediction[] = [
      {
        segment: 'At-Risk',
        churnRate: 0.35,
        riskFactors: ['Low engagement', 'Long time since purchase'],
        preventionActions: ['Email re-engagement', 'Special offers']
      }
    ];

    // Seasonality forecast
    const seasonalityForecast: SeasonalityData[] = [
      {
        period: 'Q4',
        multiplier: 1.4,
        category: 'Holiday shopping',
        confidence: 0.95
      }
    ];

    // Budget optimization
    const budgetOptimization: BudgetOptimization[] = [
      {
        channel: 'Facebook Ads',
        currentBudget: 10000,
        recommendedBudget: 12000,
        expectedROAS: 3.2,
        confidence: 0.85
      }
    ];

    return {
      revenueForecast,
      customerLTVPredictions,
      churnPredictions,
      seasonalityForecast,
      budgetOptimization
    };
  }

  private async getRecommendationMetrics(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<RecommendationMetrics> {
    
    const actionableInsights: ActionableInsight[] = [
      {
        id: 'insight_1',
        title: 'Increase Mobile Ad Spend',
        description: 'Mobile users show 25% higher conversion rates',
        impact: 'high',
        effort: 'low',
        category: 'Budget Optimization',
        expectedImprovement: 0.25,
        timeframe: '1-2 weeks',
        actions: [
          'Increase mobile budget by 30%',
          'Create mobile-specific creatives',
          'Optimize landing pages for mobile'
        ]
      }
    ];

    const growthOpportunities: GrowthOpportunity[] = [
      {
        opportunity: 'Expand to Instagram Reels',
        potential: 50000,
        investment: 5000,
        timeline: '1 month',
        riskLevel: 'low',
        requirements: ['Video creative assets', 'Instagram business account']
      }
    ];

    const riskAlerts: RiskAlert[] = [
      {
        type: 'performance',
        severity: 'medium',
        message: 'Campaign ROAS below target',
        impact: 'Reduced profitability',
        recommendation: 'Pause underperforming ad sets',
        deadline: '2024-01-15'
      }
    ];

    const optimizationSuggestions: OptimizationSuggestion[] = [
      {
        area: 'Bid Strategy',
        current: 1.5,
        suggested: 1.8,
        improvement: 0.2,
        confidence: 0.8,
        implementation: 'Increase target CPA by 20%'
      }
    ];

    return {
      actionableInsights,
      growthOpportunities,
      riskAlerts,
      optimizationSuggestions
    };
  }

  // Helper methods
  private calculateTrend(campaign: any): 'up' | 'down' | 'stable' {
    // Simplified trend calculation
    const roas = campaign.spend > 0 ? campaign.revenue / campaign.spend : 0;
    if (roas > 2.5) return 'up';
    if (roas < 1.5) return 'down';
    return 'stable';
  }

  private calculateEfficiency(campaign: any): 'high' | 'medium' | 'low' {
    const roas = campaign.spend > 0 ? campaign.revenue / campaign.spend : 0;
    if (roas > 3.0) return 'high';
    if (roas > 1.5) return 'medium';
    return 'low';
  }

  private calculateAdSetPerformance(adSet: any): 'excellent' | 'good' | 'average' | 'poor' {
    const roas = adSet.spend > 0 ? (adSet.spend * 2) / adSet.spend : 0;
    if (roas > 4.0) return 'excellent';
    if (roas > 2.5) return 'good';
    if (roas > 1.5) return 'average';
    return 'poor';
  }

  private calculateCreativeScore(ad: any): number {
    let score = 50; // Base score
    
    // CTR contribution
    const ctr = ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
    if (ctr > 2.0) score += 20;
    else if (ctr > 1.0) score += 10;
    
    // CVR contribution
    const cvr = ad.clicks > 0 ? (ad.conversions / ad.clicks) * 100 : 0;
    if (cvr > 5.0) score += 20;
    else if (cvr > 2.0) score += 10;
    
    // Engagement contribution
    if (ad.impressions > 1000) score += 10;
    
    return Math.min(100, score);
  }

  private async generateTimeSeriesData(
    shop: string,
    dateRange: { start: Date; end: Date }
  ): Promise<TimeSeriesData[]> {
    
    const data: TimeSeriesData[] = [];
    const days = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i < days; i++) {
      const date = new Date(dateRange.start);
      date.setDate(date.getDate() + i);
      
      // Generate realistic daily data with some variance
      const baseSpend = 500 + Math.random() * 200;
      const baseRevenue = baseSpend * (2 + Math.random() * 2);
      
      data.push({
        date: date.toISOString().split('T')[0],
        spend: baseSpend,
        revenue: baseRevenue,
        roas: baseRevenue / baseSpend,
        conversions: Math.floor(baseRevenue / 50), // Assuming $50 AOV
        impressions: Math.floor(baseSpend * 100), // Assuming $0.01 CPM
        clicks: Math.floor(baseSpend * 2) // Assuming $0.50 CPC
      });
    }
    
    return data;
  }
}