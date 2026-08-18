import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillNav from '../components/PillNav';
import MarketingFooter from '../components/MarketingFooter';

const STATS = [
  { icon: 'delete_sweep', value: '1,200', label: 'Tons Generated Daily', blob: 'bg-error-container', iconColor: 'text-error', caption: 'The scale of the challenge' },
  { icon: 'recycling', value: '45%', label: 'Collection Inefficiency', blob: 'bg-primary-fixed-dim opacity-30', iconColor: 'text-primary-container', caption: 'Material recovery gap' },
  { icon: 'visibility_off', value: 'Low', label: 'Civic Visibility', blob: 'bg-secondary-container', iconColor: 'text-secondary', caption: 'Citizen awareness' },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background text-on-surface font-body-md flex flex-col"
    >
      <PillNav />

      <main className="flex-grow pt-24 md:pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-surface-container-low border border-surface-variant rounded-full px-3 py-1">
              <span className="material-symbols-outlined text-tertiary-container text-[16px]">eco</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Our Mission</span>
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              We're building <span className="text-gradient">Cleaner Cities. Together.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Swachchha Nagar is a civic-tech platform that turns citizen reports into visible municipal action — making waste management transparent, measurable and accountable.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/submit" className="bg-primary-container text-on-primary px-6 py-3 rounded-lg hover:bg-primary hover:shadow-lg active:scale-95 transition-all font-button text-button flex items-center gap-2">
                Get Involved <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/features" className="bg-white text-primary border border-surface-variant rounded-lg hover:bg-surface-container-low transition-colors px-6 py-3 font-button text-button">
                Read the Report
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
            <img
              alt="Clean city park"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd05-WC8ei6Brfm-7L3khUsWZC5yQyrUNpGZiRf14nI-FmtLdlFU2A7PZ2im8OZkQv2CQ2FWBw5mgd7z566rnEEMdGik1EXgjBr0UpAJAuFgW4SB8ussO_ZgObxfW3n6TCrpNZXOoRXZlMgbP4ul6q-EDleN_01K-cBlI8-zrEnZ0kj7K2Sg3l7Fgu6XPn72pEN_-cp70T_B8fJHtBZB16t5ut4oIdxLC67SPFvsy9gX6afPkZ42tiWtqtnLxwx4ROfo6ADbg0EmA"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
            <div className="absolute bottom-8 left-8 right-8 glass-card rounded-xl p-stack-md z-20 flex items-center justify-between">
              <div>
                <p className="font-label-caps text-label-caps text-primary-container mb-1">Active Citizens</p>
                <p className="font-headline-md text-headline-md text-primary">24,590+</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-fixed">trending_up</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scale of the challenge */}
        <section className="pt-20">
          <div className="text-center mb-12">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">The Scale of the Challenge</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Our cities generate waste faster than systems can respond. Data tells the story.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white border border-surface-variant rounded-xl p-stack-lg shadow-sm hover:shadow-md relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform ${stat.blob}`}></div>
                <span className={`material-symbols-outlined text-[32px] mb-4 ${stat.iconColor}`}>{stat.icon}</span>
                <div className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">{stat.value}</div>
                <p className="font-label-caps text-label-caps text-secondary mb-2">{stat.label}</p>
                <p className="text-sm text-on-surface-variant">{stat.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Civic-tech approach */}
        <section className="pt-24">
          <div className="text-center mb-12">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">The Civic-Tech Approach</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Technology that connects citizen action with municipal response.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group">
              <img
                alt="Community cleanup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6ulGAmLnedayfiiFqI9Pfj9FVXdxEf6hRghUJbretrqId8H_SblrAj6-cB9VuxdbEHlUcdGbFGJhCKipgk2yht2kLRnzfaAIGvDw_HONb0ZMyJ_EWuA1qXUggNcxo5sbLfMRStxbA4V45YAecfTddN3cwomRnTf5ueJLwi0MEwbsZX8oRQHwgJwVERvX1xyXyJh9QrLBuXSKUx2ywBqO2nz1Kii52bJGQLhL3UpuNYbO2K_-wndGX7w"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-stack-lg w-full">
                <h3 className="font-headline-md text-headline-md text-white mb-1">Citizens First</h3>
                <p className="text-sm text-white/80">Reports with photos, GPS and zero friction — no sign-up required.</p>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-stack-lg relative overflow-hidden group">
              <span className="absolute right-0 bottom-0 opacity-5 text-[120px] material-symbols-outlined pointer-events-none">notifications_active</span>
              <span className="material-symbols-outlined text-primary-container text-[28px] mb-4">notifications_active</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Instant Alerts</h3>
              <p className="text-sm text-on-surface-variant">Every status change triggers email notifications to the reporter.</p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-stack-md border border-primary-container flex flex-col justify-between">
              <span className="material-symbols-outlined text-[28px]">verified</span>
              <div>
                <h3 className="font-button text-button mb-1">Verified Outcomes</h3>
                <p className="text-sm opacity-80">Proof-of-work photos on every resolution.</p>
              </div>
            </div>
            <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl border border-tertiary-fixed-dim p-stack-md flex flex-col justify-between">
              <span className="material-symbols-outlined text-[28px]">public</span>
              <div>
                <h3 className="font-button text-button mb-1">Open Data</h3>
                <p className="text-sm opacity-80">Public performance metrics for every ward.</p>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-stack-lg relative overflow-hidden group">
              <span className="absolute right-0 bottom-0 opacity-5 text-[120px] material-symbols-outlined pointer-events-none">groups</span>
              <span className="material-symbols-outlined text-primary-container text-[28px] mb-4">groups</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-1">Municipal Coordination</h3>
              <p className="text-sm text-on-surface-variant">Ward officers, cleanup teams and analytics in one hub.</p>
            </div>
          </div>
        </section>

        {/* Core principles */}
        <section className="pt-24">
          <div className="text-center mb-12">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { icon: 'visibility', title: 'Transparency' },
              { icon: 'bolt', title: 'Speed' },
              { icon: 'handshake', title: 'Accountability' },
            ].map(p => (
              <div key={p.title} className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-surface-container border border-surface-variant flex items-center justify-center relative group">
                  <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-tertiary-fixed transition-colors"></span>
                  <span className="material-symbols-outlined text-primary-container text-[32px]">{p.icon}</span>
                </div>
                <p className="font-button text-button text-primary text-lg uppercase tracking-wider">{p.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MarketingFooter variant="dark" />
    </motion.div>
  );
}