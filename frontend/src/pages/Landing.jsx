import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillNav from '../components/PillNav';
import MarketingFooter from '../components/MarketingFooter';
import { getPublicStats } from '../services/api';

const DEFAULT_STATS = {
  totalReports: 1248,
  resolved: 842,
  avgResolutionHours: 18,
  partnerWards: 14,
  activeReporters: 2400,
  topWards: [
    { ward: 'Ward 08', area: 'Thamel', resolved: 842, avgHours: 12 },
    { ward: 'Ward 03', area: 'Maharajgunj', resolved: 615, avgHours: 16 },
    { ward: 'Ward 10', area: 'Baneshwor', resolved: 498, avgHours: 19 },
  ],
};

export default function Landing() {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    getPublicStats()
      .then(res => {
        if (res.data) setStats({ ...DEFAULT_STATS, ...res.data });
      })
      .catch(() => {});
  }, []);

  const efficiency = stats.resolved && stats.totalReports
    ? Math.round((stats.resolved / stats.totalReports) * 100)
    : 94;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-on-surface font-body-md flex flex-col"
    >
      <PillNav />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary max-w-4xl mb-6">
          Cleaner Cities. <span className="text-gradient">Together.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
          Report waste problems. Track progress. Help build cleaner communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/submit"
            className="bg-primary-container text-on-primary rounded-full px-8 py-3 font-button text-button hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            Report an Issue <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <Link
            to="/how-it-works"
            className="bg-surface-container-highest text-primary rounded-full px-8 py-3 font-button text-button hover:bg-surface-variant transition-colors"
          >
            See How It Works
          </Link>
        </div>
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest bg-white p-2">
          <img
            alt="Municipal map dashboard showing active waste reports"
            className="w-full h-auto rounded-xl object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ItM8yYiNjmdaa9coKq4QREL3S9ZusZb5IPJ8WAV9bGzKITKv2qPgl7kmh_iCxzJFrjomSeyXVSRrq_lmh-6PrvYXoOpb_w-bGnvMSBKBHjshk4F8O7Fnk1EG6tD_VG_Op2W-W-t3XOHjpF98iH-BOYt6j2pZp75idKazzxT_neoWZ36dlrQMV3hCcKFYcMz7fr_wn2yRZ18fNwrsgT8uIB5MsRGjvk0A6wKUTsRlXcTXP2TzdkG3Ig"
          />
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="text-center font-label-caps text-label-caps text-outline mb-8">Built for faster, more transparent civic response.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <span className="font-button text-button text-primary">Real-time Reports</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <span className="font-button text-button text-primary">GPS-Based Location</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <span className="font-button text-button text-primary">Transparent Resolution</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section className="py-20 bg-primary-container text-on-primary-container">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl">recycling</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">
                {stats.resolved.toLocaleString()}
              </span>
              <span className="font-body-md text-body-md">Cleanups Completed</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl">group</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">
                {stats.activeReporters.toLocaleString()}+
              </span>
              <span className="font-body-md text-body-md">Active Citizen Reporters</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl">handshake</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">
                {stats.partnerWards}
              </span>
              <span className="font-body-md text-body-md">Partner Wards</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl">timer</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed font-bold">
                {Math.round(stats.avgResolutionHours || 0)}h
              </span>
              <span className="font-body-md text-body-md">Average Resolution Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Civic champions ── */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Civic Champions</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Top-performing wards leading the charge in civic response and cleanup efforts.</p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {(stats.topWards || []).map((w, i) => (
              <div key={w.ward} className="glass-card rounded-xl p-6 flex items-center justify-between border border-surface-variant transition-transform hover:-translate-y-1 duration-200">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-headline-md text-xl ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-primary'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-headline-md text-primary text-lg">{w.ward} — {w.area}</h3>
                    <p className="text-sm text-outline font-label-caps">Avg. Resolution: {Math.round(w.avgHours || 0)} Hours</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-container text-xl">{w.resolved.toLocaleString()}</div>
                  <div className="text-sm text-outline font-label-caps">Reports Resolved</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">See where the city needs attention.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">Turn historical reports into visual insights to identify recurring hotspots. Our data intelligence helps municipal leaders optimize waste collection routes, allocate resources effectively, and predict future maintenance needs before they become community issues.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
                <span className="text-on-surface">Real-time heatmapping of active civic reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
                <span className="text-on-surface">Historical trend analysis for resource allocation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
                <span className="text-on-surface">Predictive modeling for waste collection optimization</span>
              </li>
            </ul>
            <Link to="/features" className="inline-flex items-center gap-2 font-button text-button text-primary-container hover:text-primary transition-colors">
              Explore technical capabilities <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="order-1 md:order-2 relative">
            <img
              alt="Heatmap showing active and resolved civic reports"
              className="w-full rounded-2xl shadow-xl border border-outline-variant/30 relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyAVTDaLDVdwys9_w7MAfLAw9EnN21K4IW2qRP537nHR-ZyTWIXZenBhZXOioZ0mBg_ROQEgM5qr1N9Y8sZ6VAbuB4Fj6p8-H5JuDi7xcP0hN0eaDcnCrTHxgB5ohc3XYO1rnGpVvxNKnPbOof94M74YdZxubQat7pW6Ifk--6VCHbMyiauBGr4hQD6gErZbJMmwNP9zlAbRMThGRt6k_DCh8SHE7MKrSSGqxPFuBdySrqy8YPmZW8wg"
            />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-tertiary-fixed-dim/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* ── Open data transparency ── */}
      <section className="py-20 bg-surface-container text-on-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Open Data Transparency</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">We believe in making civic performance metrics visible to everyone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-2xl border border-outline-variant/30 flex flex-col justify-center items-center text-center">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Overall Cleanup Efficiency</h3>
              <div className="relative w-48 h-48 flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-surface-variant stroke-current" cx="50" cy="50" fill="transparent" r="45" strokeWidth="8" />
                  <circle
                    className="text-tertiary-container stroke-current"
                    cx="50" cy="50" fill="transparent" r="45"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * efficiency) / 100}
                    strokeLinecap="round" strokeWidth="8"
                  />
                </svg>
                <div className="absolute text-5xl font-display-lg text-primary font-bold">{efficiency}%</div>
              </div>
              <p className="text-on-surface-variant text-sm font-label-caps">Of all reported issues resolved within SLA.</p>
            </div>
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-6">Reports by Category</h3>
                <div className="space-y-6">
                  {(stats.categoryBreakdown || []).map((c, i) => (
                    <div key={c.category}>
                      <div className="flex justify-between mb-2">
                        <span className="font-button text-button text-on-surface capitalize">{c.category.replace('_', ' ')}</span>
                        <span className="font-button text-button text-primary">{c.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-3">
                        <div
                          className="bg-tertiary-container h-3 rounded-full"
                          style={{ width: `${Math.max(8, (c.count / (stats.maxCategory || 1)) * 100)}%`, opacity: 1 - i * 0.05 }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </motion.div>
  );
}