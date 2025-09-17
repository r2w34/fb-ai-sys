import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Divider } from "@shopify/polaris";

export const loader = async () => {
  return json({
    lastUpdated: "December 17, 2024"
  });
};

export default function TermsOfService() {
  const { lastUpdated } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Terms of Service"
      subtitle="Terms and conditions for using Facebook Ads Pro"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ marginBottom: "1rem" }}>
              <Text variant="bodyMd" color="subdued">
                Last updated: {lastUpdated}
              </Text>
            </div>
            
            <Divider />
            
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    1. Acceptance of Terms
                  </Text>
                </div>
                <Text variant="bodyMd">
                  By accessing and using Facebook Ads Pro ("the Service"), you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    2. Description of Service
                  </Text>
                </div>
                <Text variant="bodyMd">
                  Facebook Ads Pro is a Shopify application that provides AI-powered Facebook advertising 
                  automation and management services. Our service includes automated Facebook ad campaign 
                  creation and management, AI-generated ad copy and creative suggestions, performance 
                  analytics and optimization, integration with Shopify stores and Facebook Business Manager, 
                  and real-time campaign monitoring and alerts.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    3. User Accounts and Registration
                  </Text>
                </div>
                <Text variant="bodyMd">
                  To use our service, you must have a valid Shopify store, have a Facebook Business Manager 
                  account, provide accurate and complete registration information, maintain the security of 
                  your account credentials, and be at least 18 years old or the age of majority in your 
                  jurisdiction. You are responsible for all activities that occur under your account.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    4. Payment Terms
                  </Text>
                </div>
                <Text variant="bodyMd">
                  Our service operates on a subscription basis. Subscription fees are billed monthly or 
                  annually in advance. All fees are non-refundable except as required by law. You are 
                  responsible for all Facebook advertising costs. Price changes will be communicated 30 
                  days in advance. Failure to pay may result in service suspension.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    5. Limitation of Liability
                  </Text>
                </div>
                <Text variant="bodyMd">
                  To the maximum extent permitted by law, Facebook Ads Pro shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including but not 
                  limited to loss of profits or revenue, loss of data or business interruption, cost of 
                  substitute services, or Facebook advertising costs or performance. Our total liability 
                  shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    6. Contact Information
                  </Text>
                </div>
                <Text variant="bodyMd">
                  If you have any questions about these Terms of Service, please contact us at 
                  legal@fbai-app.com, Facebook Ads Pro, 123 Business Ave, Suite 100, Tech City, TC 12345, 
                  or call +1 (555) 123-4567.
                </Text>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}