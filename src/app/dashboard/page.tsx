// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Session = {
  id: string;
  fellowName: string;
  groupId: string;
  sessionDate: Date;
  durationMinutes: number;
  status: 'Safe' | 'Flagged for Review' | 'Processing';
  riskLevel: 'none' | 'moderate' | 'severe';
};

export default function DashboardPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'safe'>('all');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    if (filter === 'flagged') return session.status === 'Flagged for Review';
    if (filter === 'safe') return session.status === 'Safe';
    return true;
  });

  const flaggedCount = sessions.filter(s => s.status === 'Flagged for Review').length;
  const safeCount = sessions.filter(s => s.status === 'Safe').length;
  const processingCount = sessions.filter(s => s.status === 'Processing').length;

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'Flagged for Review':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Safe':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getRiskIcon = (riskLevel: Session['riskLevel']) => {
    switch (riskLevel) {
      case 'severe':
        return '🚨';
      case 'moderate':
        return '⚠️';
      default:
        return '✅';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sessions...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shamiri Supervisor Copilot</h1>
              <p className="text-sm text-gray-600 mt-1">Dr. Kamau Mwangi</p>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Sessions</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{sessions.length}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600">Flagged for Review</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{flaggedCount}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600">Safe Sessions</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{safeCount}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600">Processing</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{processingCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sessions ({sessions.length})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'flagged'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🚨 Flagged ({flaggedCount})
            </button>
            <button
              onClick={() => setFilter('safe')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'safe'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✅ Safe ({safeCount})
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fellow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSessions.map((session) => (
                  <tr
                    key={session.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      session.status === 'Flagged for Review' ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                        {getRiskIcon(session.riskLevel)} {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{session.fellowName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{session.groupId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(session.sessionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{session.durationMinutes} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/session/${session.id}`}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No sessions found with the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}