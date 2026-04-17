"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Travel Ban", href: "/services/travel-ban" },
    { label: "Police Check", href: "/services/police-case" },
    { label: "Court Cases", href: "/services/court-case" },
    { label: "Background", href: "/services/background-check" },
    { label: "Lawyers", href: "/lawyers" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      {/* ── Slim top identity bar ─────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(32px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(32px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-14 flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link href="/home" className="group flex items-baseline gap-0.5">
            <span
              className="text-2xl font-black italic tracking-tighter text-white transition-opacity group-hover:opacity-80"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Clear
            </span>
            <span
              className="text-2xl font-black italic tracking-tighter transition-opacity group-hover:opacity-80"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--accent)" }}
            >
              Status.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-200 hover:text-white"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Sign in + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/auth/login"
              className="text-[10px] font-bold tracking-[0.22em] uppercase transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="btn-squish px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white"
              style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}
            >
              Scan Now →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translate(0px, 4px)" : "none" }} />
            <span className="block w-4 h-px bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }} />
            <span className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(0px, -4px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 flex flex-col px-8 pt-24 pb-10 lg:hidden"
        style={{
          background: "var(--canvas)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <nav className="flex-1 space-y-2 mt-8">
          {nav.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-4 text-5xl font-black tracking-tighter border-b transition-colors hover:text-white"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.05)",
                transitionDelay: `${i * 35}ms`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 mt-10">
          <Link href="/auth/login" onClick={() => setMenuOpen(false)}
            className="flex-1 text-center py-3.5 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
            Sign In
          </Link>
          <Link href="/auth/signup" onClick={() => setMenuOpen(false)}
            className="flex-1 text-center py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white"
            style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}>
            Scan Now
          </Link>
        </div>
      </div>

      {/* ── WhatsApp float ────────────────────────────────────── */}
      <a
        href="https://wa.me/971501234567?text=Hello%2C%20I%20need%20legal%20verification%20help"
        target="_blank" rel="noopener noreferrer"
        className="btn-squish fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ backgroundColor: "#25D366" }}
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.335-1.503A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.986 0-3.842-.538-5.44-1.476l-.39-.232-4.044.959.993-3.938-.254-.406A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </>
  );
}
