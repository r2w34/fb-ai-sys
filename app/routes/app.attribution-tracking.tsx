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
  Box,
  DataTable
} from '@shopify/polaris';

export async function loader() {
  return json({
    attributionModel: 'AI-Powered Multi-Touch',
    totalConversions: 1847,
    attributedRevenue: 127450,
    touchpoints: [
      { channel: 'Facebook Ads', firstTouch: 38.2, lastTouch: 31.4, assisted: 45.1, revenue: 48680 },
      { channel: 'Instagram Ads', firstTouch: 31.7, lastTouch: 34.2, assisted: 41.9, revenue: 43540 },
      { channel: 'Google Ads', firstTouch: 19.1, lastTouch: 22.8, assisted: 26.3, revenue: 25130 },
      { channel: 'Email Marketing', firstTouch: 7.4, lastTouch: 8.2, assisted: 12.7, revenue: 7200 },
      { channel: 'Organic Social', firstTouch: 3.6, lastTouch: 3.4, assisted: 8.0, revenue: 2900 }
    ],
    customerJourneys: [
      {
        customer: 'Customer #1847',
        touchpoints: ['Facebook Ad View', 'Instagram Story', 'Email Click', 'Google Search', 'Purchase'],
        duration: '5 days',
        value: 189.50
      },
      {
        customer: 'Customer #1846',
        touchpoints: ['Instagram Ad', 'Website Visit', 'Cart Abandon', 'Facebook Retarget', 'Purchase'],
        duration: '2 days',
        value: 124.99
      },
      {
        customer: 'Customer #1845',
        touchpoints: ['Google Search', 'Facebook Ad', 'Email', 'Instagram Story', 'Purchase'],
        duration: '8 days',
        value: 267.75
      }
    ],
    insights: [
      'Facebook ads contribute to 45.1% of assisted conversions',
      'Average customer journey involves 3.8 touchpoints',
      'Instagram Stories have 28% higher conversion rate in multi-touch journeys',
      'Email marketing shows strongest assist-to-conversion ratio at 2.1x'
    ]
  });
}

export default function AttributionTracking() {
  const { attributionModel, totalConversions, attributedRevenue, touchpoints, customerJourneys, insights } = useLoaderData<typeof loader>();

  const journeyRows = customerJourneys.map((journey) => [
    journey.customer,
    journey.touchpoints.join(' → '),
    journey.duration,
    `$${journey.value}`
  ]);

  return (
    <Page title="AI Attribution Tracking" subtitle="Advanced cross-channel customer journey analysis">
      <Layout>
        <Layout.Section>
          <Banner status="success">
            <p>AI Attribution Model is active and tracking {totalConversions.toLocaleString()} conversions across all channels.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Attribution Model</Text>
                  <Text variant="headingLg">{attributionModel}</Text>
                  <Badge tone="success">Active</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Total Conversions</Text>
                  <Text variant="headingLg">{totalConversions.toLocaleString()}</Text>
                  <Badge tone="success">+19% this month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Attributed Revenue</Text>
                  <Text variant="headingLg">${attributedRevenue.toLocaleString()}</Text>
                  <Badge tone="success">+27% this month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingMd">Avg Touchpoints</Text>
                  <Text variant="headingLg">3.8</Text>
                  <Text variant="bodySm" tone="subdued">per conversion</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Multi-Touch Attribution Analysis</Text>
              {touchpoints.map((touchpoint, index) => (
                <Box key={touchpoint.channel}>
                  <BlockStack gap="300">
                    <InlineStack align="space-between">
                      <Text variant="headingSm">{touchpoint.channel}</Text>
                      <Text variant="bodySm">${touchpoint.revenue.toLocaleString()} revenue</Text>
                    </InlineStack>
                    
                    <Grid>
                      <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">First Touch</Text>
                          <ProgressBar progress={touchpoint.firstTouch} size="small" />
                          <Text variant="bodySm" tone="subdued">{touchpoint.firstTouch}%</Text>
                        </BlockStack>
                      </Grid.Cell>
                      
                      <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">Last Touch</Text>
                          <ProgressBar progress={touchpoint.lastTouch} size="small" />
                          <Text variant="bodySm" tone="subdued">{touchpoint.lastTouch}%</Text>
                        </BlockStack>
                      </Grid.Cell>
                      
                      <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                        <BlockStack gap="100">
                          <Text variant="bodySm">Assisted</Text>
                          <ProgressBar progress={touchpoint.assisted} size="small" />
                          <Text variant="bodySm" tone="subdued">{touchpoint.assisted}%</Text>
                        </BlockStack>
                      </Grid.Cell>
                    </Grid>
                  </BlockStack>
                </Box>
              ))}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Recent Customer Journeys</Text>
                  <DataTable
                    columnContentTypes={['text', 'text', 'text', 'numeric']}
                    headings={['Customer', 'Journey Path', 'Duration', 'Value']}
                    rows={journeyRows}
                  />
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">AI Attribution Insights</Text>
                  <List type="bullet">
                    {insights.map((insight, index) => (
                      <List.Item key={index}>{insight}</List.Item>
                    ))}
                  </List>
                  <Button variant="primary" fullWidth>
                    Optimize Based on Insights
                  </Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Attribution Actions</Text>
              <InlineStack gap="300">
                <Button>Export Attribution Report</Button>
                <Button>Configure Custom Model</Button>
                <Button>Set Up Alerts</Button>
                <Button>View Historical Data</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}