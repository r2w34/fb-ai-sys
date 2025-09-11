import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Badge,
  BlockStack,
  InlineStack,
  Text,
  EmptyState,
  Filters,
  ChoiceList,
  TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getStore, getCampaigns } from "../lib/db.server";
import { useState, useCallback } from "react";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  const store = await getStore(session.shop);
  let campaigns = [];

  if (store) {
    campaigns = await getCampaigns(store.id);
  }

  return json({
    campaigns,
    store,
  });
};

export default function CampaignsIndex() {
  const { campaigns, store } = useLoaderData();
  const navigate = useNavigate();

  const [queryValue, setQueryValue] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);

  const handleQueryValueChange = useCallback((value) => setQueryValue(value), []);
  const handleStatusFilterChange = useCallback((value) => setStatusFilter(value), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleStatusFilterRemove = useCallback(() => setStatusFilter([]), []);
  const handleFiltersClearAll = useCallback(() => {
    handleQueryValueRemove();
    handleStatusFilterRemove();
  }, [handleQueryValueRemove, handleStatusFilterRemove]);

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Paused', value: 'PAUSED' },
            { label: 'Completed', value: 'COMPLETED' },
          ]}
          selected={statusFilter}
          onChange={handleStatusFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (statusFilter.length > 0) {
    appliedFilters.push({
      key: 'status',
      label: `Status: ${statusFilter.join(', ')}`,
      onRemove: handleStatusFilterRemove,
    });
  }

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesQuery = campaign.name.toLowerCase().includes(queryValue.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(campaign.status);
    return matchesQuery && matchesStatus;
  });

  const rows = filteredCampaigns.map((campaign) => [
    campaign.name,
    <Badge tone={getStatusBadgeStatus(campaign.status)}>{campaign.status}</Badge>,
    campaign.objective || 'CONVERSIONS',
    `$${(campaign.budget || 0).toFixed(2)}`,
    (campaign.impressions || 0).toLocaleString(),
    (campaign.clicks || 0).toLocaleString(),
    `${(campaign.ctr || 0).toFixed(2)}%`,
    `$${(campaign.spend || 0).toFixed(2)}`,
    (campaign.conversions || 0).toLocaleString(),
    <Button
      size="slim"
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
    >
      View
    </Button>,
  ]);

  const headings = [
    'Campaign Name',
    'Status',
    'Objective',
    'Budget',
    'Impressions',
    'Clicks',
    'CTR',
    'Spend',
    'Conversions',
    'Actions',
  ];

  return (
    <Page>
      <TitleBar
        title="Campaigns"
        primaryAction={{
          content: "Create Campaign",
          onAction: () => navigate("/campaigns/new"),
          disabled: !store?.facebookAccessToken,
        }}
      />
      <Layout>
        <Layout.Section>
          <Card>
            {campaigns.length > 0 ? (
              <>
                <Card.Section>
                  <Filters
                    queryValue={queryValue}
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={handleQueryValueChange}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleFiltersClearAll}
                    queryPlaceholder="Search campaigns..."
                  />
                </Card.Section>
                <DataTable
                  columnContentTypes={[
                    'text',
                    'text',
                    'text',
                    'numeric',
                    'numeric',
                    'numeric',
                    'numeric',
                    'numeric',
                    'numeric',
                    'text',
                  ]}
                  headings={headings}
                  rows={rows}
                  pagination={{
                    hasNext: false,
                    hasPrevious: false,
                  }}
                />
              </>
            ) : (
              <EmptyState
                heading="Create your first AI-powered campaign"
                action={{
                  content: "Create Campaign",
                  onAction: () => navigate("/campaigns/new"),
                  disabled: !store?.facebookAccessToken,
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  Use AI to automatically generate high-converting Facebook ad campaigns
                  based on your products and target audience.
                </p>
                {!store?.facebookAccessToken && (
                  <p>
                    <Text tone="critical">
                      Connect your Facebook account first in Settings.
                    </Text>
                  </p>
                )}
              </EmptyState>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function getStatusBadgeStatus(status) {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'PAUSED':
      return 'attention';
    case 'COMPLETED':
      return 'info';
    default:
      return 'new';
  }
}