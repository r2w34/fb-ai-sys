# 🛍️ Shopify App Installation Guide
## AI Facebook Ads Pro - Installation to Dev Store

### 📋 Prerequisites
- Shopify Partner Account
- Access to your dev store: `volter-store.myshopify.com`
- The app is already configured with API credentials

### 🔧 Current App Configuration
The app is already set up with these credentials:
- **Shopify API Key**: `9628dd612d6d4220f99fd05cd5c37c21`
- **Shopify Secret**: `69a62492986c4c969946f52708a40be6`
- **Facebook App ID**: `342313695281811`
- **Google Gemini AI**: Configured and ready

### 🚀 Installation Steps

#### Step 1: Access Shopify Partner Dashboard
1. Go to [Shopify Partners](https://partners.shopify.com)
2. Log in to your partner account
3. Navigate to "Apps" section
4. Find the app with API Key: `9628dd612d6d4220f99fd05cd5c37c21`

#### Step 2: Update App URLs (if needed)
In the app settings, ensure these URLs are configured:
- **App URL**: `https://facebook-ai-ads-shopify.vercel.app` (or your deployed URL)
- **Allowed redirection URLs**: `https://facebook-ai-ads-shopify.vercel.app/auth/shopify/callback`

#### Step 3: Install to Dev Store
1. In your Partner Dashboard, go to the app
2. Click "Select store" or "Test on development store"
3. Choose your dev store: `volter-store.myshopify.com`
4. Click "Install app"

#### Step 4: Alternative Installation Method
If the above doesn't work, you can install directly:
1. Go to your dev store admin: `https://volter-store.myshopify.com/admin`
2. Navigate to "Apps" → "App and sales channel settings"
3. Click "Develop apps"
4. Click "Create an app"
5. Use the existing API credentials or create a new app

### 🔗 Direct Installation URL
You can also try this direct installation URL:
```
https://volter-store.myshopify.com/admin/oauth/authorize?client_id=9628dd612d6d4220f99fd05cd5c37c21&scope=read_products,write_products,read_orders,write_orders,read_customers&redirect_uri=https://facebook-ai-ads-shopify.vercel.app/auth/shopify/callback&state=nonce&response_type=code
```

### 🎯 What Happens After Installation
1. The app will appear in your store's app section
2. You'll be able to access the AI Facebook Ads dashboard
3. The app will sync with your store's products
4. You can start creating AI-powered Facebook ad campaigns

### 🛠️ Troubleshooting
If you encounter issues:
1. **App not found**: The app might need to be published or made available to your store
2. **Permission errors**: Ensure the app has the required scopes
3. **Redirect errors**: Check that the callback URL is correctly configured

### 📞 Next Steps
Once installed, you can:
1. Access the app from your Shopify admin
2. Connect your Facebook Business account
3. Start creating AI-powered ad campaigns
4. Monitor performance through the dashboard

### 🔐 Security Notes
- All credentials are properly configured
- The app uses secure OAuth flow
- Session management is properly implemented
- HTTPS is enforced for all communications