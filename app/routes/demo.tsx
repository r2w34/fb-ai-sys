import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  InlineStack,
  Badge,
  Grid,
  Divider,
  Banner
} from '@shopify/polaris';

export async function loader() {
  return json({
    aiStats: {
      totalRevenue: 156780,
      roas: 6.8,
      conversionRate: 4.7,
      audienceReach: 285000
    },
    recentAiActivity: [
      { action: 'AI optimized Instagram campaign budget', time: '3 minutes ago', impact: '+28% ROAS', type: 'optimization' },
      { action: 'Created lookalike audience from top customers', time: '15 minutes ago', impact: '45K reach', type: 'audience' },
      { action: 'Launched automated retargeting funnel', time: '1 hour ago', impact: '+12% conversions', type: 'funnel' }
    ],
    aiInsights: [
      'Your Instagram ads are performing 34% better than industry average',
      'AI detected optimal bidding window: 2-4 PM weekdays',
      'Lookalike audiences show 67% higher conversion rates'
    ]
  });
}

export default function Demo() {
  const { aiStats, recentAiActivity, aiInsights } = useLoaderData<typeof loader>();

  return (
    <Page title="🚀 AI Facebook Ads Pro - Enhanced Demo">
      <Layout>
        <Layout.Section>
          <Banner status="success" title="Welcome to AI-Powered Advertising!">
            <p>Your enhanced Facebook Ads Pro is now powered by advanced AI. Experience 24/7 optimization, intelligent funnels, and comprehensive business intelligence.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingLg">🤖 AI Performance Overview</Text>
                <Badge tone="success">All Systems Active</Badge>
              </InlineStack>
              
              <Grid>
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm" tone="subdued">Total Revenue</Text>
                      <Text variant="heading2xl">${aiStats.totalRevenue.toLocaleString()}</Text>
                      <Badge tone="success">+42% vs last month</Badge>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm" tone="subdued">AI ROAS</Text>
                      <Text variant="heading2xl">{aiStats.roas}x</Text>
                      <Badge tone="success">Above 5x target</Badge>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm" tone="subdued">Conversion Rate</Text>
                      <Text variant="heading2xl">{aiStats.conversionRate}%</Text>
                      <Badge tone="success">+1.8% this week</Badge>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm" tone="subdued">Audience Reach</Text>
                      <Text variant="heading2xl">{aiStats.audienceReach.toLocaleString()}</Text>
                      <Badge tone="info">Multi-channel</Badge>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
              </Grid>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">🤖 Recent AI Activity</Text>
                  {recentAiActivity.map((activity, index) => (
                    <Box key={index}>
                      <InlineStack align="space-between">
                        <BlockStack gap="100">
                          <Text variant="headingSm">{activity.action}</Text>
                          <Text variant="bodySm" tone="subdued">{activity.time}</Text>
                        </BlockStack>
                        <BlockStack gap="100" align="end">
                          <Badge tone="success">{activity.type}</Badge>
                          <Text variant="bodySm">{activity.impact}</Text>
                        </BlockStack>
                      </InlineStack>
                      {index < recentAiActivity.length - 1 && <Divider />}
                    </Box>
                  ))}
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">💡 AI Insights</Text>
                  <List type="bullet">
                    {aiInsights.map((insight, index) => (
                      <List.Item key={index}>{insight}</List.Item>
                    ))}
                  </List>
                  <Button variant="primary" fullWidth>
                    Apply AI Recommendations
                  </Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">✨ New Enhanced Features</Text>
              <Grid>
                <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm">🎯 AI Advertising Funnels</Text>
                      <Text variant="bodySm">Personalized Facebook & Instagram ads with intelligent targeting and automatic optimization.</Text>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm">📊 Business Intelligence</Text>
                      <Text variant="bodySm">Comprehensive analytics with AI-powered insights and actionable recommendations.</Text>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="200">
                      <Text variant="headingSm">🔍 Attribution Tracking</Text>
                      <Text variant="bodySm">Advanced cross-channel customer journey analysis with AI attribution modeling.</Text>
                    </BlockStack>
                  </Box>
                </Grid.Cell>
              </Grid>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}