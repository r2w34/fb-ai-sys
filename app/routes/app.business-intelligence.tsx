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
    shopScore: 92,
    kpis: {
      totalRevenue: 189650,
      customerLifetimeValue: 312.75,
      repeatCustomerRate: 38.4,
      averageOrderValue: 94.50,
      conversionRate: 4.1,
      costPerAcquisition: 19.80
    },
    topProducts: [
      { name: 'Premium Wireless Headphones', revenue: 28450, units: 234 },
      { name: 'Smart Fitness Tracker', revenue: 19680, units: 312 },
      { name: 'Eco-Friendly Water Bottle', revenue: 14920, units: 298 }
    ],
    topCustomers: [
      { name: 'Sarah Johnson', value: 1850, orders: 12 },
      { name: 'Mike Chen', value: 1420, orders: 9 },
      { name: 'Emma Davis', value: 1180, orders: 7 }
    ],
    revenueByChannel: [
      { channel: 'Facebook Ads', revenue: 68450, percentage: 36.1 },
      { channel: 'Instagram Ads', revenue: 52380, percentage: 27.6 },
      { channel: 'Google Ads', revenue: 41920, percentage: 22.1 },
      { channel: 'Organic', revenue: 26900, percentage: 14.2 }
    ],
    insights: [
      'Your repeat customer rate is 22% above industry average',
      'Instagram ads ROI increased by 34% this month',
      'Premium products drive 67% of total revenue',
      'Customer acquisition cost decreased by 18% this quarter'
    ]
  });
}

export default function BusinessIntelligence() {
  const { shopScore, kpis, topProducts, topCustomers, revenueByChannel, insights } = useLoaderData<typeof loader>();

  return (
    <Page title="Business Intelligence Dashboard" subtitle="Comprehensive analytics and performance insights">
      <Layout>
        <Layout.Section>
          <Banner status="info">
            <p>Your ShopScore is {shopScore}/100 - Excellent performance! You are in the top 10% of stores.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Total Revenue</Text>
                  <Text variant="headingLg">${kpis.totalRevenue.toLocaleString()}</Text>
                  <Badge tone="success">+24% vs last month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Customer LTV</Text>
                  <Text variant="headingLg">${kpis.customerLifetimeValue}</Text>
                  <Badge tone="success">+16% vs last month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Repeat Rate</Text>
                  <Text variant="headingLg">{kpis.repeatCustomerRate}%</Text>
                  <Badge tone="success">Above average</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Avg Order Value</Text>
                  <Text variant="headingLg">${kpis.averageOrderValue}</Text>
                  <Badge tone="attention">+2% vs last month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Conversion Rate</Text>
                  <Text variant="headingLg">{kpis.conversionRate}%</Text>
                  <Badge tone="success">+0.7% vs last month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 2, xl: 2}}>
              <Card>
                <BlockStack gap="200">
                  <Text variant="headingSm">Cost Per Acquisition</Text>
                  <Text variant="headingLg">${kpis.costPerAcquisition}</Text>
                  <Badge tone="success">-18% vs last month</Badge>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Top Performing Products</Text>
                  {topProducts.map((product, index) => (
                    <Box key={product.name}>
                      <BlockStack gap="200">
                        <InlineStack align="space-between">
                          <Text variant="headingSm">{product.name}</Text>
                          <Text variant="bodySm">${product.revenue.toLocaleString()}</Text>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{product.units} units sold</Text>
                      </BlockStack>
                    </Box>
                  ))}
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Most Valuable Customers</Text>
                  {topCustomers.map((customer, index) => (
                    <Box key={customer.name}>
                      <BlockStack gap="200">
                        <InlineStack align="space-between">
                          <Text variant="headingSm">{customer.name}</Text>
                          <Text variant="bodySm">${customer.value}</Text>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{customer.orders} orders</Text>
                      </BlockStack>
                    </Box>
                  ))}
                </BlockStack>
              </Card>
            </Grid.Cell>
            
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Revenue by Channel</Text>
                  {revenueByChannel.map((channel, index) => (
                    <Box key={channel.channel}>
                      <BlockStack gap="200">
                        <InlineStack align="space-between">
                          <Text variant="headingSm">{channel.channel}</Text>
                          <Text variant="bodySm">${channel.revenue.toLocaleString()}</Text>
                        </InlineStack>
                        <ProgressBar progress={channel.percentage} size="small" />
                        <Text variant="bodySm" tone="subdued">{channel.percentage}% of total</Text>
                      </BlockStack>
                    </Box>
                  ))}
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">AI-Powered Business Insights</Text>
              <List type="bullet">
                {insights.map((insight, index) => (
                  <List.Item key={index}>{insight}</List.Item>
                ))}
              </List>
              <InlineStack gap="300">
                <Button variant="primary">Download Report</Button>
                <Button>Export Data</Button>
                <Button>Schedule Report</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}