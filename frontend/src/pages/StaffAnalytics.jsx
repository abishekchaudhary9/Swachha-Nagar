// Page: Staff Analytics
// Desktop-first — reports by category, resolution time, hotspot wards, daily trend
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAnalytics } from '../services/api';

import { ThemeToggle } from '../context/ThemeContext';

const CATEGORY_COLORS = {

  organic:      'bg-primary',
  plastic:      'bg-secondary',
  e_waste:      'bg-tertiary',
  construction: 'bg-outline',
  other:        'bg-surface-container-highest',
};

export default function StaffAnalytics() {
  const navigate  = useNavigate();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    getAnalytics()
      .then(res => setData(res.data))
      .catch(err => {
        if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
        setError('Failed to load analytics.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading analytics…</div>;

  const maxCategory = data ? Math.max(...data.reportsByCategory.map(c => c.count), 1) : 1;
  const maxWard     = data ? Math.max(...data.hotspotWards.map(w => w.count), 1)     : 1;

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Nav */}
      <header className="bg-secondary text-on-secondary px-md md:px-xl py-md flex items-center justify-between shadow-card-admin">
        <div className="flex items-center gap-md">
          <Link 
            to="/staff/dashboard" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-headline-md font-semibold">Analytics</h1>
        </div>
        <ThemeToggle />
      </header>


      <div className="px-md md:px-xl py-md md:py-lg">
        {error && <div className="p-sm rounded-md bg-error-container text-on-error-container text-label-md mb-md">{error}</div>}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">

            {/* KPI: Avg Resolution */}
            <div className="card-admin flex flex-col items-center justify-center text-center py-xl">
              <p className="text-label-sm text-outline uppercase tracking-widest mb-sm">Avg Resolution Time</p>
              <p className="text-display-lg text-secondary font-bold">
                {data.avgResolutionHours != null ? `${Math.round(data.avgResolutionHours)}h` : '—'}
              </p>
              <p className="text-label-md text-on-surface-variant mt-xs">from submission to resolved</p>
            </div>

            {/* Status breakdown */}
            <div className="card-admin">
              <h2 className="text-headline-md mb-md">Status Breakdown</h2>
              <div className="flex flex-col gap-sm">
                {data.statusBreakdown.map(s => (
                  <div key={s.status} className="flex items-center justify-between">
                    <span className="text-label-md capitalize">{s.status.replace('_',' ')}</span>
                    <span className="text-body-md font-semibold text-on-surface">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports by category */}
            <div className="card-admin md:col-span-2 xl:col-span-1">
              <h2 className="text-headline-md mb-md">Reports by Category</h2>
              <div className="flex flex-col gap-md">
                {data.reportsByCategory.map(c => (
                  <div key={c.category}>
                    <div className="flex justify-between text-label-md mb-xs">
                      <span className="capitalize">{c.category.replace('_',' ')}</span>
                      <span className="font-semibold">{c.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className={`h-full rounded-full ${CATEGORY_COLORS[c.category] || 'bg-outline'} transition-all duration-700`}
                        style={{ width: `${(c.count / maxCategory) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotspot wards */}
            <div className="card-admin md:col-span-2">
              <h2 className="text-headline-md mb-md">Hotspot Wards (Top 10)</h2>
              {data.hotspotWards.length === 0 ? (
                <p className="text-on-surface-variant text-label-md">No ward data yet.</p>
              ) : (
                <div className="flex flex-col gap-md">
                  {data.hotspotWards.map((w, i) => (
                    <div key={w.ward}>
                      <div className="flex justify-between text-label-md mb-xs">
                        <span>#{i+1} {w.ward}</span>
                        <span className="font-semibold">{w.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full rounded-full bg-tertiary transition-all duration-700"
                          style={{ width: `${(w.count / maxWard) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Daily trend (last 30 days) */}
            <div className="card-admin md:col-span-2 xl:col-span-3">
              <h2 className="text-headline-md mb-md">Daily Reports — Last 30 Days</h2>
              {data.dailyTrend.length === 0 ? (
                <p className="text-on-surface-variant text-label-md">No trend data yet.</p>
              ) : (
                <div className="flex items-end gap-1 h-32 overflow-x-auto">
                  {(() => {
                    const maxDay = Math.max(...data.dailyTrend.map(d => d.count), 1);
                    return data.dailyTrend.map(d => (
                      <div key={d.date} className="flex flex-col items-center gap-xs shrink-0" title={`${d.date}: ${d.count}`}>
                        <div
                          className="w-4 rounded-t bg-secondary transition-all duration-500"
                          style={{ height: `${(d.count / maxDay) * 112}px` }}
                        />
                        <span className="text-label-sm text-outline" style={{ writingMode: 'vertical-rl', fontSize: '10px' }}>
                          {d.date.slice(5)}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
