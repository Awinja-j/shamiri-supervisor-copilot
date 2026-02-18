import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeSessionTranscript } from '@/lib/ai-service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startTime = Date.now();

  try {
    const session = await (prisma.session as any).findUnique({
      where: { id },
      include: { fellow: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const analysis = await analyzeSessionTranscript(
      session.transcript,
      session.fellow.name,
      session.groupId
    );

    const processingTime = Date.now() - startTime;

    const savedAnalysis = await (prisma.aIAnalysis as any).create({
      data: {
        sessionId: id,
        modelVersion: 'gpt-4o',
        summary: analysis.summary,
        contentScore: analysis.contentCoverage.score,
        contentEvidence: analysis.contentCoverage.evidence,
        contentReasoning: analysis.contentCoverage.reasoning,
        facilitationScore: analysis.facilitationQuality.score,
        facilitationEvidence: analysis.facilitationQuality.evidence,
        facilitationReasoning: analysis.facilitationQuality.reasoning,
        protocolScore: analysis.protocolSafety.score,
        protocolEvidence: analysis.protocolSafety.evidence,
        protocolReasoning: analysis.protocolSafety.reasoning,
        riskFlag: analysis.riskAssessment.flag,
        riskSeverity: analysis.riskAssessment.severity ?? 'none',
        riskConfidence: analysis.riskAssessment.confidence,
        riskQuotes: (analysis.riskAssessment as any).quotes || [],
        riskReasoning: analysis.riskAssessment.reasoning,
        processingTimeMs: processingTime,
        rawOutput: JSON.stringify(analysis),
      },
    });

    await (prisma.session as any).update({
      where: { id },
      data: {
        status: analysis.riskAssessment.flag === 'RISK'
          ? 'Flagged for Review'
          : 'Safe',
      },
    });

    if (analysis.riskAssessment.flag === 'RISK') {
      await (prisma.riskFlag as any).create({
        data: {
          sessionId: id,
          severity: analysis.riskAssessment.severity ?? 'moderate',
          quotes: (analysis.riskAssessment as any).quotes || [],
        },
      });
    }

    return NextResponse.json({
      success: true,
      sessionId: id,
      analysisId: savedAnalysis.id,
      analysis,
      processingTimeMs: processingTime,
      analyzedAt: savedAnalysis.createdAt,
    });
    
  } catch (error: any) {
    console.error('Error analyzing session:', error);
    
    const errorMessage = error?.message || 'Unknown error';
    
    if (errorMessage.includes('QUOTA_EXCEEDED')) {
      return NextResponse.json(
        { 
          error: 'OpenAI API Quota Exceeded',
          message: 'The AI analysis service has reached its usage limit. Please contact your administrator to add API credits.',
          userMessage: '⚠️ AI service quota exceeded. Please try again later or contact support.',
        },
        { status: 429 }
      );
    }
    
    if (errorMessage.includes('AUTH_ERROR')) {
      return NextResponse.json(
        { 
          error: 'Authentication Error',
          message: 'Invalid OpenAI API key configuration.',
          userMessage: 'Authentication error. Please contact your administrator.',
        },
        { status: 401 }
      );
    }
    
    if (errorMessage.includes('SERVICE_ERROR')) {
      return NextResponse.json(
        { 
          error: 'Service Unavailable',
          message: 'OpenAI service is temporarily unavailable.',
          userMessage: 'AI service is temporarily unavailable. Please try again in a few minutes.',
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Analysis Failed',
        message: errorMessage,
        userMessage: 'Analysis failed. Please try again or contact support if the issue persists.',
      },
      { status: 500 }
    );
  }
}