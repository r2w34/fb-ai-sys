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
  ProgressBar,
  Banner,
  Grid,
  Box,
  InlineStack,
  BlockStack
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request);
    const shop = session.shop;

    return json({
      shop,
      aiMetrics: {
        totalOptimizations: 147,
        activeCampaigns: 8,
        avgROAS: 6.8,
        costSavings: 23450,
        conversionRate: 4.7,
        audienceReach: 285000
      },
      growthTips: [
        {
          id: 1,
          title: "Optimize Ad Scheduling",
          description: "Your ads perform 23% better between 2-6 PM",
          impact: "high",
          category: "timing"
        },
        {
          id: 2,
          title: "Expand Lookalike Audiences", 
          description: "Create 2% lookalike audiences for better reach",
          impact: "medium",
          category: "targeting"
        }
      ]
    });
  } catch (error) {
    console.error('AI dashboard loader error:', error);
    return json({
      shop: 'unknown',
      error: 'Authentication failed',
      aiMetrics: {
        totalOptimizations: 0,
        activeCampaigns: 0,
        avgROAS: 0,
        costSavings: 0,
        conversionRate: 0,
        audienceReach: 0
      },
      growthTips: []
    });
  }
};

export default function AIDashboard() {
  const { shop, aiMetrics, growthTips, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <Page title="AI Dashboard">
        <Banner status="critical">
          <p>{error}</p>
        </Banner>
      </Page>
    );
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <Page
      title="AI-Powered Dashboard"
      subtitle={`AI optimization insights for ${shop}`}
      primaryAction={{
        content: "Start AI Optimization",
        onAction: () => {
          console.log('Starting AI optimization...');
        }
      }}
    >
      <Layout>
        {/* AI Performance Metrics */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">AI Optimizations</Text>
                  <Text as="p" variant="headingLg">{formatNumber(aiMetrics.totalOptimizations)}</Text>
                  <Text as="p" variant="bodyMd" tone="subdued">Total optimizations applied</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">Cost Savings</Text>
                  <Text as="p" variant="headingLg">{formatCurrency(aiMetrics.costSavings)}</Text>
                  <Text as="p" variant="bodyMd" tone="subdued">Saved through AI optimization</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">Average ROAS</Text>
                  <Text as="p" variant="headingLg">{aiMetrics.avgROAS}x</Text>
                  <Text as="p" variant="bodyMd" tone="subdued">Return on ad spend</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Campaign Overview */}
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Card>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingMd">Campaign Performance</Text>
                  <InlineStack gap="400">
                    <Box>
                      <Text as="p" variant="bodyMd">Active Campaigns</Text>
                      <Text as="p" variant="headingLg">{aiMetrics.activeCampaigns}</Text>
                    </Box>
                    <Box>
                      <Text as="p" variant="bodyMd">Conversion Rate</Text>
                      <Text as="p" variant="headingLg">{aiMetrics.conversionRate}%</Text>
                    </Box>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Card>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingMd">Audience Reach</Text>
                  <Text as="p" variant="headingLg">{formatNumber(aiMetrics.audienceReach)}</Text>
                  <Text as="p" variant="bodyMd" tone="subdued">People reached by your campaigns</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* AI Growth Tips */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">AI Growth Recommendations</Text>
              {growthTips.map((tip) => (
                <Card key={tip.id} background="bg-surface-secondary">
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h4" variant="headingSm">{tip.title}</Text>
                      <Badge tone={tip.impact === 'high' ? 'success' : 'attention'}>
                        {tip.impact} impact
                      </Badge>
                    </InlineStack>
                    <Text as="p" variant="bodyMd">{tip.description}</Text>
                    <InlineStack gap="200">
                      <Button size="slim">Apply Recommendation</Button>
                      <Button size="slim" variant="plain">Learn More</Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Quick Actions */}
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h3" variant="headingMd">Quick Actions</Text>
              <InlineStack gap="300">
                <Button variant="primary" url="/app/campaigns/new">
                  Create Campaign
                </Button>
                <Button url="/app/facebook-settings">
                  Facebook Settings
                </Button>
                <Button url="/app/analytics">
                  View Analytics
                </Button>
                <Button url="/app/performance-insights">
                  Performance Insights
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}