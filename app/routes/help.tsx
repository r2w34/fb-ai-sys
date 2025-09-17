import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Stack, 
  Divider, 
  Button,
  Badge,
  Grid,
  Collapsible,
  TextField
} from "@shopify/polaris";
import { useState } from "react";

export const loader = async () => {
  return json({
    helpCategories: [
      {
        id: "getting-started",
        title: "Getting Started",
        icon: "🚀",
        articles: [
          { title: "Installing Facebook Ads Pro", url: "#install" },
          { title: "Connecting Your Facebook Account", url: "#connect-fb" },
          { title: "Setting Up Your First Campaign", url: "#first-campaign" },
          { title: "Understanding the Dashboard", url: "#dashboard" }
        ]
      },
      {
        id: "campaign-management",
        title: "Campaign Management",
        icon: "📊",
        articles: [
          { title: "Creating Effective Ad Copy", url: "#ad-copy" },
          { title: "Audience Targeting Best Practices", url: "#targeting" },
          { title: "Budget and Bidding Strategies", url: "#budget" },
          { title: "Campaign Optimization Tips", url: "#optimization" }
        ]
      },
      {
        id: "ai-features",
        title: "AI Features",
        icon: "🤖",
        articles: [
          { title: "How AI Ad Copy Generation Works", url: "#ai-copy" },
          { title: "AI Audience Suggestions", url: "#ai-audience" },
          { title: "Automated Campaign Optimization", url: "#ai-optimization" },
          { title: "Performance Predictions", url: "#ai-predictions" }
        ]
      },
      {
        id: "analytics",
        title: "Analytics & Reporting",
        icon: "📈",
        articles: [
          { title: "Understanding Your Metrics", url: "#metrics" },
          { title: "Custom Reports and Dashboards", url: "#reports" },
          { title: "ROI Tracking and Attribution", url: "#roi" },
          { title: "Competitive Analysis", url: "#competitive" }
        ]
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        icon: "🔧",
        articles: [
          { title: "Common Setup Issues", url: "#setup-issues" },
          { title: "Campaign Not Delivering", url: "#not-delivering" },
          { title: "Facebook Policy Violations", url: "#policy" },
          { title: "Billing and Payment Issues", url: "#billing" }
        ]
      },
      {
        id: "advanced",
        title: "Advanced Features",
        icon: "⚡",
        articles: [
          { title: "Custom Audiences and Lookalikes", url: "#custom-audiences" },
          { title: "Dynamic Product Ads", url: "#dynamic-ads" },
          { title: "Multi-Account Management", url: "#multi-account" },
          { title: "API Integration", url: "#api" }
        ]
      }
    ]
  });
};

export default function Help() {
  const { helpCategories } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Page
      title="Help & Support"
      subtitle="Find answers to common questions and learn how to get the most out of Facebook Ads Pro"
      backAction={{ content: "Back to Home", url: "/" }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack vertical spacing="tight">
              <Text variant="headingMd" as="h2">
                Search Help Articles
              </Text>
              <TextField
                label=""
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for help articles, features, or topics..."
                clearButton
                onClearButtonClick={() => setSearchQuery("")}
              />
            </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 8, xl: 8 }}>
              <Stack vertical spacing="loose">
                {filteredCategories.map((category) => (
                  <Card key={category.id}>
                    <Stack vertical spacing="tight">
                      <div 
                        style={{ cursor: "pointer", padding: "16px" }}
                        onClick={() => toggleSection(category.id)}
                      >
                        <Stack alignment="center" distribution="equalSpacing">
                          <Stack alignment="center">
                            <Text variant="headingMd" as="h3">
                              {category.icon} {category.title}
                            </Text>
                          </Stack>
                          <Badge>
                            {category.articles.length} articles
                          </Badge>
                        </Stack>
                      </div>
                      
                      <Collapsible
                        open={openSections.includes(category.id)}
                        id={category.id}
                        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
                      >
                        <div style={{ padding: "0 16px 16px" }}>
                          <Stack vertical spacing="tight">
                            {category.articles.map((article, index) => (
                              <div key={index} style={{ padding: "8px 0" }}>
                                <Button plain url={article.url}>
                                  {article.title}
                                </Button>
                              </div>
                            ))}
                          </Stack>
                        </div>
                      </Collapsible>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }}>
              <Stack vertical spacing="loose">
                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      🎥 Video Tutorials
                    </Text>
                    <Text variant="bodyMd">
                      Watch step-by-step video guides to master Facebook Ads Pro.
                    </Text>
                    <Button primary>
                      Watch Tutorials
                    </Button>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      📚 Best Practices Guide
                    </Text>
                    <Text variant="bodyMd">
                      Learn proven strategies for successful Facebook advertising.
                    </Text>
                    <Button outline>
                      Download Guide
                    </Button>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      💬 Community Forum
                    </Text>
                    <Text variant="bodyMd">
                      Connect with other merchants and share experiences.
                    </Text>
                    <Button outline>
                      Join Community
                    </Button>
                  </Stack>
                </Card>

                <Card sectioned>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      🎯 Free Consultation
                    </Text>
                    <Text variant="bodyMd">
                      Schedule a free 30-minute consultation with our experts.
                    </Text>
                    <Button primary>
                      Book Consultation
                    </Button>
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
                Quick Start Guide
              </Text>
              
              <Divider />
              
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight" alignment="center">
                      <div style={{ fontSize: "2rem" }}>1️⃣</div>
                      <Text variant="headingMd" as="h3" alignment="center">
                        Install & Connect
                      </Text>
                      <Text variant="bodyMd" alignment="center">
                        Install the app from Shopify App Store and connect your Facebook Business Manager account.
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight" alignment="center">
                      <div style={{ fontSize: "2rem" }}>2️⃣</div>
                      <Text variant="headingMd" as="h3" alignment="center">
                        Set Your Goals
                      </Text>
                      <Text variant="bodyMd" alignment="center">
                        Define your advertising objectives, budget, and target audience preferences.
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight" alignment="center">
                      <div style={{ fontSize: "2rem" }}>3️⃣</div>
                      <Text variant="headingMd" as="h3" alignment="center">
                        AI Creates Campaigns
                      </Text>
                      <Text variant="bodyMd" alignment="center">
                        Our AI analyzes your products and creates optimized campaigns with compelling ad copy.
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight" alignment="center">
                      <div style={{ fontSize: "2rem" }}>4️⃣</div>
                      <Text variant="headingMd" as="h3" alignment="center">
                        Monitor & Optimize
                      </Text>
                      <Text variant="bodyMd" alignment="center">
                        Track performance in real-time and let AI continuously optimize for better results.
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Cell>
              </Grid>
            </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Stack vertical spacing="loose">
              <Text variant="headingLg" as="h2">
                Still Need Help?
              </Text>
              
              <Divider />
              
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight">
                      <Text variant="headingMd" as="h3">
                        📧 Email Support
                      </Text>
                      <Text variant="bodyMd">
                        Get detailed help via email. We typically respond within 24 hours.
                      </Text>
                      <Button primary url="/contact">
                        Contact Support
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight">
                      <Text variant="headingMd" as="h3">
                        💬 Live Chat
                      </Text>
                      <Text variant="bodyMd">
                        Chat with our support team in real-time during business hours.
                      </Text>
                      <Button outline>
                        Start Live Chat
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 4, xl: 4 }}>
                  <Card sectioned>
                    <Stack vertical spacing="tight">
                      <Text variant="headingMd" as="h3">
                        📞 Phone Support
                      </Text>
                      <Text variant="bodyMd">
                        Call us for urgent technical issues or complex questions.
                      </Text>
                      <Text variant="bodyMd" color="subdued">
                        +1 (555) 123-4567
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Cell>
              </Grid>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}