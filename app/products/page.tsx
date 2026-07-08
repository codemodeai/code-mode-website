"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    slug: "flowcrm",
    name: "CRM",
    tag: "White Label",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    tagline: "Your brand. Your CRM. Fully yours.",
    desc: "A fully white-labelled CRM platform — custom branding, pipelines, contact management, and automations. Ship it as your own product with zero dev overhead.",
    features: ["White-label branding", "Kanban deal pipeline", "Contact & company management", "Email automations", "CSV import/export", "Team collaboration"],
    accent: "from-emerald-400 to-teal-500",
    image: "/product-crm.jpg",
    imageBg: "#e8f0fe",
    badge: null,
  },
  {
    slug: "agentcore",
    name: "SEER",
    tag: "AI Tool",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200",
    tagline: "See everything. Miss nothing.",
    desc: "An AI-powered intelligence layer that sees across your business — surfacing insights, automating decisions, and flagging risks before they happen. Currently in active development.",
    features: ["Real-time AI insights", "Predictive analytics", "Multi-source data sync", "Natural language queries", "Slack & email alerts", "Custom dashboards"],
    accent: "from-orange-400 to-rose-500",
    image: "/product-seer.png",
    imageBg: "#9d7ce8",
    badge: "In Progress",
  },
  {
    slug: "launchkit",
    name: "Flox",
    tag: "Platform",
    tagColor: "bg-violet-50 text-violet-600 border-violet-200",
    tagline: "Workflows that move as fast as you do.",
    desc: "A modern workflow and collaboration platform built for fast-moving teams — tasks, docs, and communication unified in one space. No switching tabs, no context loss.",
    features: ["Task & project tracking", "Docs & wikis", "Team collaboration", "Integrations & API", "Custom workflows", "Real-time updates"],
    accent: "from-violet-500 to-purple-600",
    image: "/product-flox.png",
    imageBg: "#1a1a2e",
    badge: null,
  },
];

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="relative flex items-center">
          <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-0 rounded-full blur-[8px]" style={{ background: "rgba(157,124,232,0.3)" }} />
          <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background: "linear-gradient(135deg,#faf8ff,#f3eefe)", border: "1.5px solid rgba(157,124,232,0.6)", boxShadow: "0 0 10px rgba(157,124,232,0.4)", width: 68, height: 30 }}>
            <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
              <span className="font-mono font-bold text-[10px] select-none" style={{ color: "#6d42be", textShadow: "0 0 6px rgba(157,124,232,0.7)" }}>&lt;/&gt;</span>
            </div>
            <motion.div animate={{ boxShadow: ["0 0 6px 2px rgba(157,124,232,0.6)", "0 0 10px 4px rgba(157,124,232,0.85)", "0 0 6px 2px rgba(157,124,232,0.6)"] }} transition={{ duration: 2, repeat: Infinity }} className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
          </div>
        </div>
        <span className="text-[17px] font-bold tracking-tight text-gray-900">Code<span className="text-orange-500">Mode</span></span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-[13px] text-gray-500">
        <Link href="/work" className="hover:text-gray-900 transition-colors">Work</Link>
        <Link href="/#services" className="hover:text-gray-900 transition-colors">Services</Link>
        <Link href="/products" className="text-gray-900 font-semibold">Products</Link>
        <Link href="/resources" className="hover:text-gray-900 transition-colors">Resources</Link>
        <Link href="/start" className="hover:text-gray-900 transition-colors">Contact</Link>
      </div>
      <Link href="/start">
        <motion.span whileHover={{ scale: 1.03 }} className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700 transition-colors cursor-pointer">
          Get started free
        </motion.span>
      </Link>
    </motion.nav>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(189,162,239,0.12) 0%,transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute -right-64 bottom-0 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)", filter: "blur(110px)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Our products</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-900">
              Tools we built.<br />
              <span className="text-orange-500">Ship faster.</span>
            </h1>
            <p className="max-w-xs text-[15px] text-gray-400 leading-relaxed">
              Battle-tested products from our own engineering team — used internally and now available to you.
            </p>
          </div>
        </motion.div>

        {/* Product cards */}
        <div className="flex flex-col gap-6">
          {products.map(({ slug, name, tag, tagColor, tagline, desc, features, accent, image, imageBg, badge }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl border border-gray-100 bg-white overflow-hidden"
              style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="grid md:grid-cols-[1fr_1.4fr] gap-0">
                {/* Visual side */}
                <div className="relative flex flex-col justify-between overflow-hidden" style={{ background: imageBg, minHeight: 280 }}>
                  <Image src={image} alt={name} fill className="object-contain p-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Badges */}
                  <div className="relative p-6 flex items-center gap-2">
                    <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm bg-white/80 ${tagColor}`}>{tag}</span>
                    {badge && (
                      <span className="rounded-full border border-amber-300 bg-amber-50/90 backdrop-blur-sm px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600">{badge}</span>
                    )}
                  </div>
                  <div className="relative p-6 pt-0">
                    <h2 className="text-3xl font-black text-white mb-1 drop-shadow">{name}</h2>
                    <p className="text-[13px] font-semibold text-white/70 mb-5">{tagline}</p>
                    <div className="flex items-center gap-4">
                      <Link href={`/products/${slug}`}>
                        <motion.span whileHover={{ scale: 1.05 }} className="inline-block rounded-xl bg-white px-6 py-2.5 text-[13px] font-bold text-gray-900 cursor-pointer">
                          Learn more →
                        </motion.span>
                      </Link>
                      <Link href="/start" className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors">Book a call</Link>
                    </div>
                  </div>
                </div>

                {/* Info side */}
                <div className="p-10 flex flex-col justify-center">
                  <p className="text-[14px] text-gray-400 leading-relaxed mb-8">{desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map(f => (
                      <div key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${accent} shrink-0`} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 rounded-3xl bg-gray-900 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-3">Need something custom?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">We build bespoke software too.</h2>
          </div>
          <Link href="/start">
            <motion.span whileHover={{ scale: 1.04 }} className="inline-block rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white cursor-pointer">
              Start a project ↗
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
