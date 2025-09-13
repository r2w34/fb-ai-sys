import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Page,
  Layout,
  Card,
  Text,
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  ProgressBar,
  Stack,
  Divider,
  Banner,
  Icon,
  Tooltip,
  Grid,
  Box,
  InlineStack,
  BlockStack
} from "@shopify/polaris";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ChartBarIcon,
  LightBulbIcon,
  CogIcon,
  PlayIcon,
  PauseIcon,
  RefreshIcon
} from "@shopify/polaris-icons";

import { AnalyticsDashboardService } from "../services/analytics-dashboard.server";
import { GrowthTipsService } from "../services/growth-tips.server";
import { AIOptimizationEngine } from "../services/ai-optimization-engine.server";
import { RetargetingSystemService } from "../services/retargeting-system.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  // Initialize services
  const analyticsService = new AnalyticsDashboardService();
  const growthTipsService = new GrowthTipsService();
  const optimizationEngine = new AIOptimizationEngine();
  const retargetingService = new RetargetingSystemService();

  // Get date range (last 30 days)
  const dateRange = {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  };

  try {
    // Fetch all dashboard data
    const [
      dashboardMetrics,
      growthTips,
      growthOpportunities
    ] = await Promise.all([
      analyticsService.getDashboardMetrics(shop, dateRange),
      growthTipsService.generatePersonalizedGrowthTips(shop, 5),
      growthTipsService.generateGrowthOpportunities(shop)
    ]);

    return json({
      shop,
      metrics: dashboardMetrics,
      growthTips,
      growthOpportunities,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString()
      }
    });
  } catch (error) {
    console.error('Error loading AI dashboard:', error);
    return json({
      shop,
      metrics: null,
      growthTips: [],
      growthOpportunities: [],
      error: 'Failed to load dashboard data'
    });
  }
};

export default function AIDashboard() {
  const { shop, metrics, growthTips, growthOpportunities, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <Page title="AI Dashboard">
        <Banner status="critical">
          <p>{error}</p>
        </Banner>
      </Page>
    );
  }

  if (!metrics) {
    return (
      <Page title="AI Dashboard">
        <Card>
          <Text as="p">Loading dashboard data...</Text>
        </Card>
      </Page>
    );
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const getTrendIcon = (value: number) => {
    if (value > 0) return <Icon source={TrendingUpIcon} tone="success" />;
    if (value < 0) return <Icon source={TrendingDownIcon} tone="critical" />;
    return null;
  };

  const getImpactBadge = (impact: string) => {
    const toneMap = { high: 'success', medium: 'attention', low: 'info' } as const;
    return <Badge tone={toneMap[impact as keyof typeof toneMap] || 'info'}>{impact}</Badge>;
  };

  const getEffortBadge = (effort: string) => {
    const toneMap = { low: 'success', medium: 'attention', high: 'critical' } as const;
    return <Badge tone={toneMap[effort as keyof typeof toneMap] || 'info'}>{effort}</Badge>;
  };

  return (
    <Page
      title="AI-Powered Dashboard"
      subtitle="Comprehensive analytics, optimization, and growth insights"
      primaryAction={{
        content: "Start AI Optimization",
        icon: PlayIcon,
        onAction: () => {
          // Start AI optimization engine
          console.log('Starting AI optimization...');
        }
      }}
      secondaryActions={[
        {
          content: "Refresh Data",
          icon: RefreshIcon,
          onAction: () => window.location.reload()
        },
        {
          content: "Settings",
          icon: CogIcon,
          onAction: () => {
            // Navigate to settings
          }
        }
      ]}
    >
      <Layout>
        {/* Overview Metrics */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">Total Revenue</Text>
                  <InlineStack align="space-between">
                    <Text as="p" variant="headingLg">{formatCurrency(metrics.overview.totalRevenue)}</Text>
                    <InlineStack gap="100">
                      {getTrendIcon(metrics.overview.previousPeriodComparison.revenue)}
                      <Text as="p" tone={metrics.overview.previousPeriodComparison.revenue > 0 ? 'success' : 'critical'}>
                        {formatPercentage(Math.abs(metrics.overview.previousPeriodComparison.revenue))}
                      </Text>
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">ROAS</Text>
                  <InlineStack align="space-between">
                    <Text as="p" variant="headingLg">{metrics.overview.totalROAS.toFixed(2)}x</Text>
                    <InlineStack gap="100">
                      {getTrendIcon(metrics.overview.previousPeriodComparison.roas)}
                      <Text as="p" tone={metrics.overview.previousPeriodComparison.roas > 0 ? 'success' : 'critical'}>
                        {formatPercentage(Math.abs(metrics.overview.previousPeriodComparison.roas))}
                      </Text>
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">Total Spend</Text>
                  <InlineStack align="space-between">
                    <Text as="p" variant="headingLg">{formatCurrency(metrics.overview.totalSpend)}</Text>
                    <InlineStack gap="100">
                      {getTrendIcon(metrics.overview.previousPeriodComparison.spend)}
                      <Text as="p" tone={metrics.overview.previousPeriodComparison.spend > 0 ? 'critical' : 'success'}>
                        {formatPercentage(Math.abs(metrics.overview.previousPeriodComparison.spend))}
                      </Text>
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">Conversions</Text>
                  <InlineStack align="space-between">
                    <Text as="p" variant="headingLg">{metrics.overview.totalConversions.toLocaleString()}</Text>
                    <InlineStack gap="100">
                      {getTrendIcon(metrics.overview.previousPeriodComparison.conversions)}
                      <Text as="p" tone={metrics.overview.previousPeriodComparison.conversions > 0 ? 'success' : 'critical'}>
                        {formatPercentage(Math.abs(metrics.overview.previousPeriodComparison.conversions))}
                      </Text>
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* AI Optimization Status */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text as="h2" variant="headingLg">24/7 AI Optimization</Text>
                <Badge tone="success">Active</Badge>
              </InlineStack>
              
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Budget Optimization</Text>
                    <ProgressBar progress={85} />
                    <Text as="p" tone="subdued">12 campaigns optimized today</Text>
                  </BlockStack>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Bid Optimization</Text>
                    <ProgressBar progress={92} />
                    <Text as="p" tone="subdued">8 bid adjustments made</Text>
                  </BlockStack>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Creative Testing</Text>
                    <ProgressBar progress={67} />
                    <Text as="p" tone="subdued">5 new creatives tested</Text>
                  </BlockStack>
                </Grid.Cell>
              </Grid>

              <InlineStack gap="200">
                <Button variant="primary" icon={PlayIcon}>
                  Optimize Now
                </Button>
                <Button icon={PauseIcon}>
                  Pause Optimization
                </Button>
                <Button icon={CogIcon}>
                  Settings
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            {/* Campaign Performance */}
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 8, lg: 8, xl: 8 }}>
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingLg">Campaign Performance</Text>
                  
                  <DataTable
                    columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text', 'text']}
                    headings={['Campaign', 'Spend', 'Revenue', 'ROAS', 'Status', 'Trend']}
                    rows={metrics.performance.campaignPerformance.slice(0, 5).map(campaign => [
                      campaign.name,
                      formatCurrency(campaign.spend),
                      formatCurrency(campaign.revenue),
                      `${campaign.roas.toFixed(2)}x`,
                      <Badge tone={campaign.status === 'ACTIVE' ? 'success' : 'info'}>
                        {campaign.status}
                      </Badge>,
                      <Badge tone={campaign.trend === 'up' ? 'success' : campaign.trend === 'down' ? 'critical' : 'info'}>
                        {campaign.trend}
                      </Badge>
                    ])}
                  />
                </BlockStack>
              </Card>
            </Grid.Cell>

            {/* Business Intelligence */}
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingLg">Shop Score</Text>
                  
                  <Box>
                    <InlineStack align="center" gap="200">
                      <Text as="p" variant="heading2xl">{metrics.businessIntelligence.shopScore.overall}</Text>
                      <Text as="p" tone="subdued">/100</Text>
                    </InlineStack>
                  </Box>

                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="p">Advertising</Text>
                      <Text as="p">{metrics.businessIntelligence.shopScore.categories.advertising}</Text>
                    </InlineStack>
                    <ProgressBar progress={metrics.businessIntelligence.shopScore.categories.advertising} />
                    
                    <InlineStack align="space-between">
                      <Text as="p">Conversion</Text>
                      <Text as="p">{metrics.businessIntelligence.shopScore.categories.conversion}</Text>
                    </InlineStack>
                    <ProgressBar progress={metrics.businessIntelligence.shopScore.categories.conversion} />
                    
                    <InlineStack align="space-between">
                      <Text as="p">Retention</Text>
                      <Text as="p">{metrics.businessIntelligence.shopScore.categories.retention}</Text>
                    </InlineStack>
                    <ProgressBar progress={metrics.businessIntelligence.shopScore.categories.retention} />
                    
                    <InlineStack align="space-between">
                      <Text as="p">Growth</Text>
                      <Text as="p">{metrics.businessIntelligence.shopScore.categories.growth}</Text>
                    </InlineStack>
                    <ProgressBar progress={metrics.businessIntelligence.shopScore.categories.growth} />
                  </BlockStack>

                  <Text as="p" tone="subdued">
                    Industry Average: {metrics.businessIntelligence.shopScore.benchmarks.industry}
                  </Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Growth Tips */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text as="h2" variant="headingLg">AI Growth Tips</Text>
                <Button icon={LightBulbIcon}>View All Tips</Button>
              </InlineStack>

              <Grid>
                {growthTips.slice(0, 3).map((tip, index) => (
                  <Grid.Cell key={tip.id} columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                    <Card>
                      <BlockStack gap="300">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingMd">{tip.title}</Text>
                          <InlineStack gap="100">
                            {getImpactBadge(tip.impact)}
                            {getEffortBadge(tip.effort)}
                          </InlineStack>
                        </InlineStack>
                        
                        <Text as="p">{tip.description}</Text>
                        
                        <InlineStack align="space-between">
                          <Text as="p" tone="subdued">
                            Expected: +{tip.expectedImprovement.value}{tip.expectedImprovement.unit === 'percentage' ? '%' : ''} {tip.expectedImprovement.metric}
                          </Text>
                          <Text as="p" tone="subdued">{tip.timeframe}</Text>
                        </InlineStack>

                        <InlineStack gap="200">
                          <Button size="slim" variant="primary">
                            Start Now
                          </Button>
                          <Button size="slim">
                            Learn More
                          </Button>
                        </InlineStack>
                      </BlockStack>
                    </Card>
                  </Grid.Cell>
                ))}
              </Grid>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Growth Opportunities */}
        {growthOpportunities.length > 0 && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">Growth Opportunities</Text>
                
                {growthOpportunities.slice(0, 2).map((opportunity) => (
                  <Card key={opportunity.id}>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text as="h3" variant="headingMd">{opportunity.title}</Text>
                        <Badge tone={opportunity.riskLevel === 'low' ? 'success' : opportunity.riskLevel === 'medium' ? 'attention' : 'critical'}>
                          {opportunity.riskLevel} risk
                        </Badge>
                      </InlineStack>
                      
                      <Text as="p">{opportunity.description}</Text>
                      
                      <Grid>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued">Potential Revenue</Text>
                            <Text as="p" variant="headingMd">{formatCurrency(opportunity.potentialRevenue)}</Text>
                          </BlockStack>
                        </Grid.Cell>
                        
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued">Investment Required</Text>
                            <Text as="p" variant="headingMd">{formatCurrency(opportunity.investmentRequired)}</Text>
                          </BlockStack>
                        </Grid.Cell>
                        
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued">Expected ROI</Text>
                            <Text as="p" variant="headingMd">{(opportunity.roi * 100).toFixed(0)}%</Text>
                          </BlockStack>
                        </Grid.Cell>
                        
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued">Timeline</Text>
                            <Text as="p" variant="headingMd">{opportunity.timeline}</Text>
                          </BlockStack>
                        </Grid.Cell>
                      </Grid>

                      <InlineStack gap="200">
                        <Button variant="primary">
                          Start Planning
                        </Button>
                        <Button>
                          Learn More
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Card>
                ))}
              </BlockStack>
            </Card>
          </Layout.Section>
        )}

        {/* Risk Alerts */}
        {metrics.recommendations.riskAlerts.length > 0 && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">Risk Alerts</Text>
                
                {metrics.recommendations.riskAlerts.map((alert, index) => (
                  <Banner
                    key={index}
                    status={alert.severity === 'critical' ? 'critical' : alert.severity === 'high' ? 'warning' : 'info'}
                  >
                    <BlockStack gap="200">
                      <Text as="p" variant="headingMd">{alert.message}</Text>
                      <Text as="p">{alert.impact}</Text>
                      <Text as="p"><strong>Recommendation:</strong> {alert.recommendation}</Text>
                      {alert.deadline && (
                        <Text as="p" tone="critical">
                          <strong>Deadline:</strong> {alert.deadline}
                        </Text>
                      )}
                    </BlockStack>
                  </Banner>
                ))}
              </BlockStack>
            </Card>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}