import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Divider, Badge } from "@shopify/polaris";

export const loader = async () => {
  return json({
    stats: {
      campaigns: "10,000+",
      revenue: "$50M+",
      merchants: "2,500+",
      roas: "300%"
    }
  });
};

export default function About() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <Page
      title="About Facebook Ads Pro"
      subtitle="Revolutionizing Facebook advertising with AI-powered automation"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ marginBottom: "2rem" }}>
              <Text variant="headingLg" as="h2">
                Our Mission
              </Text>
              <div style={{ marginTop: "1rem" }}>
                <Text variant="bodyMd">
                  At Facebook Ads Pro, we're on a mission to democratize high-performance Facebook advertising 
                  for Shopify merchants of all sizes. Our AI-powered platform eliminates the complexity and 
                  guesswork from Facebook advertising, enabling businesses to achieve professional-grade results 
                  without requiring extensive marketing expertise.
                </Text>
              </div>
            </div>

            <Divider />

            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <Text variant="headingLg" as="h2">
                Our Story
              </Text>
              <div style={{ marginTop: "1rem" }}>
                <Text variant="bodyMd">
                  Founded in 2023 by a team of e-commerce veterans and AI specialists, Facebook Ads Pro was 
                  born from the frustration of watching talented entrepreneurs struggle with Facebook advertising. 
                  We witnessed countless businesses with amazing products fail to reach their potential customers 
                  due to the complexity of modern digital advertising.
                </Text>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Text variant="bodyMd">
                  Our founders, having managed over $100M in Facebook ad spend across thousands of campaigns, 
                  recognized that the key to success wasn't just having the right tools—it was having intelligent 
                  automation that could make split-second optimization decisions at scale.
                </Text>
              </div>
            </div>

            <Divider />

            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <Text variant="headingLg" as="h2">
                Our Technology
              </Text>
              <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <Text variant="bodyMd">
                  Facebook Ads Pro leverages cutting-edge artificial intelligence and machine learning 
                  technologies to deliver superior advertising performance:
                </Text>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <Badge status="info">Gemini AI</Badge>
                <span style={{ marginLeft: "0.5rem" }}>
                  <Text variant="bodyMd">Advanced content generation and optimization</Text>
                </span>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <Badge status="info">TensorFlow</Badge>
                <span style={{ marginLeft: "0.5rem" }}>
                  <Text variant="bodyMd">Predictive analytics and performance forecasting</Text>
                </span>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <Badge status="info">Facebook Marketing API</Badge>
                <span style={{ marginLeft: "0.5rem" }}>
                  <Text variant="bodyMd">Real-time campaign management and optimization</Text>
                </span>
              </div>
            </div>

            <Divider />

            <div style={{ marginTop: "2rem" }}>
              <Text variant="headingLg" as="h2">
                Our Impact
              </Text>
              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                <div style={{ minWidth: "200px" }}>
                  <Text variant="headingMd" as="h3">
                    {stats.campaigns}
                  </Text>
                  <Text variant="bodyMd" color="subdued">
                    Campaigns Optimized
                  </Text>
                </div>
                <div style={{ minWidth: "200px" }}>
                  <Text variant="headingMd" as="h3">
                    {stats.revenue}
                  </Text>
                  <Text variant="bodyMd" color="subdued">
                    Revenue Generated
                  </Text>
                </div>
                <div style={{ minWidth: "200px" }}>
                  <Text variant="headingMd" as="h3">
                    {stats.merchants}
                  </Text>
                  <Text variant="bodyMd" color="subdued">
                    Happy Merchants
                  </Text>
                </div>
                <div style={{ minWidth: "200px" }}>
                  <Text variant="headingMd" as="h3">
                    {stats.roas}
                  </Text>
                  <Text variant="bodyMd" color="subdued">
                    Average ROAS Improvement
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}