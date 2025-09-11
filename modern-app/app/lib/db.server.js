import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  if (!global.prisma) {
    global.prisma = prisma;
  }
}

export { prisma };

// Store management functions
export async function getStore(shopDomain) {
  return await prisma.store.findUnique({
    where: { shopDomain },
    include: {
      campaigns: {
        include: {
          adSets: {
            include: {
              ads: true
            }
          }
        }
      },
      products: true,
      orders: true
    }
  });
}

export async function createStore(storeData) {
  return await prisma.store.create({
    data: storeData
  });
}

export async function updateStore(shopDomain, updateData) {
  return await prisma.store.update({
    where: { shopDomain },
    data: updateData
  });
}

// Campaign management functions
export async function createCampaign(campaignData) {
  return await prisma.campaign.create({
    data: campaignData,
    include: {
      adSets: {
        include: {
          ads: true
        }
      }
    }
  });
}

export async function getCampaigns(storeId, options = {}) {
  return await prisma.campaign.findMany({
    where: { storeId },
    include: {
      adSets: {
        include: {
          ads: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    ...options
  });
}

export async function getCampaign(campaignId) {
  return await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      store: true,
      adSets: {
        include: {
          ads: true
        }
      }
    }
  });
}

export async function updateCampaign(campaignId, updateData) {
  return await prisma.campaign.update({
    where: { id: campaignId },
    data: updateData
  });
}

export async function deleteCampaign(campaignId) {
  return await prisma.campaign.delete({
    where: { id: campaignId }
  });
}

// AdSet management functions
export async function createAdSet(adSetData) {
  return await prisma.adSet.create({
    data: adSetData,
    include: {
      ads: true,
      campaign: true
    }
  });
}

export async function getAdSets(campaignId) {
  return await prisma.adSet.findMany({
    where: { campaignId },
    include: {
      ads: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateAdSet(adSetId, updateData) {
  return await prisma.adSet.update({
    where: { id: adSetId },
    data: updateData
  });
}

// Ad management functions
export async function createAd(adData) {
  return await prisma.ad.create({
    data: adData,
    include: {
      adSet: {
        include: {
          campaign: true
        }
      }
    }
  });
}

export async function getAds(adSetId) {
  return await prisma.ad.findMany({
    where: { adSetId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateAd(adId, updateData) {
  return await prisma.ad.update({
    where: { id: adId },
    data: updateData
  });
}

// Product management functions
export async function syncProduct(storeId, productData) {
  return await prisma.product.upsert({
    where: {
      storeId_shopifyProductId: {
        storeId,
        shopifyProductId: productData.shopifyProductId
      }
    },
    update: {
      title: productData.title,
      handle: productData.handle,
      description: productData.description,
      vendor: productData.vendor,
      productType: productData.productType,
      tags: productData.tags,
      price: productData.price,
      compareAtPrice: productData.compareAtPrice,
      images: productData.images,
      updatedAt: new Date()
    },
    create: {
      storeId,
      ...productData
    }
  });
}

export async function getProducts(storeId, options = {}) {
  return await prisma.product.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    ...options
  });
}

export async function getProduct(productId) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      store: true
    }
  });
}

export async function updateProductAnalysis(productId, analysis) {
  return await prisma.product.update({
    where: { id: productId },
    data: {
      aiAnalysis: analysis,
      updatedAt: new Date()
    }
  });
}

// Order management functions
export async function syncOrder(storeId, orderData) {
  return await prisma.order.upsert({
    where: {
      storeId_shopifyOrderId: {
        storeId,
        shopifyOrderId: orderData.shopifyOrderId
      }
    },
    update: {
      orderNumber: orderData.orderNumber,
      email: orderData.email,
      totalPrice: orderData.totalPrice,
      subtotalPrice: orderData.subtotalPrice,
      totalTax: orderData.totalTax,
      currency: orderData.currency,
      customerFirstName: orderData.customerFirstName,
      customerLastName: orderData.customerLastName,
      customerEmail: orderData.customerEmail,
      utmSource: orderData.utmSource,
      utmMedium: orderData.utmMedium,
      utmCampaign: orderData.utmCampaign,
      referringSite: orderData.referringSite,
      processedAt: orderData.processedAt,
      updatedAt: new Date()
    },
    create: {
      storeId,
      ...orderData
    }
  });
}

export async function getOrders(storeId, options = {}) {
  return await prisma.order.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    ...options
  });
}

// Performance analytics functions
export async function updateCampaignMetrics(campaignId, metrics) {
  return await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      impressions: metrics.impressions,
      clicks: metrics.clicks,
      conversions: metrics.conversions,
      spend: metrics.spend,
      ctr: metrics.ctr,
      cpc: metrics.cpc,
      cpm: metrics.cpm,
      roas: metrics.roas,
      updatedAt: new Date()
    }
  });
}

export async function updateAdSetMetrics(adSetId, metrics) {
  return await prisma.adSet.update({
    where: { id: adSetId },
    data: {
      impressions: metrics.impressions,
      clicks: metrics.clicks,
      conversions: metrics.conversions,
      spend: metrics.spend,
      updatedAt: new Date()
    }
  });
}

export async function updateAdMetrics(adId, metrics) {
  return await prisma.ad.update({
    where: { id: adId },
    data: {
      impressions: metrics.impressions,
      clicks: metrics.clicks,
      conversions: metrics.conversions,
      spend: metrics.spend,
      updatedAt: new Date()
    }
  });
}

// AI Optimization functions
export async function createOptimization(optimizationData) {
  return await prisma.aIOptimization.create({
    data: optimizationData
  });
}

export async function getOptimizations(storeId, options = {}) {
  return await prisma.aIOptimization.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    ...options
  });
}

export async function markOptimizationImplemented(optimizationId, results) {
  return await prisma.aIOptimization.update({
    where: { id: optimizationId },
    data: {
      implemented: true,
      implementedAt: new Date(),
      afterMetrics: results.afterMetrics,
      improvement: results.improvement,
      updatedAt: new Date()
    }
  });
}

// Webhook functions
export async function createWebhookEvent(eventData) {
  return await prisma.webhookEvent.create({
    data: eventData
  });
}

export async function getUnprocessedWebhooks() {
  return await prisma.webhookEvent.findMany({
    where: { processed: false },
    orderBy: { createdAt: 'asc' }
  });
}

export async function markWebhookProcessed(eventId) {
  return await prisma.webhookEvent.update({
    where: { id: eventId },
    data: {
      processed: true,
      processedAt: new Date()
    }
  });
}

// Analytics and reporting functions
export async function getCampaignPerformance(storeId, dateRange = {}) {
  const whereClause = {
    storeId,
    ...(dateRange.start && dateRange.end && {
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end
      }
    })
  };

  const campaigns = await prisma.campaign.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      status: true,
      impressions: true,
      clicks: true,
      conversions: true,
      spend: true,
      ctr: true,
      cpc: true,
      cpm: true,
      roas: true,
      createdAt: true
    }
  });

  // Calculate totals
  const totals = campaigns.reduce((acc, campaign) => ({
    impressions: acc.impressions + (campaign.impressions || 0),
    clicks: acc.clicks + (campaign.clicks || 0),
    conversions: acc.conversions + (campaign.conversions || 0),
    spend: acc.spend + (campaign.spend || 0)
  }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });

  return {
    campaigns,
    totals: {
      ...totals,
      ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
      cpc: totals.clicks > 0 ? totals.spend / totals.clicks : 0,
      cpm: totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0
    }
  };
}

export async function getTopPerformingProducts(storeId, limit = 10) {
  return await prisma.product.findMany({
    where: { storeId },
    orderBy: [
      { totalSales: 'desc' },
      { totalOrders: 'desc' }
    ],
    take: limit,
    select: {
      id: true,
      title: true,
      handle: true,
      price: true,
      totalSales: true,
      totalOrders: true,
      images: true
    }
  });
}