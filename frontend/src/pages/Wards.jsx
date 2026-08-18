import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getWardAnalytics } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';

const WARD_STATUS = w => {
  const rate = w.resolution_rate ?? 0;
  if (rate >= 80) return { label: 'Healthy', cls: 'bg-tertiary-fixed-dim/25 text-tertiary-container' };
  if (rate >= 55) return { label: 'Watch',  cls: 'bg-secondary-container text-on-secondary-container' };
  return { label: 'Critical', cls: 'bg-error-container text-on-error-container' };
};

const wardNumber = w => String(w.ward || '').replace(/ward\s*/i, '').trim();

export default function Wards() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
  const [wards,   setWards]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [sortBy,  setSortBy]  = useState('count');

  useEffect(() => {
    getWardAnalytics()
      .then(res => setWards(res.data.wards || []))
      .catch(err => {
        if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
        setError('Failed to load ward analytics.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const sorted = [...wards].sort((a, b) => {
    if (sortBy === 'count') return (b.count || 0) - (a.count || 0);
    if (sortBy === 'rate')  return (b.resolution_rate || 0) - (a.resolution_rate || 0);
    if (sortBy === 'time')  return (a.avg_resolution_hours ?? 999) - (b.avg_resolution_hours ?? 999);
    return 0;
  });

  const maxCount = Math.max(...wards.map(w => w.count || 0), 1);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <StaffSidebar user={user} />
      <StaffHeader user={user} />

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/30 md:hidden">
        <div className="flex justify-around items-center h-14">
          <Link to="/staff/dashboard" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-label-caps text-[10px]">Dashboard</span>
          </Link>
          <Link to="/staff/reports" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">assessment</span>
            <span className="font-label-caps text-[10px]">Reports</span>
          </Link>
          <Link to="/staff/wards" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
            <span className="font-label-caps text-[10px]">Wards</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span className="font-label-caps text-[10px]">Citizen</span>
          </Link>
        </div>
      </nav>

      <main className="md:pl-64 pt-20">
        <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary-container">leaderboard</span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Ward Performance</h1>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Live per-ward metrics: report volume, resolution rate and average cleanup time.</p>
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2.5 px-3 bg-surface-container-low rounded-xl border border-outline-variant/60 focus:border-tertiary-fixed-dim focus:ring-2 focus:ring-tertiary-fixed-dim/20 outline-none transition-all font-body-md text-body-md"
            >
              <option value="count">Sort: Most Reports</option>
              <option value="rate">Sort: Best Resolution Rate</option>
              <option value="time">Sort: Fastest Cleanup</option>
            </select>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20">
              {error}
            </motion.div>
          )}

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="font-body-md text-body-md text-on-surface-variant">Loading ward analytics...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="card-base rounded-xl p-8 text-center font-body-md text-body-md text-on-surface-variant">
              No ward data available yet.
            </div>
          ) : (
            <>
              {/* Summary strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'Total Wards', value: sorted.length, icon: 'map' },
                  { label: 'Healthy', value: sorted.filter(w => (w.resolution_rate ?? 0) >= 80).length, icon: 'check_circle', tone: 'text-tertiary-container' },
                  { label: 'Needs Attention', value: sorted.filter(w => (w.resolution_rate ?? 0) < 55).length, icon: 'warning', tone: 'text-error' },
                ].map(s => (
                  <div key={s.label} className="data-card p-stack-md">
                    <span className={`material-symbols-outlined text-[20px] ${s.tone || 'text-primary-container'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    <p className="font-display-lg-mobile text-[24px] font-extrabold text-primary mt-1">{s.value}</p>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Ward cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sorted.map((w, i) => {
                  const status = WARD_STATUS(w);
                  const rate = w.resolution_rate ?? 0;
                  const pct = Math.min(100, Math.round(((w.count || 0) / maxCount) * 100));
                  return (
                    <motion.div
                      key={w.ward || i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="card-base rounded-xl p-stack-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">
                            {wardNumber(w) || '—'}
                          </div>
                          <div>
                            <p className="font-button text-button font-bold text-primary">{w.ward ? `Ward ${wardNumber(w)}` : 'Unassigned'}</p>
                            <p className="font-label-caps text-label-caps text-on-surface-variant">{w.officer_name || 'No officer assigned'}</p>
                          </div>
                        </div>
                        <span className={`font-label-caps text-label-caps font-semibold px-2.5 py-1 rounded-full ${status.cls}`}>{status.label}</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Report Volume</span>
                          <span className="font-button text-button font-bold text-on-surface">{w.count ?? 0}</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30">
                        <div>
                          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Resolution Rate</p>
                          <p className="font-button text-button font-bold text-primary">{rate}%</p>
                        </div>
                        <div>
                          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Avg Cleanup</p>
                          <p className="font-button text-button font-bold text-primary">
                            {w.avg_resolution_hours != null ? `${Number(w.avg_resolution_hours).toFixed(1)}h` : '—'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}