import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestCampaign() {
  try {
    // First, let's see if there are any shops
    const shops = await prisma.session.findMany({
      take: 1
    });
    
    if (shops.length === 0) {
      console.log('No shops found. Creating a test shop session...');
      // Create a test shop session
      const testSession = await prisma.session.create({
        data: {
          id: 'test-session-123',
          shop: 'test-shop.myshopify.com',
          state: 'test-state',
          isOnline: false,
          scope: 'read_products,write_products',
          accessToken: 'test-token'
        }
      });
      console.log('Created test session:', testSession.shop);
    }

    // Create or find a Facebook account
    let facebookAccount = await prisma.facebookAccount.findFirst({
      where: { shop: shops[0]?.shop || 'test-shop.myshopify.com' }
    });

    if (!facebookAccount) {
      facebookAccount = await prisma.facebookAccount.create({
        data: {
          shop: shops[0]?.shop || 'test-shop.myshopify.com',
          facebookUserId: 'test-user-123',
          accessToken: 'test-access-token',
          businessId: 'test-business-123',
          adAccountId: 'act_123456789'
        }
      });
      console.log('Created test Facebook account:', facebookAccount.id);
    }

    // Create a test campaign
    const campaign = await prisma.campaign.create({
      data: {
        name: 'Test Campaign',
        objective: 'CONVERSIONS',
        budget: 50.00,
        status: 'ACTIVE',
        shop: shops[0]?.shop || 'test-shop.myshopify.com',
        spend: 25.50,
        revenue: 150.00,
        clicks: 45,
        impressions: 1200,
        adAccountId: 'act_123456789',
        currency: 'USD',
        facebookAccount: {
          connect: { id: facebookAccount.id }
        }
      }
    });

    console.log('Created test campaign:', campaign);
    console.log('Campaign ID:', campaign.id);
    console.log('Test URL: /app/campaigns/' + campaign.id);
    
  } catch (error) {
    console.error('Error creating test campaign:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestCampaign();