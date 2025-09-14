import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { db } from "../db.server";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Badge,
  Select,
  Banner,
  Divider,
  Box
} from "@shopify/polaris";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const facebookAccount = await db.facebookAccount.findFirst({
    where: { shop, isActive: true },
    include: {
      adAccounts: {
        orderBy: { isDefault: 'desc' }
      },
      pages: {
        include: {
          instagramAccounts: true
        }
      }
    }
  });

  return json({
    facebookAccount,
    isConnected: !!facebookAccount,
    shop
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "disconnect") {
    await db.facebookAccount.updateMany({
      where: { shop },
      data: { isActive: false }
    });
    return json({ success: true, message: "Facebook account disconnected" });
  }

  if (action === "select_ad_account") {
    const adAccountId = formData.get("adAccountId") as string;
    const facebookAccountId = formData.get("facebookAccountId") as string;

    // Update all ad accounts to not be default
    await db.adAccount.updateMany({
      where: { facebookAccountId },
      data: { isDefault: false }
    });

    // Set the selected one as default
    await db.adAccount.updateMany({
      where: { 
        facebookAccountId,
        adAccountId 
      },
      data: { isDefault: true }
    });

    // Update the Facebook account's default ad account
    await db.facebookAccount.update({
      where: { id: facebookAccountId },
      data: { adAccountId }
    });

    return json({ success: true, message: "Default ad account updated" });
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

export default function FacebookSettings() {
  const { facebookAccount, isConnected, shop } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [selectedAdAccount, setSelectedAdAccount] = useState(
    facebookAccount?.adAccountId || ""
  );

  const connectFacebook = () => {
    const state = btoa(JSON.stringify({ shop, timestamp: Date.now() }));
    const authUrl = 'https://www.facebook.com/v18.0/dialog/oauth?' +
      'client_id=342313695281811&' +
      'redirect_uri=' + encodeURIComponent('https://ainet.sellerai.in/auth/facebook/callback') + '&' +
      'scope=ads_management,ads_read,business_management,pages_read_engagement,instagram_basic,instagram_manage_insights&' +
      'response_type=code&' +
      'state=' + state;

    const popup = window.open(
      authUrl,
      'facebook_auth',
      'width=600,height=700,scrollbars=yes,resizable=yes'
    );

    const messageHandler = (event: MessageEvent) => {
      if (event.data.type === 'FACEBOOK_AUTH_SUCCESS') {
        popup?.close();
        window.removeEventListener('message', messageHandler);
        window.location.reload();
      } else if (event.data.type === 'FACEBOOK_AUTH_ERROR') {
        popup?.close();
        window.removeEventListener('message', messageHandler);
        alert('Facebook authentication failed. Please try again.');
      }
    };

    window.addEventListener('message', messageHandler);

    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
      }
    }, 1000);
  };

  const handleAdAccountChange = (value: string) => {
    setSelectedAdAccount(value);
    
    const formData = new FormData();
    formData.append("action", "select_ad_account");
    formData.append("adAccountId", value);
    formData.append("facebookAccountId", facebookAccount?.id || "");
    
    fetcher.submit(formData, { method: "post" });
  };

  const disconnectFacebook = () => {
    if (confirm("Are you sure you want to disconnect your Facebook account?")) {
      const formData = new FormData();
      formData.append("action", "disconnect");
      fetcher.submit(formData, { method: "post" });
    }
  };

  const getAdAccountOptions = () => {
    if (!facebookAccount?.adAccounts) return [];
    
    return facebookAccount.adAccounts.map(account => ({
      label: `${account.name} (${account.currency}) - ${account.adAccountId}`,
      value: account.adAccountId
    }));
  };

  const getCurrentAdAccount = () => {
    if (!facebookAccount?.adAccounts) return null;
    return facebookAccount.adAccounts.find(acc => acc.adAccountId === selectedAdAccount);
  };

  const currentAdAccount = getCurrentAdAccount();

  return (
    <Page title="Facebook Integration Settings">
      <Layout>
        <Layout.Section>
          {fetcher.data?.success && (
            <Banner status="success">
              {fetcher.data.message}
            </Banner>
          )}
          
          {fetcher.data?.error && (
            <Banner status="critical">
              {fetcher.data.error}
            </Banner>
          )}
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <BlockStack gap="200">
                  <Text variant="headingLg">Facebook Account Connection</Text>
                  <Text variant="bodyMd" tone="subdued">
                    Connect your Facebook account to manage ads and access business data
                  </Text>
                </BlockStack>
                
                <Badge status={isConnected ? "success" : "attention"}>
                  {isConnected ? "Connected" : "Not Connected"}
                </Badge>
              </InlineStack>

              <Divider />

              {!isConnected ? (
                <BlockStack gap="300">
                  <Text variant="bodyMd">
                    Connect your Facebook account to start creating and managing ad campaigns.
                  </Text>
                  
                  <Box>
                    <Button
                      variant="primary"
                      onClick={connectFacebook}
                      loading={fetcher.state === "submitting"}
                    >
                      Connect Facebook Account
                    </Button>
                  </Box>
                </BlockStack>
              ) : (
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <BlockStack gap="200">
                      <Text variant="headingMd">✅ Facebook Account Connected</Text>
                      <Text variant="bodyMd" tone="subdued">
                        Your Facebook account is successfully connected and ready to use.
                      </Text>
                    </BlockStack>
                    
                    <Button
                      variant="plain"
                      onClick={disconnectFacebook}
                      loading={fetcher.state === "submitting"}
                    >
                      Disconnect
                    </Button>
                  </InlineStack>

                  {facebookAccount?.adAccounts && facebookAccount.adAccounts.length > 0 && (
                    <>
                      <Divider />
                      
                      <BlockStack gap="300">
                        <Text variant="headingMd">Ad Account Selection</Text>
                        <Text variant="bodyMd" tone="subdued">
                          Choose which Facebook Ads account to use for your campaigns
                        </Text>
                        
                        <Select
                          label="Default Ad Account"
                          options={getAdAccountOptions()}
                          value={selectedAdAccount}
                          onChange={handleAdAccountChange}
                          disabled={fetcher.state === "submitting"}
                        />

                        {currentAdAccount && (
                          <Card background="bg-surface-secondary">
                            <BlockStack gap="200">
                              <Text variant="headingSm">Selected Ad Account Details</Text>
                              <InlineStack gap="400">
                                <Text variant="bodyMd">
                                  <strong>Name:</strong> {currentAdAccount.name}
                                </Text>
                                <Text variant="bodyMd">
                                  <strong>Currency:</strong> {currentAdAccount.currency}
                                </Text>
                                <Text variant="bodyMd">
                                  <strong>Status:</strong> {currentAdAccount.accountStatus === 1 ? 'Active' : 'Inactive'}
                                </Text>
                              </InlineStack>
                              {currentAdAccount.timezone && (
                                <Text variant="bodyMd">
                                  <strong>Timezone:</strong> {currentAdAccount.timezone}
                                </Text>
                              )}
                            </BlockStack>
                          </Card>
                        )}
                      </BlockStack>
                    </>
                  )}

                  {facebookAccount?.pages && facebookAccount.pages.length > 0 && (
                    <>
                      <Divider />
                      
                      <BlockStack gap="300">
                        <Text variant="headingMd">Connected Pages & Instagram</Text>
                        <Text variant="bodyMd" tone="subdued">
                          Facebook Pages and Instagram accounts available for marketing
                        </Text>
                        
                        <BlockStack gap="200">
                          {facebookAccount.pages.map((page) => (
                            <Card key={page.id} background="bg-surface-secondary">
                              <InlineStack align="space-between">
                                <BlockStack gap="100">
                                  <Text variant="bodyMd" fontWeight="semibold">
                                    📄 {page.name}
                                  </Text>
                                  {page.category && (
                                    <Text variant="bodySm" tone="subdued">
                                      {page.category}
                                    </Text>
                                  )}
                                  {page.instagramAccounts.map((ig) => (
                                    <Text key={ig.id} variant="bodySm">
                                      📷 Instagram: @{ig.username}
                                    </Text>
                                  ))}
                                </BlockStack>
                                
                                <Badge>Connected</Badge>
                              </InlineStack>
                            </Card>
                          ))}
                        </BlockStack>
                      </BlockStack>
                    </>
                  )}
                </BlockStack>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}