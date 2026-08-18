import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/wards")({
  head: () => ({
    meta: [
      { title: "Ward Performance \u2014 Swachchha Nagar" },
      { name: "description", content: "Leaderboards and resolution metrics comparing ward-level waste performance." },
      { property: "og:title", content: "Ward Performance \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Leaderboards and resolution metrics comparing ward-level waste performance." },
    ],
  }),
  component: Wards,
});

function Wards() {
  return (
    <>
      <aside className="hidden md:flex bg-surface dark:bg-inverse-surface fixed h-full left-0 w-64 border-r border-outline-variant/20 flex-col py-stack-lg px-4 gap-stack-md z-40">

      <div className="flex items-center gap-3 px-2 mb-4">
      <img className="w-10 h-10 rounded-lg object-cover" data-alt="A clean, minimalist abstract logo for a municipal waste management system, rendered in primary green and teal colors, utilizing simple geometric shapes on a white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5yVDLMSxipLBnWhQTguf7rZ4QugCfpEXHslnz87SUhAhEJS0C9Jm5LLNY0pXr7n6rr0R98wmroboH56PrD08QMTNwGd_l5LQxPDw0v3HwJhJuZyl13nmjYYyYiMn9wtIhWP2AtfiGRJojp0gtF4jV086aB4e9qKBxUok4-BTxNyJ78OL_IWT_Wg1zpyRQYy3SxQRHA7f6syxfZx9W2u-TdhCo754Tu5RBz6OOrjkyptDjWByZ5AXVPw" />
      <div>
      <h1 className="font-display-lg text-primary dark:text-primary-fixed text-lg font-bold leading-tight">KMC Operations</h1>
      <p className="text-xs text-on-surface-variant font-medium">Municipal Hub</p>
      </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
      <span>Dashboard</span>
      </Link>
      <Link to="/wards" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-tertiary-container bg-tertiary-fixed-dim/20 font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
      <span>Ward Performance</span>
      </Link>
      <Link to="/fleet" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
      <span>Fleet Monitor</span>
      </Link>
      <Link to="/hotspots" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>radar</span>
      <span>Hotspot Analysis</span>
      </Link>
      <Link to="/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>assessment</span>
      <span>Report Center</span>
      </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
      <button className="w-full bg-primary-container text-on-primary rounded-lg py-2 font-button text-button hover:opacity-90 active:scale-95 transition-all shadow-sm">
                      Dispatch Crew
                  </button>
      <div className="h-px bg-outline-variant/20 w-full"></div>
      <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all" href="#">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help_outline</span>
      <span>Support</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all" href="#">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
      <span>Archive</span>
      </a>
      </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 relative min-h-screen">

      <header className="md:hidden glass-panel fixed top-0 w-full z-50 flex justify-between items-center px-4 py-4 border-b border-outline-variant/30 shadow-sm">
      <h2 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">KTM Waste Management</h2>
      <div className="flex gap-2">
      <button className="text-primary p-2 hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="text-primary p-2 hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined">settings</span>
      </button>
      </div>
      </header>
      <div className="p-margin-mobile md:p-margin-desktop pt-24 md:pt-margin-desktop max-w-container-max mx-auto space-y-stack-lg">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">Ward Performance</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Evaluate operational efficiency and citizen satisfaction across all municipal wards.</p>
      </div>
      <div className="flex gap-3">
      <select className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 font-button text-button text-on-surface focus:ring-2 focus:ring-tertiary-fixed-dim outline-none shadow-sm">
      <option>This Week</option>
      <option>This Month</option>
      <option>Quarterly</option>
      </select>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

      <div className="lg:col-span-1 data-card rounded-xl p-6 bg-primary-container text-white relative overflow-hidden flex flex-col justify-between min-h-[200px]">

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 100% 100%, #ffffff 0, transparent 50%)" }}></div>
      <div>
      <div className="flex items-center gap-2 mb-4">
      <span className="material-symbols-outlined text-tertiary-fixed-dim">star</span>
      <span className="font-label-caps text-label-caps text-tertiary-fixed-dim uppercase tracking-wider">Top Performing Ward</span>
      </div>
      <h3 className="font-headline-md text-headline-md font-bold">Ward 16</h3>
      <p className="text-primary-fixed-dim mt-1 font-body-md">Thamel &amp; Balaju Area</p>
      </div>
      <div className="mt-6 flex justify-between items-end">
      <div>
      <p className="font-label-caps text-label-caps text-outline-variant mb-1">Efficiency Score</p>
      <p className="font-display-lg text-4xl font-extrabold text-tertiary-fixed">94%</p>
      </div>
      <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1 backdrop-blur-sm">
      <span className="material-symbols-outlined text-sm text-tertiary-fixed">trending_up</span>
      <span className="font-button text-xs font-semibold">+2.4%</span>
      </div>
      </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="data-card bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-center">
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">Avg Resolution Time</p>
      <p className="font-headline-md text-headline-md text-primary mb-1">2.4 Hours</p>
      <div className="w-full bg-surface-container h-2 rounded-full mt-2 overflow-hidden">
      <div className="bg-tertiary-fixed-dim h-full rounded-full" style={{ width: "75%" }}></div>
      </div>
      <p className="text-xs text-outline mt-2 text-right">Target: &lt; 3 Hrs</p>
      </div>
      <div className="data-card bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-center">
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">Citizen Satisfaction</p>
      <p className="font-headline-md text-headline-md text-primary mb-1">4.2 / 5.0</p>
      <div className="flex gap-1 mt-2 text-tertiary-container">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
      </div>
      </div>
      </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">

      <div className="xl:col-span-1 data-card bg-surface-container-lowest rounded-xl p-6">
      <h3 className="font-headline-md text-lg font-bold text-primary mb-6">Ward Rankings</h3>
      <div className="space-y-4">

      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">1</div>
      <div>
      <p className="font-button text-sm text-on-surface">Ward 16</p>
      <p className="text-xs text-on-surface-variant">94% Efficiency</p>
      </div>
      </div>
      <span className="material-symbols-outlined text-tertiary-container">arrow_upward</span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm">2</div>
      <div>
      <p className="font-button text-sm text-on-surface">Ward 03</p>
      <p className="text-xs text-on-surface-variant">89% Efficiency</p>
      </div>
      </div>
      <span className="material-symbols-outlined text-outline">horizontal_rule</span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm">3</div>
      <div>
      <p className="font-button text-sm text-on-surface">Ward 10</p>
      <p className="text-xs text-on-surface-variant">85% Efficiency</p>
      </div>
      </div>
      <span className="material-symbols-outlined text-error">arrow_downward</span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm">4</div>
      <div>
      <p className="font-button text-sm text-on-surface">Ward 26</p>
      <p className="text-xs text-on-surface-variant">82% Efficiency</p>
      </div>
      </div>
      <span className="material-symbols-outlined text-outline">horizontal_rule</span>
      </div>
      </div>
      <button className="w-full mt-4 py-2 text-primary font-button text-sm hover:underline">View Full Leaderboard</button>
      </div>

      <div className="xl:col-span-2 data-card bg-surface-container-lowest rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
      <h3 className="font-headline-md text-lg font-bold text-primary">Efficiency vs. Report Volume</h3>
      <div className="flex gap-2">
      <div className="flex items-center gap-1 text-xs font-label-caps text-on-surface-variant">
      <span className="w-3 h-3 rounded-sm bg-tertiary-fixed-dim inline-block"></span> Efficiency
                                   </div>
      <div className="flex items-center gap-1 text-xs font-label-caps text-on-surface-variant">
      <span className="w-3 h-3 rounded-sm bg-surface-container-highest inline-block"></span> Volume
                                   </div>
      </div>
      </div>

      <div className="flex-1 flex items-end gap-2 sm:gap-4 mt-auto h-64 border-b border-l border-outline-variant/30 pb-2 pl-2 relative">

      <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-outline-variant">
      <span>100</span>
      <span>75</span>
      <span>50</span>
      <span>25</span>
      <span>0</span>
      </div>

      <div className="flex-1 flex justify-center gap-1 group relative">
      <div className="w-1/3 bg-tertiary-fixed-dim rounded-t-sm h-[90%] transition-all hover:opacity-80"></div>
      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[40%] transition-all hover:opacity-80"></div>
      <span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-caps">W16</span>
      </div>
      <div className="flex-1 flex justify-center gap-1 group relative">
      <div className="w-1/3 bg-tertiary-fixed-dim rounded-t-sm h-[80%] transition-all hover:opacity-80"></div>
      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[60%] transition-all hover:opacity-80"></div>
      <span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-caps">W03</span>
      </div>
      <div className="flex-1 flex justify-center gap-1 group relative">
      <div className="w-1/3 bg-tertiary-fixed-dim rounded-t-sm h-[65%] transition-all hover:opacity-80"></div>
      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[30%] transition-all hover:opacity-80"></div>
      <span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-caps">W10</span>
      </div>
      <div className="flex-1 flex justify-center gap-1 group relative">
      <div className="w-1/3 bg-tertiary-fixed-dim rounded-t-sm h-[50%] transition-all hover:opacity-80"></div>
      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[80%] transition-all hover:opacity-80"></div>
      <span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-caps">W26</span>
      </div>
      <div className="flex-1 flex justify-center gap-1 group relative">
      <div className="w-1/3 bg-tertiary-fixed-dim rounded-t-sm h-[40%] transition-all hover:opacity-80"></div>
      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[90%] transition-all hover:opacity-80"></div>
      <span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-caps">W01</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
