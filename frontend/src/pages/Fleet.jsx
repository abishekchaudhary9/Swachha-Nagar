import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFleet } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';

const UNIT_STATUS = {
  on_route:   { label: 'ON ROUTE',   cls: 'status-dispatched' },
  active:     { label: 'ACTIVE',     cls: 'status-resolved' },
  maintenance:{ label: 'MAINTENANCE', cls: 'bg-surface-container-high text-on-surface-variant' },
  off_duty:   { label: 'OFF DUTY',   cls: 'bg-outline-variant/40 text-outline' },
};

export default function Fleet() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
  const [units,   setUnits]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    getFleet()
      .then(res => setUnits(res.data.units || []))
      .catch(err => {
        if (err.response?.status === 401) { localStorage.clear(); navigate('/staff/login'); }
        setError('Failed to load fleet data.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const onRoute = units.filter(u => u.status === 'on_route').length;

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
          <Link to="/staff/fleet" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            <span className="font-label-caps text-[10px]">Fleet</span>
          </Link>
          <Link to="/staff/hotspots" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">radar</span>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary-container">local_shipping</span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Fleet Monitor</h1>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Cleanup crews, vehicles and live assignment status across the city.</p>
            </div>
            <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              {onRoute} on route now
            </span>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20">
              {error}
            </motion.div>
          )}

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="font-body-md text-body-md text-on-surface-variant">Loading fleet telemetry...</p>
            </div>
          ) : units.length === 0 ? (
            <div className="card-base rounded-xl p-8 text-center font-body-md text-body-md text-on-surface-variant">
              No fleet units registered yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {units.map((u, i) => {
                const st = UNIT_STATUS[u.status] || UNIT_STATUS.off_duty;
                const progress = Math.min(100, u.load ?? 0);
                return (
                  <motion.div
                    key={u.id || i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="card-base rounded-xl p-stack-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/40">
                          <span className="material-symbols-outlined text-primary-container">local_shipping</span>
                        </div>
                        <div>
                          <p className="font-button text-button font-bold text-primary">{u.name || `Unit #${u.id}`}</p>
                          <p className="font-label-caps text-label-caps text-on-surface-variant">{u.vehicle || 'Collection Vehicle'}</p>
                        </div>
                      </div>
                      <span className={`font-label-caps text-label-caps status-chip ${st.cls}`}>{st.label}</span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current Load</span>
                        <span className="font-button text-button font-bold text-on-surface">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30">
                      <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Ward</p>
                        <p className="font-button text-button font-bold text-primary">{u.ward || 'City-wide'}</p>
                      </div>
                      <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Active Report</p>
                        <p className="font-button text-button font-bold text-primary truncate">
                          {u.current_tracking_code ? `#${u.current_tracking_code}` : 'Standby'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}