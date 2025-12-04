import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UnitSpec, AnalysisResponse, GenerationStyle } from "../types";

const getNamingSchema = (): Schema => {
  return {
    type: Type.OBJECT,
    properties: {
      analysis: {
        type: Type.STRING,
        description: "A precision-level analysis of the dimensional and functional differences between the units, referencing the aspect ratios and volume.",
      },
      strategies: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            strategyName: { type: Type.STRING, description: "The name of the naming strategy (e.g., 'Functional', 'Aspirational')" },
            description: { type: Type.STRING, description: "Short description of the strategy's intent." },
            type1Label: { type: Type.STRING, description: "Proposed label for the single unit." },
            type2Label: { type: Type.STRING, description: "Proposed label for the double/pocket unit." },
            rationale: { type: Type.STRING, description: "Why these names work together mathematically and semantically." },
          },
          required: ["strategyName", "description", "type1Label", "type2Label", "rationale"],
        },
      },
    },
    required: ["analysis", "strategies"],
  };
};

export const generateMarketingLabels = async (
  units: UnitSpec[],
  style: GenerationStyle
): Promise<AnalysisResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a World-Class Lead Architect and Marketing Strategist for a luxury kitchen brand (e.g., Poliform, Boffi, Bulthaup).
    
    Task: Propose optimal marketing nomenclature (labels) for two specific kitchen column units.
    
    Context:
    We have two technical drawings.
    
    Unit 1 (${units[0].defaultName}):
    - Dimensions: W:${units[0].dimensions.width}mm x D:${units[0].dimensions.depth}mm x H:${units[0].dimensions.height}mm.
    - Features: ${units[0].features.join(", ")}.
    - Description: ${units[0].description}.
    
    Unit 2 (${units[1].defaultName}):
    - Dimensions: W:${units[1].dimensions.width}mm x D:${units[1].dimensions.depth}mm x H:${units[1].dimensions.height}mm.
    - Features: ${units[1].features.join(", ")}.
    - Description: ${units[1].description}.
    
    Key Differentiator:
    Unit 2 is approximately double the width of Unit 1. It uses a "Pocket Door" mechanism (doors slide into the cabinet walls), revealing an internal workspace (countertop, drawers, shelving). It is designed to hide appliances (coffee machine, bar) when closed.
    
    Goal:
    Generate 3 distinct naming strategies based on the requested style: "${style}".
    
    Requirements:
    1. Analyze the dimensional relationship (approx 1:2 ratio) and functional depth.
    2. Suggest names that sound expensive, precise, and curated.
    3. Ensure the names form a cohesive system (family of products).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: getNamingSchema(),
        systemInstruction: "You are an expert in luxury furniture branding and architectural nomenclature.",
        temperature: 0.7, 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResponse;
    } else {
        throw new Error("No text returned from Gemini");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};