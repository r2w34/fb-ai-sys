import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Page,
  Card,
  Text,
  Button,
  BlockStack
} from "@shopify/polaris";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { session } = await authenticate.admin(request);
    return json({
      shop: session.shop,
      isConnected: false
    });
  } catch (error) {
    console.error('Facebook settings loader error:', error);
    return json({
      shop: 'unknown',
      isConnected: false,
      error: 'Authentication failed'
    });
  }
}

export default function FacebookSettings() {
  const { shop, isConnected, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <Page title="Facebook Settings">
        <Card>
          <Text as="p">Error: {error}</Text>
        </Card>
      </Page>
    );
  }

  return (
    <Page title="Facebook Settings" subtitle={`Settings for ${shop}`}>
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">Facebook Integration</Text>
          <Text as="p">
            {isConnected ? 'Facebook account is connected' : 'No Facebook account connected'}
          </Text>
          <Button variant="primary">
            {isConnected ? 'Disconnect Facebook' : 'Connect Facebook'}
          </Button>
        </BlockStack>
      </Card>
    </Page>
  );
}