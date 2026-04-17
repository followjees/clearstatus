"use client";
import { useState } from "react";
import Link from "next/link";

/* ── tiny local icon helpers (no lucide imports needed) ────── */
function IconArrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}
function IconCheck() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconStar({ filled }: { filled?: boolean }) {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}

/* ── data ───────────────────────────────────────────────────── */
const services = [
  {
    code: "01",
    title: "Travel Ban\nCheck",
    desc: "Confirm whether a travel ban exists against your name in UAE before you fly.",
    price: "AED 299",
    eta: "24–48 hrs",
    score: 94,
    status: "active",
    href: "/auth/signup",
    pill: "Most Popular",
  },
  {
    code: "02",
    title: "Police Case\nCheck",
    desc: "Verify if any police complaints or criminal records are linked to your passport.",
    price: "AED 349",
    eta: "2–3 days",
    score: 88,
    status: "active",
    href: "/auth/signup",
    pill: null,
  },
  {
    code: "03",
    title: "Court Case\nCheck",
    desc: "Find out if civil or criminal court cases are filed against you in UAE courts.",
    price: "AED 399",
    eta: "3–5 days",
    score: 76,
    status: "pending",
    href: "/auth/signup",
    pill: null,
  },
  {
    code: "04",
    title: "Background\nScreening",
    desc: "Comprehensive background check covering employment, financial & legal history.",
    price: "AED 499",
    eta: "5–7 days",
    score: 99,
    status: "active",
    href: "/auth/signup",
    pill: "Most Complete",
  },
];

const testimonials = [
  { name: "Mohammed Al-Farsi", country: "Jordan", text: "Confirmed no travel ban in 36 hours. Absolutely worth every dirham.", rating: 5 },
  { name: "Priya Nair", country: "India", text: "Got a clean background report in 5 days for my visa sponsorship.", rating: 5 },
  { name: "Emmanuel Okonkwo", country: "Nigeria", text: "Found a court case I didn't know about. Team helped me resolve it remotely.", rating: 5 },
  { name: "Sarah Lindqvist", country: "Sweden", text: "Smooth process. The dashboard made it easy to track everything.", rating: 5 },
];

const stats = [
  { number: "12,000+", label: "Cases Resolved" },
  { number: "60+", label: "Countries Served" },
  { number: "4.9", label: "Rating" },
  { number: "24 hrs", label: "Fastest Result" },
];

const steps = [
  { n: "01", t: "Submit", d: "Fill a simple form with your passport details and select your service." },
  { n: "02", t: "We Verify", d: "Our legal team accesses official UAE government & court databases." },
  { n: "03", t: "Get Report", d: "Receive a certified, downloadable PDF report to your dashboard." },
];

/* ── Scanner UI state labels ─────────────────────────────── */
const scanStates = ["SCAN FOR RISKS", "CHECKING...", "ANALYSING...", "YOU ARE CLEAR."];

export default function HomePage() {
  const [scanIdx, setScanIdx] = useState(0);
  const [dragging, setDragging] = useState(false);

  function handleScan() {
    if (scanIdx > 0) return;
    setScanIdx(1);
    setTimeout(() => setScanIdx(2), 1400);
    setTimeout(() => setScanIdx(3), 2800);
    setTimeout(() => setScanIdx(0), 5000);
  }

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100vh" }}>

      {/* ═══════════════════════════════════════════════════════
          §1 HERO — full-bleed, massive editorial type
      ════════════════════════════════════════════════════════ */}
      <section className="relative grid-bg min-h-screen flex flex-col justify-end pt-24 pb-0 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
            style={{ background: "#22d3ee" }}
          />
        </div>

        <div className="relative max-w-screen-2xl mx-auto w-full px-6 lg:px-14">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="pill pill-accent">● Legal Intelligence · UAE & GCC</span>
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              126,448 checks and counting
            </span>
          </div>

          {/* Hero headline — massive */}
          <h1
            className="text-[clamp(64px,12vw,180px)] font-black italic leading-none tracking-tighter text-white mb-0"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            KNOW
            <br />
            <span style={{ color: "var(--accent)" }}>BEFORE</span>
            <br />
            YOU GO.
          </h1>

          {/* Sub + CTAs row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-10 pb-16 border-b" style={{ borderColor: "var(--border)" }}>
            <p
              className="text-lg lg:text-xl max-w-md leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Check your UAE travel ban, police case & court records — fast, confidential, from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/auth/signup"
                className="btn-squish inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white"
                style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}
              >
                Start a Check <IconArrow />
              </Link>
              <Link
                href="/pricing"
                className="btn-squish inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm border"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Stats ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 py-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="px-6 py-2 border-r last:border-r-0"
                style={{ borderColor: "var(--border)" }}
              >
                <p
                  className="display-number text-4xl lg:text-5xl text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {s.number}
                </p>
                <p
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2 BENTO SERVICES GRID
      ════════════════════════════════════════════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-14 py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2
            className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Services.
          </h2>
          <p
            className="text-[10px] font-bold tracking-[0.25em] uppercase hidden md:block"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            04 Intelligence Types
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {services.map((svc) => (
            <Link
              key={svc.code}
              href={svc.href}
              className="group card-float rounded-[32px] p-8 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
              style={{ background: "var(--surface)" }}
            >
              {/* Score — the big bento number */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="display-number text-[80px] leading-none"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "rgba(255,255,255,0.06)",
                  }}
                >
                  {svc.score}
                </span>
                <div className="flex flex-col items-end gap-2 pt-2">
                  {svc.pill && (
                    <span className="pill pill-accent">{svc.pill}</span>
                  )}
                  <span className={`pill ${svc.status === "active" ? "pill-active" : "pill-pending"}`}>
                    {svc.status === "active" ? "● Active" : "○ In Review"}
                  </span>
                </div>
              </div>

              {/* Service number */}
              <p
                className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {svc.code} / Service
              </p>

              {/* Title */}
              <h3
                className="text-2xl font-black italic tracking-tight text-white mb-3 whitespace-pre-line leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {svc.title}
              </h3>

              {/* Desc */}
              <p
                className="text-xs leading-relaxed mb-6 flex-1"
                style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {svc.desc}
              </p>

              {/* Price / ETA row */}
              <div
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>From</p>
                  <p className="text-white font-black text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{svc.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Results in</p>
                  <p className="text-sm font-black" style={{ color: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}>{svc.eta}</p>
                </div>
              </div>

              {/* Hover arrow */}
              <div
                className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                style={{ background: "var(--accent)", color: "white" }}
              >
                <IconArrow />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §3 LEGAL SCANNER — drag & typography interaction
      ════════════════════════════════════════════════════════ */}
      <section
        className="mx-6 lg:mx-14 rounded-[48px] overflow-hidden mb-6"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        <div className="max-w-screen-2xl mx-auto px-10 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Typography-as-feedback */}
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Legal Risk Scanner
            </p>
            <h2
              className="font-black italic tracking-tighter leading-none transition-all duration-700 text-white"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: scanIdx === 3 ? "clamp(48px,7vw,100px)" : "clamp(40px,6vw,80px)",
                color: scanIdx === 3 ? "#4ade80" : "white",
              }}
            >
              {scanStates[scanIdx]}
            </h2>
            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace", maxWidth: 400 }}
            >
              Drag a passport scan or document into the zone. Our system cross-references UAE government databases instantly.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {["Human Verified", "Encrypted Upload", "Official Sources"].map((t) => (
                <span key={t} className="pill pill-active">
                  <IconCheck />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Drop zone */}
          <div
            onClick={handleScan}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleScan(); }}
            className="btn-squish rounded-[32px] flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-300"
            style={{
              minHeight: 280,
              border: dragging
                ? `2px solid var(--accent)`
                : `2px dashed rgba(255,255,255,0.12)`,
              background: dragging
                ? "rgba(255,92,0,0.06)"
                : "rgba(255,255,255,0.02)",
            }}
          >
            {/* Upload icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all"
              style={{
                background: dragging ? "rgba(255,92,0,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${dragging ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragging ? "var(--accent)" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p
              className="text-sm font-black uppercase tracking-widest mb-2"
              style={{ color: dragging ? "var(--accent)" : "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
            >
              {dragging ? "Drop to Scan" : "Drag Document Here"}
            </p>
            <p
              className="text-[10px]"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              or click to simulate a scan
            </p>
            <div className="mt-6 flex gap-2">
              {["PDF", "JPG", "PNG", "DOCX"].map((f) => (
                <span key={f} className="pill" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §4 HOW IT WORKS — editorial 3-col
      ════════════════════════════════════════════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-14 py-24">
        <div className="mb-16 flex items-baseline justify-between">
          <h2
            className="text-5xl lg:text-6xl font-black italic tracking-tighter text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Three Steps<br />To Clarity.
          </h2>
          <Link
            href="/auth/signup"
            className="btn-squish hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-white"
            style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}
          >
            Start Now <IconArrow />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {steps.map((s) => (
            <div
              key={s.n}
              className="p-10 flex flex-col"
              style={{ background: "var(--canvas)" }}
            >
              <p
                className="display-number text-[80px] leading-none mb-6"
                style={{ color: "rgba(255,255,255,0.05)", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {s.n}
              </p>
              <div className="neon-left mt-auto">
                <h3
                  className="text-xl font-black text-white mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {s.t}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §5 TESTIMONIALS — scrolling cards, inverted panel
      ════════════════════════════════════════════════════════ */}
      <section
        className="mx-6 lg:mx-14 rounded-[48px] overflow-hidden mb-6 py-20"
        style={{ background: "white" }}
      >
        <div className="max-w-screen-2xl mx-auto px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <div>
              <p
                className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Client Testimonials
              </p>
              <h2
                className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a1a" }}
              >
                What Makes<br />ClearStatus<br />
                <span style={{ color: "var(--accent)" }}>Awesome?</span>
              </h2>
            </div>
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: "#666", fontFamily: "'JetBrains Mono', monospace" }}
            >
              The most trusted background check platform in the UAE — making sure you stay clear of all the shady stuff, in a snap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-[24px] flex flex-col"
                style={{ background: "#f7f7f7" }}
              >
                <div className="flex gap-1 mb-4" style={{ color: "var(--accent)" }}>
                  {Array.from({ length: t.rating }).map((_, i) => <IconStar key={i} filled />)}
                </div>
                <p
                  className="text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: "#444", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#e5e5e5" }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ background: "var(--accent)" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#1a1a1a", fontFamily: "'Outfit', sans-serif" }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* "What makes it awesome" 4-col breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 pt-16 border-t" style={{ borderColor: "#e5e5e5" }}>
            {[
              { n: "01", t: "Revolutionary", d: "We create alignment and shared understanding — making you less stressed about legal complexity." },
              { n: "02", t: "Forward Thinking", d: "History of creating progressive data solutions that solve problems and save you money." },
              { n: "03", t: "Quick Resolve", d: "Fast paced ability to provide relevant information within the quickest time humanly possible." },
              { n: "04", t: "Humane Approach", d: "Prices are fair and transparent. No surprises ahead. That is our fundamental promise." },
            ].map((item) => (
              <div key={item.n} className="neon-left" style={{ borderLeftColor: "var(--accent)" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>{item.n} / {item.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#666", fontFamily: "'JetBrains Mono', monospace" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §6 FINAL CTA BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-14 py-24 text-center">
        <p
          className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          ● Don't Travel Blindly
        </p>
        <h2
          className="text-[clamp(48px,9vw,140px)] font-black italic tracking-tighter leading-none text-white mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Know Your<br />
          <span style={{ color: "var(--accent)" }}>Legal Status.</span>
        </h2>
        <p
          className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          A 5-minute check can save you from arrest, detention, or a travel ban at the airport.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="btn-squish inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest text-white"
            style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}
          >
            Check My Status Now <IconArrow />
          </Link>
          <a
            href="https://wa.me/971501234567"
            className="btn-squish inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-sm border"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            WhatsApp Us
          </a>
        </div>
      </section>

    </div>
  );
}
