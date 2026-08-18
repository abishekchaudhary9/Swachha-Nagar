import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillNav from '../components/PillNav';
import MarketingFooter from '../components/MarketingFooter';

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-on-surface font-body-md flex flex-col"
    >
      <PillNav />

      <main className="flex-grow glass-nav-container">
        {/* Hero */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 text-center">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-md">Technical Capabilities</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A civic platform engineered for accuracy, speed and transparency — from GPS-tagged reports to predictive analytics.
          </p>
        </section>

        {/* Feature grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Hero card (2 span) */}
            <div className="md:col-span-2 feature-card rounded-xl p-stack-lg relative overflow-hidden group">
              <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_ItM8yYiNjmdaa9coKq4QREL3S9ZusZb5IPJ8WAV9bGzKITKv2qPgl7kmh_iCxzJFrjomSeyXVSRrq_lmh-6PrvYXoOpb_w-bGnvMSBKBHjshk4F8O7Fnk1EG6tD_VG_Op2W-W-t3XOHjpF98iH-BOYt6j2pZp75idKazzxT_neoWZ36dlrQMV3hCcKFYcMz7fr_wn2yRZ18fNwrsgT8uIB5MsRGjvk0A6wKUTsRlXcTXP2TzdkG3Ig')" }}></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
                  <span className="material-symbols-outlined text-primary-container">location_on</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-base">Precision Geo-Reporting</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md max-w-md">
                  Every report is pinned with high-accuracy GPS and verified against recent duplicates, so crews go to the right spot every time.
                </p>
                <div className="mt-auto flex flex-wrap gap-3">
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded uppercase">Live Sync</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container text-on-surface rounded uppercase">Sub-meter Accuracy</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container text-on-surface rounded uppercase">Duplicate Detection</span>
                </div>
              </div>
            </div>

            {/* Single card */}
            <div className="feature-card rounded-xl p-stack-lg relative overflow-hidden group">
              <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
                <span className="material-symbols-outlined text-primary-container">photo_camera</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-base">Visual Evidence & Proof-of-Work</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                Citizens attach photos; crews upload proof-of-work photos on resolution. Both are stored with EXIF audit trails.
              </p>
              <div className="mt-auto">
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Photo Capture Rate</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">98%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-primary-container h-full rounded-full w-[98%] relative">
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-tertiary-fixed animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <Link to="/submit" className="inline-flex items-center gap-2 font-button text-button text-primary-container hover:text-primary">
                  Try it now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Horizontal card */}
            <div className="md:col-span-3 feature-card rounded-xl p-stack-lg flex flex-col md:flex-row gap-stack-lg items-center">
              <div className="flex-1">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
                  <span className="material-symbols-outlined text-primary-container">visibility</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-base">Transparency & Trust</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md max-w-md">
                  Every status change is logged publicly with timestamps and responsible staff. Citizens can dispute incomplete work at any time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded uppercase">Public Timeline</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container text-on-surface rounded uppercase">Dispute System</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container text-on-surface rounded uppercase">Email Notifications</span>
                </div>
              </div>
              <div className="flex-1 w-full relative h-48 bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6ulGAmLnedayfiiFqI9Pfj9FVXdxEf6hRghUJbretrqId8H_SblrAj6-cB9VuxdbEHlUcdGbFGJhCKipgk2yht2kLRnzfaAIGvDw_HONb0ZMyJ_EWuA1qXUggNcxo5sbLfMRStxbA4V45YAecfTddN3cwomRnTf5ueJLwi0MEwbsZX8oRQHwgJwVERvX1xyXyJh9QrLBuXSKUx2ywBqO2nz1Kii52bJGQLhL3UpuNYbO2K_-wndGX7w')" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats: Transparency & Trust */}
        <section className="py-stack-lg md:py-24 border-t border-outline-variant">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-stack-lg">
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Transparency & Trust</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Publicly verifiable metrics — because civic trust is earned with data.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Bar chart card */}
              <div className="feature-card rounded-xl p-stack-md h-64 flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
                  <span className="font-button text-button text-primary">Resolution Time by Category</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">Last 30 Days</span>
                </div>
                <div className="flex-grow flex items-end gap-2 justify-between pt-4">
                  {[
                    { label: 'Organic', h: 60, tooltip: '8 hrs' },
                    { label: 'Plastic', h: 40, tooltip: '12 hrs', active: true },
                    { label: 'E-waste', h: 75, tooltip: '6 hrs' },
                    { label: 'Construction', h: 30, tooltip: '18 hrs' },
                    { label: 'Other', h: 50, tooltip: '10 hrs' },
                  ].map(bar => (
                    <div key={bar.label} className={`w-1/6 relative group ${bar.active ? 'bg-primary-container h-[40%] rounded-t' : 'bg-primary-container/20 hover:bg-primary-container/40 h-[0%] rounded-t'}`} style={bar.active ? {} : { height: `${bar.h}%` }}>
                      {bar.active && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-caps text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {bar.tooltip}
                        </div>
                      )}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SVG line chart card */}
              <div className="feature-card rounded-xl p-stack-md h-64 flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
                  <span className="font-button text-button text-primary">Reported vs Resolved Trend</span>
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">YTD</span>
                </div>
                <div className="flex-grow relative">
                  <svg preserveAspectRatio="none" viewBox="0 0 100 50" className="w-full h-full">
                    <path d="M0,40 C10,38 15,30 25,28 C35,26 40,32 50,25 C60,18 70,22 80,15 C88,10 95,12 100,8" fill="none" stroke="#0B3D32" strokeWidth="2" />
                    <path d="M0,45 C12,42 18,36 30,33 C42,30 48,34 60,28 C72,22 80,26 90,20 C95,17 98,18 100,15" fill="none" stroke="#65D6B0" strokeWidth="2" strokeDasharray="4" />
                  </svg>
                  <div className="absolute bottom-2 right-2 flex gap-4 bg-white/80 dark:bg-inverse-surface/80 backdrop-blur px-2 py-1 rounded border border-surface-variant">
                    <span className="flex items-center gap-1 font-label-caps text-[10px] text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Reported
                    </span>
                    <span className="flex items-center gap-1 font-label-caps text-[10px] text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span> Resolved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </motion.div>
  );
}