import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation, Form } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  Spinner,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Badge,
  Collapsible,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getStore, getProducts, createCampaign } from "../lib/db.server";
import { FacebookAdsManager } from "../lib/facebook.server";
import { aiGenerator } from "../lib/ai.server";
import { useState, useCallback } from "react";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  const store = await getStore(session.shop);
  if (!store) {
    throw new Response("Store not found", { status: 404 });
  }

  if (!store.facebookAccessToken) {
    throw redirect("/settings/facebook");
  }

  const products = await getProducts(store.id);

  return json({
    store,
    products,
  });
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("_action");

  const store = await getStore(session.shop);
  if (!store || !store.facebookAccessToken) {
    return json({ error: "Facebook account not connected" }, { status: 400 });
  }

  try {
    if (action === "generate_ai_content") {
      // Generate AI campaign content
      const selectedProductIds = JSON.parse(formData.get("selectedProducts") || "[]");
      const targetAudience = formData.get("targetAudience");
      const campaignObjective = formData.get("campaignObjective");

      if (selectedProductIds.length === 0) {
        return json({ error: "Please select at least one product" }, { status: 400 });
      }

      const products = await getProducts(store.id, {
        where: { id: { in: selectedProductIds } }
      });

      // Generate AI content for the first product (can be enhanced for multiple products)
      const primaryProduct = products[0];
      const aiContent = await aiGenerator.generateCampaignContent(
        primaryProduct,
        targetAudience,
        campaignObjective
      );

      return json({ aiContent, success: true });

    } else if (action === "create_campaign") {
      // Create the actual Facebook campaign
      const campaignName = formData.get("campaignName");
      const campaignObjective = formData.get("campaignObjective");
      const budget = parseFloat(formData.get("budget"));
      const selectedProductIds = JSON.parse(formData.get("selectedProducts") || "[]");
      const aiContent = JSON.parse(formData.get("aiContent") || "{}");

      // Initialize Facebook Ads Manager
      const fbManager = new FacebookAdsManager(
        store.facebookAccessToken,
        store.facebookAccountId
      );

      // Create Facebook campaign
      const fbCampaign = await fbManager.createCampaign({
        name: campaignName,
        objective: campaignObjective,
        status: 'PAUSED', // Start paused for review
      });

      // Save campaign to database
      const campaign = await createCampaign({
        storeId: store.id,
        facebookCampaignId: fbCampaign.id,
        name: campaignName,
        objective: campaignObjective,
        budget: budget,
        budgetType: 'DAILY',
        aiPrompt: `Target: ${formData.get("targetAudience")}`,
        generatedContent: aiContent,
        status: 'PAUSED',
      });

      return redirect(`/campaigns/${campaign.id}`);
    }
  } catch (error) {
    console.error("Campaign creation error:", error);
    return json({ error: error.message }, { status: 500 });
  }

  return json({ error: "Invalid action" }, { status: 400 });
};

export default function NewCampaign() {
  const { store, products } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [campaignObjective, setCampaignObjective] = useState("CONVERSIONS");
  const [targetAudience, setTargetAudience] = useState("");
  const [budget, setBudget] = useState("50");
  const [showAIContent, setShowAIContent] = useState(false);

  const isGenerating = navigation.state === "submitting" && 
    navigation.formData?.get("_action") === "generate_ai_content";
  const isCreating = navigation.state === "submitting" && 
    navigation.formData?.get("_action") === "create_campaign";

  const handleProductSelection = useCallback((productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const campaignObjectiveOptions = [
    { label: "Conversions", value: "CONVERSIONS" },
    { label: "Traffic", value: "LINK_CLICKS" },
    { label: "Reach", value: "REACH" },
    { label: "Brand Awareness", value: "BRAND_AWARENESS" },
    { label: "Video Views", value: "VIDEO_VIEWS" },
  ];

  return (
    <Page>
      <TitleBar title="Create AI Campaign" />
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {actionData?.error && (
              <Banner tone="critical">
                <p>{actionData.error}</p>
              </Banner>
            )}

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Step 1: Select Products</Text>
                <Text tone="subdued">
                  Choose the products you want to advertise in this campaign.
                </Text>
                
                <ResourceList
                  resourceName={{ singular: 'product', plural: 'products' }}
                  items={products}
                  renderItem={(product) => {
                    const media = product.images?.[0] ? (
                      <Thumbnail
                        source={product.images[0].src}
                        alt={product.images[0].alt || product.title}
                        size="small"
                      />
                    ) : undefined;

                    return (
                      <ResourceItem
                        id={product.id}
                        media={media}
                        accessibilityLabel={`Select ${product.title}`}
                        onClick={() => handleProductSelection(product.id)}
                      >
                        <InlineStack align="space-between">
                          <BlockStack gap="100">
                            <Text variant="bodyMd" fontWeight="bold">
                              {product.title}
                            </Text>
                            <Text tone="subdued">
                              ${product.price?.toFixed(2)} • {product.productType}
                            </Text>
                          </BlockStack>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleProductSelection(product.id)}
                          />
                        </InlineStack>
                      </ResourceItem>
                    );
                  }}
                />
              </BlockStack>
            </Card>

            <Card>
              <Form method="post">
                <input type="hidden" name="_action" value="generate_ai_content" />
                <input type="hidden" name="selectedProducts" value={JSON.stringify(selectedProducts)} />
                
                <FormLayout>
                  <Text variant="headingMd" as="h2">Step 2: Campaign Configuration</Text>
                  
                  <TextField
                    label="Campaign Name"
                    value={campaignName}
                    onChange={setCampaignName}
                    name="campaignName"
                    placeholder="e.g., Summer Collection 2024"
                    helpText="Choose a descriptive name for your campaign"
                  />

                  <Select
                    label="Campaign Objective"
                    options={campaignObjectiveOptions}
                    value={campaignObjective}
                    onChange={setCampaignObjective}
                    name="campaignObjective"
                    helpText="What do you want to achieve with this campaign?"
                  />

                  <TextField
                    label="Target Audience Description"
                    value={targetAudience}
                    onChange={setTargetAudience}
                    name="targetAudience"
                    multiline={3}
                    placeholder="e.g., Women aged 25-45 interested in fashion and lifestyle, living in urban areas"
                    helpText="Describe your ideal customer in detail"
                  />

                  <TextField
                    label="Daily Budget ($)"
                    type="number"
                    value={budget}
                    onChange={setBudget}
                    name="budget"
                    min="5"
                    step="5"
                    helpText="Recommended minimum: $20/day"
                  />

                  <Button
                    variant="primary"
                    submit
                    loading={isGenerating}
                    disabled={selectedProducts.length === 0 || !targetAudience || !campaignName}
                  >
                    {isGenerating ? "Generating AI Content..." : "Generate AI Campaign Content"}
                  </Button>
                </FormLayout>
              </Form>
            </Card>

            {actionData?.aiContent && (
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Step 3: Review AI-Generated Content</Text>
                  
                  <Banner tone="success">
                    <p>AI has generated optimized campaign content based on your products and target audience!</p>
                  </Banner>

                  <Collapsible
                    open={showAIContent}
                    id="ai-content-collapsible"
                    transition={{ duration: '150ms', timingFunction: 'ease' }}
                  >
                    <BlockStack gap="400">
                      <div>
                        <Text variant="headingSm" as="h4">Campaign Strategy</Text>
                        <Text>{actionData.aiContent.campaignDescription}</Text>
                      </div>

                      <div>
                        <Text variant="headingSm" as="h4">Recommended Budget</Text>
                        <Text>${actionData.aiContent.budget?.recommended}/day</Text>
                        <Text tone="subdued">{actionData.aiContent.budget?.reasoning}</Text>
                      </div>

                      <div>
                        <Text variant="headingSm" as="h4">Key Messages</Text>
                        {actionData.aiContent.keyMessages?.map((message, index) => (
                          <Text key={index}>• {message}</Text>
                        ))}
                      </div>

                      <div>
                        <Text variant="headingSm" as="h4">Targeting Recommendations</Text>
                        <Text>Age: {actionData.aiContent.targeting?.demographics?.ageMin}-{actionData.aiContent.targeting?.demographics?.ageMax}</Text>
                        <Text>Interests: {actionData.aiContent.targeting?.interests?.join(', ')}</Text>
                      </div>
                    </BlockStack>
                  </Collapsible>

                  <Button onClick={() => setShowAIContent(!showAIContent)}>
                    {showAIContent ? "Hide" : "Show"} AI Content Details
                  </Button>

                  <Form method="post">
                    <input type="hidden" name="_action" value="create_campaign" />
                    <input type="hidden" name="selectedProducts" value={JSON.stringify(selectedProducts)} />
                    <input type="hidden" name="campaignName" value={campaignName} />
                    <input type="hidden" name="campaignObjective" value={campaignObjective} />
                    <input type="hidden" name="budget" value={budget} />
                    <input type="hidden" name="aiContent" value={JSON.stringify(actionData.aiContent)} />
                    
                    <InlineStack align="end">
                      <Button
                        variant="primary"
                        submit
                        loading={isCreating}
                        size="large"
                      >
                        {isCreating ? "Creating Campaign..." : "Create Facebook Campaign"}
                      </Button>
                    </InlineStack>
                  </Form>
                </BlockStack>
              </Card>
            )}
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}