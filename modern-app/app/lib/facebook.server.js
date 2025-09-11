import bizSdk from 'facebook-nodejs-business-sdk';

const {
  FacebookAdsApi,
  AdAccount,
  Campaign,
  AdSet,
  Ad,
  AdCreative,
  AdImage,
  Targeting,
  CustomAudience,
  Page,
} = bizSdk;

// Initialize Facebook Ads API
let facebookApi = null;

export function initializeFacebookApi(accessToken) {
  if (!accessToken) {
    throw new Error('Facebook access token is required');
  }
  
  facebookApi = FacebookAdsApi.init(accessToken);
  facebookApi.setDebug(process.env.NODE_ENV === 'development');
  
  return facebookApi;
}

export class FacebookAdsManager {
  constructor(accessToken, accountId) {
    this.accessToken = accessToken;
    this.accountId = accountId;
    this.api = initializeFacebookApi(accessToken);
    this.account = new AdAccount(`act_${accountId}`);
  }

  // Campaign Management
  async createCampaign(campaignData) {
    try {
      const campaign = await this.account.createCampaign([], {
        [Campaign.Fields.name]: campaignData.name,
        [Campaign.Fields.objective]: campaignData.objective || 'CONVERSIONS',
        [Campaign.Fields.status]: campaignData.status || 'PAUSED',
        [Campaign.Fields.special_ad_categories]: campaignData.specialAdCategories || [],
      });

      return campaign;
    } catch (error) {
      console.error('Error creating Facebook campaign:', error);
      throw error;
    }
  }

  async getCampaigns(fields = [Campaign.Fields.name, Campaign.Fields.status]) {
    try {
      const campaigns = await this.account.getCampaigns(fields);
      return campaigns;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  async updateCampaign(campaignId, updates) {
    try {
      const campaign = new Campaign(campaignId);
      const result = await campaign.update([], updates);
      return result;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  async deleteCampaign(campaignId) {
    try {
      const campaign = new Campaign(campaignId);
      const result = await campaign.delete();
      return result;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }

  // AdSet Management
  async createAdSet(campaignId, adSetData) {
    try {
      const campaign = new Campaign(campaignId);
      const adSet = await campaign.createAdSet([], {
        [AdSet.Fields.name]: adSetData.name,
        [AdSet.Fields.campaign_id]: campaignId,
        [AdSet.Fields.daily_budget]: adSetData.dailyBudget,
        [AdSet.Fields.billing_event]: adSetData.billingEvent || 'IMPRESSIONS',
        [AdSet.Fields.optimization_goal]: adSetData.optimizationGoal || 'CONVERSIONS',
        [AdSet.Fields.targeting]: adSetData.targeting,
        [AdSet.Fields.status]: adSetData.status || 'PAUSED',
      });

      return adSet;
    } catch (error) {
      console.error('Error creating AdSet:', error);
      throw error;
    }
  }

  async getAdSets(campaignId, fields = [AdSet.Fields.name, AdSet.Fields.status]) {
    try {
      const campaign = new Campaign(campaignId);
      const adSets = await campaign.getAdSets(fields);
      return adSets;
    } catch (error) {
      console.error('Error fetching AdSets:', error);
      throw error;
    }
  }

  // Ad Management
  async createAd(adSetId, adData) {
    try {
      const adSet = new AdSet(adSetId);
      
      // First create the ad creative
      const creative = await this.account.createAdCreative([], {
        [AdCreative.Fields.name]: `${adData.name} Creative`,
        [AdCreative.Fields.object_story_spec]: {
          page_id: adData.pageId,
          link_data: {
            image_hash: adData.imageHash,
            link: adData.link,
            message: adData.message,
            name: adData.headline,
            description: adData.description,
            call_to_action: {
              type: adData.callToAction || 'LEARN_MORE',
            },
          },
        },
      });

      // Then create the ad
      const ad = await adSet.createAd([], {
        [Ad.Fields.name]: adData.name,
        [Ad.Fields.adset_id]: adSetId,
        [Ad.Fields.creative]: { creative_id: creative.id },
        [Ad.Fields.status]: adData.status || 'PAUSED',
      });

      return ad;
    } catch (error) {
      console.error('Error creating Ad:', error);
      throw error;
    }
  }

  async getAds(adSetId, fields = [Ad.Fields.name, Ad.Fields.status]) {
    try {
      const adSet = new AdSet(adSetId);
      const ads = await adSet.getAds(fields);
      return ads;
    } catch (error) {
      console.error('Error fetching Ads:', error);
      throw error;
    }
  }

  // Image Management
  async uploadImage(imageUrl) {
    try {
      const adImage = new AdImage(null, this.accountId);
      const image = await adImage.create({
        [AdImage.Fields.filename]: imageUrl,
      });
      return image;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Targeting
  async createCustomAudience(audienceData) {
    try {
      const audience = await this.account.createCustomAudience([], {
        [CustomAudience.Fields.name]: audienceData.name,
        [CustomAudience.Fields.subtype]: audienceData.subtype || 'CUSTOM',
        [CustomAudience.Fields.description]: audienceData.description,
      });
      return audience;
    } catch (error) {
      console.error('Error creating custom audience:', error);
      throw error;
    }
  }

  // Performance Insights
  async getCampaignInsights(campaignId, fields = ['impressions', 'clicks', 'spend', 'conversions']) {
    try {
      const campaign = new Campaign(campaignId);
      const insights = await campaign.getInsights(fields, {
        time_range: {
          since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
          until: new Date().toISOString().split('T')[0], // today
        },
      });
      return insights;
    } catch (error) {
      console.error('Error fetching campaign insights:', error);
      throw error;
    }
  }

  async getAdSetInsights(adSetId, fields = ['impressions', 'clicks', 'spend', 'conversions']) {
    try {
      const adSet = new AdSet(adSetId);
      const insights = await adSet.getInsights(fields, {
        time_range: {
          since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          until: new Date().toISOString().split('T')[0],
        },
      });
      return insights;
    } catch (error) {
      console.error('Error fetching AdSet insights:', error);
      throw error;
    }
  }

  async getAdInsights(adId, fields = ['impressions', 'clicks', 'spend', 'conversions']) {
    try {
      const ad = new Ad(adId);
      const insights = await ad.getInsights(fields, {
        time_range: {
          since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          until: new Date().toISOString().split('T')[0],
        },
      });
      return insights;
    } catch (error) {
      console.error('Error fetching Ad insights:', error);
      throw error;
    }
  }

  // Account Information
  async getAccountInfo() {
    try {
      const accountInfo = await this.account.read([
        AdAccount.Fields.name,
        AdAccount.Fields.account_status,
        AdAccount.Fields.currency,
        AdAccount.Fields.timezone_name,
        AdAccount.Fields.amount_spent,
        AdAccount.Fields.balance,
      ]);
      return accountInfo;
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  // Pages
  async getPages() {
    try {
      const pages = await this.account.getAssignedUsers([
        'name',
        'access_token',
      ]);
      return pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }
}

// Utility functions
export function createTargeting(targetingData) {
  const targeting = new Targeting();
  
  if (targetingData.geoLocations) {
    targeting[Targeting.Fields.geo_locations] = targetingData.geoLocations;
  }
  
  if (targetingData.ageMin || targetingData.ageMax) {
    if (targetingData.ageMin) targeting[Targeting.Fields.age_min] = targetingData.ageMin;
    if (targetingData.ageMax) targeting[Targeting.Fields.age_max] = targetingData.ageMax;
  }
  
  if (targetingData.genders) {
    targeting[Targeting.Fields.genders] = targetingData.genders;
  }
  
  if (targetingData.interests) {
    targeting[Targeting.Fields.interests] = targetingData.interests;
  }
  
  if (targetingData.behaviors) {
    targeting[Targeting.Fields.behaviors] = targetingData.behaviors;
  }
  
  if (targetingData.customAudiences) {
    targeting[Targeting.Fields.custom_audiences] = targetingData.customAudiences;
  }
  
  return targeting;
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Facebook amounts are in cents
}

export function calculateMetrics(insights) {
  if (!insights || insights.length === 0) {
    return {
      impressions: 0,
      clicks: 0,
      spend: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      cpm: 0,
      roas: 0,
    };
  }

  const data = insights[0];
  const impressions = parseInt(data.impressions) || 0;
  const clicks = parseInt(data.clicks) || 0;
  const spend = parseFloat(data.spend) || 0;
  const conversions = parseInt(data.conversions) || 0;
  const conversionValue = parseFloat(data.conversion_values) || 0;

  return {
    impressions,
    clicks,
    spend,
    conversions,
    ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
    cpc: clicks > 0 ? spend / clicks : 0,
    cpm: impressions > 0 ? (spend / impressions) * 1000 : 0,
    roas: spend > 0 ? conversionValue / spend : 0,
  };
}