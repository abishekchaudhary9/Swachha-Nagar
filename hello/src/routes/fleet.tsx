import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Fleet Monitor \u2014 Swachchha Nagar" },
      { name: "description", content: "Live vehicle locations, route progress and collection status for the municipal fleet." },
      { property: "og:title", content: "Fleet Monitor \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Live vehicle locations, route progress and collection status for the municipal fleet." },
    ],
  }),
  component: Fleet,
});

function Fleet() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-screen py-stack-lg px-4 gap-stack-md bg-surface dark:bg-inverse-surface border-r border-outline-variant/20 fixed h-full left-0 w-64 z-40">
      <div className="mb-stack-lg px-4">
      <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
      </div>
      <div>
      <h1 className="font-display-lg text-primary dark:text-primary-fixed text-lg font-bold leading-tight">KMC Operations</h1>
      <p className="font-label-caps text-label-caps text-on-surface-variant">Municipal Hub</p>
      </div>
      </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
      <span>Dashboard</span>
      </Link>
      <Link to="/wards" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">leaderboard</span>
      <span>Ward Performance</span>
      </Link>
      <Link to="/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-container bg-tertiary-fixed-dim/20 rounded-lg font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">local_shipping</span>
      <span>Fleet Monitor</span>
      </Link>
      <Link to="/hotspots" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">radar</span>
      <span>Hotspot Analysis</span>
      </Link>
      <Link to="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">assessment</span>
      <span>Report Center</span>
      </Link>
      </div>
      <div className="mt-auto space-y-1 pt-stack-md border-t border-outline-variant/20">
      <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group" href="#">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">help_outline</span>
      <span>Support</span>
      </a>
      <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 group" href="#">
      <span className="material-symbols-outlined group-hover:text-primary transition-colors">inventory_2</span>
      <span>Archive</span>
      </a>
      <div className="px-4 mt-stack-md">
      <button className="w-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-button text-button py-2 rounded-DEFAULT transition-all active:scale-98">
                          Dispatch Crew
                      </button>
      </div>
      </div>
      </nav>

      <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden">

      <header className="md:hidden flex justify-between items-center px-margin-mobile py-4 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-30">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-primary-container text-2xl">local_shipping</span>
      <span className="font-headline-md text-headline-md text-primary font-bold">Fleet Monitor</span>
      </div>
      <div className="flex items-center gap-3">
      <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary/5 transition-colors active:scale-95 duration-200">
      <span className="material-symbols-outlined text-sm">notifications</span>
      </button>
      <button className="w-8 h-8 rounded-full bg-surface-container overflow-hidden active:scale-95 duration-200">
      <img className="w-full h-full object-cover" data-alt="A small circular avatar placeholder image showing a generic profile silhouette in subtle greyscale tones. The image is clean, minimalist, and fits well within a high-end UI dashboard setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDntX_axjV2Ih_U0yhXdS1m4lp7j5KVJijcI4Sak1YVE_wCr9cX8vVWUxpCo2gFlZNbMoS7C_MOmJnxnUKm2kA8TcxIYdXblhKA-r07gK6TOpptBHqB84odYad4Mfal5DtwRVHCkZjUyapdh1DRL8gsA8jsht8ZR_yKtIDgNx47Nmz_IyYhqh2-gPswqXNEumWPqV3fFbf_8SJcTshCWTcSWikkuOb5ydMYJEshPt5OGYFUeyH5FhE0Zg" />
      </button>
      </div>
      </header>

      <div className="hidden md:flex justify-between items-end px-margin-desktop pt-margin-desktop pb-stack-lg">
      <div>
      <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Active Fleet Overview</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Real-time telemetry, routing status, and operational health for all deployed collection units across Kathmandu Metropolitan City.</p>
      </div>
      <div className="flex gap-4">
      <button className="bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-on-surface font-button text-button px-4 py-2 rounded-DEFAULT transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                          Filter Fleet
                      </button>
      <button className="bg-primary-container hover:bg-[#09352b] text-on-primary-container font-button text-button px-4 py-2 rounded-DEFAULT transition-all flex items-center gap-2 active:scale-95 duration-200">
      <span className="material-symbols-outlined text-[18px]">add_location</span>
                          New Route
                      </button>
      </div>
      </div>

      <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop pb-margin-desktop space-y-gutter">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Active Units</span>
      <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">local_shipping</span>
      </div>
      </div>
      <div>
      <div className="font-headline-md text-display-lg-mobile text-primary font-bold mb-1">42<span className="text-headline-md text-outline font-normal">/50</span></div>
      <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
      <span className="font-body-md text-body-md text-on-surface-variant text-sm">8 in maintenance</span>
      </div>
      </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Avg Capacity</span>
      <div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center">
      <span className="material-symbols-outlined text-on-error-container text-[18px]">delete</span>
      </div>
      </div>
      <div>
      <div className="font-headline-md text-display-lg-mobile text-primary font-bold mb-2">78%</div>
      <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
      <div className="bg-primary-container h-full rounded-full" style={{ width: "78%" }}></div>
      </div>
      </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Fuel Efficiency</span>
      <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">local_gas_station</span>
      </div>
      </div>
      <div>
      <div className="font-headline-md text-display-lg-mobile text-primary font-bold mb-1">4.2 <span className="text-body-md text-outline font-normal">km/L</span></div>
      <div className="flex items-center gap-1 text-tertiary-fixed-dim font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">trending_up</span>
      <span>+0.3 vs last week</span>
      </div>
      </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Route Optimization</span>
      <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">route</span>
      </div>
      </div>
      <div>
      <div className="font-headline-md text-display-lg-mobile text-primary font-bold mb-1">92%</div>
      <span className="font-label-caps text-label-caps px-2 py-1 bg-tertiary-fixed-dim/10 text-on-tertiary-container rounded-DEFAULT inline-block mt-1">Excellent</span>
      </div>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter min-h-[500px]">

      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative flex flex-col group">

      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
      <div className="bg-white/80 backdrop-blur-md border border-outline-variant/20 rounded-lg p-3 pointer-events-auto shadow-sm">
      <h3 className="font-button text-button text-primary">Live Tracking</h3>
      <p className="font-label-caps text-label-caps text-on-surface-variant">Central District Sector A</p>
      </div>
      <div className="flex gap-2 pointer-events-auto">
      <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/20 flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors">
      <span className="material-symbols-outlined">layers</span>
      </button>
      <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/20 flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors">
      <span className="material-symbols-outlined">my_location</span>
      </button>
      </div>
      </div>

      <div className="flex-1 bg-surface-container-low relative overflow-hidden" data-location="Kathmandu" style={{  }}>
      <img className="w-full h-full object-cover opacity-80 filter contrast-125 grayscale-[20%]" data-alt="A highly detailed, stylized overhead map view of Kathmandu, Nepal, designed in a sleek, minimalist light mode aesthetic. The map uses soft grays, whites, and pale greens to depict streets and parks, fitting perfectly into a high-end SaaS dashboard. Small, glowing teal dots and subtle connecting lines represent a network of vehicles moving along the routes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW-TXG2zpxr7Saw9SyVT9K3QQM9lxv9YPkZ5NH5681s0a5izO-e4FqFA9g0_UPa9WaC_ebWrEnSbiA3Vm1Pi86OzK8n8CqREUuMF870_8g_d6KnGbrtHT2ZrdJWFTd4msYowTzhreIwGThPAbJ923O12K8BAkiFb-mU8XPO5bRGwPREpv-mOOfObFDcEjMvEDvhNjUNe4bcJTQkkURQ3v6DW0QPcA0fR3Uar2kpJR7d3L5KumZ2VtRBw" />

      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary-container rounded-full border-2 border-white shadow-md animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-tertiary-fixed-dim rounded-full border-2 border-white shadow-md"></div>
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary-container rounded-full border-2 border-white shadow-md"></div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M 25 33 Q 35 40 50 50 T 75 66" fill="none" stroke="#0b3d32" strokeDasharray="6,4" strokeWidth="3" vectorEffect="non-scaling-stroke" />

      </svg>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-center">
      <div className="bg-white/80 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 py-2 pointer-events-auto shadow-sm flex items-center gap-4">
      <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
      <span className="font-label-caps text-label-caps text-on-surface-variant">Active</span>
      </div>
      <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
      <span className="font-label-caps text-label-caps text-on-surface-variant">Idle</span>
      </div>
      <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full bg-error-container"></span>
      <span className="font-label-caps text-label-caps text-on-surface-variant">Issue</span>
      </div>
      </div>
      </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full max-h-[600px]">
      <div className="p-stack-md border-b border-outline-variant/20 flex justify-between items-center bg-white/50 backdrop-blur-md rounded-t-xl sticky top-0 z-10">
      <h3 className="font-headline-md text-headline-md text-primary text-lg">Unit Status</h3>
      <button className="text-on-surface-variant hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-[20px]">more_horiz</span>
      </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">

      <div className="p-3 rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
      <span className="font-button text-button text-primary">Unit KMC-042</span>
      </div>
      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-tertiary-fixed-dim/10 text-on-tertiary-container">En Route</span>
      </div>
      <div className="flex items-center justify-between mt-3">
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
      <span>85% Cap</span>
      </div>
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">speed</span>
      <span>45 km/h</span>
      </div>
      <div className="text-on-surface-variant font-label-caps text-label-caps group-hover:text-primary transition-colors">
                                          Details →
                                      </div>
      </div>
      </div>

      <div className="p-3 rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
      <span className="font-button text-button text-primary">Unit KMC-018</span>
      </div>
      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Idle (Loading)</span>
      </div>
      <div className="flex items-center justify-between mt-3">
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
      <span>40% Cap</span>
      </div>
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">speed</span>
      <span>0 km/h</span>
      </div>
      <div className="text-on-surface-variant font-label-caps text-label-caps group-hover:text-primary transition-colors">
                                          Details →
                                      </div>
      </div>
      </div>

      <div className="p-3 rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer group bg-error-container/10">
      <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-error"></div>
      <span className="font-button text-button text-primary">Unit KMC-091</span>
      </div>
      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-error-container/50 text-on-error-container">Delayed</span>
      </div>
      <div className="mt-1 mb-2 font-body-md text-label-caps text-on-error-container/80 text-xs">Traffic congestion at Ring Road intersection. Route deviated.</div>
      <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
      <span>98% Cap</span>
      </div>
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">speed</span>
      <span>5 km/h</span>
      </div>
      <div className="text-on-surface-variant font-label-caps text-label-caps group-hover:text-primary transition-colors">
                                          Details →
                                      </div>
      </div>
      </div>

      <div className="p-3 rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
      <span className="font-button text-button text-primary">Unit KMC-105</span>
      </div>
      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-tertiary-fixed-dim/10 text-on-tertiary-container">Returning</span>
      </div>
      <div className="flex items-center justify-between mt-3">
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
      <span>100% Cap</span>
      </div>
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps">
      <span className="material-symbols-outlined text-[14px]">speed</span>
      <span>35 km/h</span>
      </div>
      <div className="text-on-surface-variant font-label-caps text-label-caps group-hover:text-primary transition-colors">
                                          Details →
                                      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
