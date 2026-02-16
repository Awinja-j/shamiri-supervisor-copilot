// src/app/session/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Analysis = {
  summary: string;
  contentCoverage: {
    score: number;
    evidence: string[];
    reasoning: string;
  };
  facilitationQuality: {
    score: number;
    evidence: string[];
    reasoning: string;
  };
  protocolSafety: {
    score: number;
    evidence: string[];
    reasoning: string;
  };
  riskAssessment: {
    flag: 'SAFE' | 'RISK';
    severity?: string;
    confidence: number;
    quotes?: string[];
  };
};

type SessionDetail = {
  id: string;
  fellowName: string;
  groupId: string;
  sessionDate: Date;
  durationMinutes: number;
  status: string;
  analysis?: Analysis;
};

export default function SessionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideNotes, setOverrideNotes] = useState('');

  useEffect(() => {
    fetchSession();
  }, [sessionId]);
  
  const [analyzing, setAnalyzing] = useState(false);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      const data = await response.json();
      setSession(data);
    } catch (error) {
      console.error('Failed to fetch session:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAIAnalysis = async () => {
  setAnalyzing(true);
  try {
    const response = await fetch(`/api/sessions/${sessionId}/analyze`, {
      method: 'POST',
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ AI Analysis:', data);
      // Refresh the session data
      await fetchSession();
      alert('AI Analysis Complete! Check the console for results.');
    } else {
      alert('Analysis failed. Check console for errors.');
    }
  } catch (error) {
    console.error('Analysis error:', error);
    alert('Analysis failed. Check console for errors.');
  } finally {
    setAnalyzing(false);
  }
};

  const getScoreColor = (score: number) => {
    if (score === 3) return 'text-green-600 bg-green-50';
    if (score === 2) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score === 3) return 'Complete';
    if (score === 2) return 'Partial';
    return 'Missed';
  };

  const handleOverride = async (newStatus: 'SAFE' | 'RISK') => {
    // In production, this would call an API
    console.log('Override:', { sessionId, newStatus, notes: overrideNotes });
    alert(`Session marked as ${newStatus}. In production, this would update the database.`);
    setShowOverrideModal(false);
    setOverrideNotes('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Session Not Found</h2>
          <Link href="/dashboard" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-medium">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Session {session.groupId}</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Fellow</div>
              <div className="text-lg font-semibold text-gray-900">{session.fellowName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Group ID</div>
              <div className="text-lg font-semibold text-gray-900">{session.groupId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Date</div>
              <div className="text-lg font-semibold text-gray-900">
                {new Date(session.sessionDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="text-lg font-semibold text-gray-900">{session.durationMinutes} minutes</div>
            </div>
          </div>
        </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-blue-900">Real-Time AI Analysis</h3>
            <p className="text-sm text-blue-700 mt-1">
              Click to run live AI analysis on this transcript
            </p>
          </div>
          <button
            onClick={runAIAnalysis}
            disabled={analyzing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Run AI Analysis'
            )}
          </button>
        </div>
      </div>

        {!session.analysis ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 font-medium">⏳ AI Analysis in Progress</p>
            <p className="text-yellow-700 text-sm mt-2">This session is currently being analyzed. Check back in a few minutes.</p>
          </div>
        ) : (
          <>
            {/* Risk Alert (if flagged) */}
            {session.analysis.riskAssessment.flag === 'RISK' && (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🚨</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-red-900 mb-2">URGENT: Risk Detected</h2>
                    <p className="text-red-800 font-medium mb-4">
                      This session contains concerning content that requires immediate attention.
                    </p>
                    {session.analysis.riskAssessment.quotes && (
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Concerning Quotes:</div>
                        {session.analysis.riskAssessment.quotes.map((quote, idx) => (
                          <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-3 mb-2 text-sm text-red-900">
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowOverrideModal(true)}
                        className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                      >
                        Review & Override
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Escalate to Emergency Protocol
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">AI Summary</h2>
              <p className="text-gray-700 leading-relaxed">{session.analysis.summary}</p>
              <div className="mt-4 text-sm text-gray-500">
                AI Confidence: {(session.analysis.riskAssessment.confidence * 100).toFixed(0)}%
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Metric 1: Content Coverage */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Content Coverage</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(session.analysis.contentCoverage.score)}`}>
                    {session.analysis.contentCoverage.score}/3 - {getScoreLabel(session.analysis.contentCoverage.score)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{session.analysis.contentCoverage.reasoning}</p>
                <div className="border-t pt-3">
                  <div className="text-xs font-medium text-gray-600 mb-2">Evidence:</div>
                  <ul className="space-y-1">
                    {session.analysis.contentCoverage.evidence.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metric 2: Facilitation Quality */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Facilitation Quality</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(session.analysis.facilitationQuality.score)}`}>
                    {session.analysis.facilitationQuality.score}/3 - {getScoreLabel(session.analysis.facilitationQuality.score)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{session.analysis.facilitationQuality.reasoning}</p>
                <div className="border-t pt-3">
                  <div className="text-xs font-medium text-gray-600 mb-2">Evidence:</div>
                  <ul className="space-y-1">
                    {session.analysis.facilitationQuality.evidence.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metric 3: Protocol Safety */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Protocol Safety</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(session.analysis.protocolSafety.score)}`}>
                    {session.analysis.protocolSafety.score}/3 - {getScoreLabel(session.analysis.protocolSafety.score)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{session.analysis.protocolSafety.reasoning}</p>
                <div className="border-t pt-3">
                  <div className="text-xs font-medium text-gray-600 mb-2">Evidence:</div>
                  <ul className="space-y-1">
                    {session.analysis.protocolSafety.evidence.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Safe Status */}
            {session.analysis.riskAssessment.flag === 'SAFE' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">✅</div>
                  <div>
                    <h3 className="font-bold text-green-900">Session Marked Safe</h3>
                    <p className="text-green-700 text-sm mt-1">No safety concerns detected in this session.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Override AI Assessment</h2>
            <p className="text-gray-600 mb-4">
              You are about to override the AI's risk assessment. Please provide your reasoning.
            </p>
            
            <textarea
              value={overrideNotes}
              onChange={(e) => setOverrideNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your notes here..."
            />

            <div className="flex gap-3">
              <button
                onClick={() => handleOverride('SAFE')}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Mark as Safe
              </button>
              <button
                onClick={() => handleOverride('RISK')}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Confirm Risk
              </button>
              <button
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}