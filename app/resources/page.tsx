"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Resource = {
  slug: string;
  href: string;
  external?: boolean;
  kind: string;
  kindColor: string;
  title: string;
  desc: string;
  meta: string;
  accent: string;
  emoji: string;
  badge?: string | null;
};

const resources: Resource[] = [
  {
    slug: "skill-acceleration-system",
    href: "/guides/skill-acceleration-system.html",
    external: true,
    kind: "Skill Development",
    kindColor: "bg-orange-50 text-orange-600 border-orange-200",
    title: "The Skill Acceleration System",
    desc: "One engineered prompt that turns Claude into a structured learning system — it calibrates to you, teaches through real attempts, builds you a 7-day plan, and checks your understanding at every stage. Paste it into a Claude Project and start.",
    meta: "1 copy-paste system prompt · 2 min setup",
    accent: "from-orange-400 to-violet-500",
    emoji: "🎯",
    badge: "New",
  },
  {
    slug: "fable-5",
    href: "/guides/fable-5.html",
    external: true,
    kind: "Free Guide",
    kindColor: "bg-orange-50 text-orange-600 border-orange-200",
    title: "5 things to build in Fable 5",
    desc: "A complete step-by-step playbook: build a trading bot, turn a screenshot into a working website, wire up a second brain, run self-improving AI loops, and auto-plan your schedule — all with copy-paste prompts and zero code.",
    meta: "9 ready-to-use prompts · ~15 min per project",
    accent: "from-orange-400 to-rose-500",
    emoji: "⚡",
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
        <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
        <Link href="/resources" className="text-gray-900 font-semibold">Resources</Link>
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

function ResourceCard({ r, i }: { r: Resource; i: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group h-full rounded-3xl border border-gray-100 bg-white overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
    >
      {/* Visual header */}
      <div className={`relative flex items-center justify-center bg-gradient-to-br ${r.accent} overflow-hidden`} style={{ minHeight: 200 }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "22px 22px" }} />
        <span className="relative text-7xl drop-shadow-lg" aria-hidden>{r.emoji}</span>
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm bg-white/85 ${r.kindColor}`}>{r.kind}</span>
          {r.badge && (
            <span className="rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{r.badge}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col">
        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3">{r.title}</h2>
        <p className="text-[14px] text-gray-400 leading-relaxed mb-6">{r.desc}</p>
        <p className="text-[12px] font-semibold text-gray-500 mb-6">{r.meta}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold text-orange-500 group-hover:gap-3 transition-all">
          Read the guide
          <span>→</span>
        </span>
      </div>
    </motion.div>
  );

  if (r.external) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return (
    <Link href={r.href} className="block h-full">
      {inner}
    </Link>
  );
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(189,162,239,0.12) 0%,transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute -right-64 bottom-0 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)", filter: "blur(110px)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Resources</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-900">
              Guides &amp; playbooks.<br />
              <span className="text-orange-500">Build with AI.</span>
            </h1>
            <p className="max-w-xs text-[15px] text-gray-400 leading-relaxed">
              Free, practical guides from the Code Mode team — copy the prompts, follow the steps, and ship something real today.
            </p>
          </div>
        </motion.div>

        {/* Resource grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <ResourceCard key={r.slug} r={r} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 rounded-3xl bg-gray-900 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-3">Want us to build it for you?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">From idea to shipped product.</h2>
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
