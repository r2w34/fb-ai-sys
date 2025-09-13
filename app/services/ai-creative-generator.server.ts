import { db } from "../db.server";
import { OpenAIService } from "./openai.server";
import axios from "axios";

export interface CreativeAssets {
  headlines: string[];
  primaryTexts: string[];
  descriptions: string[];
  callToActions: string[];
  images: GeneratedImage[];
  videos?: GeneratedVideo[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  style: 'product' | 'lifestyle' | 'abstract' | 'testimonial';
  dimensions: { width: number; height: number };
}

export interface GeneratedVideo {
  url: string;
  thumbnail: string;
  duration: number;
  style: 'product_demo' | 'lifestyle' | 'testimonial' | 'animated';
}

export interface CreativeVariation {
  id: string;
  headline: string;
  primaryText: string;
  description: string;
  callToAction: string;
  imageUrl: string;
  videoUrl?: string;
  performance?: {
    ctr: number;
    cpc: number;
    conversions: number;
    confidence: number;
  };
}

export interface CreativeTestResult {
  winningVariation: CreativeVariation;
  testResults: {
    variation: CreativeVariation;
    performance: {
      impressions: number;
      clicks: number;
      conversions: number;
      ctr: number;
      cpc: number;
      roas: number;
    };
    confidence: number;
  }[];
  recommendations: string[];
}

export class AICreativeGenerator {
  private openaiService: OpenAIService;

  constructor() {
    this.openaiService = new OpenAIService();
  }

  async generateCreativeAssets(
    shop: string,
    productData: any[],
    targetAudience: any,
    campaignObjective: string
  ): Promise<CreativeAssets> {
    
    // Generate text assets using AI
    const textAssets = await this.generateTextAssets(
      productData,
      targetAudience,
      campaignObjective
    );

    // Generate image assets
    const images = await this.generateImageAssets(
      productData,
      targetAudience,
      campaignObjective
    );

    // Generate video assets (if needed)
    const videos = await this.generateVideoAssets(
      productData,
      campaignObjective
    );

    return {
      headlines: textAssets.headlines,
      primaryTexts: textAssets.primaryTexts,
      descriptions: textAssets.descriptions,
      callToActions: textAssets.callToActions,
      images,
      videos
    };
  }

  private async generateTextAssets(
    productData: any[],
    targetAudience: any,
    objective: string
  ): Promise<{
    headlines: string[];
    primaryTexts: string[];
    descriptions: string[];
    callToActions: string[];
  }> {
    
    const productInfo = productData.map(p => ({
      name: p.title,
      price: p.price,
      description: p.description,
      benefits: this.extractProductBenefits(p)
    }));

    const audienceInfo = {
      age: `${targetAudience.age_min}-${targetAudience.age_max}`,
      interests: targetAudience.interests || [],
      behaviors: targetAudience.behaviors || []
    };

    const prompt = `
    Generate high-converting Facebook ad copy for ${objective} campaigns.
    
    Products:
    ${productInfo.map(p => `- ${p.name}: $${p.price}\n  Benefits: ${p.benefits.join(', ')}`).join('\n')}
    
    Target Audience:
    - Age: ${audienceInfo.age}
    - Interests: ${audienceInfo.interests.join(', ')}
    - Behaviors: ${audienceInfo.behaviors.join(', ')}
    
    Generate:
    1. 10 compelling headlines (max 40 characters each)
    2. 10 primary text variations (max 125 characters each)
    3. 5 descriptions (max 30 words each)
    4. 5 call-to-action options
    
    Focus on:
    - Emotional triggers and pain points
    - Social proof and urgency
    - Clear value propositions
    - Action-oriented language
    
    Format as JSON with arrays for each type.
    `;

    try {
      const response = await this.openaiService.generateText(prompt);
      const parsed = JSON.parse(response);
      
      return {
        headlines: parsed.headlines || this.getDefaultHeadlines(productData),
        primaryTexts: parsed.primaryTexts || this.getDefaultPrimaryTexts(productData),
        descriptions: parsed.descriptions || this.getDefaultDescriptions(productData),
        callToActions: parsed.callToActions || this.getDefaultCTAs()
      };
    } catch (error) {
      console.error('Error generating text assets:', error);
      return {
        headlines: this.getDefaultHeadlines(productData),
        primaryTexts: this.getDefaultPrimaryTexts(productData),
        descriptions: this.getDefaultDescriptions(productData),
        callToActions: this.getDefaultCTAs()
      };
    }
  }

  private async generateImageAssets(
    productData: any[],
    targetAudience: any,
    objective: string
  ): Promise<GeneratedImage[]> {
    
    const images: GeneratedImage[] = [];

    // Generate different styles of images
    const styles = ['product', 'lifestyle', 'abstract', 'testimonial'] as const;
    
    for (const style of styles) {
      try {
        const imagePrompt = this.createImagePrompt(productData[0], style, targetAudience);
        const imageUrl = await this.generateImageWithAI(imagePrompt);
        
        images.push({
          url: imageUrl,
          prompt: imagePrompt,
          style,
          dimensions: { width: 1200, height: 628 } // Facebook recommended size
        });
      } catch (error) {
        console.error(`Error generating ${style} image:`, error);
      }
    }

    // Add square versions for Instagram
    for (const style of ['product', 'lifestyle']) {
      try {
        const imagePrompt = this.createImagePrompt(productData[0], style, targetAudience, 'square');
        const imageUrl = await this.generateImageWithAI(imagePrompt);
        
        images.push({
          url: imageUrl,
          prompt: imagePrompt,
          style,
          dimensions: { width: 1080, height: 1080 } // Instagram square
        });
      } catch (error) {
        console.error(`Error generating square ${style} image:`, error);
      }
    }

    return images;
  }

  private createImagePrompt(
    product: any,
    style: 'product' | 'lifestyle' | 'abstract' | 'testimonial',
    audience: any,
    format: 'landscape' | 'square' = 'landscape'
  ): string {
    
    const baseProduct = `${product.title} - ${product.description?.substring(0, 100)}`;
    const ageGroup = audience.age_min < 30 ? 'young adults' : 
                    audience.age_min < 50 ? 'middle-aged adults' : 'mature adults';

    switch (style) {
      case 'product':
        return `Professional product photography of ${baseProduct}, clean white background, studio lighting, high quality, commercial photography, ${format} composition, 4K resolution`;
      
      case 'lifestyle':
        return `Lifestyle photography showing ${ageGroup} using ${baseProduct}, natural lighting, authentic moment, modern setting, aspirational lifestyle, ${format} composition, professional photography`;
      
      case 'abstract':
        return `Modern abstract design featuring ${product.title}, vibrant colors, geometric shapes, contemporary art style, ${format} composition, suitable for social media advertising`;
      
      case 'testimonial':
        return `Happy customer testimonial scene with ${baseProduct}, genuine smile, authentic setting, positive emotion, ${format} composition, natural lighting, professional quality`;
      
      default:
        return `High-quality image of ${baseProduct}, professional photography, ${format} composition`;
    }
  }

  private async generateImageWithAI(prompt: string): Promise<string> {
    try {
      // Using OpenAI DALL-E API for image generation
      const response = await this.openaiService.generateImage(prompt);
      return response.url;
    } catch (error) {
      console.error('Error generating image with AI:', error);
      // Return placeholder image URL
      return `https://via.placeholder.com/1200x628/007bff/ffffff?text=${encodeURIComponent('Generated Ad Image')}`;
    }
  }

  private async generateVideoAssets(
    productData: any[],
    objective: string
  ): Promise<GeneratedVideo[]> {
    
    // For now, return placeholder videos
    // In production, this would integrate with video generation APIs
    return [
      {
        url: 'https://example.com/product-demo.mp4',
        thumbnail: 'https://via.placeholder.com/1200x628/007bff/ffffff?text=Product+Demo',
        duration: 15,
        style: 'product_demo'
      },
      {
        url: 'https://example.com/lifestyle-video.mp4',
        thumbnail: 'https://via.placeholder.com/1200x628/28a745/ffffff?text=Lifestyle+Video',
        duration: 30,
        style: 'lifestyle'
      }
    ];
  }

  async createCreativeVariations(
    assets: CreativeAssets,
    maxVariations: number = 10
  ): Promise<CreativeVariation[]> {
    
    const variations: CreativeVariation[] = [];
    
    // Create combinations of text and visual assets
    for (let i = 0; i < Math.min(maxVariations, assets.headlines.length); i++) {
      const variation: CreativeVariation = {
        id: `variation_${i + 1}`,
        headline: assets.headlines[i % assets.headlines.length],
        primaryText: assets.primaryTexts[i % assets.primaryTexts.length],
        description: assets.descriptions[i % assets.descriptions.length],
        callToAction: assets.callToActions[i % assets.callToActions.length],
        imageUrl: assets.images[i % assets.images.length]?.url || '',
        videoUrl: assets.videos?.[i % (assets.videos?.length || 1)]?.url
      };
      
      variations.push(variation);
    }

    return variations;
  }

  async runCreativeTest(
    campaignId: string,
    variations: CreativeVariation[],
    testBudget: number,
    testDuration: number = 7 // days
  ): Promise<CreativeTestResult> {
    
    // Create test ads for each variation
    const testResults = [];
    
    for (const variation of variations) {
      // Create ad in Facebook
      const adData = {
        name: `Creative Test - ${variation.id}`,
        adSetId: 'test_adset', // Would be actual ad set ID
        creative: {
          title: variation.headline,
          body: variation.primaryText,
          image_url: variation.imageUrl,
          link_url: 'https://shop-url.com',
          call_to_action_type: variation.callToAction
        }
      };

      // Simulate test results (in production, this would be real data)
      const performance = {
        impressions: Math.floor(Math.random() * 10000) + 1000,
        clicks: Math.floor(Math.random() * 500) + 50,
        conversions: Math.floor(Math.random() * 50) + 5,
        ctr: 0,
        cpc: 0,
        roas: 0
      };

      performance.ctr = (performance.clicks / performance.impressions) * 100;
      performance.cpc = testBudget / performance.clicks;
      performance.roas = (performance.conversions * 50) / testBudget; // Assuming $50 AOV

      testResults.push({
        variation,
        performance,
        confidence: this.calculateStatisticalConfidence(performance)
      });
    }

    // Find winning variation
    const winningResult = testResults.reduce((best, current) => 
      current.performance.roas > best.performance.roas ? current : best
    );

    // Generate recommendations
    const recommendations = this.generateCreativeRecommendations(testResults);

    return {
      winningVariation: winningResult.variation,
      testResults,
      recommendations
    };
  }

  private calculateStatisticalConfidence(performance: any): number {
    // Simplified confidence calculation based on sample size
    const sampleSize = performance.impressions;
    
    if (sampleSize > 5000) return 0.95;
    if (sampleSize > 2000) return 0.85;
    if (sampleSize > 1000) return 0.75;
    return 0.65;
  }

  private generateCreativeRecommendations(testResults: any[]): string[] {
    const recommendations: string[] = [];
    
    // Analyze winning patterns
    const sortedResults = testResults.sort((a, b) => b.performance.roas - a.performance.roas);
    const topPerformers = sortedResults.slice(0, 3);
    
    // Headline analysis
    const topHeadlines = topPerformers.map(r => r.variation.headline);
    if (topHeadlines.some(h => h.includes('!'))) {
      recommendations.push('Headlines with exclamation marks perform better');
    }
    
    // CTA analysis
    const topCTAs = topPerformers.map(r => r.variation.callToAction);
    const mostCommonCTA = this.getMostCommon(topCTAs);
    if (mostCommonCTA) {
      recommendations.push(`"${mostCommonCTA}" CTA shows best performance`);
    }

    // Performance insights
    const avgROAS = testResults.reduce((sum, r) => sum + r.performance.roas, 0) / testResults.length;
    if (avgROAS > 2.0) {
      recommendations.push('Overall creative performance is strong - consider scaling');
    } else if (avgROAS < 1.0) {
      recommendations.push('Creative performance needs improvement - test new angles');
    }

    return recommendations;
  }

  private getMostCommon(arr: string[]): string | null {
    const counts: { [key: string]: number } = {};
    arr.forEach(item => counts[item] = (counts[item] || 0) + 1);
    
    let maxCount = 0;
    let mostCommon = null;
    
    for (const [item, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = item;
      }
    }
    
    return mostCommon;
  }

  // Helper methods for default content
  private extractProductBenefits(product: any): string[] {
    const benefits = [];
    const description = product.description?.toLowerCase() || '';
    
    // Extract common benefit keywords
    if (description.includes('free shipping')) benefits.push('Free Shipping');
    if (description.includes('guarantee')) benefits.push('Money-Back Guarantee');
    if (description.includes('quality')) benefits.push('High Quality');
    if (description.includes('fast')) benefits.push('Fast Delivery');
    if (description.includes('easy')) benefits.push('Easy to Use');
    
    return benefits.length > 0 ? benefits : ['Premium Quality', 'Great Value'];
  }

  private getDefaultHeadlines(productData: any[]): string[] {
    const product = productData[0];
    return [
      `Get ${product?.title} Now!`,
      `Limited Time Offer`,
      `Don't Miss Out`,
      `Exclusive Deal`,
      `Save Big Today`,
      `Premium Quality`,
      `Best Price Guaranteed`,
      `Free Shipping`,
      `Order Now`,
      `Special Discount`
    ];
  }

  private getDefaultPrimaryTexts(productData: any[]): string[] {
    const product = productData[0];
    return [
      `Discover amazing ${product?.title} at unbeatable prices. Limited time offer!`,
      `Transform your life with our premium products. Shop now and save!`,
      `Join thousands of satisfied customers. Order today!`,
      `Premium quality meets affordable prices. Don't wait!`,
      `Exclusive offer just for you. Limited stock available!`,
      `Get the best deals on top-rated products. Free shipping!`,
      `Why pay more? Get premium quality for less!`,
      `Customer favorite! Highly rated and recommended.`,
      `Flash sale! Save up to 50% on selected items.`,
      `Risk-free purchase with money-back guarantee.`
    ];
  }

  private getDefaultDescriptions(productData: any[]): string[] {
    return [
      'Premium quality guaranteed',
      'Free shipping worldwide',
      '30-day money-back guarantee',
      'Thousands of happy customers',
      'Limited time special offer'
    ];
  }

  private getDefaultCTAs(): string[] {
    return [
      'SHOP_NOW',
      'LEARN_MORE',
      'GET_OFFER',
      'ORDER_NOW',
      'SAVE_NOW'
    ];
  }
}