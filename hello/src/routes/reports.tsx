import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report Center \u2014 Swachchha Nagar" },
      { name: "description", content: "Filter, triage and track every citizen waste report across the city." },
      { property: "og:title", content: "Report Center \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Filter, triage and track every citizen waste report across the city." },
    ],
  }),
  component: Reports,
});

function Reports() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-screen py-stack-lg px-4 gap-stack-md bg-surface border-r border-outline-variant/20 fixed h-full left-0 w-64 z-40">
      <div className="mb-stack-lg flex items-center gap-3 px-2">
      <img alt="Kathmandu Metropolitan City Logo" className="w-10 h-10 rounded-lg object-cover" data-alt="A highly detailed minimalist logo for Kathmandu Metropolitan City Operations, featuring abstract geometric mountain peaks in crisp primary green and sleek silver tones on a pure white background. The design is modern, civic-tech focused, and conveys institutional trust and efficiency in a high-end corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiNiI4YhpqbcTU_jcxcVIVmHrh7LiOn_--xKfYrvt_ndQh8JBVI3KCLL-gINgj-1Fb_ut0fa-hovmPKNLmpGybP-HD3yMxCTDzx8UoIDMSSuVmhtPXX-G0CYbwqheMxKvonJh01d4wD8d2tyMJ3zhIZKVU3Ga4HjFCUn1jhK4GutxgRXNee7GZqoqkIDKY_11l9Usfftchtq0abALXe-ozRX3F37BcbbvvcJGLobe9sswCInp0Cbb6yg" />
      <div>
      <h1 className="font-display-lg text-primary dark:text-primary-fixed text-lg font-bold leading-tight">KMC Operations</h1>
      <p className="font-label-caps text-label-caps text-on-surface-variant">Municipal Hub</p>
      </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
      <span className="font-label-caps text-label-caps">Dashboard</span>
      </Link>
      <Link to="/wards" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>leaderboard</span>
      <span className="font-label-caps text-label-caps">Ward Performance</span>
      </Link>
      <Link to="/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
      <span className="font-label-caps text-label-caps">Fleet Monitor</span>
      </Link>
      <Link to="/hotspots" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>radar</span>
      <span className="font-label-caps text-label-caps">Hotspot Analysis</span>
      </Link>
      <Link to="/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-container bg-tertiary-fixed-dim/20 transition-all active:translate-x-1 duration-150">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assessment</span>
      <span className="font-label-caps text-label-caps">Report Center</span>
      </Link>
      </div>
      <div className="mt-auto flex flex-col gap-2">
      <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150" href="#">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help_outline</span>
      <span className="font-label-caps text-label-caps">Support</span>
      </a>
      <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150" href="#">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
      <span className="font-label-caps text-label-caps">Archive</span>
      </a>
      <button className="mt-4 bg-primary-container text-on-primary font-button text-button py-3 px-4 rounded-lg hover:bg-[#093027] transition-colors flex items-center justify-center gap-2">
      <span>Dispatch Crew</span>
      <span className="material-symbols-outlined text-sm">send</span>
      </button>
      </div>
      </nav>

      <main className="flex-1 md:ml-64 relative min-h-screen">

      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] z-50 flex justify-between items-center px-margin-desktop py-4 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-all">
      <div className="flex items-center gap-4">
      <div className="md:hidden">
      <span className="material-symbols-outlined text-on-surface-variant cursor-pointer p-2">menu</span>
      </div>
      <h2 className="font-headline-md text-headline-md text-primary tracking-tight">KTM Waste Management</h2>
      </div>
      <div className="flex items-center gap-6">

      <div className="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/30 focus-within:border-tertiary-fixed-dim focus-within:ring-2 focus-within:ring-tertiary-fixed-dim/20 transition-all w-64">
      <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
      <input className="bg-transparent border-none outline-none text-body-md font-body-md w-full placeholder:text-on-surface-variant/60 focus:ring-0 p-0 text-on-background" placeholder="Search reports..." type="text" />
      </div>
      <div className="flex items-center gap-3">
      <button className="p-2 text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full active:scale-95 duration-200">
      <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="p-2 text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full active:scale-95 duration-200">
      <span className="material-symbols-outlined">settings</span>
      </button>
      <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 overflow-hidden cursor-pointer ml-2">
      <img alt="Administrator profile" className="w-full h-full object-cover" data-alt="A professional headshot of a municipal administrator in a bright, modern office setting. The lighting is soft and natural, emphasizing a high-end corporate civic-tech aesthetic with neutral gray and white tones in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Z5toNJRoFf73wVpPLJBOOSlhTrG7WRfEMQXKNNlsLY27b_0c38XFYFW-rml-0TkZwv7oV2yrGZhXMS79XMKH-S1no8wyP92ZrT8cDfxr0Boneth7gkS138IZFBi7tBwvTgVyQW33mr5ge6GxLzgSpvrfqm4aS5X2yWgNcJzAv1cQbSNo-Onx0QqvPkB2ZMPWNwpGWMtkG0s3bR1zi_z_7Kncaz-7DNc05ufHcEIaKlbBA4c9AnJNaQ" />
      </div>
      </div>
      </div>
      </header>

      <div className="pt-24 px-margin-mobile md:px-margin-desktop pb-stack-lg max-w-container-max mx-auto">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4">
      <div>
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Report Center</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage, analyze, and dispatch active citizen reports.</p>
      </div>
      <div className="flex gap-3">
      <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg font-button text-button text-on-surface-variant flex items-center gap-2 hover:bg-surface-container-low transition-colors">
      <span className="material-symbols-outlined text-sm">download</span>
                              Export CSV
                          </button>
      <button className="px-4 py-2 bg-primary-container text-on-primary rounded-lg font-button text-button flex items-center gap-2 hover:bg-[#093027] transition-colors shadow-sm">
      <span className="material-symbols-outlined text-sm">add</span>
                              New Report
                          </button>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">

      <div className="glass-card rounded-xl p-stack-md flex flex-col relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
      <p className="font-label-caps text-label-caps text-on-surface-variant">AVG RESOLUTION TIME</p>
      <h3 className="font-headline-md text-headline-md text-primary mt-1">4.2 Hrs</h3>
      </div>
      <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
      </div>
      </div>
      <div className="mt-auto relative z-10 flex items-center gap-2">
      <span className="material-symbols-outlined text-on-tertiary-container text-sm">arrow_downward</span>
      <span className="font-body-md text-body-md text-on-tertiary-container font-semibold">12%</span>
      <span className="font-body-md text-body-md text-on-surface-variant/60 text-sm">vs last week</span>
      </div>
      </div>

      <div className="glass-card rounded-xl p-stack-md flex flex-col relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
      <p className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE REPORTS</p>
      <h3 className="font-headline-md text-headline-md text-primary mt-1">142</h3>
      </div>
      <div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center">
      <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
      </div>
      </div>
      <div className="mt-auto relative z-10 flex items-center gap-2">
      <span className="material-symbols-outlined text-error text-sm">arrow_upward</span>
      <span className="font-body-md text-body-md text-error font-semibold">5%</span>
      <span className="font-body-md text-body-md text-on-surface-variant/60 text-sm">vs last week</span>
      </div>
      </div>

      <div className="glass-card rounded-xl p-stack-md flex flex-col relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
      <p className="font-label-caps text-label-caps text-on-surface-variant">CITIZEN SENTIMENT</p>
      <h3 className="font-headline-md text-headline-md text-primary mt-1">Positive</h3>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
      </div>
      </div>
      <div className="mt-auto relative z-10 w-full">
      <div className="flex justify-between text-xs font-label-caps text-label-caps text-on-surface-variant mb-1">
      <span>Score: 78/100</span>
      </div>
      <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
      <div className="bg-primary-container h-full rounded-full" style={{ width: "78%" }}></div>
      </div>
      </div>
      </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col">

      <div className="p-stack-md border-b border-outline-variant/20 bg-surface-bright flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
      <p className="font-label-caps text-label-caps text-on-surface-variant mr-2">FILTERS:</p>

      <div className="relative">
      <select className="appearance-none bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm rounded-lg focus:ring-tertiary-fixed-dim focus:border-tertiary-fixed-dim block w-full p-2 pr-8 font-body-md cursor-pointer transition-colors hover:border-outline">
      <option>All Categories</option>
      <option>Organic Waste</option>
      <option>Plastic / Recyclable</option>
      <option>Hazardous</option>
      <option>Illegal Dumping</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
      <span className="material-symbols-outlined text-sm">expand_more</span>
      </div>
      </div>

      <div className="relative">
      <select className="appearance-none bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm rounded-lg focus:ring-tertiary-fixed-dim focus:border-tertiary-fixed-dim block w-full p-2 pr-8 font-body-md cursor-pointer transition-colors hover:border-outline">
      <option>All Statuses</option>
      <option>New</option>
      <option>Dispatched</option>
      <option>Resolved</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
      <span className="material-symbols-outlined text-sm">expand_more</span>
      </div>
      </div>

      <div className="relative">
      <select className="appearance-none bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm rounded-lg focus:ring-tertiary-fixed-dim focus:border-tertiary-fixed-dim block w-full p-2 pr-8 font-body-md cursor-pointer transition-colors hover:border-outline">
      <option>All Priorities</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
      <span className="material-symbols-outlined text-sm">expand_more</span>
      </div>
      </div>
      </div>
      <div className="flex items-center gap-2">
      <span className="font-body-md text-sm text-on-surface-variant">Showing 1-10 of 142</span>
      <div className="flex gap-1">
      <button className="p-1 rounded-md border border-outline-variant/30 text-outline hover:bg-surface-container-high disabled:opacity-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
      <button className="p-1 rounded-md border border-outline-variant/30 text-outline hover:bg-surface-container-high"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
      </div>
      </div>
      </div>

      <div className="overflow-x-auto w-full">
      <table className="w-full text-left font-body-md text-body-md border-collapse">
      <thead className="bg-surface-container-low/50 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/30">
      <tr>
      <th className="py-3 px-4 font-medium w-12">
      <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest" type="checkbox" />
      </th>
      <th className="py-3 px-4 font-medium">REPORT ID</th>
      <th className="py-3 px-4 font-medium">LOCATION</th>
      <th className="py-3 px-4 font-medium">CATEGORY</th>
      <th className="py-3 px-4 font-medium">PRIORITY</th>
      <th className="py-3 px-4 font-medium">STATUS</th>
      <th className="py-3 px-4 font-medium">SUBMITTED</th>
      <th className="py-3 px-4 font-medium text-right">ACTIONS</th>
      </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/20 text-on-surface">

      <tr className="hover:bg-surface-container-lowest/80 transition-colors group">
      <td className="py-4 px-4">
      <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest" type="checkbox" />
      </td>
      <td className="py-4 px-4 font-medium">#REP-8902</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-outline-variant text-sm">location_on</span>
      <span>Ward 14, Kalanki</span>
      </div>
      </td>
      <td className="py-4 px-4">Organic Waste</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-1.5 text-error">
      <span className="w-2 h-2 rounded-full bg-error"></span>
      <span className="text-sm font-medium">High</span>
      </div>
      </td>
      <td className="py-4 px-4">
      <span className="font-label-caps status-chip status-new">NEW</span>
      </td>
      <td className="py-4 px-4 text-on-surface-variant text-sm">2 hrs ago</td>
      <td className="py-4 px-4 text-right">
      <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
      <span className="material-symbols-outlined text-[20px]">more_vert</span>
      </button>
      </td>
      </tr>

      <tr className="hover:bg-surface-container-lowest/80 transition-colors group">
      <td className="py-4 px-4">
      <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest" type="checkbox" />
      </td>
      <td className="py-4 px-4 font-medium">#REP-8901</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-outline-variant text-sm">location_on</span>
      <span>Ward 3, Lazimpat</span>
      </div>
      </td>
      <td className="py-4 px-4">Illegal Dumping</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-1.5 text-on-surface">
      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
      <span className="text-sm font-medium">Medium</span>
      </div>
      </td>
      <td className="py-4 px-4">
      <span className="font-label-caps status-chip status-dispatched">DISPATCHED</span>
      </td>
      <td className="py-4 px-4 text-on-surface-variant text-sm">5 hrs ago</td>
      <td className="py-4 px-4 text-right">
      <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
      <span className="material-symbols-outlined text-[20px]">more_vert</span>
      </button>
      </td>
      </tr>

      <tr className="hover:bg-surface-container-lowest/80 transition-colors group">
      <td className="py-4 px-4">
      <input className="rounded border-outline-variant text-primary-container focus:ring-primary-container bg-surface-container-lowest" type="checkbox" />
      </td>
      <td className="py-4 px-4 font-medium">#REP-8899</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-outline-variant text-sm">location_on</span>
      <span>Ward 26, Thamel</span>
      </div>
      </td>
      <td className="py-4 px-4">Plastic / Recyclable</td>
      <td className="py-4 px-4">
      <div className="flex items-center gap-1.5 text-outline">
      <span className="w-2 h-2 rounded-full bg-outline"></span>
      <span className="text-sm font-medium">Low</span>
      </div>
      </td>
      <td className="py-4 px-4">
      <span className="font-label-caps status-chip status-resolved">RESOLVED</span>
      </td>
      <td className="py-4 px-4 text-on-surface-variant text-sm">Yesterday</td>
      <td className="py-4 px-4 text-right">
      <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
      <span className="material-symbols-outlined text-[20px]">more_vert</span>
      </button>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </div>
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant/20 flex justify-around items-center h-16 z-50 pb-safe">
      <Link to="/" className="flex flex-col items-center gap-1 text-on-surface-variant p-2">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
      <span className="text-[10px] font-label-caps">Home</span>
      </Link>
      <Link to="/wards" className="flex flex-col items-center gap-1 text-on-surface-variant p-2">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>leaderboard</span>
      <span className="text-[10px] font-label-caps">Wards</span>
      </Link>
      <Link to="/reports" className="flex flex-col items-center gap-1 text-tertiary-fixed-dim p-2">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>assessment</span>
      <span className="text-[10px] font-label-caps">Reports</span>
      </Link>
      <a className="flex flex-col items-center gap-1 text-on-surface-variant p-2" href="#">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
      <span className="text-[10px] font-label-caps">Profile</span>
      </a>
      </nav>
    </>
  );
}
