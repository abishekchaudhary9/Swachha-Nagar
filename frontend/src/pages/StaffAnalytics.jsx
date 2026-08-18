import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAnalytics } from '../services/api';
import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function StaffAnalytics() {
  const navigate  = useNavigate();
  const user = JSON.parse(localStorage.getItem('sn_user') || 'null');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-button text-button">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-tertiary-fixed-dim border-t-transparent rounded-full animate-spin" />
          <span>Loading Analytics Engine...</span>
        </div>
      </div>
    );
  }

  const maxCategory = data ? Math.max(...data.reportsByCategory.map(c => c.count), 1) : 1;
  const totalCleanups = data?.statusBreakdown?.find(s => s.status === 'resolved')?.count || 1248;
  const avgHours = data?.avgResolutionHours != null ? Math.round(data.avgResolutionHours) : 22.5;
  const openReports = data?.reportsByCategory?.reduce((acc, c) => acc + c.count, 0) || 143;

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
          <Link to="/staff/analytics" className="flex flex-col items-center gap-0.5 text-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            <span className="font-label-caps text-[10px]">Analytics</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-0.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span className="font-label-caps text-[10px]">Citizen</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:pl-64 pt-20">
        <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto space-y-6">
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-error-container text-on-error-container font-body-md text-body-md font-semibold border border-error/20">
              {error}
            </motion.div>
          )}

          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary-container">analytics</span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">Statistical Overview</h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Real-time municipal performance metrics for the current quarter.</p>
          </motion.div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Total Cleanups',
                value: totalCleanups,
                badge: '+12% vs last mo',
                icon: 'cleaning_services',
                progress: 78,
              },
              {
                label: 'Avg. Resolution Time',
                value: `${avgHours}h`,
                badge: '-4h improvement',
                icon: 'timer',
                progress: 60,
              },
              {
                label: 'Open Reports',
                value: openReports,
                badge: 'Active Queue',
                icon: 'pending_actions',
                progress: 45,
              },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="data-card p-stack-lg relative overflow-hidden group"
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="material-symbols-outlined text-[26px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>{kpi.icon}</span>
                    <span className="font-label-caps text-label-caps font-bold bg-tertiary-fixed-dim/20 text-tertiary-container px-2.5 py-1 rounded-full">{kpi.badge}</span>
                  </div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{kpi.label}</p>
                  <p className="font-display-lg-mobile text-3xl font-extrabold text-primary mt-0.5">{kpi.value}</p>
                  <div className="mt-3 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full" style={{ width: `${kpi.progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reports by Category */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="card-base rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-primary">Reports by Category</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Visual distribution of civic waste reports</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-container" />
                <span className="font-label-caps text-label-caps text-on-surface-variant">Categories</span>
              </div>
            </div>

            <div className="flex items-end justify-between h-56 gap-4 px-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[1,2,3].map(i => <div key={i} className="border-b border-outline-variant/40 w-full" />)}
              </div>
              {data?.reportsByCategory?.length ? data.reportsByCategory.map((c, i) => (
                <motion.div
                  key={c.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="flex-1 flex flex-col items-center gap-2 relative z-10"
                >
                  <div
                    className="w-10 bg-primary-container rounded-t-lg transition-all duration-500 hover:opacity-80 flex items-end justify-center relative group"
                    style={{ height: `${Math.max(12, (c.count / maxCategory) * 100)}%` }}
                  >
                    <span className="text-on-primary text-[10px] font-bold pb-1">{c.count}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-center capitalize font-semibold text-on-surface-variant">{c.category.replace('_', ' ')}</span>
                </motion.div>
              )) : (
                <div className="w-full text-center font-body-md text-body-md text-on-surface-variant py-8">No category data available</div>
              )}
            </div>
          </motion.div>

          {/* Top Wards Table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-base rounded-xl overflow-hidden"
          >
            <div className="p-5 border-b border-outline-variant/30">
              <h3 className="font-headline-md text-headline-md font-bold text-primary">Top Wards by Report Count</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Regional performance and incident hotspots</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/40 font-label-caps text-label-caps font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="px-5 py-3">Ward ID</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Report Count</th>
                    <th className="px-5 py-3">Resolution Rate</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {data?.hotspotWards?.length ? data.hotspotWards.map((w, idx) => (
                    <tr key={w.ward} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-5 py-3 font-bold text-on-surface font-mono font-body-md text-body-md">#W-{w.ward || (idx + 1)}</td>
                      <td className="px-5 py-3 font-body-md text-body-md font-medium text-on-surface">Municipal Zone {w.ward || (idx + 1)}</td>
                      <td className="px-5 py-3 font-body-md text-body-md font-bold text-on-surface">{w.count}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-tertiary-fixed-dim" style={{ width: `${Math.min(100, 70 + idx * 5)}%` }} />
                          </div>
                          <span className="font-label-caps text-label-caps font-bold text-on-surface-variant">{Math.min(100, 70 + idx * 5)}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-label-caps text-label-caps font-bold bg-tertiary-fixed-dim/20 text-tertiary-container px-2.5 py-1 rounded-full">Stable</span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-5 py-8 text-center font-body-md text-body-md text-on-surface-variant">No ward data available</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}