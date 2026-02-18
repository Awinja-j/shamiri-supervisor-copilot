import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { newStatus, notes } = body;

    if (!newStatus || !['SAFE', 'RISK'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be SAFE or RISK.' },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const latestAnalysis = session.analyses[0];

    if (!latestAnalysis) {
      return NextResponse.json(
        { error: 'No AI analysis found for this session' },
        { status: 404 }
      );
    }

    const supervisor = await prisma.supervisor.findFirst();

    if (!supervisor) {
      return NextResponse.json(
        { error: 'No supervisor found' },
        { status: 404 }
      );
    }

    const previousFlag = latestAnalysis.riskFlag;
    let action: string;

    if (previousFlag === newStatus) {
      action = 'VALIDATE'; 
    } else {
      action = 'REJECT'; 
    }

    const override = await prisma.supervisorOverride.create({
      data: {
        analysisId: latestAnalysis.id,
        supervisorId: supervisor.id,
        action,
        previousFlag,
        newFlag: newStatus,
        notes: notes || `Supervisor changed status from ${previousFlag} to ${newStatus}`,
      },
    });

    const sessionStatus = newStatus === 'SAFE' ? 'Safe' : 'Flagged for Review';
    
    await prisma.session.update({
      where: { id },
      data: { status: sessionStatus },
    });

    if (newStatus === 'RISK') {
      await prisma.riskFlag.upsert({
        where: {
          sessionId: id,
        },
        update: {
          resolved: false,
          resolvedBy: null,
          resolvedAt: null,
        },
        create: {
          sessionId: id,
          severity: latestAnalysis.riskSeverity || 'moderate',
          quotes: (latestAnalysis as any).riskQuotes || [],
        },
      });
    } else {
      // Mark risk flags as resolved
      await prisma.riskFlag.updateMany({
        where: { sessionId: id },
        data: {
          resolved: true,
          resolvedBy: supervisor.id,
          resolvedAt: new Date(),
        },
      });
    }

    console.log(`Override saved: ${previousFlag} → ${newStatus} by ${supervisor.name}`);

    return NextResponse.json({
      success: true,
      override: {
        id: override.id,
        action: override.action,
        previousFlag: override.previousFlag,
        newFlag: override.newFlag,
        notes: override.notes,
      },
      sessionStatus,
    });
  } catch (error) {
    console.error('Error creating override:', error);
    return NextResponse.json(
      { error: 'Failed to create override' },
      { status: 500 }
    );
  }
}