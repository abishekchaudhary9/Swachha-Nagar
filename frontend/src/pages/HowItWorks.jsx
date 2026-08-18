import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillNav from '../components/PillNav';
import MarketingFooter from '../components/MarketingFooter';

const STEPS = [
  {
    num: '01',
    title: 'Report — Capture & Geo-tag',
    copy: 'Take a photo of the waste pile with your phone. GPS coordinates are captured automatically so crews can find the exact spot — no sign-up needed.',
    icon: 'photo_camera',
    features: ['Photo Evidence', 'Auto GPS Tag'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYRh11rXKGneRvBcL0sfGvRP8OHTzsTZcf03zIzb1RqX14ewowfPTxwPZLIJIA11VcGBQJCSwGFrRtTWPbbsQtuZk1HoYHSAluplAS4GeFYF5hLzQRQan34RQ-KaTtqyUOsEhR1tNLBNnBQMDeEOC8I3CAYmnaB6IRGWpoTCamxdAe2fiUTkmtXgwI5Dh2K6xjfzrxsuaZlhsZA64BoOj8N9K6nDJApT4axs8sWhvWwzhUR5N7-Yfwp3A0R3vY2tMGw8gPnE_Uj7E',
    flip: false,
  },
  {
    num: '02',
    title: 'Dispatch — Intelligent Routing',
    copy: 'Reports are auto-categorized and routed to the right ward team. Field officers are notified instantly and cleanup crews are assigned based on location and workload.',
    icon: 'route',
    features: ['Auto Categorization', 'Team Assignment'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEceaZUwf6ZHorBkbRAaFHoFoF2BQ-6vQ7WQbZSM0tGZ2M4OoaUMnaBM8nN-e8oTL0EWpQaAohZ5niZZihnT-spwSjNyQvKFEUqidUH6y-4s3goDtwMj5s7qTdS7y42nGRZJlOG_qGQ9U-hVYKWYKDwrHn_QCezcOOAY5FHJMSET2PNqW16jFskouK0_RifaTfgwjbV9aV7D9TrUj6L75KGPUebIXWGFDZok-04XxXixzXgjoHhY5IG_-b-E1mkrQ38gi0uo3nTEk',
    flip: true,
  },
  {
    num: '03',
    title: 'Track — Real-Time Updates',
    copy: 'Every status change — from submitted to resolved — is logged and visible. Citizens receive email notifications and can check progress anytime with their tracking code.',
    icon: 'track_changes',
    features: ['Tracking Code', 'Email Notifications'],
    timeline: true,
  },
  {
    num: '04',
    title: 'Verify — Resolution Verification',
    copy: 'Crews upload proof-of-work photos when a report is resolved. If cleanup is incomplete, citizens can dispute and the report re-opens for inspection.',
    icon: 'verified',
    features: ['Proof-of-Work Photo', 'Dispute & Re-open'],
    solid: true,
  },
];

export default function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-on-surface font-body-md flex flex-col"
    >
      <PillNav />

      <main className="flex-grow pt-24 md:pt-32 pb-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-md">From Issue to Resolution.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A simple four-step pipeline moves every report from a citizen photo to a verified city cleanup.
          </p>
        </div>

        {STEPS.map(step => (
          <div key={step.num} className={`grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24 items-center ${step.flip ? '' : ''}`}>
            {!step.flip && !step.timeline && !step.solid && (
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-surface-variant h-64 md:h-auto shadow-sm">
                <div className="bg-cover bg-center w-full h-full min-h-[250px]" style={{ backgroundImage: `url('${step.img}')` }}></div>
              </div>
            )}

            <div className={`md:col-span-7 bg-surface-container-lowest rounded-xl border border-surface-variant card-shadow p-8 relative overflow-hidden ${step.solid ? 'md:col-span-12' : ''} ${step.timeline ? 'md:col-span-12' : ''}`}>
              {!step.solid && (
                <span className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
                </span>
              )}
              <span className="inline-block bg-tertiary-fixed-dim/20 text-primary-container font-label-caps text-label-caps px-2 py-1 rounded mb-4">
                {step.num} / {step.title.split(' — ')[0]}
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mb-2">{step.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl">{step.copy}</p>
              <div className="flex flex-wrap gap-2">
                {step.features.map(f => (
                  <span key={f} className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg border border-surface-variant font-label-caps text-label-caps text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary-container">check_circle</span>
                    {f}
                  </span>
                ))}
              </div>

              {step.timeline && (
                <div className="relative mt-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-variant z-0"></div>
                  <div className="space-y-6">
                    {[
                      { label: 'Report Submitted', done: true },
                      { label: 'Assigned to Team', done: true },
                      { label: 'In Progress', current: true },
                      { label: 'Resolved & Verified', done: false },
                    ].map(item => (
                      <div key={item.label} className="flex gap-4 items-center relative z-10">
                        {item.done ? (
                          <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                        ) : item.current ? (
                          <div className="w-6 h-6 rounded-full border-2 border-tertiary-fixed-dim bg-surface flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-outline-variant bg-surface-container"></div>
                        )}
                        <span className={`font-button text-button ${item.current ? 'text-primary font-bold' : item.done ? 'text-on-surface' : 'text-outline'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {step.flip && (
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-surface-variant h-64 md:h-auto shadow-sm">
                <div className="bg-cover bg-center w-full h-full min-h-[250px]" style={{ backgroundImage: `url('${step.img}')` }}></div>
              </div>
            )}

            {step.solid && (
              <div className="md:col-span-12 bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="inline-block bg-white/20 text-white font-label-caps text-label-caps px-2 py-1 rounded mb-4">
                      {step.num} / {step.title.split(' — ')[0]}
                    </span>
                    <h2 className="font-headline-md text-headline-md mb-2">{step.title}</h2>
                    <p className="font-body-md text-body-md text-on-primary/80 mb-6 max-w-xl">{step.copy}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map(f => (
                        <span key={f} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/10 font-label-caps text-label-caps">
                          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">check_circle</span>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface-tint/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                    <p className="font-label-caps text-label-caps text-tertiary-fixed mb-2">VERIFICATION FLOW</p>
                    <p className="font-body-md text-body-md text-on-primary/90">Cleanup crews upload proof-of-work photos. Citizens can dispute incomplete work — the report re-opens automatically for inspection by the Department of Public Works.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-8">
          <Link to="/submit" className="inline-flex items-center gap-2 bg-primary-container text-on-primary rounded-full px-8 py-3 font-button text-button hover:bg-primary transition-colors">
            Start Your First Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </motion.div>
  );
}