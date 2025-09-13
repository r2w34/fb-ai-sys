#!/usr/bin/env node

// Test script to verify Gemini API integration
const axios = require('axios');

const GEMINI_API_KEY = "AIzaSyCOLsr0_ADY0Lsgs1Vl9TZattNpLBwyGlQ";
const GEMINI_TEXT_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

async function testGeminiConnection() {
  console.log("🧪 Testing Gemini API Connection...\n");

  try {
    const response = await axios.post(
      `${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: "Hello! Please respond with 'Gemini API connection successful!' to confirm the integration is working."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 100,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (text) {
      console.log("✅ Gemini API Connection: SUCCESS");
      console.log("📝 Response:", text);
      console.log();
    } else {
      console.log("❌ Gemini API Connection: FAILED - No response text");
      console.log("📄 Full response:", JSON.stringify(response.data, null, 2));
    }

  } catch (error) {
    console.log("❌ Gemini API Connection: FAILED");
    console.log("🚨 Error:", error.response?.data || error.message);
    console.log();
  }
}

async function testAdCopyGeneration() {
  console.log("🎯 Testing Ad Copy Generation...\n");

  const prompt = `
  Generate high-converting Facebook ad copy for the following product:

  Product Information:
  - Name: Premium Wireless Headphones
  - Price: $199
  - Description: Noise-canceling wireless headphones with 30-hour battery life
  - Category: Electronics

  Target Audience:
  - Age: 25-45
  - Interests: Music, Technology, Fitness
  - Location: United States

  Campaign Objective: CONVERSIONS

  Generate the following in JSON format:
  {
    "headlines": [3 compelling headlines, max 40 characters each],
    "primaryTexts": [3 primary text variations, max 125 characters each],
    "descriptions": [2 descriptions, max 30 words each],
    "callToActions": [2 CTA options]
  }

  Return only valid JSON.
  `;

  try {
    const response = await axios.post(
      `${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (text) {
      console.log("✅ Ad Copy Generation: SUCCESS");
      console.log("📝 Generated Content:");
      
      try {
        const parsed = JSON.parse(text);
        console.log("📋 Headlines:", parsed.headlines);
        console.log("📄 Primary Texts:", parsed.primaryTexts);
        console.log("📝 Descriptions:", parsed.descriptions);
        console.log("🎯 CTAs:", parsed.callToActions);
      } catch (parseError) {
        console.log("⚠️  JSON Parse Error - Raw response:");
        console.log(text);
      }
      console.log();
    } else {
      console.log("❌ Ad Copy Generation: FAILED - No response text");
    }

  } catch (error) {
    console.log("❌ Ad Copy Generation: FAILED");
    console.log("🚨 Error:", error.response?.data || error.message);
    console.log();
  }
}

async function testImageDescriptionEnhancement() {
  console.log("🖼️  Testing Image Description Enhancement...\n");

  const prompt = `
  Enhance this image description for professional advertising purposes:
  "A person wearing wireless headphones while working out at the gym"

  Style: lifestyle

  Create a detailed, professional image description that includes:
  - Specific visual elements and composition
  - Color palette and lighting
  - Emotional appeal and mood
  - Technical photography details
  - Brand-appropriate aesthetics

  The description should be suitable for high-converting Facebook/Instagram ads.
  Keep the description under 200 words but make it highly detailed and actionable.
  `;

  try {
    const response = await axios.post(
      `${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (text) {
      console.log("✅ Image Description Enhancement: SUCCESS");
      console.log("📝 Enhanced Description:");
      console.log(text);
      console.log();
    } else {
      console.log("❌ Image Description Enhancement: FAILED - No response text");
    }

  } catch (error) {
    console.log("❌ Image Description Enhancement: FAILED");
    console.log("🚨 Error:", error.response?.data || error.message);
    console.log();
  }
}

async function runAllTests() {
  console.log("🚀 Starting Gemini API Integration Tests\n");
  console.log("=" .repeat(50));
  
  await testGeminiConnection();
  await testAdCopyGeneration();
  await testImageDescriptionEnhancement();
  
  console.log("=" .repeat(50));
  console.log("✨ All tests completed!");
}

// Run the tests
runAllTests().catch(console.error);