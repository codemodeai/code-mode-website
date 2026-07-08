"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const tabs = ["Project Brief", "Book a Call"] as const;
type Tab = (typeof tabs)[number];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getDates() {
  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    return d;
  });
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 md:px-16 bg-white/90 backdrop-blur-md border-b border-black/5">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative flex items-center rounded-full px-[5px] py-[4px]" style={{ background: "linear-gradient(135deg,#faf8ff,#f3eefe)", border: "1.5px solid rgba(157,124,232,0.6)", boxShadow: "0 0 10px rgba(157,124,232,0.4)", width: 68, height: 30 }}>
          <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
            <span className="font-mono font-bold text-[10px] select-none" style={{ color: "#6d42be" }}>&lt;/&gt;</span>
          </div>
          <div className="rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: "radial-gradient(circle at 35% 35%,#ede6fb,#9d7ce8 55%,#7d5ad0)" }} />
        </div>
        <span className="text-[17px] font-bold tracking-tight text-gray-900">Code<span className="text-orange-500">Mode</span></span>
      </Link>
      <div className="flex items-center gap-4 text-[13px]">
        <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">← Back to home</Link>
      </div>
    </nav>
  );
}

function ProjectBriefForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl mb-6">✅</div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">Brief received!</h3>
        <p className="text-gray-400 max-w-sm mb-8">We&apos;ve got your project brief. Our team will review it and get back to you within 24 hours with an initial scope and next steps.</p>
        <Link href="/">
          <motion.span whileHover={{ scale: 1.03 }} className="inline-block rounded-xl bg-gray-900 px-6 py-3 text-[13px] font-bold text-white cursor-pointer">Back to home</motion.span>
        </Link>
      </motion.div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:         fd.get("name"),
        email:        fd.get("email"),
        phone:        fd.get("phone"),
        company:      fd.get("company"),
        role:         fd.get("role"),
        project_name: fd.get("projectName"),
        project_type: fd.get("projectType"),
        description:  fd.get("description"),
        platforms:    platforms.join(", "),
        features:     features.join(", "),
        timeline:     fd.get("timeline"),
        budget:       fd.get("budget"),
        designs:      fd.get("designs"),
        codebase:     fd.get("codebase"),
        hear_about:   fd.get("hearAbout"),
        extra:        fd.get("extra"),
        source:       "start_form",
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">

      {/* Contact info */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">01 — Contact info</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full name", name: "name", placeholder: "Your full name", type: "text" },
            { label: "Work email", name: "email", placeholder: "you@company.com", type: "email" },
            { label: "Company / Organisation", name: "company", placeholder: "Company name (optional)", type: "text" },
            { label: "Your role", name: "role", placeholder: "e.g. Founder, CTO, Product Manager", type: "text" },
          ].map(({ label, name, placeholder, type }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
              <input required={name !== "company"} type={type} name={name} placeholder={placeholder}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Project details */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">02 — Project details</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Project name / working title</label>
            <input type="text" name="projectName" placeholder="e.g. 'Arivo CRM', 'Customer Portal', 'AI Support Agent'"
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Project type</label>
            <select required name="projectType"
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
              <option value="">Select the type of project</option>
              <option>SaaS Product</option>
              <option>CRM / ERP System</option>
              <option>AI Agent / Automation</option>
              <option>Mobile App (iOS & Android)</option>
              <option>Marketplace / Platform</option>
              <option>Internal Tool / Dashboard</option>
              <option>E-commerce</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Describe your project</label>
            <textarea required rows={5} name="description"
              placeholder="Tell us what you're building, who it's for, what problem it solves, and any specific features or requirements you have in mind..."
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none" />
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Platform (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {["Web app", "iOS app", "Android app", "Desktop app", "API / Backend only"].map(p => (
                <button key={p} type="button" onClick={() => toggleItem(platforms, setPlatforms, p)}
                  className={`rounded-lg border px-4 py-2 text-[12px] font-semibold transition-all ${platforms.includes(p) ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Key features */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Key features needed (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {["User authentication", "Payments / Billing", "Admin dashboard", "Email / notifications", "AI / ML features", "Real-time updates", "Analytics", "Third-party integrations", "Multi-tenancy", "File uploads", "Search", "Mobile-responsive"].map(f => (
                <button key={f} type="button" onClick={() => toggleItem(features, setFeatures, f)}
                  className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all ${features.includes(f) ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Timeline & budget */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">03 — Timeline & scope</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Target launch / deadline</label>
            <select name="timeline" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
              <option value="">When do you need this?</option>
              <option>ASAP (under 4 weeks)</option>
              <option>1–2 months</option>
              <option>2–4 months</option>
              <option>4–6 months</option>
              <option>6+ months</option>
              <option>No fixed deadline</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Budget range</label>
            <select name="budget" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
              <option value="">Select a budget range</option>
              <option>Under ₹5L</option>
              <option>₹5L – ₹15L</option>
              <option>₹15L – ₹30L</option>
              <option>₹30L – ₹75L</option>
              <option>₹75L+</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Additional context */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">04 — Additional context</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Do you have existing designs?</label>
              <select name="designs" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
                <option>No — we need design too</option>
                <option>Partial designs / wireframes</option>
                <option>Yes — full Figma designs ready</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Existing codebase?</label>
              <select name="codebase" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
                <option>Starting from scratch</option>
                <option>Partial codebase exists</option>
                <option>Full codebase — need extensions</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">How did you hear about us?</label>
            <select name="hearAbout" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none">
              <option value="">Select an option</option>
              <option>Google / search</option>
              <option>LinkedIn</option>
              <option>Referral from someone</option>
              <option>Twitter / X</option>
              <option>Instagram</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Anything else you&apos;d like to add?</label>
            <textarea rows={3} name="extra" placeholder="Links to inspiration, competitor products, specific constraints, or anything else that will help us understand your project..."
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none" />
          </div>
        </div>
      </div>

      <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(157,124,232,0.35)" }} whileTap={{ scale: 0.98 }}
        className="w-full rounded-xl bg-orange-500 py-4 text-[15px] font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ boxShadow: "0 0 20px rgba(157,124,232,0.25)" }}>
        {submitting ? "Submitting…" : "Submit project brief ↗"}
      </motion.button>
      <p className="text-center text-[11px] text-gray-400">We review every brief personally. You&apos;ll hear from us within 24 hours.</p>
    </form>
  );
}

function BookCallForm() {
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "details" | "done">("pick");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dayName = (d: Date) => days[d.getDay() - 1] ?? "Mon";

  return (
    <div>
      {step === "done" ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl mb-6">📞</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Call booked!</h3>
          <p className="text-gray-400 max-w-sm mb-2">
            <span className="font-bold text-gray-700">{selectedSlot} on {selectedDate ? formatDate(selectedDate) : ""}</span>
          </p>
          <p className="text-gray-400 max-w-sm mb-8">A calendar invite and Zoom link have been sent to <span className="font-semibold text-gray-700">{email}</span>. We&apos;re looking forward to meeting you.</p>
          <Link href="/"><motion.span whileHover={{ scale: 1.03 }} className="inline-block rounded-xl bg-gray-900 px-6 py-3 text-[13px] font-bold text-white cursor-pointer">Back to home</motion.span></Link>
        </motion.div>
      ) : step === "details" ? (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
          <div>
            <button onClick={() => setStep("pick")} className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors mb-6">
              ← Change time
            </button>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 flex items-center gap-4 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white text-lg shrink-0">📅</div>
              <div>
                <p className="font-bold text-gray-900 text-[15px]">{selectedSlot} · {selectedDate ? formatDate(selectedDate) : ""}</p>
                <p className="text-[12px] text-gray-500">30-minute discovery call · Google Meet / Zoom</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">Your details</p>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Full name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Email address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">What do you want to discuss? <span className="text-gray-300 normal-case font-normal">(optional)</span></label>
              <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Brief overview of your project or the questions you have in mind..."
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none" />
            </div>
          </div>
          <motion.button
            onClick={() => { if (name && email) setStep("done"); }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(157,124,232,0.35)" }}
            whileTap={{ scale: 0.98 }}
            disabled={!name || !email}
            className="w-full rounded-xl bg-orange-500 py-4 text-[15px] font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{ boxShadow: "0 0 20px rgba(157,124,232,0.25)" }}>
            Confirm booking ↗
          </motion.button>
          <p className="text-center text-[11px] text-gray-400">You&apos;ll receive a calendar invite with a meeting link immediately.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">

          {/* What to expect */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">What to expect</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "⏱️", title: "30 minutes", desc: "Focused, no fluff" },
                { icon: "🎯", title: "Your goals", desc: "We listen first" },
                { icon: "📋", title: "Next steps", desc: "Clear action plan" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="font-bold text-gray-900 text-[13px]">{title}</p>
                  <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">Select a date</p>
            <div className="grid grid-cols-5 gap-2">
              {dates.map(d => (
                <button key={d.toISOString()} type="button" onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                  className={`flex flex-col items-center rounded-2xl border py-3 px-1 transition-all ${selectedDate?.toDateString() === d.toDateString() ? "border-orange-400 bg-orange-50" : "border-gray-300 bg-white hover:border-orange-300"}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{dayName(d)}</span>
                  <span className={`text-xl font-black ${selectedDate?.toDateString() === d.toDateString() ? "text-orange-500" : "text-gray-900"}`}>{d.getDate()}</span>
                  <span className="text-[10px] text-gray-400">{d.toLocaleDateString("en-US", { month: "short" })}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-4">
                  Available times · {formatDate(selectedDate)} <span className="text-gray-400 normal-case font-normal">(IST)</span>
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <button key={slot} type="button" onClick={() => setSelectedSlot(slot)}
                      className={`rounded-xl border py-3 text-[13px] font-semibold transition-all ${selectedSlot === slot ? "border-orange-400 bg-orange-500 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedDate && selectedSlot && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <motion.button onClick={() => setStep("details")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-gray-900 py-4 text-[15px] font-bold text-white hover:bg-orange-500 transition-colors">
                  Confirm {formatDate(selectedDate)} at {selectedSlot} →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedDate && (
            <p className="text-center text-[12px] text-gray-300">Select a date above to see available time slots</p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function StartPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Project Brief");

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(189,162,239,0.12) 0%,transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute -right-64 bottom-0 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(251,113,133,0.08) 0%,transparent 70%)", filter: "blur(110px)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-16">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Get started</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900 mb-4">
            Let&apos;s build something<br />
            <span className="text-orange-500">exceptional.</span>
          </h1>
          <p className="text-[15px] text-gray-400 max-w-lg leading-relaxed">
            Share your project details or book a 30-minute discovery call — whichever works best for you. We reply within 24 hours.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 p-1 rounded-2xl bg-gray-100 mb-10 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`relative rounded-xl px-6 py-2.5 text-[13px] font-bold transition-all duration-200 ${activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
              {activeTab === tab && (
                <motion.div layoutId="tab-bg" className="absolute inset-0 rounded-xl bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </motion.div>

        {/* Side info + form */}
        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">

          {/* Left info column */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Why CodeMode</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "⚡", text: "MVPs shipped in weeks, not months" },
                  { icon: "🎯", text: "Fixed scope, no surprise invoices" },
                  { icon: "👁️", text: "Full transparency — you own the code" },
                  { icon: "🤝", text: "Direct access to senior engineers" },
                  { icon: "🌍", text: "Working globally from India" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="text-base shrink-0">{icon}</span>
                    <span className="text-[13px] text-gray-600 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Contact directly</p>
              <a href="mailto:support@codemodeai.com" className="flex items-center gap-2 text-[13px] font-semibold text-gray-900 hover:text-orange-500 transition-colors">
                <span>✉️</span> support@codemodeai.com
              </a>
              <p className="text-[11px] text-gray-400 mt-2">Replies within 24 hours</p>
            </div>

            {activeTab === "Project Brief" && (
              <button onClick={() => setActiveTab("Book a Call")}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 text-[13px] font-semibold text-gray-500 hover:border-orange-200 hover:text-orange-500 transition-all"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                📞 Prefer a call instead?
              </button>
            )}
            {activeTab === "Book a Call" && (
              <button onClick={() => setActiveTab("Project Brief")}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 text-[13px] font-semibold text-gray-500 hover:border-orange-200 hover:text-orange-500 transition-all"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                📝 Submit a brief instead?
              </button>
            )}
          </motion.div>

          {/* Main form area */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10"
            style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.1)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                {activeTab === "Project Brief" ? <ProjectBriefForm /> : <BookCallForm />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
