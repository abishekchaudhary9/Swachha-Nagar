import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard \u2014 Swachchha Nagar" },
      { name: "description", content: "Executive summary of reports, waste composition, fleet status and ward performance." },
      { property: "og:title", content: "Operations Dashboard \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Executive summary of reports, waste composition, fleet status and ward performance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <aside className="hidden md:flex flex-col h-screen py-stack-lg px-4 gap-stack-md bg-surface dark:bg-inverse-surface text-primary dark:text-primary-fixed border-r border-outline-variant/20 fixed h-full left-0 w-64 z-40">
      <div className="px-2 mb-4">
      <h1 className="font-display-lg text-primary dark:text-primary-fixed text-2xl font-extrabold tracking-tight">KMC Operations</h1>
      <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 opacity-70">Municipal Hub</p>
      </div>
      <nav className="flex-1 space-y-1">
      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-container bg-tertiary-fixed-dim/20 rounded-lg hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
      <span className="font-label-caps text-label-caps font-bold">Dashboard</span>
      </Link>
      <Link to="/wards" className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg">
      <span className="material-symbols-outlined">leaderboard</span>
      <span className="font-label-caps text-label-caps">Ward Performance</span>
      </Link>
      <Link to="/fleet" className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg">
      <span className="material-symbols-outlined">local_shipping</span>
      <span className="font-label-caps text-label-caps">Fleet Monitor</span>
      </Link>
      <Link to="/hotspots" className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg">
      <span className="material-symbols-outlined">radar</span>
      <span className="font-label-caps text-label-caps">Hotspot Analysis</span>
      </Link>
      <Link to="/reports" className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg">
      <span className="material-symbols-outlined">assessment</span>
      <span className="font-label-caps text-label-caps">Report Center</span>
      </Link>
      </nav>
      <div className="mt-auto space-y-4">
      <button className="w-full bg-primary-container text-on-primary py-2 px-4 rounded-lg font-button text-button hover:bg-[#093027] transition-colors shadow-sm">
                      Dispatch Crew
                  </button>
      <div className="space-y-1 pt-4 border-t border-outline-variant/20">
      <a className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg" href="#">
      <span className="material-symbols-outlined">help_outline</span>
      <span className="font-label-caps text-label-caps">Support</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg" href="#">
      <span className="material-symbols-outlined">inventory_2</span>
      <span className="font-label-caps text-label-caps">Archive</span>
      </a>
      </div>
      </div>
      </aside>

      <main className="flex-1 md:ml-64 min-h-screen pb-20 md:pb-0">

      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-white/70 dark:bg-inverse-surface/70 text-primary dark:text-primary-fixed backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-4">

      <button className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined">menu</span>
      </button>
      <h2 className="font-headline-md text-headline-md font-display-lg text-primary dark:text-primary-fixed tracking-tight md:hidden">KTM Waste</h2>
      </div>
      <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
      <input className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#65D6B0] focus:border-transparent w-64 transition-all" placeholder="Search wards, trucks..." type="text" />
      </div>
      <button className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 relative">
      <span className="material-symbols-outlined">notifications</span>
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <button className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 hidden sm:block">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <img className="w-8 h-8 rounded-full border border-outline-variant/30 object-cover ml-2" data-alt="A professional headshot of a municipal administrator, smiling subtly, wearing a smart casual outfit, well-lit against a neutral background. The lighting is soft and corporate, fitting for a modern civic tech platform user profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_XWV6YjJVYz8iBlhb7lW9pjs-mPrdIZBFvd97f6dwMcXisxmnhek4JrhJK7RwJ2hD11fZ6dnreyVImkJxvFGvhsDJrDV7cxvMnJPvLQTj6x2eMivoehlbqtQTs_QEGzqSmubd-HLsyotPb2E0RFcUq4IhxuSUuPPKv4LYLbQBCKU36wpNPYLVqX1UWE05StPHxu-3Gz9wGFznR3PO4zcVCpbffPkmWBDKGFQU3qw53dxcjLK_Ok6vMQ" />
      </div>
      </header>

      <div className="pt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-stack-lg">

      <section>
      <h3 className="font-headline-md text-headline-md mb-stack-md text-primary font-bold">Executive Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

      <div className="data-card rounded-xl p-6 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant">Total Waste Collected</span>
      <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
      <span className="material-symbols-outlined">delete_sweep</span>
      </div>
      </div>
      <div>
      <div className="font-display-lg text-4xl font-extrabold text-primary tracking-tight">842 <span className="text-xl font-normal text-on-surface-variant">Tons</span></div>
      <div className="flex items-center gap-1 mt-2 text-sm text-[#3cb18d] font-medium">
      <span className="material-symbols-outlined text-[16px]">trending_up</span>
      <span>+5.2% from last week</span>
      </div>
      </div>
      </div>

      <div className="data-card rounded-xl p-6 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant">Avg Resolution Time</span>
      <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
      <span className="material-symbols-outlined">timer</span>
      </div>
      </div>
      <div>
      <div className="font-display-lg text-4xl font-extrabold text-primary tracking-tight">12.4 <span className="text-xl font-normal text-on-surface-variant">hrs</span></div>
      <div className="flex items-center gap-1 mt-2 text-sm text-error font-medium">
      <span className="material-symbols-outlined text-[16px]">trending_down</span>
      <span>-1.1 hrs from average</span>
      </div>
      </div>
      </div>

      <div className="data-card rounded-xl p-6 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant">Active Fleet</span>
      <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
      <span className="material-symbols-outlined">local_shipping</span>
      </div>
      </div>
      <div>
      <div className="font-display-lg text-4xl font-extrabold text-primary tracking-tight">42 <span className="text-xl font-normal text-on-surface-variant">/ 50</span></div>
      <div className="w-full bg-surface-variant rounded-full h-1.5 mt-3 overflow-hidden">
      <div className="bg-[#65D6B0] h-1.5 rounded-full" style={{ width: "84%" }}></div>
      </div>
      <div className="text-sm text-on-surface-variant mt-2 text-right">84% Operational</div>
      </div>
      </div>
      </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

      <section className="lg:col-span-2">
      <h3 className="font-headline-md text-headline-md mb-stack-md text-primary font-bold">Hotspot Visualization</h3>
      <div className="data-card rounded-xl overflow-hidden relative h-[400px] flex items-center justify-center border border-outline-variant/30">

      <div className="absolute inset-0 bg-cover bg-center w-full h-full" data-alt="A high-end, minimalist data visualization map of Kathmandu for a civic-tech platform. The map shows a clean, light-themed street grid with glowing 'resolved' clusters in soft emerald green and 'active' hotspots in a subtle charcoal. Glass-morphic UI cards overlay the map showing 'Cleanup Efficiency: 94%' and 'Top Ward: Thamel'. The style is ultra-modern, professional, and data-driven, similar to Stripe or Vercel analytics." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLsTzxTbxSVT1zpMi7s09lheoa-jWjDUhf1k1y6G12AXPxmZ_u7SQfEuiuerFtSImyKj53MY1jp5ruEkK8AG1KOtnGpcot2oN6tDC17F9Pyrb2l9U7vNeydGYOo7FVTsPJIYxC8GgtPstgEgoEFY3tKhY5HQzpCbGm0TbIBKnBB5OI6ad-kL40pJGW1-SVs2O3sOgp9evxKamvy7rFt3aC4mx-K5U7Yequ_72Z-8mY5GdzpBUiRcwUib23Fh')" }}></div>

      <div className="absolute top-4 left-4 glass-card p-4 rounded-lg z-10 w-48">
      <div className="text-xs font-label-caps text-on-surface-variant mb-1">Cleanup Efficiency</div>
      <div className="text-2xl font-bold text-primary">94%</div>
      <div className="w-full bg-surface-variant rounded-full h-1 mt-2">
      <div className="bg-[#0b3d32] h-1 rounded-full" style={{ width: "94%" }}></div>
      </div>
      </div>
      <div className="absolute top-4 right-4 glass-card p-4 rounded-lg z-10 w-48">
      <div className="text-xs font-label-caps text-on-surface-variant mb-1">Top Active Ward</div>
      <div className="text-xl font-bold text-primary">Thamel (W-26)</div>
      <div className="text-xs text-error mt-1 flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px]">warning</span> 12 Active Reports
                                  </div>
      </div>
      </div>
      </section>

      <section className="lg:col-span-1">
      <h3 className="font-headline-md text-headline-md mb-stack-md text-primary font-bold">Waste Composition</h3>
      <div className="data-card rounded-xl p-6 h-[400px] flex flex-col">
      <div className="flex-1 relative flex items-center justify-center mb-4">

      <div className="w-48 h-48 rounded-full border-[16px] border-[#0b3d32] relative overflow-hidden flex items-center justify-center" style={{ borderRightColor: "#65D6B0", borderBottomColor: "#a1d0c1", borderLeftColor: "#e2e3df", transform: "rotate(45deg)" }}>
      <div className="absolute inset-0 bg-white m-1 rounded-full" style={{ transform: "rotate(-45deg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <span className="text-3xl font-bold text-primary">1.2k</span>
      <span className="text-xs text-on-surface-variant uppercase tracking-wider">Reports</span>
      </div>
      </div>
      </div>
      <div className="space-y-3 mt-auto">
      <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0b3d32]"></div><span className="text-on-surface">Organic</span></div>
      <span className="font-mono font-medium">45%</span>
      </div>
      <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#65D6B0]"></div><span className="text-on-surface">Plastic</span></div>
      <span className="font-mono font-medium">30%</span>
      </div>
      <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#a1d0c1]"></div><span className="text-on-surface">Construction</span></div>
      <span className="font-mono font-medium">15%</span>
      </div>
      <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#e2e3df]"></div><span className="text-on-surface">Hazardous</span></div>
      <span className="font-mono font-medium">10%</span>
      </div>
      </div>
      </div>
      </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">

      <section>
      <div className="flex justify-between items-end mb-stack-md">
      <h3 className="font-headline-md text-headline-md text-primary font-bold">Fleet Status</h3>
      <a className="text-sm font-medium text-[#3cb18d] hover:underline" href="#">View All Trucks</a>
      </div>
      <div className="data-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
      <thead className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps">
      <tr>
      <th className="px-6 py-4 font-medium">Truck ID</th>
      <th className="px-6 py-4 font-medium">Current Zone</th>
      <th className="px-6 py-4 font-medium">Load Capacity</th>
      <th className="px-6 py-4 font-medium">Status</th>
      </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/20">
      <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4 font-mono font-medium text-primary">TRK-042</td>
      <td className="px-6 py-4 text-on-surface">Baneshwor (W-10)</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <div className="w-full bg-surface-variant rounded-full h-1.5 w-24">
      <div className="bg-error h-1.5 rounded-full" style={{ width: "92%" }}></div>
      </div>
      <span className="text-xs font-mono">92%</span>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error/10 text-error">Returning</span>
      </td>
      </tr>
      <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4 font-mono font-medium text-primary">TRK-018</td>
      <td className="px-6 py-4 text-on-surface">Koteshwor (W-32)</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <div className="w-full bg-surface-variant rounded-full h-1.5 w-24">
      <div className="bg-[#65D6B0] h-1.5 rounded-full" style={{ width: "45%" }}></div>
      </div>
      <span className="text-xs font-mono">45%</span>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#65D6B0]/10 text-[#0b3d32]">Collecting</span>
      </td>
      </tr>
      <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4 font-mono font-medium text-primary">TRK-105</td>
      <td className="px-6 py-4 text-on-surface">Maharajgunj (W-03)</td>
      <td className="px-6 py-4">
      <div className="flex items-center gap-2">
      <div className="w-full bg-surface-variant rounded-full h-1.5 w-24">
      <div className="bg-[#0b3d32] h-1.5 rounded-full" style={{ width: "12%" }}></div>
      </div>
      <span className="text-xs font-mono">12%</span>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#65D6B0]/10 text-[#0b3d32]">Collecting</span>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </section>

      <section>
      <div className="flex justify-between items-end mb-stack-md">
      <h3 className="font-headline-md text-headline-md text-primary font-bold">Ward Matrix</h3>
      <div className="flex gap-2">
      <button className="text-xs font-medium px-2 py-1 bg-surface-variant text-on-surface rounded">Efficiency</button>
      <button className="text-xs font-medium px-2 py-1 text-on-surface-variant hover:bg-surface-variant/50 rounded">Reports</button>
      </div>
      </div>
      <div className="space-y-3">

      <div className="data-card p-4 rounded-xl flex items-center justify-between hover:border-[#65D6B0] transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center font-mono font-bold text-primary group-hover:bg-[#65D6B0]/10 transition-colors">W10</div>
      <div>
      <div className="font-medium text-on-surface">Baneshwor</div>
      <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
      <span className="material-symbols-outlined text-[14px]">sentiment_satisfied</span> 92% Satisfaction
                                          </div>
      </div>
      </div>
      <div className="text-right">
      <div className="text-sm font-medium text-primary">98% Efficient</div>
      <div className="text-xs text-on-surface-variant mt-0.5">42 Reports</div>
      </div>
      </div>

      <div className="data-card p-4 rounded-xl flex items-center justify-between hover:border-[#65D6B0] transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center font-mono font-bold text-primary group-hover:bg-[#65D6B0]/10 transition-colors">W26</div>
      <div>
      <div className="font-medium text-on-surface">Thamel</div>
      <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5 text-error">
      <span className="material-symbols-outlined text-[14px]">sentiment_dissatisfied</span> 78% Satisfaction
                                          </div>
      </div>
      </div>
      <div className="text-right">
      <div className="text-sm font-medium text-error">82% Efficient</div>
      <div className="text-xs text-on-surface-variant mt-0.5">156 Reports</div>
      </div>
      </div>

      <div className="data-card p-4 rounded-xl flex items-center justify-between hover:border-[#65D6B0] transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center font-mono font-bold text-primary group-hover:bg-[#65D6B0]/10 transition-colors">W03</div>
      <div>
      <div className="font-medium text-on-surface">Maharajgunj</div>
      <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
      <span className="material-symbols-outlined text-[14px]">sentiment_satisfied</span> 88% Satisfaction
                                          </div>
      </div>
      </div>
      <div className="text-right">
      <div className="text-sm font-medium text-primary">94% Efficient</div>
      <div className="text-xs text-on-surface-variant mt-0.5">74 Reports</div>
      </div>
      </div>
      </div>
      </section>
      </div>
      <div className="h-8"></div> 
      </div>
      </main>
    </>
  );
}
