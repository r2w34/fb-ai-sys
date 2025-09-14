import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  Page,
  Layout,
  Card,
  Text,
  Badge,
  Grid,
  BlockStack,
  InlineStack,
  ProgressBar,
  List,
  Banner,
  Button,
  Box
} from '@shopify/polaris';

export async function loader() {
  return json({
    activeFunnels: 12,
    totalConversions: 1847,
    conversionRate: 4.7,
    audienceReach: 285000,
    funnels: [
      {
        id: 1,
        name: 'Premium Product Launch Funnel',
        status: 'Active',
        conversions: 234,
        conversionRate: 5.2,
        reach: 45000,
        spend: 2450,
        revenue: 12680
      },
      {
        id: 2,
        name: 'Cart Abandonment Recovery',
        status: 'Active',
        conversions: 189,
        conversionRate: 8.1,
        reach: 23400,
        spend: 890,
        revenue: 8950
      },
      {
        id: 3,
        name: 'Lookalike Audience Expansion',
        status: 'Active',
        conversions: 156,
        conversionRate: 3.8,
        reach: 67000,
        spend: 1780,
        revenue: 7840
      }
    ],
    insights: [
      'Cart abandonment funnels show 67% higher conversion rates',
      'Video creative performs 34% better in awareness stage',
      'Lookalike audiences from top customers convert at 2.3x rate',
      'Mobile-optimized funnels drive 78% of total conversions'
    ]
  });
}

export default function AIFunnel() {
  const { activeFunnels, totalConversions, conversionRate, audienceReach, funnels, insights } = useLoaderData<typeof loader>();

  return (
    <Page title="🎯 AI Advertising Funnels" subtitle="Intelligent multi-stage customer acquisition campaigns">
      <Layout>
        <Layout.Section>
          <Banner status="success">
            <p>AI Funnel system is active with {activeFunnels} running funnels generating {totalConversions.toLocaleString()} conversions.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Active Funnels</Text>
                  <Text variant="heading2xl">{activeFunnels}</Text>
                  <Badge tone="success">All optimized</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Total Conversions</Text>
                  <Text variant="heading2xl">{totalConversions.toLocaleString()}</Text>
                  <Badge tone="success">+23% this month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Conversion Rate</Text>
                  <Text variant="heading2xl">{conversionRate}%</Text>
                  <Badge tone="success">Above 4% target</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Audience Reach</Text>
                  <Text variant="heading2xl">{audienceReach.toLocaleString()}</Text>
                  <Badge tone="info">Multi-platform</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingMd">Active AI Funnels</Text>
                <Button variant="primary">Create New Funnel</Button>
              </InlineStack>
              
              {funnels.map((funnel) => (
                <Card key={funnel.id}>
                  <BlockStack gap="300">
                    <InlineStack align="space-between">
                      <BlockStack gap="100">
                        <Text variant="headingSm">{funnel.name}</Text>
                        <Badge tone="success">{funnel.status}</Badge>
                      </BlockStack>
                      <Button>Optimize</Button>
                    </InlineStack>
                    
                    <Grid>
                      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">Conversions</Text>
                          <Text variant="headingSm">{funnel.conversions}</Text>
                        </BlockStack>
                      </Grid.Cell>
                      
                      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">Conversion Rate</Text>
                          <Text variant="headingSm">{funnel.conversionRate}%</Text>
                        </BlockStack>
                      </Grid.Cell>
                      
                      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">Reach</Text>
                          <Text variant="headingSm">{funnel.reach.toLocaleString()}</Text>
                        </BlockStack>
                      </Grid.Cell>
                      
                      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">ROAS</Text>
                          <Text variant="headingSm">{(funnel.revenue / funnel.spend).toFixed(1)}x</Text>
                        </BlockStack>
                      </Grid.Cell>
                    </Grid>
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Funnel Performance Stages</Text>
                  
                  <Box>
                    <BlockStack gap="300">
                      <Text variant="headingSm">🎯 Awareness Stage</Text>
                      <ProgressBar progress={78} size="medium" />
                      <Text variant="bodySm" tone="subdued">78% of target audience reached</Text>
                    </BlockStack>
                  </Box>
                  
                  <Box>
                    <BlockStack gap="300">
                      <Text variant="headingSm">🤔 Consideration Stage</Text>
                      <ProgressBar progress={45} size="medium" />
                      <Text variant="bodySm" tone="subdued">45% engagement rate</Text>
                    </BlockStack>
                  </Box>
                  
                  <Box>
                    <BlockStack gap="300">
                      <Text variant="headingSm">🛒 Conversion Stage</Text>
                      <ProgressBar progress={4.7} size="medium" />
                      <Text variant="bodySm" tone="subdued">4.7% conversion rate</Text>
                    </BlockStack>
                  </Box>
                  
                  <Box>
                    <BlockStack gap="300">
                      <Text variant="headingSm">🔄 Retention Stage</Text>
                      <ProgressBar progress={38} size="medium" />
                      <Text variant="bodySm" tone="subdued">38% repeat purchase rate</Text>
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">🤖 AI Funnel Insights</Text>
                  <List type="bullet">
                    {insights.map((insight, index) => (
                      <List.Item key={index}>{insight}</List.Item>
                    ))}
                  </List>
                  <Button variant="primary" fullWidth>
                    Apply AI Optimizations
                  </Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Funnel Actions</Text>
              <InlineStack gap="300">
                <Button variant="primary">Create New Funnel</Button>
                <Button>A/B Test Creatives</Button>
                <Button>Optimize Audiences</Button>
                <Button>Export Performance</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}