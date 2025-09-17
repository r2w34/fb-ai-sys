import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation, Form } from "@remix-run/react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Divider, 
  FormLayout,
  TextField,
  Button,
  Banner,
  Collapsible
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
      error: "All fields are required",
      success: false 
    }, { status: 400 });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ 
      error: "Please enter a valid email address",
      success: false 
    }, { status: 400 });
  }

  // Here you would typically send the email
  // For now, we'll just return success
  return json({ 
    success: true,
    message: "Thank you for your message! We'll get back to you within 24 hours."
  });
};

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [faqOpen, setFaqOpen] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (key: string) => {
    setFaqOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqs = [
    {
      key: "setup",
      question: "How do I set up Facebook Ads Pro?",
      answer: "Simply install the app from your Shopify admin, connect your Facebook Business Manager account, and follow our guided setup wizard."
    },
    {
      key: "cost",
      question: "How much does Facebook Ads Pro cost?",
      answer: "We offer flexible pricing plans starting at $29/month. Visit our pricing page for detailed information about features included in each plan."
    },
    {
      key: "support",
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 email support, live chat during business hours, comprehensive documentation, and video tutorials to help you succeed."
    }
  ];

  return (
    <Page
      title="Contact Us"
      subtitle="Get in touch with our support team"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Send us a message
            </Text>
            <div style={{ marginTop: "1rem" }}>
              {actionData?.success && (
                <div style={{ marginBottom: "1rem" }}>
                  <Banner status="success">
                    {actionData.message}
                  </Banner>
                </div>
              )}
              
              {actionData?.error && (
                <div style={{ marginBottom: "1rem" }}>
                  <Banner status="critical">
                    {actionData.error}
                  </Banner>
                </div>
              )}

              <Form method="post">
                <FormLayout>
                  <TextField
                    label="Name"
                    name="name"
                    autoComplete="name"
                    required
                  />
                  
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                  
                  <TextField
                    label="Subject"
                    name="subject"
                    required
                  />
                  
                  <TextField
                    label="Message"
                    name="message"
                    multiline={4}
                    required
                  />
                  
                  <Button
                    submit
                    primary
                    loading={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </FormLayout>
              </Form>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Other ways to reach us
            </Text>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <Text variant="headingSm" as="h3">
                  📧 Email Support
                </Text>
                <Text variant="bodyMd">
                  support@fbai-app.com
                </Text>
                <Text variant="bodyMd" color="subdued">
                  We typically respond within 2-4 hours
                </Text>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <Text variant="headingSm" as="h3">
                  💬 Live Chat
                </Text>
                <Text variant="bodyMd">
                  Available Monday-Friday, 9 AM - 6 PM EST
                </Text>
                <Text variant="bodyMd" color="subdued">
                  Click the chat widget in the bottom right
                </Text>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <Text variant="headingSm" as="h3">
                  📞 Phone Support
                </Text>
                <Text variant="bodyMd">
                  +1 (555) 123-4567
                </Text>
                <Text variant="bodyMd" color="subdued">
                  Monday-Friday, 9 AM - 6 PM EST
                </Text>
              </div>
            </div>
          </Card>

          <div style={{ marginTop: "1rem" }}>
            <Card sectioned>
              <Text variant="headingMd" as="h2">
                Frequently Asked Questions
              </Text>
              <div style={{ marginTop: "1rem" }}>
                {faqs.map((faq) => (
                  <div key={faq.key} style={{ marginBottom: "1rem" }}>
                    <Button
                      plain
                      onClick={() => toggleFaq(faq.key)}
                      ariaExpanded={faqOpen[faq.key]}
                    >
                      <Text variant="bodyMd">
                        {faq.question}
                      </Text>
                    </Button>
                    <Collapsible open={faqOpen[faq.key]}>
                      <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
                        <Text variant="bodyMd" color="subdued">
                          {faq.answer}
                        </Text>
                      </div>
                    </Collapsible>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}