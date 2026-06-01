"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM",
  "4:00 PM","4:30 PM","5:00 PM","5:30 PM",
];

const SERVICES = [
  "SaaS Product Development","AI & Automation","CRM & ERP Systems",
  "Mobile App Development","White Label CRM","SEER AI Tool","Flox Platform","Other",
];

function getDays() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(d); // skip weekends
  }
  return days;
}

function fmt(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function BookPage() {
  const days = getDays();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "done">("calendar");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  // Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate) return;
    fetch(`/api/bookings?date=${fmt(selectedDate)}`)
      .then(r => r.json())
      .then((data: { time_slot: string; status: string }[]) => {
        setBookedSlots(data.filter(b => b.status === "confirmed").map(b => b.time_slot));
      });
  }, [selectedDate]);

  async function handleBook() {
    setLoading(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        date: fmt(selectedDate!),
        time_slot: selectedSlot,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setStep("done");
    } else {
      const { error } = await res.json();
      alert(error ?? "Something went wrong. Please try again.");
    }
  }

  const formValid = form.name && form.email;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex items-center rounded-full px-[5px] py-[4px]"
            style={{ background: "linear-gradient(135deg,#fff8f3,#fff1e6)", border: "1.5px solid rgba(249,115,22,0.6)", width: 60, height: 26 }}>
            <span className="font-mono font-bold text-[9px] select-none text-center w-7" style={{ color: "#ea580c" }}>&lt;/&gt;</span>
            <div className="rounded-full flex-shrink-0" style={{ width: 18, height: 18, background: "radial-gradient(circle at 35% 35%,#fde68a,#f97316 55%,#c2410c)" }} />
          </div>
          <span className="text-[15px] font-bold">Code<span className="text-orange-500">Mode</span></span>
        </Link>
        <Link href="/" className="text-[13px] text-gray-400 hover:text-white transition-colors">← Back to home</Link>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" /> Free strategy call · 30 min
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            Book a call with<br /><span className="text-orange-500">CodeMode.</span>
          </h1>
          <p className="text-[15px] text-gray-400 max-w-md mx-auto">
            Pick a time that works for you. We'll discuss your project, timeline, and budget — no commitment required.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Step 1: Calendar */}
          {step === "calendar" && (
            <motion.div key="calendar" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="grid md:grid-cols-2 gap-6">

                {/* Date picker */}
                <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
                  <h2 className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">Select a date</h2>
                  <div className="grid grid-cols-5 gap-2">
                    {days.slice(0, 20).map(d => {
                      const isSelected = selectedDate && fmt(d) === fmt(selectedDate);
                      return (
                        <button
                          key={fmt(d)}
                          onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                          className={`flex flex-col items-center rounded-xl py-2.5 px-1 text-center transition-all ${
                            isSelected
                              ? "bg-orange-500 text-white"
                              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                          }`}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">
                            {d.toLocaleDateString("en-IN", { weekday: "short" })}
                          </span>
                          <span className="text-[15px] font-black mt-0.5">{d.getDate()}</span>
                          <span className="text-[9px] opacity-60">
                            {d.toLocaleDateString("en-IN", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
                  <h2 className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">
                    {selectedDate
                      ? `Available times · ${selectedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`
                      : "Select a date first"}
                  </h2>

                  {!selectedDate ? (
                    <div className="flex items-center justify-center h-48 text-gray-600 text-[13px]">← Pick a date</div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const taken = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={taken}
                            onClick={() => setSelectedSlot(slot)}
                            className={`rounded-xl py-2.5 text-[13px] font-semibold transition-all ${
                              taken
                                ? "bg-gray-800/50 text-gray-600 cursor-not-allowed line-through"
                                : isSelected
                                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {selectedDate && selectedSlot && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center">
                  <button
                    onClick={() => setStep("form")}
                    className="rounded-xl bg-orange-500 px-10 py-3.5 text-[14px] font-bold text-white hover:bg-orange-400 transition-colors"
                    style={{ boxShadow: "0 0 24px rgba(249,115,22,0.35)" }}
                  >
                    Continue → {selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {selectedSlot}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Details form */}
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="rounded-2xl border border-white/10 bg-gray-900 p-8 max-w-xl mx-auto">
                {/* Slot summary */}
                <div className="flex items-center gap-3 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3 mb-8">
                  <span className="text-xl">📅</span>
                  <div>
                    <p className="text-[13px] font-bold text-orange-400">
                      {selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-[12px] text-orange-300/70">{selectedSlot} · 30-minute strategy call</p>
                  </div>
                  <button onClick={() => setStep("calendar")} className="ml-auto text-[11px] text-gray-500 hover:text-white transition-colors">Change</button>
                </div>

                <h2 className="text-xl font-black text-white mb-6">Your details</h2>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Rahul Sharma"
                        className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Email *</label>
                      <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        type="email" placeholder="rahul@company.in"
                        className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Phone</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Company</label>
                      <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Your company"
                        className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Service interested in</label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none">
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">What are you building?</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={3} placeholder="Brief description of your project..."
                      className="rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none" />
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={!formValid || loading}
                    className="w-full rounded-xl bg-orange-500 py-3.5 text-[14px] font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    style={{ boxShadow: "0 0 24px rgba(249,115,22,0.3)" }}
                  >
                    {loading ? "Booking…" : "Confirm Booking →"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-black text-white mb-3">You're booked!</h2>
              <p className="text-[15px] text-gray-400 mb-2">
                <span className="text-white font-semibold">{selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</span> at <span className="text-orange-400 font-semibold">{selectedSlot}</span>
              </p>
              <p className="text-[14px] text-gray-500 mb-10">A confirmation will be sent to <span className="text-gray-300">{form.email}</span>. We'll send a Google Meet link before the call.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/" className="rounded-xl border border-white/10 px-6 py-3 text-[13px] font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all">
                  Back to home
                </Link>
                <button onClick={() => { setStep("calendar"); setSelectedDate(null); setSelectedSlot(null); setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" }); }}
                  className="rounded-xl bg-orange-500 px-6 py-3 text-[13px] font-bold text-white hover:bg-orange-400 transition-colors">
                  Book another
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
