const crypto = require('crypto');
const { User, Campaign, Performance } = require('../config/database');

class WebhookService {
  // Handle Shopify order webhooks
  async handleOrderWebhook(ctx) {
    try {
      // Verify webhook authenticity
      if (!this.verifyShopifyWebhook(ctx)) {
        ctx.status = 401;
        ctx.body = { error: 'Unauthorized' };
        return;
      }

      const order = ctx.request.body;
      
      // Find user by shop domain
      const shopDomain = ctx.get('X-Shopify-Shop-Domain');
      const user = await User.findOne({ where: { shopDomain } });
      
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'Shop not found' };
        return;
      }

      // Process order for campaign attribution
      await this.processOrderAttribution(user, order);
      
      ctx.status = 200;
      ctx.body = { success: true };
    } catch (error) {
      console.error('Shopify webhook error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  // Handle Facebook webhook events
  async handleFacebookWebhook(ctx) {
    try {
      const body = ctx.request.body;
      
      // Verify webhook
      if (!this.verifyFacebookWebhook(ctx)) {
        ctx.status = 401;
        ctx.body = { error: 'Unauthorized' };
        return;
      }

      // Process Facebook events
      if (body.object === 'page') {
        for (const entry of body.entry) {
          await this.processFacebookEntry(entry);
        }
      }

      ctx.status = 200;
      ctx.body = { success: true };
    } catch (error) {
      console.error('Facebook webhook error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  // Verify Shopify webhook signature
  verifyShopifyWebhook(ctx) {
    const hmac = ctx.get('X-Shopify-Hmac-Sha256');
    const body = JSON.stringify(ctx.request.body);
    const hash = crypto
      .createHmac('sha256', process.env.SHOPIFY_API_SECRET_KEY)
      .update(body, 'utf8')
      .digest('base64');
    
    return hash === hmac;
  }

  // Verify Facebook webhook signature
  verifyFacebookWebhook(ctx) {
    const signature = ctx.get('X-Hub-Signature-256');
    const body = JSON.stringify(ctx.request.body);
    const hash = crypto
      .createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
      .update(body, 'utf8')
      .digest('hex');
    
    return signature === `sha256=${hash}`;
  }

  // Process order for campaign attribution
  async processOrderAttribution(user, order) {
    try {
      // Look for UTM parameters or referrer data to attribute to campaigns
      const lineItems = order.line_items || [];
      
      for (const item of lineItems) {
        // Find campaigns for this product
        const campaigns = await Campaign.findAll({
          where: {
            userId: user.id,
            productId: item.product_id.toString(),
            status: 'active'
          }
        });

        for (const campaign of campaigns) {
          // Create performance record for conversion
          await Performance.create({
            campaignId: campaign.id,
            conversions: item.quantity,
            revenue: parseFloat(item.price) * item.quantity,
            recordedAt: new Date(),
            dateStart: new Date(),
            dateEnd: new Date()
          });
        }
      }
    } catch (error) {
      console.error('Order attribution error:', error);
    }
  }

  // Process Facebook webhook entry
  async processFacebookEntry(entry) {
    try {
      // Handle different types of Facebook events
      if (entry.changes) {
        for (const change of entry.changes) {
          await this.processFacebookChange(change);
        }
      }
    } catch (error) {
      console.error('Facebook entry processing error:', error);
    }
  }

  // Process Facebook change event
  async processFacebookChange(change) {
    try {
      const { field, value } = change;
      
      switch (field) {
        case 'ads':
          await this.handleAdChange(value);
          break;
        case 'campaigns':
          await this.handleCampaignChange(value);
          break;
        case 'adsets':
          await this.handleAdSetChange(value);
          break;
        default:
          console.log('Unhandled Facebook change:', field);
      }
    } catch (error) {
      console.error('Facebook change processing error:', error);
    }
  }

  // Handle ad change events
  async handleAdChange(value) {
    // Implementation for handling ad changes
    console.log('Ad change event:', value);
  }

  // Handle campaign change events
  async handleCampaignChange(value) {
    // Implementation for handling campaign changes
    console.log('Campaign change event:', value);
  }

  // Handle ad set change events
  async handleAdSetChange(value) {
    // Implementation for handling ad set changes
    console.log('Ad set change event:', value);
  }

  // Setup webhooks for a new user
  async setupWebhooks(user) {
    try {
      const webhooks = [
        {
          topic: 'orders/create',
          address: `${process.env.HOST}/webhooks/shopify/orders/create`
        },
        {
          topic: 'orders/updated',
          address: `${process.env.HOST}/webhooks/shopify/orders/updated`
        }
      ];

      for (const webhook of webhooks) {
        await this.createShopifyWebhook(user, webhook);
      }
    } catch (error) {
      console.error('Webhook setup error:', error);
    }
  }

  // Create Shopify webhook
  async createShopifyWebhook(user, webhook) {
    try {
      const response = await fetch(
        `https://${user.shopDomain}/admin/api/2024-01/webhooks.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': user.shopifyAccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ webhook })
        }
      );

      if (response.ok) {
        console.log(`Webhook created: ${webhook.topic}`);
      } else {
        console.error(`Failed to create webhook: ${webhook.topic}`);
      }
    } catch (error) {
      console.error('Shopify webhook creation error:', error);
    }
  }
}

module.exports = new WebhookService();