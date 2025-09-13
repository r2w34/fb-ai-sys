import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findUserShop() {
  try {
    console.log('🔍 Looking for active shops in the database...');
    
    // Get all sessions (these represent active shop connections)
    const sessions = await prisma.session.findMany({
      select: { 
        shop: true, 
        id: true,
        accessToken: true,
        expires: true
      },
      orderBy: { expires: 'desc' }
    });
    
    console.log('\n📊 Active Sessions:');
    if (sessions.length === 0) {
      console.log('No active sessions found.');
    } else {
      sessions.forEach((session, index) => {
        const isExpired = session.expires && new Date(session.expires) < new Date();
        console.log(`${index + 1}. Shop: ${session.shop}`);
        console.log(`   Session ID: ${session.id}`);
        console.log(`   Expires: ${session.expires || 'Never'}`);
        console.log(`   Status: ${isExpired ? '❌ Expired' : '✅ Active'}`);
        console.log('');
      });
    }
    
    // Get all Facebook accounts (these also indicate which shops are connected)
    const facebookAccounts = await prisma.facebookAccount.findMany({
      select: {
        shop: true,
        facebookUserId: true,
        isActive: true,
        createdAt: true
      },
      orderBy: { shop: 'asc' }
    });
    
    console.log('📱 Facebook Accounts:');
    if (facebookAccounts.length === 0) {
      console.log('No Facebook accounts found.');
    } else {
      facebookAccounts.forEach((account, index) => {
        console.log(`${index + 1}. Shop: ${account.shop}`);
        console.log(`   Facebook User ID: ${account.facebookUserId}`);
        console.log(`   Active: ${account.isActive ? '✅' : '❌'}`);
        console.log(`   Created: ${account.createdAt}`);
        console.log('');
      });
    }
    
    // Get campaigns by shop
    const campaignsByShop = await prisma.campaign.groupBy({
      by: ['shop'],
      _count: {
        id: true
      }
    });
    
    console.log('🎯 Campaigns by Shop:');
    if (campaignsByShop.length === 0) {
      console.log('No campaigns found.');
    } else {
      for (const group of campaignsByShop) {
        console.log(`- ${group.shop}: ${group._count.id} campaign(s)`);
      }
    }
    
    console.log('\n💡 Recommendations:');
    
    // Find the most likely active shop
    const activeShops = sessions
      .filter(s => !s.expires || new Date(s.expires) > new Date())
      .map(s => s.shop);
    
    const connectedShops = facebookAccounts
      .filter(a => a.isActive)
      .map(a => a.shop);
    
    const allActiveShops = [...new Set([...activeShops, ...connectedShops])];
    
    if (allActiveShops.length > 0) {
      console.log('Most likely active shop(s):');
      allActiveShops.forEach(shop => {
        console.log(`- ${shop}`);
        console.log(`  Create test campaign: node create-campaign-for-shop.js "${shop}"`);
      });
    } else {
      console.log('No clearly active shops found. You may need to:');
      console.log('1. Connect your Shopify store to the app');
      console.log('2. Authenticate with Facebook');
      console.log('3. Create a campaign through the app interface');
    }
    
  } catch (error) {
    console.error('Error finding user shop:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findUserShop();