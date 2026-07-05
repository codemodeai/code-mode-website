"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    num: "01",
    label: "CRM · SaaS",
    title: "Arivo CRM",
    tagline: "Closing deals faster for logistics teams.",
    desc: "A full-stack CRM built for logistics companies. Real-time shipment tracking, automated follow-up sequences, and a Kanban deal pipeline that cut average sales cycles by 40% in the first quarter.",
    tags: ["Next.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
    metrics: [{ v: "40%", l: "Faster sales cycles" }, { v: "3×", l: "Pipeline visibility" }, { v: "2 wks", l: "Time to launch" }],
    bg: "bg-gray-900",
    accent: "text-orange-400",
    featured: true,
    image: "/work-dashboard.jpg",
  },
  {
    num: "02",
    label: "Payment SaaS",
    title: "PayFlow",
    tagline: "One dashboard for every payment gateway.",
    desc: "Automated payment reconciliation platform syncing Stripe, Razorpay and PayPal. Reduced manual bookkeeping by 80% for e-commerce businesses processing ₹16Cr+ monthly.",
    tags: ["React", "Node.js", "Razorpay", "Stripe", "MongoDB"],
    metrics: [{ v: "80%", l: "Less manual work" }, { v: "₹16Cr+", l: "Monthly volume" }, { v: "3", l: "Gateways unified" }],
    cardBg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    blob: "radial-gradient(circle at 80% 20%,rgba(34,197,94,0.3),transparent 65%)",
    featured: false,
    image: "/work-finance.jpg",
  },
  {
    num: "03",
    label: "AI Agent",
    title: "NeuralDesk",
    tagline: "Support that never sleeps.",
    desc: "AI-powered customer support agent trained on custom knowledge bases. Deflects 70% of inbound tickets with zero human intervention — integrated with Intercom, Slack and email.",
    tags: ["OpenAI", "Supabase", "Next.js", "Twilio", "Python"],
    metrics: [{ v: "70%", l: "Ticket deflection" }, { v: "24/7", l: "Always on" }, { v: "4 wks", l: "Full deployment" }],
    cardBg: "linear-gradient(135deg,#fef3c7,#fde68a)",
    blob: "radial-gradient(circle at 20% 80%,rgba(245,158,11,0.4),transparent 65%)",
    featured: false,
    image: "/work-crm.jpg",
  },
  {
    num: "04",
    label: "ERP · Inventory",
    title: "StockPilot",
    tagline: "Every SKU. Every warehouse. One system.",
    desc: "End-to-end inventory and ERP for mid-market retail chains. Real-time multi-warehouse stock, automated purchase order generation, and a supplier portal — deployed across 12 locations.",
    tags: ["React", "Django", "PostgreSQL", "AWS", "Redis"],
    metrics: [{ v: "12", l: "Locations live" }, { v: "99.9%", l: "Uptime SLA" }, { v: "60%", l: "Less stockouts" }],
    cardBg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    blob: "radial-gradient(circle at 70% 30%,rgba(59,130,246,0.25),transparent 65%)",
    featured: false,
    image: "/work-marketplace.jpg",
  },
  {
    num: "05",
    label: "SaaS · Analytics",
    title: "Insightful",
    tagline: "Your data, finally making sense.",
    desc: "Business intelligence dashboard for SMEs — connects to Shopify, WooCommerce, and custom APIs. Surfaces revenue trends, cohort retention, and churn risk in real time.",
    tags: ["Next.js", "Supabase", "Python", "Recharts", "OpenAI"],
    metrics: [{ v: "15+", l: "Data sources" }, { v: "< 2s", l: "Dashboard load" }, { v: "5×", l: "Faster insights" }],
    cardBg: "linear-gradient(135deg,#fdf4ff,#fae8ff)",
    blob: "radial-gradient(circle at 30% 70%,rgba(168,85,247,0.25),transparent 65%)",
    featured: false,
    image: "/work-analytics.jpg",
  },
  {
    num: "06",
    label: "Marketplace",
    title: "TradeNest",
    tagline: "B2B procurement without the friction.",
    desc: "A B2B wholesale marketplace connecting manufacturers with distributors. Built-in RFQ flow, bulk pricing tiers, escrow payments and a logistics partner API.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Razorpay", "AWS"],
    metrics: [{ v: "500+", l: "Vendors onboarded" }, { v: "₹10Cr+", l: "GMV in Y1" }, { v: "6 wks", l: "MVP to launch" }],
    cardBg: "linear-gradient(135deg,#fff7ed,#ffedd5)",
    blob: "radial-gradient(circle at 80% 40%,rgba(249,115,22,0.2),transparent 65%)",
    featured: false,
    image: "/work-ai.jpg",
  },
];

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5"
    >
      <Link href="/" className="flex items-center gap-3">
        {/* Logo pill */}
        <div className="relative flex items-center">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full blur-[8px]"
            style={{ background: "rgba(249,115,22,0.3)" }}
          />
          <div
            className="relative flex items-center rounded-full px-[5px] py-[4px]"
            style={{
              background: "linear-gradient(135deg,#fff8f3,#fff1e6)",
              border: "1.5px solid rgba(249,115,22,0.6)",
              boxShadow: "0 0 10px rgba(249,115,22,0.4), 0 0 24px rgba(249,115,22,0.2)",
              width: 68, height: 30,
            }}
          >
            <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
              <span className="font-mono font-bold select-none" style={{ fontSize: 10, color: "#ea580c", textShadow: "0 0 6px rgba(249,115,22,0.7)" }}>&lt;/&gt;</span>
            </div>
            <motion.div
              animate={{ boxShadow: ["0 0 6px 2px rgba(249,115,22,0.6)","0 0 10px 4px rgba(249,115,22,0.85)","0 0 6px 2px rgba(249,115,22,0.6)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full flex-shrink-0"
              style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }}
            />
          </div>
        </div>
        <span className="text-[17px] font-bold tracking-tight text-gray-900">Code<span className="text-orange-500">Mode</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-[13px] text-gray-500">
        <Link href="/work" className="text-gray-900 font-semibold">Work</Link>
        <Link href="/#services" className="hover:text-gray-900 transition-colors">Services</Link>
        <Link href="/#products" className="hover:text-gray-900 transition-colors">Products</Link>
        <Link href="/resources" className="hover:text-gray-900 transition-colors">Resources</Link>
        <Link href="/start" className="hover:text-gray-900 transition-colors">Contact</Link>
      </div>

      <Link href="/start">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Get started free
        </motion.span>
      </Link>
    </motion.nav>
  );
}

export default function WorkPage() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(251,146,60,0.15) 0%,transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute -right-64 bottom-1/4 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(251,113,133,0.1) 0%,transparent 70%)", filter: "blur(110px)" }} />
      </div>

      {/* ── Full-width video hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: 400 }}>
        <video
          src="/work-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,1) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-400 mb-4"
          >
            Our work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight drop-shadow-lg"
          >
            Products we&apos;ve <span className="text-orange-400">shipped.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-[15px] text-white/70 max-w-sm leading-relaxed"
          >
            Systems, platforms and AI products built for founders and operators.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* Page header — hidden, title lives in video hero */}

        {/* ── Featured project ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden mb-6 bg-gray-900"
          style={{ minHeight: 500 }}
        >
          {/* Visual */}
          <div className="absolute inset-0">
            <Image src={featured.image!} alt={featured.title} fill className="object-cover opacity-30" />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 75% 50%,rgba(249,115,22,0.28) 0%,transparent 55%), radial-gradient(circle at 15% 80%,rgba(251,113,133,0.15) 0%,transparent 50%)" }} />
          </div>

          <div className="relative p-10 md:p-16 flex flex-col justify-between" style={{ minHeight: 500 }}>
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">{featured.label}</span>
              <span className="font-mono text-[11px] text-white/15">{featured.num}</span>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">{featured.title}</h2>
              <p className="text-orange-300/80 text-[15px] font-medium mb-6">{featured.tagline}</p>
              <p className="text-white/45 text-[15px] max-w-xl leading-relaxed mb-10">{featured.desc}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-10 mb-10">
                {featured.metrics.map(({ v, l }) => (
                  <div key={l}>
                    <p className="text-3xl font-black text-orange-400">{v}</p>
                    <p className="text-[11px] text-white/35 uppercase tracking-widest mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {featured.tags.map(t => (
                  <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/45 font-medium">{t}</span>
                ))}
              </div>

              <motion.a
                href="/start"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-[14px] font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Start a similar project ↗
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ── Project grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(({ num, label, title, tagline, desc, tags, metrics, cardBg, blob, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}
              className="group rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col"
              style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
            >
              {/* Card visual */}
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                {image ? (
                  <Image src={image} alt={title} fill className="object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0" style={{ background: cardBg }} />
                    <div className="absolute inset-0" style={{ backgroundImage: blob }} />
                  </>
                )}
                <span className="absolute top-5 right-6 font-mono text-[11px] opacity-40 text-white drop-shadow">{num}</span>
              </div>

              <div className="flex flex-col flex-1 p-7">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">{label}</span>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{title}</h3>
                <p className="text-[13px] text-orange-500 font-medium mb-4">{tagline}</p>
                <p className="text-[13px] text-gray-400 leading-relaxed mb-5 flex-1">{desc}</p>

                {/* Mini metrics */}
                <div className="flex gap-5 mb-5 pb-5 border-b border-gray-50">
                  {metrics.map(({ v, l }) => (
                    <div key={l}>
                      <p className="text-lg font-black text-gray-900">{v}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{l}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map(t => (
                    <span key={t} className="rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1 text-[10px] text-gray-500 font-medium">{t}</span>
                  ))}
                </div>

                <motion.a
                  href="/start"
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-gray-400 group-hover:text-gray-900 transition-colors"
                >
                  Start a similar project <span className="text-orange-500">→</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 rounded-3xl bg-gray-900 p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-4">Ready to build?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Your product could be<br />next on this page.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <motion.a
              href="/start"
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(249,115,22,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors"
              style={{ boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
            >
              Start a project ↗
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              Back to home
            </motion.a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
