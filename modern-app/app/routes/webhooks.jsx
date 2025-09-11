import { authenticate } from "../shopify.server";
import { createWebhookEvent, syncProduct, syncOrder } from "../lib/db.server";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

  if (!admin && topic !== "APP_UNINSTALLED") {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  // Log webhook event
  await createWebhookEvent({
    shopDomain: shop,
    topic,
    payload,
  });

  switch (topic) {
    case "APP_UNINSTALLED":
      // Handle app uninstallation
      if (session) {
        await prisma.store.update({
          where: { shopDomain: shop },
          data: { isActive: false },
        });
      }
      break;

    case "CUSTOMERS_DATA_REQUEST":
      // Handle customer data request (GDPR)
      // Implementation depends on your data handling requirements
      break;

    case "CUSTOMERS_REDACT":
      // Handle customer data deletion (GDPR)
      // Implementation depends on your data handling requirements
      break;

    case "SHOP_REDACT":
      // Handle shop data deletion (GDPR)
      // Delete all shop data
      await prisma.store.delete({
        where: { shopDomain: shop },
      });
      break;

    case "ORDERS_CREATE":
    case "ORDERS_UPDATED":
      // Sync order data
      if (payload && session) {
        const store = await getStore(shop);
        if (store) {
          await syncOrder(store.id, {
            shopifyOrderId: payload.id.toString(),
            orderNumber: payload.order_number || payload.name,
            email: payload.email,
            totalPrice: parseFloat(payload.total_price || 0),
            subtotalPrice: parseFloat(payload.subtotal_price || 0),
            totalTax: parseFloat(payload.total_tax || 0),
            currency: payload.currency || 'USD',
            customerFirstName: payload.customer?.first_name,
            customerLastName: payload.customer?.last_name,
            customerEmail: payload.customer?.email,
            utmSource: payload.source_name,
            utmMedium: payload.referring_site,
            processedAt: payload.processed_at ? new Date(payload.processed_at) : new Date(),
          });
        }
      }
      break;

    case "PRODUCTS_CREATE":
    case "PRODUCTS_UPDATE":
      // Sync product data
      if (payload && session) {
        const store = await getStore(shop);
        if (store) {
          await syncProduct(store.id, {
            shopifyProductId: payload.id.toString(),
            title: payload.title,
            handle: payload.handle,
            description: payload.body_html,
            vendor: payload.vendor,
            productType: payload.product_type,
            tags: payload.tags ? payload.tags.split(',').map(tag => tag.trim()) : [],
            price: payload.variants?.[0]?.price ? parseFloat(payload.variants[0].price) : null,
            compareAtPrice: payload.variants?.[0]?.compare_at_price ? parseFloat(payload.variants[0].compare_at_price) : null,
            images: payload.images?.map(img => ({
              id: img.id,
              src: img.src,
              alt: img.alt,
            })) || [],
          });
        }
      }
      break;

    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};