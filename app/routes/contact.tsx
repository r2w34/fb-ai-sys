import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation, Form } from "@remix-run/react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Stack, 
  Divider, 
  FormLayout,
  TextField,
  Select,
  Button,
  Banner,
  Grid
} from "@shopify/polaris";
import { useState } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return json({ 
      success: false, 
      error: "All fields are required" 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ 
      success: false, 
      error: "Please enter a valid email address" 
    });
  }

  // Here you would typically send the email using a service like SendGrid
  // For now, we'll just simulate success
  console.log("Contact form submission:", { name, email, subject, message });

  return json({ 
    success: true, 
    message: "Thank you for your message! We'll get back to you within 24 hours." 
  });
};

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const subjectOptions = [
    { label: "General Inquiry", value: "general" },
    { label: "Technical Support", value: "support" },
    { label: "Billing Question", value: "billing" },
    { label: "Feature Request", value: "feature" },
    { label: "Partnership", value: "partnership" },
    { label: "Bug Report", value: "bug" },
    { label: "Other", value: "other" }
  ];

  return (
    <Page
      title="Contact Us"
      subtitle="Get in touch with our team - we're here to help!"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          {actionData?.success && (
            <Banner status="success" title="Message Sent Successfully">
              <p>{actionData.message}</p>
            </Banner>
          )}
          
          {actionData?.error && (
            <Banner status="critical" title="Error">
              <p>{actionData.error}</p>
            </Banner>
          )}

          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 8, xl: 8 }}>
              <Card>
                <Stack vertical spacing="loose">
                  <Text variant="headingLg" as="h2">
                    Send us a message
                  </Text>
                  
                  <Form method="post">
                    <FormLayout>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={(value) => setFormData({ ...formData, name: value })}
                        placeholder="Enter your full name"
                        requiredIndicator
                        autoComplete="name"
                      />

                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(value) => setFormData({ ...formData, email: value })}
                        placeholder="Enter your email address"
                        requiredIndicator
                        autoComplete="email"
                      />

                      <Select
                        label="Subject"
                        name="subject"
                        options={subjectOptions}
                        value={formData.subject}
                        onChange={(value) => setFormData({ ...formData, subject: value })}
                      />

                      <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={(value) => setFormData({ ...formData, message: value })}
                        placeholder="Tell us how we can help you..."
                        multiline={6}
                        requiredIndicator
                      />

                      <Button
                        submit
                        primary
                        loading={isSubmitting}
                        disabled={!formData.name || !formData.email || !formData.message}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </FormLayout>
                  </Form>
                </Stack>
              </Card>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }}>
              <Stack vertical spacing="loose">
                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      📧 Email Support
                    </Text>
                    <Text variant="bodyMd">
                      For general inquiries and support:
                    </Text>
                    <Text variant="bodyMd" color="subdued">
                      support@fbai-app.com
                    </Text>
                    <Text variant="bodyMd">
                      We typically respond within 24 hours.
                    </Text>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      💬 Live Chat
                    </Text>
                    <Text variant="bodyMd">
                      Available Monday - Friday
                    </Text>
                    <Text variant="bodyMd" color="subdued">
                      9:00 AM - 6:00 PM EST
                    </Text>
                    <Button outline>
                      Start Live Chat
                    </Button>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      📞 Phone Support
                    </Text>
                    <Text variant="bodyMd">
                      For urgent technical issues:
                    </Text>
                    <Text variant="bodyMd" color="subdued">
                      +1 (555) 123-4567
                    </Text>
                    <Text variant="bodyMd">
                      Available during business hours.
                    </Text>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      📍 Office Address
                    </Text>
                    <Text variant="bodyMd">
                      Facebook Ads Pro
                    </Text>
                    <Text variant="bodyMd" color="subdued">
                      123 Business Avenue<br />
                      Suite 100<br />
                      Tech City, TC 12345<br />
                      United States
                    </Text>
                  </Stack>
                </Card>
              </Stack>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Stack vertical spacing="loose">
              <Text variant="headingLg" as="h2">
                Frequently Asked Questions
              </Text>
              
              <Divider />
              
              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3">
                  How quickly can I get started?
                </Text>
                <Text variant="bodyMd">
                  You can start creating Facebook ads within minutes of installing our app. 
                  Simply connect your Facebook Business Manager account, and our AI will 
                  analyze your products to create your first campaign.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3">
                  Do you offer a free trial?
                </Text>
                <Text variant="bodyMd">
                  Yes! We offer a 14-day free trial with full access to all features. 
                  No credit card required to get started.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3">
                  What if I need help setting up my campaigns?
                </Text>
                <Text variant="bodyMd">
                  Our support team provides free onboarding assistance for all new users. 
                  We'll help you connect your accounts, review your first campaigns, and 
                  optimize your settings for best results.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3">
                  Can I cancel my subscription anytime?
                </Text>
                <Text variant="bodyMd">
                  Absolutely! You can cancel your subscription at any time from your account 
                  settings. Your campaigns will continue running until the end of your billing period.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3">
                  Do you integrate with other platforms besides Shopify?
                </Text>
                <Text variant="bodyMd">
                  Currently, we specialize in Shopify integration to provide the best possible 
                  experience. We're working on expanding to other e-commerce platforms - 
                  contact us to be notified when they become available.
                </Text>
              </Stack>
            </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <Stack vertical spacing="tight" alignment="center">
              <Text variant="headingMd" as="h3">
                Need immediate assistance?
              </Text>
              <Text variant="bodyMd" alignment="center">
                Check out our comprehensive help documentation or schedule a demo with our team.
              </Text>
              <Stack distribution="center">
                <Button outline url="/help">
                  View Help Docs
                </Button>
                <Button primary>
                  Schedule Demo
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}