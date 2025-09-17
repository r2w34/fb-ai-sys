import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Stack, Divider } from "@shopify/polaris";

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
          <Card>
            <Stack vertical spacing="loose">
              <Text variant="bodyMd" color="subdued">
                Last updated: {lastUpdated}
              </Text>
              
              <Divider />
              
              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  1. Acceptance of Terms
                </Text>
                <Text variant="bodyMd">
                  By accessing and using Facebook Ads Pro ("the Service"), you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  2. Description of Service
                </Text>
                <Text variant="bodyMd">
                  Facebook Ads Pro is a Shopify application that provides AI-powered Facebook advertising 
                  automation and management services. Our service includes:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Automated Facebook ad campaign creation and management</Text>
                  <Text variant="bodyMd">• AI-generated ad copy and creative suggestions</Text>
                  <Text variant="bodyMd">• Performance analytics and optimization</Text>
                  <Text variant="bodyMd">• Integration with Shopify stores and Facebook Business Manager</Text>
                  <Text variant="bodyMd">• Real-time campaign monitoring and alerts</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  3. User Accounts and Registration
                </Text>
                <Text variant="bodyMd">
                  To use our service, you must:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Have a valid Shopify store</Text>
                  <Text variant="bodyMd">• Have a Facebook Business Manager account</Text>
                  <Text variant="bodyMd">• Provide accurate and complete registration information</Text>
                  <Text variant="bodyMd">• Maintain the security of your account credentials</Text>
                  <Text variant="bodyMd">• Be at least 18 years old or the age of majority in your jurisdiction</Text>
                </Stack>
                <Text variant="bodyMd">
                  You are responsible for all activities that occur under your account.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  4. Acceptable Use Policy
                </Text>
                <Text variant="bodyMd">
                  You agree not to use the service to:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Violate any applicable laws or regulations</Text>
                  <Text variant="bodyMd">• Infringe on intellectual property rights</Text>
                  <Text variant="bodyMd">• Create campaigns for prohibited products or services</Text>
                  <Text variant="bodyMd">• Engage in fraudulent or deceptive practices</Text>
                  <Text variant="bodyMd">• Attempt to reverse engineer or hack the service</Text>
                  <Text variant="bodyMd">• Use the service for competitive intelligence against us</Text>
                  <Text variant="bodyMd">• Violate Facebook's advertising policies</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  5. Payment Terms
                </Text>
                <Text variant="bodyMd">
                  Our service operates on a subscription basis with the following terms:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Subscription fees are billed monthly or annually in advance</Text>
                  <Text variant="bodyMd">• All fees are non-refundable except as required by law</Text>
                  <Text variant="bodyMd">• You are responsible for all Facebook advertising costs</Text>
                  <Text variant="bodyMd">• Price changes will be communicated 30 days in advance</Text>
                  <Text variant="bodyMd">• Failure to pay may result in service suspension</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  6. Intellectual Property Rights
                </Text>
                <Text variant="bodyMd">
                  The service and its original content, features, and functionality are and will remain 
                  the exclusive property of Facebook Ads Pro and its licensors. The service is protected 
                  by copyright, trademark, and other laws.
                </Text>
                <Text variant="bodyMd">
                  You retain ownership of your store data and advertising content. By using our service, 
                  you grant us a limited license to use your data solely for providing the service.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  7. Data and Privacy
                </Text>
                <Text variant="bodyMd">
                  Your privacy is important to us. Our collection and use of personal information is 
                  governed by our Privacy Policy. By using the service, you consent to the collection 
                  and use of information in accordance with our Privacy Policy.
                </Text>
                <Text variant="bodyMd">
                  We implement appropriate security measures to protect your data, but cannot guarantee 
                  absolute security of information transmitted over the internet.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  8. Third-Party Services
                </Text>
                <Text variant="bodyMd">
                  Our service integrates with third-party platforms including Shopify, Facebook, and 
                  various AI services. Your use of these integrations is subject to their respective 
                  terms of service and privacy policies.
                </Text>
                <Text variant="bodyMd">
                  We are not responsible for the availability, content, or practices of third-party services.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  9. Service Availability and Modifications
                </Text>
                <Text variant="bodyMd">
                  We strive to maintain high service availability but do not guarantee uninterrupted access. 
                  We may:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Perform scheduled maintenance with advance notice</Text>
                  <Text variant="bodyMd">• Modify or discontinue features with reasonable notice</Text>
                  <Text variant="bodyMd">• Suspend service for technical or security reasons</Text>
                  <Text variant="bodyMd">• Update these terms with 30 days notice</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  10. Limitation of Liability
                </Text>
                <Text variant="bodyMd">
                  To the maximum extent permitted by law, Facebook Ads Pro shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including but not 
                  limited to:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Loss of profits or revenue</Text>
                  <Text variant="bodyMd">• Loss of data or business interruption</Text>
                  <Text variant="bodyMd">• Cost of substitute services</Text>
                  <Text variant="bodyMd">• Facebook advertising costs or performance</Text>
                </Stack>
                <Text variant="bodyMd">
                  Our total liability shall not exceed the amount paid by you for the service in the 
                  12 months preceding the claim.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  11. Indemnification
                </Text>
                <Text variant="bodyMd">
                  You agree to indemnify and hold harmless Facebook Ads Pro from any claims, damages, 
                  losses, or expenses arising from:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Your use of the service</Text>
                  <Text variant="bodyMd">• Your violation of these terms</Text>
                  <Text variant="bodyMd">• Your advertising content or campaigns</Text>
                  <Text variant="bodyMd">• Your violation of third-party rights</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  12. Termination
                </Text>
                <Text variant="bodyMd">
                  Either party may terminate this agreement at any time:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• You may cancel your subscription at any time</Text>
                  <Text variant="bodyMd">• We may terminate for breach of these terms</Text>
                  <Text variant="bodyMd">• We may terminate with 30 days notice for any reason</Text>
                  <Text variant="bodyMd">• Upon termination, your access will be suspended</Text>
                  <Text variant="bodyMd">• Data export may be available for a limited time</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  13. Dispute Resolution
                </Text>
                <Text variant="bodyMd">
                  Any disputes arising from these terms shall be resolved through:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Good faith negotiation between the parties</Text>
                  <Text variant="bodyMd">• Binding arbitration if negotiation fails</Text>
                  <Text variant="bodyMd">• Arbitration conducted under applicable arbitration rules</Text>
                  <Text variant="bodyMd">• Jurisdiction in the courts of [Your Jurisdiction]</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  14. Governing Law
                </Text>
                <Text variant="bodyMd">
                  These terms shall be governed by and construed in accordance with the laws of 
                  [Your Jurisdiction], without regard to its conflict of law provisions.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  15. Changes to Terms
                </Text>
                <Text variant="bodyMd">
                  We reserve the right to modify these terms at any time. We will provide notice of 
                  material changes by:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Posting updated terms on this page</Text>
                  <Text variant="bodyMd">• Sending email notification to registered users</Text>
                  <Text variant="bodyMd">• Providing 30 days notice before changes take effect</Text>
                </Stack>
                <Text variant="bodyMd">
                  Continued use of the service after changes constitutes acceptance of new terms.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  16. Contact Information
                </Text>
                <Text variant="bodyMd">
                  If you have any questions about these Terms of Service, please contact us:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• Email: legal@fbai-app.com</Text>
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