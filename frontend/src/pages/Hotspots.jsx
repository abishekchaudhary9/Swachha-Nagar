import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getHotspots } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';

const TREND_TONE = t => {
  if (t === 'rising')   return { label: 'RISING',   cls: 'bg-error-container text-on-error-container' };
  if (t === 'declining') return { label: 'DECLINING', cls: 'bg-tertiary-fixed-dim/25 text-tertiary-container' };
  return { label: 'STABLE', cls: 'bg-surface-container-high text-on-surface-variant' };
};

export default function Hotspots() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
  const [hotspots, setHotspots] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    getHotspots()
      .then(res => setHotspots(res.data.hotspots || []))
      .catch(err => {
        if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
        setError('Failed to load hotspot analysis.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const maxDensity = Math.max(...hotspots.map(h => h.density || 0), 1);

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
          <Link to="/staff/fleet" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            <span className="font-label-caps text-[10px]">Fleet</span>
          </Link>
          <Link to="/staff/hotspots" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
            <span className="font-label-caps text-[10px]">Hotspots</span>
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
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary-container">radar</span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Hotspot Analysis</h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">High-density waste zones identified from report clustering — with trend forecasts.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20">
              {error}
            </motion.div>
          )}

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="font-body-md text-body-md text-on-surface-variant">Clustering reports...</p>
            </div>
          ) : hotspots.length === 0 ? (
            <div className="card-base rounded-xl p-8 text-center font-body-md text-body-md text-on-surface-variant">
              No hotspots detected yet.
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'Active Hotspots', value: hotspots.length, icon: 'radar' },
                  { label: 'Rising Risk', value: hotspots.filter(h => h.trend === 'rising').length, icon: 'trending_up', tone: 'text-error' },
                  { label: 'Avg Resolution Rate', value: `${Math.round(hotspots.reduce((a, h) => a + Number(h.resolution_rate || 0), 0) / Math.max(hotspots.length, 1))}%`, icon: 'check_circle', tone: 'text-tertiary-container' },
                ].map(s => (
                  <div key={s.label} className="data-card p-stack-md">
                    <span className={`material-symbols-outlined text-[20px] ${s.tone || 'text-primary-container'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    <p className="font-display-lg-mobile text-[24px] font-extrabold text-primary mt-1">{s.value}</p>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Hotspot cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {hotspots.map((h, i) => {
                  const tr = TREND_TONE(h.trend);
                  const pct = Math.min(100, Math.round(((h.density || 0) / maxDensity) * 100));
                  return (
                    <motion.div
                      key={h.id || i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="card-base rounded-xl p-stack-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim/25 text-tertiary-container flex items-center justify-center">
                            <span className="material-symbols-outlined">location_on</span>
                          </div>
                          <div>
                            <p className="font-button text-button font-bold text-primary">{h.name || `Zone ${h.ward || i + 1}`}</p>
                            <p className="font-label-caps text-label-caps text-on-surface-variant">Ward {h.ward || '—'}</p>
                          </div>
                        </div>
                        <span className={`font-label-caps text-label-caps font-semibold px-2.5 py-1 rounded-full ${tr.cls}`}>{tr.label}</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Report Density</span>
                          <span className="font-button text-button font-bold text-on-surface">{h.density ?? 0} reports</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30">
                        <div>
                          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">7-Day Forecast</p>
                          <p className="font-button text-button font-bold text-primary">{h.forecast ?? '—'} reports</p>
                        </div>
                        <div>
                          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Resolution Rate</p>
                          <p className="font-button text-button font-bold text-primary">{h.resolution_rate ?? 0}%</p>
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