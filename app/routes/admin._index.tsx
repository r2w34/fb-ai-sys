import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  DataTable,
  TextField,
  Select,
  Modal,
  Banner,
  Grid,
  ProgressBar,
  Divider,
  ButtonGroup,
  Tabs,
  ResourceList,
  ResourceItem,
  Avatar,
  Thumbnail,
} from "@shopify/polaris";
import { AdminService } from "../services/admin.server";
import { SubscriptionService } from "../services/subscription.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // In a real app, you'd check admin authentication here
  // For demo purposes, we'll skip auth
  
  try {
    const [dashboardStats, recentCustomers, recentSubscriptions, settings] = await Promise.all([
      AdminService.getDashboardStats(),
      AdminService.getAllCustomers(1, 10),
      AdminService.getAllSubscriptions(1, 10),
      AdminService.getSettings()
    ]);

    return json({
      dashboardStats,
      recentCustomers: recentCustomers.customers,
      recentSubscriptions: recentSubscriptions.subscriptions,
      settings: settings.filter(s => !s.isEncrypted) // Don't send encrypted settings to frontend
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return json({
      dashboardStats: {
        customers: { total: 0, active: 0, inactive: 0 },
        subscriptions: { total: 0, active: 0, inactive: 0 },
        campaigns: { total: 0, totalSpend: 0, totalRevenue: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0 },
        recentCustomers: []
      },
      recentCustomers: [],
      recentSubscriptions: [],
      settings: []
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "update_setting") {
    const key = formData.get("key") as string;
    const value = formData.get("value") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    try {
      await AdminService.updateSetting({
        key,
        value,
        description,
        category
      }, "admin-demo"); // In real app, get from session

      return json({ success: true, message: "Setting updated successfully" });
    } catch (error: any) {
      return json({ success: false, message: error.message });
    }
  }

  if (action === "initialize_defaults") {
    try {
      await AdminService.initializeDefaultSettings();
      await AdminService.createDefaultAdmin();
      await SubscriptionService.createDefaultPlans();

      return json({ success: true, message: "Default data initialized successfully" });
    } catch (error: any) {
      return json({ success: false, message: error.message });
    }
  }

  return json({ success: false, message: "Unknown action" });
};

export default function AdminDashboard() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingSetting, setEditingSetting] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge tone="success">Active</Badge>;
      case 'trial':
        return <Badge tone="info">Trial</Badge>;
      case 'cancelled':
        return <Badge tone="warning">Cancelled</Badge>;
      case 'expired':
        return <Badge tone="critical">Expired</Badge>;
      default:
        return <Badge tone="subdued">{status}</Badge>;
    }
  };

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'customers', content: 'Customers' },
    { id: 'subscriptions', content: 'Subscriptions' },
    { id: 'settings', content: 'Settings' },
  ];

  const handleTabChange = (selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
  };

  const openSettingsModal = (setting?: any) => {
    setEditingSetting(setting || { key: '', value: '', description: '', category: 'general' });
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
    setEditingSetting(null);
  };

  const initializeDefaults = () => {
    fetcher.submit({ action: "initialize_defaults" }, { method: "POST" });
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      if (showSettingsModal) {
        closeSettingsModal();
      }
    }
  }, [fetcher.data]);

  return (
    <Page
      title="Admin Dashboard"
      subtitle="Manage customers, subscriptions, and application settings"
      primaryAction={{
        content: "Initialize Defaults",
        onAction: initializeDefaults,
        loading: fetcher.state === "submitting"
      }}
    >
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            <div style={{ marginTop: '20px' }}>
              {/* Overview Tab */}
              {selectedTab === 0 && (
                <BlockStack gap="500">
                  {/* Stats Overview */}
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <Card>
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingSm">Total Customers</Text>
                          <Text as="p" variant="headingLg">
                            {formatNumber(data.dashboardStats.customers.total)}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {data.dashboardStats.customers.active} active
                          </Text>
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                    
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <Card>
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingSm">Active Subscriptions</Text>
                          <Text as="p" variant="headingLg">
                            {formatNumber(data.dashboardStats.subscriptions.active)}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            of {data.dashboardStats.subscriptions.total} total
                          </Text>
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                    
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <Card>
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingSm">Total Ad Spend</Text>
                          <Text as="p" variant="headingLg">
                            {formatCurrency(data.dashboardStats.campaigns.totalSpend)}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {formatNumber(data.dashboardStats.campaigns.total)} campaigns
                          </Text>
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                    
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <Card>
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingSm">Total Revenue</Text>
                          <Text as="p" variant="headingLg">
                            {formatCurrency(data.dashboardStats.campaigns.totalRevenue)}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {formatNumber(data.dashboardStats.campaigns.totalConversions)} conversions
                          </Text>
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                  </Grid>

                  {/* Recent Activity */}
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <Card>
                        <BlockStack gap="400">
                          <Text as="h2" variant="headingMd">Recent Customers</Text>
                          
                          {data.recentCustomers.length === 0 ? (
                            <Text as="p" variant="bodySm" tone="subdued">
                              No customers yet
                            </Text>
                          ) : (
                            <ResourceList
                              resourceName={{ singular: 'customer', plural: 'customers' }}
                              items={data.recentCustomers}
                              renderItem={(customer) => (
                                <ResourceItem
                                  id={customer.id}
                                  media={<Avatar customer size="small" />}
                                  accessibilityLabel={`Customer ${customer.shopName || customer.shop}`}
                                >
                                  <InlineStack align="space-between">
                                    <BlockStack gap="100">
                                      <Text as="h3" variant="bodyMd" fontWeight="bold">
                                        {customer.shopName || customer.shop}
                                      </Text>
                                      <Text as="p" variant="bodySm" tone="subdued">
                                        Joined {formatDate(customer.createdAt)}
                                      </Text>
                                    </BlockStack>
                                    {customer.isActive ? (
                                      <Badge tone="success">Active</Badge>
                                    ) : (
                                      <Badge tone="subdued">Inactive</Badge>
                                    )}
                                  </InlineStack>
                                </ResourceItem>
                              )}
                            />
                          )}
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                    
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <Card>
                        <BlockStack gap="400">
                          <Text as="h2" variant="headingMd">Recent Subscriptions</Text>
                          
                          {data.recentSubscriptions.length === 0 ? (
                            <Text as="p" variant="bodySm" tone="subdued">
                              No subscriptions yet
                            </Text>
                          ) : (
                            <ResourceList
                              resourceName={{ singular: 'subscription', plural: 'subscriptions' }}
                              items={data.recentSubscriptions}
                              renderItem={(subscription) => (
                                <ResourceItem
                                  id={subscription.id}
                                  accessibilityLabel={`Subscription for ${subscription.shop}`}
                                >
                                  <InlineStack align="space-between">
                                    <BlockStack gap="100">
                                      <Text as="h3" variant="bodyMd" fontWeight="bold">
                                        {subscription.shop}
                                      </Text>
                                      <Text as="p" variant="bodySm" tone="subdued">
                                        {subscription.plan.name} - {formatCurrency(subscription.plan.price)}/{subscription.plan.interval}
                                      </Text>
                                    </BlockStack>
                                    {getStatusBadge(subscription.status)}
                                  </InlineStack>
                                </ResourceItem>
                              )}
                            />
                          )}
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                  </Grid>
                </BlockStack>
              )}

              {/* Customers Tab */}
              {selectedTab === 1 && (
                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text as="h2" variant="headingMd">Customer Management</Text>
                      <Button url="/admin/customers">View All Customers</Button>
                    </InlineStack>
                    
                    <Text as="p" variant="bodySm" tone="subdued">
                      Manage customer accounts, subscriptions, and support tickets.
                    </Text>
                    
                    <ButtonGroup>
                      <Button url="/admin/customers">All Customers</Button>
                      <Button url="/admin/customers?filter=active">Active Customers</Button>
                      <Button url="/admin/customers?filter=trial">Trial Customers</Button>
                      <Button url="/admin/customers?filter=support">Support Tickets</Button>
                    </ButtonGroup>
                  </BlockStack>
                </Card>
              )}

              {/* Subscriptions Tab */}
              {selectedTab === 2 && (
                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text as="h2" variant="headingMd">Subscription Management</Text>
                      <Button url="/admin/subscriptions">View All Subscriptions</Button>
                    </InlineStack>
                    
                    <Text as="p" variant="bodySm" tone="subdued">
                      Manage subscription plans, billing, and customer upgrades/downgrades.
                    </Text>
                    
                    <ButtonGroup>
                      <Button url="/admin/subscriptions">All Subscriptions</Button>
                      <Button url="/admin/plans">Manage Plans</Button>
                      <Button url="/admin/billing">Billing Reports</Button>
                    </ButtonGroup>
                  </BlockStack>
                </Card>
              )}

              {/* Settings Tab */}
              {selectedTab === 3 && (
                <BlockStack gap="500">
                  <Card>
                    <BlockStack gap="400">
                      <InlineStack align="space-between">
                        <Text as="h2" variant="headingMd">Application Settings</Text>
                        <Button onClick={() => openSettingsModal()}>Add Setting</Button>
                      </InlineStack>
                      
                      <DataTable
                        columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                        headings={['Key', 'Value', 'Category', 'Description', 'Actions']}
                        rows={data.settings.map(setting => [
                          setting.key,
                          setting.value.length > 50 ? setting.value.substring(0, 50) + '...' : setting.value,
                          setting.category,
                          setting.description || '-',
                          <Button key={setting.id} size="slim" onClick={() => openSettingsModal(setting)}>
                            Edit
                          </Button>
                        ])}
                      />
                    </BlockStack>
                  </Card>
                </BlockStack>
              )}
            </div>
          </Tabs>
        </Layout.Section>
      </Layout>

      {/* Settings Modal */}
      <Modal
        open={showSettingsModal}
        onClose={closeSettingsModal}
        title={editingSetting?.key ? "Edit Setting" : "Add Setting"}
        primaryAction={{
          content: "Save",
          onAction: () => {
            const form = document.getElementById('settings-form') as HTMLFormElement;
            if (form) {
              fetcher.submit(form);
            }
          },
          loading: fetcher.state === "submitting"
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: closeSettingsModal
          }
        ]}
      >
        <Modal.Section>
          {editingSetting && (
            <Form id="settings-form" method="post">
              <input type="hidden" name="action" value="update_setting" />
              <BlockStack gap="400">
                <TextField
                  label="Key"
                  name="key"
                  value={editingSetting.key}
                  onChange={(value) => setEditingSetting({...editingSetting, key: value})}
                  disabled={!!editingSetting.id}
                  autoComplete="off"
                />
                
                <TextField
                  label="Value"
                  name="value"
                  value={editingSetting.value}
                  onChange={(value) => setEditingSetting({...editingSetting, value: value})}
                  multiline={4}
                  autoComplete="off"
                />
                
                <Select
                  label="Category"
                  name="category"
                  options={[
                    { label: 'General', value: 'general' },
                    { label: 'API', value: 'api' },
                    { label: 'Billing', value: 'billing' },
                    { label: 'Features', value: 'features' },
                    { label: 'Limits', value: 'limits' }
                  ]}
                  value={editingSetting.category}
                  onChange={(value) => setEditingSetting({...editingSetting, category: value})}
                />
                
                <TextField
                  label="Description"
                  name="description"
                  value={editingSetting.description || ''}
                  onChange={(value) => setEditingSetting({...editingSetting, description: value})}
                  autoComplete="off"
                />
              </BlockStack>
            </Form>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
}