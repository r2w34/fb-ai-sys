import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export class AIAdGenerator {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateCampaignContent(productData, targetAudience, campaignObjective) {
    const prompt = this.buildCampaignPrompt(productData, targetAudience, campaignObjective);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseCampaignResponse(text);
    } catch (error) {
      console.error('Error generating campaign content:', error);
      throw new Error('Failed to generate AI campaign content');
    }
  }

  async generateAdCreatives(productData, campaignTheme, adFormat = 'single_image') {
    const prompt = this.buildCreativePrompt(productData, campaignTheme, adFormat);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseCreativeResponse(text);
    } catch (error) {
      console.error('Error generating ad creatives:', error);
      throw new Error('Failed to generate AI ad creatives');
    }
  }

  async optimizeCampaign(campaignData, performanceMetrics) {
    const prompt = this.buildOptimizationPrompt(campaignData, performanceMetrics);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseOptimizationResponse(text);
    } catch (error) {
      console.error('Error generating optimization recommendations:', error);
      throw new Error('Failed to generate AI optimization recommendations');
    }
  }

  async generateTargetingRecommendations(productData, existingAudience) {
    const prompt = this.buildTargetingPrompt(productData, existingAudience);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseTargetingResponse(text);
    } catch (error) {
      console.error('Error generating targeting recommendations:', error);
      throw new Error('Failed to generate AI targeting recommendations');
    }
  }

  buildCampaignPrompt(productData, targetAudience, campaignObjective) {
    return `
You are an expert Facebook Ads strategist. Generate a comprehensive campaign strategy for the following product:

PRODUCT INFORMATION:
- Name: ${productData.title}
- Description: ${productData.description}
- Price: $${productData.price}
- Category: ${productData.productType}
- Tags: ${productData.tags?.join(', ')}

TARGET AUDIENCE: ${targetAudience}
CAMPAIGN OBJECTIVE: ${campaignObjective}

Please provide a detailed campaign strategy in the following JSON format:

{
  "campaignName": "Compelling campaign name",
  "campaignDescription": "Brief description of the campaign strategy",
  "budget": {
    "recommended": 50,
    "min": 20,
    "max": 200,
    "reasoning": "Explanation for budget recommendation"
  },
  "targeting": {
    "demographics": {
      "ageMin": 25,
      "ageMax": 55,
      "genders": ["male", "female"]
    },
    "interests": ["interest1", "interest2", "interest3"],
    "behaviors": ["behavior1", "behavior2"],
    "locations": ["United States", "Canada"]
  },
  "adSets": [
    {
      "name": "AdSet name",
      "targeting": "Specific targeting for this ad set",
      "budget": 25,
      "strategy": "Strategy explanation"
    }
  ],
  "keyMessages": [
    "Primary value proposition",
    "Secondary benefit",
    "Call to action"
  ],
  "timeline": {
    "duration": "2 weeks",
    "phases": ["Phase 1: Testing", "Phase 2: Scaling"]
  }
}

Focus on creating a data-driven strategy that maximizes ROI and conversion potential.
`;
  }

  buildCreativePrompt(productData, campaignTheme, adFormat) {
    return `
You are a creative director specializing in Facebook advertising. Generate compelling ad creatives for the following:

PRODUCT: ${productData.title}
DESCRIPTION: ${productData.description}
PRICE: $${productData.price}
CAMPAIGN THEME: ${campaignTheme}
AD FORMAT: ${adFormat}

Generate 3 different creative variations in the following JSON format:

{
  "creatives": [
    {
      "headline": "Attention-grabbing headline (max 40 characters)",
      "primaryText": "Compelling primary text (max 125 characters)",
      "description": "Supporting description (max 30 characters)",
      "callToAction": "SHOP_NOW",
      "imageDescription": "Detailed description of the ideal image/visual",
      "tone": "professional/casual/urgent/friendly",
      "targetEmotion": "excitement/curiosity/urgency/trust",
      "keyBenefits": ["benefit1", "benefit2", "benefit3"]
    }
  ],
  "testingStrategy": {
    "variables": ["headline", "image", "audience"],
    "successMetrics": ["CTR", "CPC", "Conversions"],
    "duration": "3-5 days per test"
  },
  "brandingGuidelines": {
    "colors": ["#primary", "#secondary"],
    "style": "modern/classic/bold/minimal",
    "messaging": "key brand message to maintain"
  }
}

Ensure all creatives are optimized for mobile viewing and comply with Facebook's advertising policies.
`;
  }

  buildOptimizationPrompt(campaignData, performanceMetrics) {
    return `
You are a Facebook Ads optimization expert. Analyze the following campaign performance and provide actionable recommendations:

CAMPAIGN DATA:
- Name: ${campaignData.name}
- Objective: ${campaignData.objective}
- Budget: $${campaignData.budget}
- Duration: ${campaignData.duration} days

PERFORMANCE METRICS:
- Impressions: ${performanceMetrics.impressions}
- Clicks: ${performanceMetrics.clicks}
- CTR: ${performanceMetrics.ctr}%
- CPC: $${performanceMetrics.cpc}
- CPM: $${performanceMetrics.cpm}
- Conversions: ${performanceMetrics.conversions}
- Spend: $${performanceMetrics.spend}
- ROAS: ${performanceMetrics.roas}

Provide optimization recommendations in the following JSON format:

{
  "overallAssessment": {
    "performance": "excellent/good/average/poor",
    "keyIssues": ["issue1", "issue2"],
    "opportunities": ["opportunity1", "opportunity2"]
  },
  "recommendations": [
    {
      "category": "targeting/creative/budget/bidding",
      "priority": "high/medium/low",
      "action": "Specific action to take",
      "reasoning": "Why this will improve performance",
      "expectedImpact": "Quantified expected improvement",
      "implementation": "Step-by-step implementation guide"
    }
  ],
  "budgetOptimization": {
    "currentAllocation": "Analysis of current budget distribution",
    "recommendedChanges": "Specific budget reallocation suggestions",
    "scalingOpportunities": "When and how to scale successful elements"
  },
  "nextSteps": {
    "immediate": ["action1", "action2"],
    "shortTerm": ["action1", "action2"],
    "longTerm": ["action1", "action2"]
  }
}

Focus on actionable insights that can be implemented immediately to improve campaign performance.
`;
  }

  buildTargetingPrompt(productData, existingAudience) {
    return `
You are a Facebook Ads targeting specialist. Analyze the product and suggest optimal targeting strategies:

PRODUCT INFORMATION:
- Name: ${productData.title}
- Description: ${productData.description}
- Price: $${productData.price}
- Category: ${productData.productType}

EXISTING AUDIENCE: ${JSON.stringify(existingAudience)}

Generate targeting recommendations in the following JSON format:

{
  "primaryAudiences": [
    {
      "name": "Audience segment name",
      "description": "Who this audience represents",
      "demographics": {
        "ageMin": 25,
        "ageMax": 45,
        "genders": ["all/male/female"]
      },
      "interests": ["interest1", "interest2"],
      "behaviors": ["behavior1", "behavior2"],
      "locations": ["country/region"],
      "estimatedReach": "1M-5M",
      "competitiveness": "low/medium/high"
    }
  ],
  "lookalikeSuggestions": [
    {
      "sourceAudience": "existing customers/website visitors",
      "percentage": "1%/2%/5%",
      "reasoning": "Why this lookalike will be effective"
    }
  ],
  "exclusions": [
    {
      "audience": "Who to exclude",
      "reason": "Why to exclude them"
    }
  ],
  "testingStrategy": {
    "approach": "How to test different audiences",
    "budget": "Budget allocation per audience",
    "duration": "Testing timeline",
    "successMetrics": ["CTR", "CPC", "Conversions"]
  }
}

Focus on audiences with high conversion potential and reasonable competition levels.
`;
  }

  parseCampaignResponse(text) {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error parsing campaign response:', error);
      // Return a fallback structure
      return {
        campaignName: 'AI Generated Campaign',
        campaignDescription: 'Campaign generated by AI',
        budget: { recommended: 50, min: 20, max: 200 },
        targeting: {
          demographics: { ageMin: 25, ageMax: 55, genders: ['all'] },
          interests: [],
          behaviors: [],
          locations: ['United States']
        },
        adSets: [],
        keyMessages: [],
        timeline: { duration: '2 weeks', phases: [] }
      };
    }
  }

  parseCreativeResponse(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error parsing creative response:', error);
      return {
        creatives: [{
          headline: 'Great Product!',
          primaryText: 'Discover amazing products at great prices.',
          description: 'Shop now!',
          callToAction: 'SHOP_NOW',
          imageDescription: 'Product image with clean background',
          tone: 'professional',
          targetEmotion: 'excitement',
          keyBenefits: []
        }],
        testingStrategy: {},
        brandingGuidelines: {}
      };
    }
  }

  parseOptimizationResponse(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error parsing optimization response:', error);
      return {
        overallAssessment: {
          performance: 'average',
          keyIssues: [],
          opportunities: []
        },
        recommendations: [],
        budgetOptimization: {},
        nextSteps: { immediate: [], shortTerm: [], longTerm: [] }
      };
    }
  }

  parseTargetingResponse(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error parsing targeting response:', error);
      return {
        primaryAudiences: [],
        lookalikeSuggestions: [],
        exclusions: [],
        testingStrategy: {}
      };
    }
  }
}

// Utility functions for AI-powered insights
export function analyzeProductForAds(product) {
  const analysis = {
    category: product.productType || 'general',
    pricePoint: categorizePrice(product.price),
    seasonality: detectSeasonality(product.title, product.tags),
    targetDemographics: inferDemographics(product),
    competitiveness: assessCompetitiveness(product),
  };

  return analysis;
}

function categorizePrice(price) {
  if (price < 25) return 'budget';
  if (price < 100) return 'mid-range';
  if (price < 500) return 'premium';
  return 'luxury';
}

function detectSeasonality(title, tags) {
  const seasonal = ['summer', 'winter', 'spring', 'fall', 'holiday', 'christmas', 'valentine'];
  const text = `${title} ${tags?.join(' ')}`.toLowerCase();
  
  for (const season of seasonal) {
    if (text.includes(season)) {
      return season;
    }
  }
  
  return 'year-round';
}

function inferDemographics(product) {
  const demographics = {
    ageMin: 18,
    ageMax: 65,
    genders: ['all'],
    interests: [],
  };

  // Basic demographic inference based on product type and tags
  const title = product.title?.toLowerCase() || '';
  const tags = product.tags?.join(' ').toLowerCase() || '';
  const text = `${title} ${tags}`;

  // Gender inference
  if (text.includes('women') || text.includes('ladies') || text.includes('female')) {
    demographics.genders = ['female'];
  } else if (text.includes('men') || text.includes('male') || text.includes('guys')) {
    demographics.genders = ['male'];
  }

  // Age inference
  if (text.includes('teen') || text.includes('young')) {
    demographics.ageMin = 13;
    demographics.ageMax = 24;
  } else if (text.includes('adult') || text.includes('professional')) {
    demographics.ageMin = 25;
    demographics.ageMax = 54;
  } else if (text.includes('senior') || text.includes('mature')) {
    demographics.ageMin = 55;
    demographics.ageMax = 65;
  }

  return demographics;
}

function assessCompetitiveness(product) {
  // Simple competitiveness assessment based on product characteristics
  const price = product.price || 0;
  const category = product.productType?.toLowerCase() || '';
  
  const highCompetitionCategories = ['clothing', 'electronics', 'beauty', 'fitness'];
  const isHighCompetition = highCompetitionCategories.some(cat => category.includes(cat));
  
  if (isHighCompetition && price < 50) return 'high';
  if (isHighCompetition && price < 200) return 'medium';
  return 'low';
}

export const aiGenerator = new AIAdGenerator();