import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  Banner,
  List,
  BlockStack,
  InlineStack,
  Grid,
  Badge,
  Icon,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getStore, getCampaigns, getProducts } from "../lib/db.server";
import {
  ChartLineIcon,
  ProductIcon,
  ChartVerticalIcon,
  InfoIcon,
} from "@shopify/polaris-icons";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  // Get store data
  const store = await getStore(session.shop);
  
  let campaigns = [];
  let products = [];
  let stats = {
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalSpend: 0,
    totalConversions: 0,
  };

  if (store) {
    campaigns = await getCampaigns(store.id, { take: 5 });
    products = await getProducts(store.id, { take: 5 });
    
    stats = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
      totalSpend: campaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
      totalConversions: campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0),
    };
  }

  return json({
    store,
    campaigns,
    products,
    stats,
    shopDomain: session.shop,
  });
};

export default function Index() {
  const { store, campaigns, products, stats, shopDomain } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar title="AI Facebook Ads Pro" />
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {!store?.facebookAccessToken && (
              <Banner
                title="Connect your Facebook account"
                tone="warning"
                action={{
                  content: "Connect Facebook",
                  onAction: () => navigate("/settings/facebook"),
                }}
              >
                <p>
                  Connect your Facebook Business account to start creating AI-powered ad campaigns.
                </p>
              </Banner>
            )}

            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2">Welcome to AI Facebook Ads Pro</Text>
                <Text>
                  Supercharge your Shopify store with AI-powered Facebook advertising campaigns.
                  Our intelligent system analyzes your products and creates high-converting ads automatically.
                </Text>
                
                <InlineStack gap="300">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => navigate("/campaigns/new")}
                    disabled={!store?.facebookAccessToken}
                  >
                    Create AI Campaign
                  </Button>
                  <Button
                    size="large"
                    onClick={() => navigate("/campaigns")}
                  >
                    View Campaigns
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>

            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="center" gap="200">
                      <Icon source={ChartLineIcon} tone="base" />
                      <Text variant="headingMd" as="h3">{stats.totalCampaigns}</Text>
                    </InlineStack>
                    <Text tone="subdued">Total Campaigns</Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="center" gap="200">
                      <Icon source={ChartVerticalIcon} tone="success" />
                      <Text variant="headingMd" as="h3">{stats.activeCampaigns}</Text>
                    </InlineStack>
                    <Text tone="subdued">Active Campaigns</Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="center" gap="200">
                      <Text variant="headingMd" as="h3">${stats.totalSpend.toFixed(2)}</Text>
                    </InlineStack>
                    <Text tone="subdued">Total Spend</Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="center" gap="200">
                      <Text variant="headingMd" as="h3">{stats.totalConversions}</Text>
                    </InlineStack>
                    <Text tone="subdued">Conversions</Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>

            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Recent Campaigns</Text>
                    {campaigns.length > 0 ? (
                      <List>
                        {campaigns.map((campaign) => (
                          <List.Item key={campaign.id}>
                            <InlineStack align="space-between">
                              <InlineStack align="center" gap="200">
                                <Text variant="bodyMd">{campaign.name}</Text>
                                <Badge
                                  tone={campaign.status === 'ACTIVE' ? 'success' : 'attention'}
                                >
                                  {campaign.status}
                                </Badge>
                              </InlineStack>
                              <Text tone="subdued">
                                ${(campaign.spend || 0).toFixed(2)} spent
                              </Text>
                            </InlineStack>
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <BlockStack gap="200">
                        <Icon source={InfoIcon} tone="subdued" />
                        <Text tone="subdued">No campaigns yet. Create your first AI-powered campaign!</Text>
                      </BlockStack>
                    )}
                    {campaigns.length > 0 && (
                      <Button onClick={() => navigate("/campaigns")}>
                        View All Campaigns
                      </Button>
                    )}
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Top Products</Text>
                    {products.length > 0 ? (
                      <List>
                        {products.map((product) => (
                          <List.Item key={product.id}>
                            <InlineStack align="space-between">
                              <Text variant="bodyMd">{product.title}</Text>
                              <Text tone="subdued">
                                ${(product.price || 0).toFixed(2)}
                              </Text>
                            </InlineStack>
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <BlockStack gap="200">
                        <Icon source={ProductIcon} tone="subdued" />
                        <Text tone="subdued">No products found. Add products to your store first.</Text>
                      </BlockStack>
                    )}
                    {products.length > 0 && (
                      <Button onClick={() => navigate("/products")}>
                        View All Products
                      </Button>
                    )}
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h3">Getting Started</Text>
                <List type="number">
                  <List.Item>
                    <Text>Connect your Facebook Business account in Settings</Text>
                  </List.Item>
                  <List.Item>
                    <Text>Select products you want to advertise</Text>
                  </List.Item>
                  <List.Item>
                    <Text>Let AI generate optimized campaign content</Text>
                  </List.Item>
                  <List.Item>
                    <Text>Launch and monitor your campaigns</Text>
                  </List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}