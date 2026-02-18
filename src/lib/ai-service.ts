import OpenAI from 'openai';
import { SessionAnalysis, SessionAnalysisSchema } from './analysis-schema';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant helping Shamiri supervisors review therapy sessions conducted by young Fellows (18-22 year old lay providers).

CRITICAL CONTEXT:
- Fellows are NOT trained therapists - they are lay providers delivering a structured Growth Mindset curriculum
- Sessions are with young people in Kenya (African context)
- Fellows should teach "Growth Mindset": the belief that abilities can be developed through dedication and hard work
- Key concepts: "brain is like a muscle", "learning from failure", "effort matters more than talent"

YOUR TASK:
Analyze the session transcript against THREE metrics:

METRIC 1 - Content Coverage (Did they teach Growth Mindset?):
- Score 3 (Complete): Explained concept clearly, gave examples, checked understanding
- Score 2 (Partial): Mentioned concept but moved on quickly without engagement
- Score 1 (Missed): Failed to mention Growth Mindset or defined it incorrectly

METRIC 2 - Facilitation Quality (How did they deliver?):
- Score 3 (Excellent): Warm, empathetic, asked open questions, validated feelings
- Score 2 (Adequate): Polite but transactional, stuck to script, minimal engagement
- Score 1 (Poor): Dominated conversation, interrupted, used confusing language

METRIC 3 - Protocol Safety (Did they stay within boundaries?):
- Score 3 (Adherent): Stayed focused on curriculum, handled distractions gracefully
- Score 2 (Minor Drift): Got distracted but brought it back to topic
- Score 1 (Violation): Gave unauthorized medical/relationship advice, strayed significantly off-topic

RISK ASSESSMENT - CRITICAL:
Only flag as RISK if there is EXPLICIT mention of:
- Self-harm with plan/intent
- Suicide with specificity
- Abuse currently happening

DO NOT flag:
- Past struggles mentioned in passing
- Hypothetical discussions
- Examples about "failing" or "hard times" (these are normal in Growth Mindset teaching)

FALSE POSITIVES ARE COSTLY - supervisors will become desensitized if you over-flag.

For each metric, provide:
1. Score (1, 2, or 3)
2. Evidence: 2-4 specific quotes or line references from the transcript
3. Reasoning: 2-3 sentences explaining your score

Provide a 3-sentence summary of the overall session quality.`;

export async function analyzeSessionTranscript(
  transcript: string,
  fellowName: string,
  groupId: string
): Promise<SessionAnalysis> {
  console.log(`Starting AI analysis for ${groupId} (${fellowName})...`);
  
  const startTime = Date.now();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Please analyze this therapy session transcript:

Fellow: ${fellowName}
Group: ${groupId}

TRANSCRIPT:
${transcript}

Respond with a JSON object matching this exact structure:
{
  "summary": "3-sentence summary",
  "contentCoverage": {
    "score": 1 | 2 | 3,
    "evidence": ["quote 1", "quote 2"],
    "reasoning": "explanation"
  },
  "facilitationQuality": {
    "score": 1 | 2 | 3,
    "evidence": ["quote 1", "quote 2"],
    "reasoning": "explanation"
  },
  "protocolSafety": {
    "score": 1 | 2 | 3,
    "evidence": ["quote 1", "quote 2"],
    "reasoning": "explanation"
  },
  "riskAssessment": {
    "flag": "SAFE" | "RISK",
    "severity": "none" | "moderate" | "severe",
    "confidence": 0.95,
    "quotes": ["concerning quote if any"],
    "reasoning": "explanation"
  }
}`,
        },
      ],
      temperature: 0.3, 
      response_format: { type: 'json_object' }, 
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    const rawAnalysis = JSON.parse(content);
    const validatedAnalysis = SessionAnalysisSchema.parse(rawAnalysis);

    const processingTime = Date.now() - startTime;
    console.log(`Analysis complete in ${processingTime}ms`);

    return validatedAnalysis;
  } catch (error: any) {
    console.error('AI analysis failed:', error);
    
    // Handle specific OpenAI errors
    if (error?.status === 429) {
      throw new Error('QUOTA_EXCEEDED: OpenAI API quota exceeded. Please add credits to your account or try again later.');
    }
    
    if (error?.status === 401) {
      throw new Error('AUTH_ERROR: Invalid OpenAI API key. Please check your configuration.');
    }
    
    if (error?.status === 500 || error?.status === 503) {
      throw new Error('SERVICE_ERROR: OpenAI service is temporarily unavailable. Please try again in a few minutes.');
    }
    
    // Generic error
    throw new Error(`AI_ERROR: ${error?.message || 'Unknown error occurred during analysis'}`);
    
    return {
      summary: 'Analysis failed. Please review manually or try again.',
      contentCoverage: {
        score: 2,
        evidence: ['Unable to extract evidence due to processing error'],
        reasoning: 'Manual review required - AI analysis encountered an error.',
      },
      facilitationQuality: {
        score: 2,
        evidence: ['Unable to extract evidence due to processing error'],
        reasoning: 'Manual review required - AI analysis encountered an error.',
      },
      protocolSafety: {
        score: 2,
        evidence: ['Unable to extract evidence due to processing error'],
        reasoning: 'Manual review required - AI analysis encountered an error.',
      },
      riskAssessment: {
        flag: 'SAFE',
        severity: 'none',
        confidence: 0.5,
        reasoning: 'Analysis incomplete - defaulting to safe. Manual review recommended.',
      },
    };
  }
}
