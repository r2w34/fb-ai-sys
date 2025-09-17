import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Divider } from "@shopify/polaris";

export const loader = async () => {
  return json({
    lastUpdated: "December 17, 2024"
  });
};

export default function PrivacyPolicy() {
  const { lastUpdated } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
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
                    Information We Collect
                  </Text>
                </div>
                <Text variant="bodyMd">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This includes your Shopify store data, 
                  Facebook Business Manager information, campaign performance data, and communication preferences.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    How We Use Your Information
                  </Text>
                </div>
                <Text variant="bodyMd">
                  We use the information we collect to provide, maintain, and improve our services, 
                  create and optimize Facebook ad campaigns, generate AI-powered content and recommendations, 
                  provide customer support, send important service updates, and analyze usage patterns 
                  to enhance our platform.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    Information Sharing
                  </Text>
                </div>
                <Text variant="bodyMd">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  Facebook/Meta for advertising purposes, Shopify for store integration, trusted service 
                  providers who assist in our operations, and when required by law or to protect our rights.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    Data Security
                  </Text>
                </div>
                <Text variant="bodyMd">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  This includes encryption of data in transit and at rest, regular security assessments, 
                  access controls and authentication, and secure data storage practices.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    Your Rights
                  </Text>
                </div>
                <Text variant="bodyMd">
                  You have the right to access, update, or delete your personal information, opt-out of 
                  certain communications, request data portability, and withdraw consent where applicable. 
                  For EU residents, you have additional rights under GDPR including the right to rectification, 
                  erasure, and data portability.
                </Text>
              </div>

              <Divider />

              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Text variant="headingLg" as="h2">
                    Contact Us
                  </Text>
                </div>
                <Text variant="bodyMd">
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@fbai-app.com, Facebook Ads Pro, 123 Business Ave, Suite 100, Tech City, TC 12345, 
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