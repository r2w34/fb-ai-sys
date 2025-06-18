const axios = require('axios');
const crypto = require('crypto');
const { User } = require('../config/database');

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  HOST
} = process.env;

class AuthController {
  // Shopify OAuth initiation
  async shopifyAuth(ctx) {
    try {
      const shop = ctx.query.shop;
      if (!shop) {
        console.log('Missing shop parameter in OAuth request');
        ctx.status = 400;
        ctx.body = `
          <html>
            <body>
              <h1>Error: Missing Shop Parameter</h1>
              <p>Please provide your Shopify store domain.</p>
              <a href="/">Go back to homepage</a>
            </body>
          </html>
        `;
        return;
      }

      // Clean and validate shop domain
      const cleanShop = shop.toLowerCase().trim();
      if (!cleanShop.includes('.myshopify.com') || !/^[a-zA-Z0-9\-]+\.myshopify\.com$/.test(cleanShop)) {
        console.log(`Invalid shop domain: ${shop}`);
        ctx.status = 400;
        ctx.body = `
          <html>
            <body>
              <h1>Error: Invalid Shop Domain</h1>
              <p>Please use a valid .myshopify.com domain (e.g., your-store.myshopify.com)</p>
              <a href="/">Go back to homepage</a>
            </body>
          </html>
        `;
        return;
      }

      console.log(`Starting OAuth for shop: ${cleanShop}`);

      const nonce = crypto.randomBytes(16).toString('hex');
      ctx.session.nonce = nonce;
      ctx.session.shop = cleanShop;

      const redirectUri = `${HOST}/auth/shopify/callback`;
      const scopes = 'read_products,write_products,read_orders,write_orders,read_customers,read_customer_events';

      const authUrl = `https://${cleanShop}/admin/oauth/authorize?` +
        `client_id=${SHOPIFY_API_KEY}&` +
        `scope=${encodeURIComponent(scopes)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `state=${nonce}`;

      console.log(`Redirecting to Shopify OAuth: ${authUrl}`);
      ctx.redirect(authUrl);
    } catch (error) {
      console.error('Error in shopifyAuth:', error);
      ctx.status = 500;
      ctx.body = `
        <html>
          <body>
            <h1>Error: Authentication Failed</h1>
            <p>There was an error starting the authentication process.</p>
            <a href="/">Go back to homepage</a>
          </body>
        </html>
      `;
    }
  }

  // Shopify OAuth callback
  async shopifyCallback(ctx) {
    const { shop, code, state } = ctx.query;

    if (state !== ctx.session.nonce) {
      ctx.status = 403;
      ctx.body = { error: 'Invalid nonce' };
      return;
    }

    if (!code) {
      ctx.status = 400;
      ctx.body = { error: 'Authorization code not provided' };
      return;
    }

    try {
      // Exchange code for access token
      const accessToken = await this.exchangeCodeForToken(shop, code);

      // Get shop information
      const shopInfo = await this.getShopInfo(shop, accessToken);

      // Store or update user in database
      const [user, created] = await User.findOrCreate({
        where: { shopDomain: shop },
        defaults: {
          shopifyAccessToken: accessToken,
          email: shopInfo.email,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
          settings: {
            autoOptimization: true,
            budgetAlerts: true,
            performanceAlerts: true,
            weeklyReports: true,
            currency: shopInfo.currency || 'USD',
            timezone: shopInfo.timezone || 'UTC'
          }
        }
      });

      if (!created) {
        // Update existing user
        user.shopifyAccessToken = accessToken;
        user.email = shopInfo.email;
        user.lastLoginAt = new Date();
        await user.save();
      }

      // Set session
      ctx.session.userId = user.id;
      ctx.session.shop = shop;
      ctx.session.authenticated = true;

      // Redirect to dashboard
      ctx.redirect('/dashboard');
    } catch (error) {
      console.error('Shopify auth error:', error);
      ctx.status = 500;
      await ctx.render('error', {
        title: 'Authentication Error',
        error: 'Failed to authenticate with Shopify. Please try again.',
        status: 500
      });
    }
  }

  // Facebook OAuth initiation
  async facebookAuth(ctx) {
    if (!ctx.session.userId) {
      ctx.redirect('/');
      return;
    }

    const redirectUri = `${HOST}/auth/facebook/callback`;
    const scope = 'ads_management,ads_read,business_management,pages_manage_ads,pages_read_engagement';

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${FACEBOOK_APP_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${scope}&` +
      `response_type=code&` +
      `state=${ctx.session.userId}`;

    ctx.redirect(authUrl);
  }

  // Facebook OAuth callback
  async facebookCallback(ctx) {
    const { code, state } = ctx.query;

    if (!code || !ctx.session.userId || state !== ctx.session.userId.toString()) {
      ctx.redirect('/dashboard?error=fb_auth_failed');
      return;
    }

    try {
      // Exchange code for token
      const tokenResponse = await axios.get(
        `https://graph.facebook.com/v18.0/oauth/access_token?` +
        `client_id=${FACEBOOK_APP_ID}&` +
        `client_secret=${FACEBOOK_APP_SECRET}&` +
        `code=${code}&` +
        `redirect_uri=${encodeURIComponent(`${HOST}/auth/facebook/callback`)}`
      );

      const { access_token } = tokenResponse.data;

      // Get user info and ad accounts
      const [userResponse, adAccountsResponse] = await Promise.all([
        axios.get(`https://graph.facebook.com/v18.0/me?access_token=${access_token}`),
        axios.get(`https://graph.facebook.com/v18.0/me/adaccounts?access_token=${access_token}`)
      ]);

      // Update user record
      const user = await User.findByPk(ctx.session.userId);
      user.facebookAccessToken = access_token;
      user.facebookUserId = userResponse.data.id;
      
      // Store the first ad account ID (user can change this later)
      if (adAccountsResponse.data.data && adAccountsResponse.data.data.length > 0) {
        user.facebookAdAccountId = adAccountsResponse.data.data[0].id;
      }

      await user.save();

      ctx.redirect('/dashboard?success=fb_connected');
    } catch (error) {
      console.error('Facebook auth error:', error);
      ctx.redirect('/dashboard?error=fb_auth_failed');
    }
  }

  // Logout
  async logout(ctx) {
    ctx.session = null;
    ctx.body = { success: true, message: 'Logged out successfully' };
  }

  // Helper methods
  async exchangeCodeForToken(shop, code) {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET_KEY,
      code
    });
    return response.data.access_token;
  }

  async getShopInfo(shop, accessToken) {
    const response = await axios.get(
      `https://${shop}/admin/api/2024-01/shop.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.shop;
  }

  // Middleware to check authentication
  async requireAuth(ctx, next) {
    if (!ctx.session.userId) {
      if (ctx.accepts('json')) {
        ctx.status = 401;
        ctx.body = { error: 'Authentication required' };
      } else {
        ctx.redirect('/');
      }
      return;
    }
    await next();
  }

  // Middleware to check Facebook connection
  async requireFacebookAuth(ctx, next) {
    const user = await User.findByPk(ctx.session.userId);
    if (!user || !user.facebookAccessToken) {
      if (ctx.accepts('json')) {
        ctx.status = 403;
        ctx.body = { error: 'Facebook connection required' };
      } else {
        ctx.redirect('/dashboard?error=fb_required');
      }
      return;
    }
    ctx.state.user = user;
    await next();
  }
}

module.exports = new AuthController();