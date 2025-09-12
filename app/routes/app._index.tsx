import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  Badge,
  ProgressBar,
  Icon,
  Grid,
  Divider,
  Banner,
  CalloutCard,
} from "@shopify/polaris";
import { 
  TitleBar, 
  useAppBridge,
  Modal,
  ResourcePicker
} from "@shopify/app-bridge-react";
import { 
  ChartVerticalIcon,
  MegaphoneIcon,
  ChartLineIcon,
  ConnectIcon,
  PlusIcon
} from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { db } from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  // Get Facebook account status
  const facebookAccount = await db.facebookAccount.findFirst({
    where: { shop, isActive: true },
  });

  // Get campaigns summary
  const campaigns = await db.campaign.findMany({
    where: { shop },
    include: {
      ads: true,
      adSets: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // Calculate totals
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE').length;
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  return json({
    shop,
    facebookAccount: facebookAccount ? {
      id: facebookAccount.id,
      isConnected: true,
      businessId: facebookAccount.businessId,
      adAccountId: facebookAccount.adAccountId,
    } : { isConnected: false },
    campaigns,
    stats: {
      totalCampaigns,
      activeCampaigns,
      totalSpend,
      totalRevenue,
      totalConversions,
      roas: totalSpend > 0 ? (totalRevenue / totalSpend) : 0,
    },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "connect_facebook") {
    // This would typically redirect to Facebook OAuth
    // For now, we'll simulate a connection
    return json({ 
      success: true, 
      message: "Facebook connection initiated. Please complete OAuth flow." 
    });
  }

  if (action === "sync_campaigns") {
    // Sync campaigns from Facebook
    // This would call Facebook API to get latest campaign data
    return json({ 
      success: true, 
      message: "Campaign sync completed." 
    });
  }

  return json({ success: false, message: "Unknown action" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();
  
  const isLoading = ["loading", "submitting"].includes(fetcher.state);

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show(fetcher.data.message);
    }
  }, [fetcher.data, shopify]);

  const connectFacebook = () => {
    fetcher.submit({ action: "connect_facebook" }, { method: "POST" });
  };

  const syncCampaigns = () => {
    fetcher.submit({ action: "sync_campaigns" }, { method: "POST" });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Page>
      <TitleBar title="AI Facebook Ads Pro">
        <Button variant="primary" icon={PlusIcon} url="/app/campaigns/new">
          Create Campaign
        </Button>
      </TitleBar>
      
      <BlockStack gap="500">
        {/* Connection Status */}
        {!data.facebookAccount.isConnected && (
          <Banner
            title="Connect your Facebook account"
            status="warning"
            action={{
              content: "Connect Facebook",
              onAction: connectFacebook,
              loading: isLoading,
            }}
          >
            <p>Connect your Facebook Business account to start creating and managing ads.</p>
          </Banner>
        )}

        {/* Stats Overview */}
        <Layout>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingMd">Total Campaigns</Text>
                      <Icon source={MegaphoneIcon} />
                    </InlineStack>
                    <Text as="p" variant="headingLg">{data.stats.totalCampaigns}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {data.stats.activeCampaigns} active
                    </Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingMd">Total Spend</Text>
                      <Icon source={ChartVerticalIcon} />
                    </InlineStack>
                    <Text as="p" variant="headingLg">{formatCurrency(data.stats.totalSpend)}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      This month
                    </Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingMd">Revenue</Text>
                      <Icon source={ChartLineIcon} />
                    </InlineStack>
                    <Text as="p" variant="headingLg">{formatCurrency(data.stats.totalRevenue)}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {data.stats.totalConversions} conversions
                    </Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                <Card>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingMd">ROAS</Text>
                      <Icon source={ChartVerticalIcon} />
                    </InlineStack>
                    <Text as="p" variant="headingLg">{data.stats.roas.toFixed(2)}x</Text>
                    <Text as="p" variant="bodySm" tone={data.stats.roas >= 3 ? "success" : "critical"}>
                      {data.stats.roas >= 3 ? "Good performance" : "Needs optimization"}
                    </Text>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Layout.Section>
        </Layout>

        {/* Recent Campaigns */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text as="h2" variant="headingMd">Recent Campaigns</Text>
                  {data.facebookAccount.isConnected && (
                    <Button 
                      variant="plain" 
                      onClick={syncCampaigns}
                      loading={isLoading}
                      icon={ConnectIcon}
                    >
                      Sync from Facebook
                    </Button>
                  )}
                </InlineStack>
                
                {data.campaigns.length === 0 ? (
                  <CalloutCard
                    title="No campaigns yet"
                    illustration="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    primaryAction={{
                      content: "Create your first campaign",
                      url: "/app/campaigns/new",
                    }}
                  >
                    <p>Get started by creating your first AI-powered Facebook ad campaign.</p>
                  </CalloutCard>
                ) : (
                  <BlockStack gap="300">
                    {data.campaigns.map((campaign) => (
                      <Card key={campaign.id} padding="400">
                        <InlineStack align="space-between">
                          <BlockStack gap="200">
                            <InlineStack gap="200" align="start">
                              <Text as="h3" variant="headingMd">{campaign.name}</Text>
                              <Badge 
                                tone={campaign.status === 'ACTIVE' ? 'success' : 'subdued'}
                              >
                                {campaign.status}
                              </Badge>
                            </InlineStack>
                            <Text as="p" variant="bodySm" tone="subdued">
                              {campaign.objective} • {campaign.ads.length} ads • {campaign.adSets.length} ad sets
                            </Text>
                            <InlineStack gap="400">
                              <Text as="span" variant="bodySm">
                                Spend: {formatCurrency(campaign.spend)}
                              </Text>
                              <Text as="span" variant="bodySm">
                                Revenue: {formatCurrency(campaign.revenue)}
                              </Text>
                              <Text as="span" variant="bodySm">
                                Conversions: {campaign.conversions}
                              </Text>
                            </InlineStack>
                          </BlockStack>
                          <Button url={`/app/campaigns/${campaign.id}`}>
                            View Details
                          </Button>
                        </InlineStack>
                      </Card>
                    ))}
                  </BlockStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          
          {/* Quick Actions */}
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">Quick Actions</Text>
                  <BlockStack gap="200">
                    <Button 
                      fullWidth 
                      variant="primary" 
                      url="/app/campaigns/new"
                      icon={PlusIcon}
                    >
                      Create New Campaign
                    </Button>
                    <Button 
                      fullWidth 
                      url="/app/products"
                      disabled={!data.facebookAccount.isConnected}
                    >
                      Browse Products
                    </Button>
                    <Button 
                      fullWidth 
                      url="/app/analytics"
                      disabled={!data.facebookAccount.isConnected}
                    >
                      View Analytics
                    </Button>
                  </BlockStack>
                </BlockStack>
              </Card>
              
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">AI Features</Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodySm">
                      ✨ AI-powered ad copy generation
                    </Text>
                    <Text as="p" variant="bodySm">
                      🎯 Smart audience targeting
                    </Text>
                    <Text as="p" variant="bodySm">
                      📊 Automated bid optimization
                    </Text>
                    <Text as="p" variant="bodySm">
                      🔄 Performance-based recommendations
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
              
              {data.facebookAccount.isConnected && (
                <Card>
                  <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">Facebook Account</Text>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodySm">Status</Text>
                        <Badge tone="success">Connected</Badge>
                      </InlineStack>
                      {data.facebookAccount.businessId && (
                        <InlineStack align="space-between">
                          <Text as="span" variant="bodySm">Business ID</Text>
                          <Text as="span" variant="bodySm" tone="subdued">
                            {data.facebookAccount.businessId}
                          </Text>
                        </InlineStack>
                      )}
                      {data.facebookAccount.adAccountId && (
                        <InlineStack align="space-between">
                          <Text as="span" variant="bodySm">Ad Account</Text>
                          <Text as="span" variant="bodySm" tone="subdued">
                            {data.facebookAccount.adAccountId}
                          </Text>
                        </InlineStack>
                      )}
                    </BlockStack>
                  </BlockStack>
                </Card>
              )}
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}