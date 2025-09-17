import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Stack, Divider, Badge, Grid } from "@shopify/polaris";

export const loader = async () => {
  return json({
    stats: {
      campaigns: "10,000+",
      revenue: "$50M+",
      merchants: "2,500+",
      countries: "45+"
    }
  });
};

export default function About() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <Page
      title="About Facebook Ads Pro"
      subtitle="Revolutionizing e-commerce advertising with AI-powered automation"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Stack vertical spacing="loose">
              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Mission
                </Text>
                <Text variant="bodyMd">
                  We're on a mission to democratize high-performance Facebook advertising for Shopify merchants. 
                  Our AI-powered platform eliminates the complexity of Facebook Ads, enabling businesses of all 
                  sizes to create, optimize, and scale profitable advertising campaigns with unprecedented ease.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Story
                </Text>
                <Text variant="bodyMd">
                  Founded in 2023 by a team of e-commerce veterans and AI specialists, Facebook Ads Pro was born 
                  from a simple observation: most Shopify merchants struggle with Facebook advertising complexity, 
                  leading to wasted budgets and missed opportunities.
                </Text>
                <Text variant="bodyMd">
                  After years of managing millions in ad spend and helping hundreds of brands scale, we realized 
                  that the future of advertising lies in intelligent automation. We combined cutting-edge AI 
                  technology with deep e-commerce expertise to create the most advanced Facebook Ads management 
                  platform for Shopify merchants.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  What Makes Us Different
                </Text>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight">
                        <Badge status="success">AI-Powered</Badge>
                        <Text variant="headingMd" as="h3">
                          Advanced AI Technology
                        </Text>
                        <Text variant="bodyMd">
                          Our platform leverages multiple AI models including Google Gemini, Anthropic Claude, 
                          and custom machine learning algorithms to generate high-converting ad copy, optimize 
                          targeting, and predict campaign performance.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight">
                        <Badge status="info">Automated</Badge>
                        <Text variant="headingMd" as="h3">
                          Complete Automation
                        </Text>
                        <Text variant="bodyMd">
                          From campaign creation to optimization, our platform handles everything automatically. 
                          Set your goals, and watch as our AI creates, tests, and scales your campaigns for 
                          maximum profitability.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight">
                        <Badge status="warning">Real-time</Badge>
                        <Text variant="headingMd" as="h3">
                          Real-time Intelligence
                        </Text>
                        <Text variant="bodyMd">
                          Monitor your campaigns with live dashboards, receive instant alerts for performance 
                          changes, and get competitive intelligence to stay ahead of the market.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight">
                        <Badge status="critical">Enterprise</Badge>
                        <Text variant="headingMd" as="h3">
                          Enterprise-Grade Security
                        </Text>
                        <Text variant="bodyMd">
                          Built with enterprise-level security, compliance, and scalability. Your data is 
                          protected with bank-level encryption and we're compliant with GDPR, CCPA, and SOC 2.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                </Grid>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Impact
                </Text>
                <Text variant="bodyMd">
                  Since launch, we've helped thousands of Shopify merchants transform their advertising results:
                </Text>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight" alignment="center">
                        <Text variant="heading2xl" as="h3" color="success">
                          {stats.campaigns}
                        </Text>
                        <Text variant="bodyMd" alignment="center">
                          Campaigns Created
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight" alignment="center">
                        <Text variant="heading2xl" as="h3" color="success">
                          {stats.revenue}
                        </Text>
                        <Text variant="bodyMd" alignment="center">
                          Revenue Generated
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight" alignment="center">
                        <Text variant="heading2xl" as="h3" color="success">
                          {stats.merchants}
                        </Text>
                        <Text variant="bodyMd" alignment="center">
                          Happy Merchants
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <Card sectioned>
                      <Stack vertical spacing="tight" alignment="center">
                        <Text variant="heading2xl" as="h3" color="success">
                          {stats.countries}
                        </Text>
                        <Text variant="bodyMd" alignment="center">
                          Countries Served
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Cell>
                </Grid>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Technology Stack
                </Text>
                <Text variant="bodyMd">
                  We've built our platform using the most advanced technologies available:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• <strong>AI & Machine Learning:</strong> Google Gemini, Anthropic Claude, Hugging Face, TensorFlow</Text>
                  <Text variant="bodyMd">• <strong>Real-time Processing:</strong> Socket.io, Redis, advanced caching systems</Text>
                  <Text variant="bodyMd">• <strong>Creative Generation:</strong> Cloudinary, Canvas, Fabric.js, FFmpeg</Text>
                  <Text variant="bodyMd">• <strong>Analytics & Intelligence:</strong> Mixpanel, custom analytics, competitive monitoring</Text>
                  <Text variant="bodyMd">• <strong>Security & Performance:</strong> Enterprise-grade encryption, rate limiting, compression</Text>
                  <Text variant="bodyMd">• <strong>Integrations:</strong> Shopify, Facebook Marketing API, SendGrid, Twilio, Stripe</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Team
                </Text>
                <Text variant="bodyMd">
                  Our team combines decades of experience in e-commerce, digital marketing, and artificial 
                  intelligence. We're passionate about helping businesses grow and believe that great technology 
                  should be accessible to everyone.
                </Text>
                <Text variant="bodyMd">
                  We're backed by leading investors and advisors who share our vision of transforming 
                  e-commerce advertising through intelligent automation.
                </Text>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Our Commitment
                </Text>
                <Text variant="bodyMd">
                  We're committed to:
                </Text>
                <Stack vertical spacing="extraTight">
                  <Text variant="bodyMd">• <strong>Innovation:</strong> Continuously improving our AI and automation capabilities</Text>
                  <Text variant="bodyMd">• <strong>Transparency:</strong> Providing clear insights into campaign performance and costs</Text>
                  <Text variant="bodyMd">• <strong>Support:</strong> Offering world-class customer support and education</Text>
                  <Text variant="bodyMd">• <strong>Privacy:</strong> Protecting your data with the highest security standards</Text>
                  <Text variant="bodyMd">• <strong>Results:</strong> Delivering measurable ROI and business growth</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack vertical spacing="tight">
                <Text variant="headingLg" as="h2">
                  Join Our Journey
                </Text>
                <Text variant="bodyMd">
                  We're just getting started. As we continue to innovate and expand our platform, we invite 
                  you to join thousands of successful merchants who have transformed their advertising with 
                  Facebook Ads Pro.
                </Text>
                <Text variant="bodyMd">
                  Ready to revolutionize your Facebook advertising? 
                  <a href="/app" style={{ color: "#2c6ecb", textDecoration: "none" }}> Get started today</a> 
                  and experience the future of e-commerce advertising.
                </Text>
              </Stack>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

