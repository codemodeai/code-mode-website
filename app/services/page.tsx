"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    slug: "saas-development",
    num: "01",
    icon: "⚡",
    title: "SaaS Product Development",
    tagline: "From idea to production-ready product.",
    desc: "We own the full stack — architecture, backend, frontend, auth, billing and devops. You get a scalable SaaS without hiring a team of 10.",
    deliverables: ["System architecture & ERD", "Auth + RBAC", "Stripe/Razorpay billing", "REST or GraphQL API", "Admin dashboard", "CI/CD pipeline"],
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Vercel"],
    accent: "from-violet-500 to-purple-600",
    bg: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
    iconBg: "bg-violet-50",
    timeline: "6–16 weeks",
    startingAt: "",
  },
  {
    slug: "ai-automation",
    num: "02",
    icon: "🤖",
    title: "AI & Automation",
    tagline: "Replace manual work with intelligence.",
    desc: "Custom AI agents, LLM integrations, RAG pipelines and workflow automation that cut manual effort and give you capabilities your competitors don't have.",
    deliverables: ["AI agent design & build", "RAG pipeline + vector DB", "LLM provider integration", "Tool use & function calling", "Human-in-the-loop flows", "Monitoring & evals"],
    tags: ["OpenAI", "Anthropic", "LangChain", "Supabase", "Python", "FastAPI"],
    accent: "from-orange-400 to-rose-500",
    bg: "linear-gradient(135deg,#fff7ed,#ffedd5)",
    iconBg: "bg-orange-50",
    timeline: "4–12 weeks",
    startingAt: "",
  },
  {
    slug: "crm-erp",
    num: "03",
    icon: "📊",
    title: "CRM & ERP Systems",
    tagline: "Built for your workflow, not someone else's.",
    desc: "Custom-built CRM and ERP platforms tailored to your exact process — no off-the-shelf compromises, no paying for features you'll never use.",
    deliverables: ["Process mapping & data model", "Contact & deal management", "Custom pipeline & stages", "Reporting & analytics", "Email + WhatsApp integration", "Role-based access"],
    tags: ["React", "Django", "PostgreSQL", "Redis", "AWS", "Celery"],
    accent: "from-emerald-400 to-teal-500",
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    iconBg: "bg-emerald-50",
    timeline: "8–20 weeks",
    startingAt: "",
  },
  {
    slug: "mobile-apps",
    num: "04",
    icon: "📱",
    title: "Mobile App Development",
    tagline: "Native performance. Cross-platform speed.",
    desc: "Cross-platform iOS & Android apps built with React Native. From consumer apps to internal tools — shipped fast, tested thoroughly, supported long-term.",
    deliverables: ["UX wireframes & prototypes", "iOS + Android app", "Backend API", "Push notifications", "App Store & Play Store submission", "Analytics integration"],
    tags: ["React Native", "Expo", "Supabase", "Firebase", "TypeScript", "Fastlane"],
    accent: "from-blue-400 to-cyan-500",
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    iconBg: "bg-blue-50",
    timeline: "8–16 weeks",
    startingAt: "",
  },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background:"linear-gradient(135deg,#fff8f3,#fff1e6)",border:"1.5px solid rgba(249,115,22,0.6)",boxShadow:"0 0 10px rgba(249,115,22,0.4)",width:68,height:30 }}>
          <div className="flex items-center justify-center" style={{ width:32,height:22 }}>
            <span className="font-mono font-bold text-[10px] select-none" style={{ color:"#ea580c" }}>&lt;/&gt;</span>
          </div>
          <div className="rounded-full flex-shrink-0" style={{ width:22,height:22,background:"radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }} />
        </div>
        <span className="text-[17px] font-bold tracking-tight text-gray-900">Code<span className="text-orange-500">Mode</span></span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-[13px] text-gray-500">
        <Link href="/work" className="hover:text-gray-900 transition-colors">Work</Link>
        <Link href="/services" className="text-gray-900 font-semibold">Services</Link>
        <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
        <Link href="/start" className="hover:text-gray-900 transition-colors">Contact</Link>
      </div>
      <Link href="/start">
        <motion.span whileHover={{ scale:1.03 }} className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700 transition-colors cursor-pointer">
          Get started free
        </motion.span>
      </Link>
    </nav>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[700px] w-[700px] rounded-full" style={{ background:"radial-gradient(circle,rgba(251,146,60,0.12) 0%,transparent 70%)",filter:"blur(100px)" }} />
        <div className="absolute -right-64 bottom-1/4 h-[600px] w-[600px] rounded-full" style={{ background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)",filter:"blur(110px)" }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-20">

        {/* Header */}
        <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.65,ease:[0.16,1,0.3,1] }} className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">What we do</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
              Services for<br /><span className="text-orange-500">ambitious</span> teams.
            </h1>
            <p className="max-w-xs text-[15px] text-gray-400 leading-relaxed">
              We build software end-to-end. Pick the service that fits your stage — or let&apos;s talk and we&apos;ll scope it together.
            </p>
          </div>
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-5">
          {services.map(({ slug,num,icon,title,tagline,desc,deliverables,tags,accent,bg,iconBg,timeline,startingAt },i) => (
            <motion.div
              key={slug}
              initial={{ opacity:0,y:28 }}
              animate={{ opacity:1,y:0 }}
              transition={{ duration:0.6,delay:i*0.1,ease:[0.16,1,0.3,1] }}
              className="group rounded-3xl border border-gray-100 bg-white overflow-hidden"
              style={{ boxShadow:"0 2px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="grid md:grid-cols-[1fr_1.6fr] gap-0">
                {/* Visual */}
                <div className="relative p-10 flex flex-col justify-between" style={{ background:bg,minHeight:280 }}>
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${iconBg} shadow-sm`}>{icon}</div>
                      <span className="font-mono text-[11px] text-gray-900/20">{num}</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
                    <p className={`text-[13px] font-semibold bg-gradient-to-r ${accent} bg-clip-text text-transparent mb-4`}>{tagline}</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                  <div className="mt-8">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Typical timeline</p>
                    <p className="text-sm font-bold text-gray-700">{timeline}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-10 flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">What&apos;s included</p>
                    <div className="grid grid-cols-2 gap-3">
                      {deliverables.map(d => (
                        <div key={d} className="flex items-center gap-2.5 text-[13px] text-gray-700">
                          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${accent} shrink-0`} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Tech stack</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {tags.map(t => (
                        <span key={t} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-1 text-[11px] text-gray-500 font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                    <Link href={`/services/${slug}`}>
                      <motion.span whileHover={{ scale:1.03 }} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-[13px] font-bold text-white cursor-pointer group-hover:bg-orange-500 transition-colors duration-300">
                        Learn more →
                      </motion.span>
                    </Link>
                    <Link href="/start" className="text-[13px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">Book a call</Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.5 }} className="mt-16 rounded-3xl bg-gray-900 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-4">Not sure what you need?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Let&apos;s scope it together.</h2>
            <p className="text-white/40 text-[14px] mt-2">Free 30-minute call. No commitment.</p>
          </div>
          <Link href="/start">
            <motion.span whileHover={{ scale:1.04,boxShadow:"0 0 32px rgba(249,115,22,0.4)" }} className="inline-block rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white cursor-pointer" style={{ boxShadow:"0 0 20px rgba(249,115,22,0.3)" }}>
              Book a free call ↗
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
