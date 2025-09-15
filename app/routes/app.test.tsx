import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Page, Card, Text } from "@shopify/polaris";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);
  return json({ shop: session.shop });
}

export default function TestRoute() {
  const { shop } = useLoaderData<typeof loader>();
  return (
    <Page title="Test Route">
      <Card>
        <Text as="p">This is a test route for shop: {shop}</Text>
      </Card>
    </Page>
  );
}