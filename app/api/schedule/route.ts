import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import gingerMarketData from '../../../data/gingerMarketData.json';

// Initialize the AI SDK. It will throw if apiKey is empty, but we catch it here.
let ai: GoogleGenAI;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy-key' });
} catch (e) {
  console.warn("Failed to initialize GoogleGenAI initially:", e);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_ai_studio_key_here') {
      throw new Error("Missing or invalid API Key");
    }

    const body = await req.json();
    const { plotSize, estimatedTotalYieldKg, currentSpotPriceLkr, maturityWeek, weatherRisk } = body;

    const seedRhizomeRequiredKg = plotSize * 1500;
    const commercialYieldKg = Math.max(0, estimatedTotalYieldKg - seedRhizomeRequiredKg);

    const prompt = `
      You are an expert agronomist and supply chain analyst in Sri Lanka.
      Analyze this ginger farm data and provide a harvest and market dispatch schedule.

      Farm Variables:
      - Plot Size (acres): ${plotSize}
      - Estimated Total Yield (kg): ${estimatedTotalYieldKg}
      - Seed Rhizome Required (kg): ${seedRhizomeRequiredKg}
      - Usable Commercial Yield (kg): ${commercialYieldKg}
      - Current Spot Price (LKR/kg): ${currentSpotPriceLkr}
      - Maturity Week: ${maturityWeek}
      - Weather Risk: ${weatherRisk}

      HARTI Market Context:
      ${JSON.stringify(gingerMarketData, null, 2)}
      
      Generate a realistic and staged dispatch schedule that maximizes gross revenue while factoring in seed retention and weather risks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            marketAssessment: { type: "STRING" },
            seedStockStorageProtocol: { type: "STRING" },
            harvestSchedule: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  stage: { type: "STRING" },
                  timelineWindow: { type: "STRING" },
                  percentageCommercialStock: { type: "NUMBER" },
                  volumeKg: { type: "NUMBER" },
                  targetMarket: { type: "STRING" },
                  actionReasoning: { type: "STRING" }
                },
                required: ["stage", "timelineWindow", "percentageCommercialStock", "volumeKg", "targetMarket", "actionReasoning"]
              }
            },
            projectedGrossRevenueLkr: { type: "NUMBER" }
          },
          required: ["marketAssessment", "seedStockStorageProtocol", "harvestSchedule", "projectedGrossRevenueLkr"]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');

    return NextResponse.json({
      status: 'success',
      data: parsedJson
    });

  } catch (error) {
    console.error("API error:", error);
    
    // Read body if possible to calculate fallbacks
    let body: any = {};
    try {
      body = await req.clone().json();
    } catch(e) {
      // Ignored
    }

    const plotSize = body.plotSize || 0.5;
    const estimatedTotalYieldKg = body.estimatedTotalYieldKg || 3500;
    const currentSpotPriceLkr = body.currentSpotPriceLkr || 850;

    const seedRhizomeRequiredKg = plotSize * 1500;
    const commercialYieldKg = Math.max(0, estimatedTotalYieldKg - seedRhizomeRequiredKg);

    return NextResponse.json({
      status: 'fallback',
      fallbackNotice: 'AI inference service unreachable. Output generated via standard agronomic rules.',
      data: {
        marketAssessment: "Standard assessment due to unavailable AI service.",
        seedStockStorageProtocol: "Store seed rhizomes in a cool, dry, well-ventilated area.",
        harvestSchedule: [
          {
            stage: "Immediate Harvest",
            timelineWindow: "Week 1",
            percentageCommercialStock: 100,
            volumeKg: commercialYieldKg,
            targetMarket: "Nearest Wholesale Market",
            actionReasoning: "Fallback to immediate sale due to system unavailability."
          }
        ],
        projectedGrossRevenueLkr: commercialYieldKg * currentSpotPriceLkr
      }
    });
  }
}
