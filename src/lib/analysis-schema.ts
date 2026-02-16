// src/lib/analysis-schema.ts
import { z } from 'zod';

// Schema for a single metric evaluation
export const MetricEvaluationSchema = z.object({
  score: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  evidence: z.array(z.string()).min(1).max(5),
  reasoning: z.string().min(50).max(500),
});

// Schema for risk assessment
export const RiskAssessmentSchema = z.object({
  flag: z.enum(['SAFE', 'RISK']),
  severity: z.enum(['none', 'moderate', 'severe']).optional(),
  confidence: z.number().min(0).max(1),
  quotes: z.array(z.string()).optional(),
  reasoning: z.string().min(20).max(500),
});

// Complete analysis schema
export const SessionAnalysisSchema = z.object({
  summary: z.string().min(100).max(500),
  
  contentCoverage: MetricEvaluationSchema,
  facilitationQuality: MetricEvaluationSchema,
  protocolSafety: MetricEvaluationSchema,
  
  riskAssessment: RiskAssessmentSchema,
});

// TypeScript type inferred from schema
export type SessionAnalysis = z.infer<typeof SessionAnalysisSchema>;