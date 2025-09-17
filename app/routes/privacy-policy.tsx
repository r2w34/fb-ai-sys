import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Stack, Divider } from "@shopify/polaris";

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
          <Card>
            <Stack vertical spacing="loose">
              <Text variant="bodyMd" color="subdued">
                Last updated: {lastUpdated}
              </Text>
              
              <Divider />
              
              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  1. Information We Collect
                </Text>
                <Text variant="bodyMd">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This includes:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Account information (name, email, company details)</Text>
                  <Text variant="bodyMd">• Shopify store data (products, orders, customer information)</Text>
                  <Text variant="bodyMd">• Facebook advertising account information</Text>
                  <Text variant="bodyMd">• Usage data and analytics</Text>
                  <Text variant="bodyMd">• Communication preferences</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  2. How We Use Your Information
                </Text>
                <Text variant="bodyMd">
                  We use the information we collect to:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Provide and improve our Facebook Ads Pro services</Text>
                  <Text variant="bodyMd">• Create and manage your advertising campaigns</Text>
                  <Text variant="bodyMd">• Generate AI-powered ad copy and creative suggestions</Text>
                  <Text variant="bodyMd">• Provide customer support and technical assistance</Text>
                  <Text variant="bodyMd">• Send important updates about our services</Text>
                  <Text variant="bodyMd">• Analyze usage patterns to improve our platform</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  3. Information Sharing and Disclosure
                </Text>
                <Text variant="bodyMd">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, 
                  except in the following circumstances:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• <strong>Service Providers:</strong> We share data with trusted partners who help us operate our services (Shopify, Facebook, AI providers)</Text>
                  <Text variant="bodyMd">• <strong>Legal Requirements:</strong> When required by law or to protect our rights</Text>
                  <Text variant="bodyMd">• <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</Text>
                  <Text variant="bodyMd">• <strong>Consent:</strong> When you explicitly consent to sharing</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  4. Data Security
                </Text>
                <Text variant="bodyMd">
                  We implement industry-standard security measures to protect your information:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• SSL/TLS encryption for data transmission</Text>
                  <Text variant="bodyMd">• Secure data storage with encryption at rest</Text>
                  <Text variant="bodyMd">• Regular security audits and monitoring</Text>
                  <Text variant="bodyMd">• Access controls and authentication measures</Text>
                  <Text variant="bodyMd">• Compliance with GDPR, CCPA, and other privacy regulations</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  5. Third-Party Services
                </Text>
                <Text variant="bodyMd">
                  Our application integrates with several third-party services:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• <strong>Shopify:</strong> For accessing your store data and products</Text>
                  <Text variant="bodyMd">• <strong>Facebook/Meta:</strong> For creating and managing advertising campaigns</Text>
                  <Text variant="bodyMd">• <strong>Google Gemini AI:</strong> For generating ad copy and creative suggestions</Text>
                  <Text variant="bodyMd">• <strong>Analytics Services:</strong> For usage tracking and performance monitoring</Text>
                </Stack>
                <Text variant="bodyMd">
                  Each service has its own privacy policy, and we encourage you to review them.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  6. Your Rights and Choices
                </Text>
                <Text variant="bodyMd">
                  You have the following rights regarding your personal information:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• <strong>Access:</strong> Request a copy of your personal data</Text>
                  <Text variant="bodyMd">• <strong>Correction:</strong> Update or correct inaccurate information</Text>
                  <Text variant="bodyMd">• <strong>Deletion:</strong> Request deletion of your personal data</Text>
                  <Text variant="bodyMd">• <strong>Portability:</strong> Export your data in a machine-readable format</Text>
                  <Text variant="bodyMd">• <strong>Opt-out:</strong> Unsubscribe from marketing communications</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  7. Data Retention
                </Text>
                <Text variant="bodyMd">
                  We retain your information for as long as necessary to provide our services and comply 
                  with legal obligations. Specifically:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Account data: Until account deletion</Text>
                  <Text variant="bodyMd">• Campaign data: 3 years for performance analysis</Text>
                  <Text variant="bodyMd">• Usage logs: 12 months for security and debugging</Text>
                  <Text variant="bodyMd">• Support communications: 2 years</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  8. International Data Transfers
                </Text>
                <Text variant="bodyMd">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your data in accordance with 
                  applicable privacy laws.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  9. Children's Privacy
                </Text>
                <Text variant="bodyMd">
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  10. Changes to This Privacy Policy
                </Text>
                <Text variant="bodyMd">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  11. Contact Us
                </Text>
                <Text variant="bodyMd">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Email: privacy@fbai-app.com</Text>
                  <Text variant="bodyMd">• Address: Facebook Ads Pro, 123 Business Ave, Suite 100, Tech City, TC 12345</Text>
                  <Text variant="bodyMd">• Phone: +1 (555) 123-4567</Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}