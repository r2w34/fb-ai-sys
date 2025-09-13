import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCampaignForShop(shopDomain) {
  try {
    console.log(`🔧 Creating test campaign for shop: ${shopDomain}`);
    
    // First, create or get a Facebook account for this shop
    let facebookAccount = await prisma.facebookAccount.findFirst({
      where: { shop: shopDomain }
    });
    
    if (!facebookAccount) {
      console.log('Creating Facebook account for shop...');
      facebookAccount = await prisma.facebookAccount.create({
        data: {
          shop: shopDomain,
          facebookUserId: `test-user-${Date.now()}`,
          accessToken: 'test-token',
          isActive: true,
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        }
      });
    }
    
    // Create a test campaign
    const campaign = await prisma.campaign.create({
      data: {
        name: `Test Campaign for ${shopDomain}`,
        objective: 'CONVERSIONS',
        status: 'ACTIVE',
        budget: 100.00,
        budgetType: 'DAILY',
        currency: 'USD',
        shop: shopDomain,
        facebookAccountId: facebookAccount.id,
        adAccountId: 'test-ad-account-123',
        targetAudience: {
          age_min: 18,
          age_max: 65,
          genders: [1, 2],
          interests: ['shopping', 'fashion']
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    
    console.log('✅ Campaign created successfully!');
    console.log('Campaign ID:', campaign.id);
    console.log('Campaign Name:', campaign.name);
    console.log('Shop:', campaign.shop);
    console.log('');
    console.log('🔗 Test URLs:');
    console.log(`- Campaign details: /app/campaigns/${campaign.id}`);
    console.log(`- Full URL: https://fbai-app.trustclouds.in/app/campaigns/${campaign.id}`);
    
    return campaign;
    
  } catch (error) {
    console.error('Error creating campaign:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get shop from command line argument or use default
const shopDomain = process.argv[2] || 'your-shop.myshopify.com';

console.log('Usage: node create-campaign-for-shop.js [shop-domain]');
console.log('Example: node create-campaign-for-shop.js my-store.myshopify.com');
console.log('');

createCampaignForShop(shopDomain);