import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Divider, 
  Button,
  TextField,
  Collapsible,
  Badge
} from "@shopify/polaris";
import { useState } from "react";

export const loader = async () => {
  return json({
    articles: [
      {
        id: "getting-started",
        title: "Getting Started with Facebook Ads Pro",
        category: "Setup",
        description: "Learn how to set up your account and create your first campaign"
      },
      {
        id: "facebook-connection",
        title: "Connecting Your Facebook Business Manager",
        category: "Setup", 
        description: "Step-by-step guide to connect your Facebook advertising account"
      },
      {
        id: "campaign-optimization",
        title: "AI Campaign Optimization Features",
        category: "Features",
        description: "Understanding how our AI optimizes your campaigns for better performance"
      },
      {
        id: "troubleshooting",
        title: "Common Issues and Solutions",
        category: "Troubleshooting",
        description: "Quick fixes for the most common problems users encounter"
      }
    ]
  });
};

export default function Help() {
  const { articles } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gettingStartedSteps = [
    "Install Facebook Ads Pro from your Shopify App Store",
    "Connect your Facebook Business Manager account",
    "Import your product catalog from Shopify",
    "Set up your first campaign using our AI wizard",
    "Monitor performance and let AI optimize your campaigns"
  ];

  return (
    <Page
      title="Help & Support"
      subtitle="Find answers to your questions and learn how to maximize your results"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Search Help Articles
            </Text>
            <div style={{ marginTop: "1rem" }}>
              <TextField
                label=""
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search for help articles..."
                clearButton
                onClearButtonClick={() => setSearchTerm("")}
              />
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              🚀 Quick Start Guide
            </Text>
            <div style={{ marginTop: "1rem" }}>
              <Text variant="bodyMd">
                Get up and running with Facebook Ads Pro in just 5 simple steps:
              </Text>
              <div style={{ marginTop: "1rem" }}>
                {gettingStartedSteps.map((step, index) => (
                  <div key={index} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                    <Badge status="info">{index + 1}</Badge>
                    <div style={{ marginLeft: "0.5rem" }}>
                      <Text variant="bodyMd">{step}</Text>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <Button primary url="/app/campaigns/new">
                  Create Your First Campaign
                </Button>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              📚 Help Articles
            </Text>
            <div style={{ marginTop: "1rem" }}>
              {filteredArticles.length === 0 ? (
                <Text variant="bodyMd" color="subdued">
                  No articles found matching your search.
                </Text>
              ) : (
                filteredArticles.map((article) => (
                  <div key={article.id} style={{ marginBottom: "1rem" }}>
                    <Button
                      plain
                      onClick={() => toggleSection(article.id)}
                      ariaExpanded={openSections[article.id]}
                    >
                      <div style={{ textAlign: "left" }}>
                        <Text variant="bodyMd">
                          {article.title}
                        </Text>
                        <div style={{ marginTop: "0.25rem" }}>
                          <Badge>{article.category}</Badge>
                        </div>
                      </div>
                    </Button>
                    <Collapsible open={openSections[article.id]}>
                      <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
                        <Text variant="bodyMd" color="subdued">
                          {article.description}
                        </Text>
                        <div style={{ marginTop: "0.5rem" }}>
                          <Button size="slim">
                            Read Full Article
                          </Button>
                        </div>
                      </div>
                    </Collapsible>
                    <Divider />
                  </div>
                ))
              )}
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              💡 Pro Tips for Success
            </Text>
            <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ flex: "1", minWidth: "300px" }}>
                <Text variant="headingSm" as="h3">
                  🎯 Audience Targeting
                </Text>
                <Text variant="bodyMd">
                  Use our AI-powered audience suggestions to find customers most likely to convert. 
                  Start broad and let our algorithm optimize for the best performers.
                </Text>
              </div>
              <div style={{ flex: "1", minWidth: "300px" }}>
                <Text variant="headingSm" as="h3">
                  📊 Performance Monitoring
                </Text>
                <Text variant="bodyMd">
                  Check your campaign performance daily for the first week, then let our AI 
                  handle optimization. Focus on ROAS and conversion metrics.
                </Text>
              </div>
              <div style={{ flex: "1", minWidth: "300px" }}>
                <Text variant="headingSm" as="h3">
                  🎨 Creative Testing
                </Text>
                <Text variant="bodyMd">
                  Upload multiple product images and let our AI test different combinations. 
                  High-quality visuals significantly impact campaign performance.
                </Text>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              🆘 Still Need Help?
            </Text>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Button url="/contact">
                Contact Support
              </Button>
              <Button url="mailto:support@fbai-app.com">
                Email Us
              </Button>
              <Button url="https://calendly.com/fbai-app/support" external>
                Schedule a Call
              </Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}