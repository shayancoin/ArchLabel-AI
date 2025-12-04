export interface Dimensions {
  width: number;
  depth: number;
  height: number;
}

export interface UnitSpec {
  id: string;
  defaultName: string;
  dimensions: Dimensions;
  features: string[];
  description: string;
}

export interface NamingStrategy {
  strategyName: string;
  description: string;
  type1Label: string;
  type2Label: string;
  rationale: string;
}

export interface AnalysisResponse {
  analysis: string;
  strategies: NamingStrategy[];
}

export enum GenerationStyle {
  TECHNICAL = "Technical Precision",
  LUXURY = "High-End Luxury",
  MINIMALIST = "Modern Minimalist",
  EXPERIENTIAL = "Lifestyle & Experience"
}