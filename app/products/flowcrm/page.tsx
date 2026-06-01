"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { icon: "👥", title: "Contact & Company Management", desc: "Unified contact records with activity history, notes, custom fields and company grouping. Everything in one place." },
  { icon: "📋", title: "Kanban Deal Pipeline", desc: "Drag-and-drop deal cards through your sales stages. Customise columns, set values, and track probability." },
  { icon: "📨", title: "Email Sequences", desc: "Automated multi-step email campaigns triggered by deal stage changes, time delays or manual actions." },
  { icon: "⏰", title: "Follow-Up Reminders", desc: "Never let a deal go cold. Smart reminders based on last activity, deal value and close date." },
  { icon: "📁", title: "CSV Import / Export", desc: "Migrate from any CRM in minutes. Full data export at any time — your data is always yours." },
  { icon: "🤝", title: "Team Collaboration", desc: "Assign deals to teammates, leave internal notes and track who did what with a full activity log." },
];

export default function FlowCRMPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background: "linear-gradient(135deg,#fff8f3,#fff1e6)", border: "1.5px solid rgba(249,115,22,0.6)", boxShadow: "0 0 10px rgba(249,115,22,0.4)", width: 68, height: 30 }}>
            <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
              <span className="font-mono font-bold text-[10px] select-none" style={{ color: "#ea580c" }}>&lt;/&gt;</span>
            </div>
            <div className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }} />
          </div>
          <span className="text-[17px] font-bold tracking-tight">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/products" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">← All products</Link>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 50%,#f0fdf4 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 75% 25%,rgba(52,211,153,0.25) 0%,transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">📊</div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-600">Lightweight CRM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-4">FlowCRM</h1>
            <p className="text-xl text-emerald-600 font-semibold mb-6">A CRM your team will actually use.</p>
            <p className="text-[16px] text-gray-500 max-w-xl leading-relaxed mb-10">
              Dead-simple CRM for small teams. Contacts, pipelines, follow-up reminders and email sequences — no bloat, no training required. Live in 10 minutes.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.a href="/start" whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(52,211,153,0.4)" }} className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-[14px] font-bold text-white">
                Book a call ↗
              </motion.a>
              <span className="text-[13px] text-gray-400">Simple, powerful, yours.</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 mb-12">Simple. Powerful. Yours.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -3 }} className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl p-12 text-center" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)" }}>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Close more deals with less effort.</h2>
          <p className="text-gray-500 mb-8">Get in touch and we&apos;ll show you around.</p>
          <motion.a href="/start" whileHover={{ scale: 1.05 }} className="inline-block rounded-xl bg-gray-900 px-10 py-4 text-[14px] font-bold text-white">
            Book a call ↗
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
