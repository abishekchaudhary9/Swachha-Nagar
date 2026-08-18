import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillNav from '../components/PillNav';
import MarketingFooter from '../components/MarketingFooter';

export default function ForMunicipalities() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-on-surface font-body-md flex flex-col"
    >
      <PillNav />

      <main className="flex-grow pt-[120px] pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Hero */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-stack-lg mb-stack-lg mt-stack-lg">
          <div className="md:w-1/2 space-y-stack-md">
            <span className="inline-flex items-center gap-2 bg-tertiary-container/10 px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-primary-container text-sm">verified_user</span>
              <span className="font-label-caps text-label-caps text-primary-container uppercase">Enterprise Civic Solution</span>
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              Engineering <span className="text-primary-container">Efficiency</span> for Modern Municipalities.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Give your city a unified command center for waste management — live reporting, ward analytics, fleet tracking and citizen transparency in one platform.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/for-municipalities#contact"
                onClick={e => {
                  const el = document.getElementById('contact');
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                }}
                className="bg-primary-container text-on-primary font-button text-button px-8 py-3 rounded-lg hover:scale-95 shadow-md transition-transform"
              >
                Request a Demo
              </Link>
              <Link to="/how-it-works" className="bg-white border border-outline-variant text-primary font-button text-button px-8 py-3 rounded-lg hover:bg-surface-container-low transition-colors">
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 w-full relative">
            <div className="absolute inset-0 bg-primary-fixed-dim/20 blur-3xl rounded-full transform -translate-x-10 translate-y-10 z-0"></div>
            <div className="glass-card rounded-xl p-2 z-10 relative border-white/60">
              <img
                alt="Municipal command center dashboard"
                className="w-full rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ItM8yYiNjmdaa9coKq4QREL3S9ZusZb5IPJ8WAV9bGzKITKv2qPgl7kmh_iCxzJFrjomSeyXVSRrq_lmh-6PrvYXoOpb_w-bGnvMSBKBHjshk4F8O7Fnk1EG6tD_VG_Op2W-W-t3XOHjpF98iH-BOYt6j2pZp75idKazzxT_neoWZ36dlrQMV3hCcKFYcMz7fr_wn2yRZ18fNwrsgT8uIB5MsRGjvk0A6wKUTsRlXcTXP2TzdkG3Ig"
              />
            </div>
          </div>
        </section>

        {/* Centralized Command Center */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          <div className="md:col-span-2 glass-card rounded-xl p-stack-md flex flex-col justify-between overflow-hidden relative group">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Centralized Command Center</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                All municipal reports, ward performance and team dispatch live on one real-time map.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-surface-variant relative h-[250px]">
              <img
                alt="Command center map"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500 w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEceaZUwf6ZHorBkbRAaFHoFoF2BQ-6vQ7WQbZSM0tGZ2M4OoaUMnaBM8nN-e8oTL0EWpQaAohZ5niZZihnT-spwSjNyQvKFEUqidUH6y-4s3goDtwMj5s7qTdS7y42nGRZJlOG_qGQ9U-hVYKWYKDwrHn_QCezcOOAY5FHJMSET2PNqW16jFskouK0_RifaTfgwjbV9aV7D9TrUj6L75KGPUebIXWGFDZok-04XxXixzXgjoHhY5IG_-b-E1mkrQ38gi0uo3nTEk"
              />
              <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">radar</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Hotspot Coverage</p>
                    <p className="font-body-md text-body-md text-primary font-bold">All wards mapped</p>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-2 py-1 rounded-md">Live</span>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-stack-md flex flex-col justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Predictive Maintenance</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                Historical data forecasts which wards need attention before issues escalate.
              </p>
              <div className="flex items-center justify-between bg-surface p-4 rounded-lg border border-surface-variant mb-4">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Avg. Resolution</p>
                  <p className="font-headline-md text-headline-md text-primary">4.2 Days</p>
                </div>
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-3xl">trending_down</span>
              </div>
            </div>
            <div>
              <div className="mt-4 pt-4 border-t border-surface-variant">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">System Accuracy</span>
                  <span className="font-label-caps text-label-caps text-primary-container font-bold">94%</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-1.5">
                  <div className="bg-tertiary-fixed h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Optimization */}
        <section className="bg-white rounded-2xl p-stack-lg md:p-stack-lg mb-stack-lg border border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary">Resource Optimization</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Route crews smarter, cut fuel costs, and improve response times with data-driven dispatch.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'route', title: 'Optimized collection routes', sub: 'Cluster nearby reports into single crew visits.' },
                  { icon: 'groups', title: 'Workload-balanced teams', sub: 'Assign based on live capacity and ward load.' },
                  { icon: 'speed', title: 'SLA-backed response tracking', sub: 'Automated alerts when reports approach deadlines.' },
                  { icon: 'analytics', title: 'Ward-level KPIs', sub: 'Resolution rates, hotspots and trends per ward.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-0.5">{item.icon}</span>
                    <div>
                      <strong className="font-body-md text-body-md text-primary block">{item.title}</strong>
                      <span className="text-sm text-on-surface-variant">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-surface-variant">
                <img
                  alt="Ward heatmap"
                  className="w-full h-72 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyAVTDaLDVdwys9_w7MAfLAw9EnN21K4IW2qRP537nHR-ZyTWIXZenBhZXOioZ0mBg_ROQEgM5qr1N9Y8sZ6VAbuB4Fj6p8-H5JuDi7xcP0hN0eaDcnCrTHxgB5ohc3XYO1rnGpVvxNKnPbOof94M74YdZxubQat7pW6Ifk--6VCHbMyiauBGr4hQD6gErZbJMmwNP9zlAbRMThGRt6k_DCh8SHE7MKrSSGqxPFuBdySrqy8YPmZW8wg"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Fleet Efficiency</p>
                  <p className="font-body-md text-body-md text-primary font-bold">+28% this quarter</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-container">local_shipping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Citizen Engagement */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg">
          {[
            { icon: 'forum', title: 'Direct Citizen Feedback', copy: 'Every status change triggers an email notification. Citizens see the full lifecycle of their report — from submission photo to proof-of-work.' },
            { icon: 'verified', title: 'Verifiable Outcomes', copy: 'Citizens can dispute incomplete cleanups, automatically re-opening reports for inspection. Trust is engineered into the workflow.' },
          ].map(card => (
            <div key={card.title} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-stack-md shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg enterprise-gradient flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">{card.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{card.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{card.copy}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="font-label-caps text-label-caps bg-tertiary-fixed-dim/20 text-tertiary-container px-2 py-1 rounded-md">Status: Resolved</span>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_right_alt</span>
                <span className="font-label-caps text-label-caps bg-surface-variant text-on-surface-variant px-2 py-1 rounded-md">Notification Sent</span>
              </div>
            </div>
          ))}
        </section>

        {/* CTA band */}
        <section id="contact" className="enterprise-gradient rounded-2xl p-stack-lg text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEceaZUwf6ZHorBkbRAaFHoFoF2BQ-6vQ7WQbZSM0tGZ2M4OoaUMnaBM8nN-e8oTL0EWpQaAohZ5niZZihnT-spwSjNyQvKFEUqidUH6y-4s3goDtwMj5s7qTdS7y42nGRZJlOG_qGQ9U-hVYKWYKDwrHn_QCezcOOAY5FHJMSET2PNqW16jFskouK0_RifaTfgwjbV9aV7D9TrUj6L75KGPUebIXWGFDZok-04XxXixzXgjoHhY5IG_-b-E1mkrQ38gi0uo3nTEk')", backgroundSize: 'cover' }}
          ></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4">Ready to modernize your city's waste operations?</h2>
            <p className="font-body-lg text-body-lg text-white/80 mb-8">Join the municipalities already running cleaner, more transparent cities with Swachchha Nagar.</p>
            <Link to="/staff/login" className="bg-white text-primary-container font-button text-button px-8 py-4 rounded-lg hover:scale-95 shadow-lg inline-block">
              Request a Full Demo
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </motion.div>
  );
}