"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Lawyers", href: "/lawyers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <header style={{ backgroundColor: "var(--navy)" }} className="fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield size={28} style={{ color: "var(--gold)" }} />
            <span className="text-white font-bold text-xl">Clear<span style={{ color: "var(--gold)" }}>Status</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">{item.label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-white border border-white/30 px-4 py-2 rounded-lg hover:border-white/80 transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="text-sm font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>Check Now</Link>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ backgroundColor: "var(--navy-light)" }} className="md:hidden border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="block text-sm font-medium text-white/80 py-2" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link href="/auth/login" className="text-center text-sm font-medium text-white border border-white/30 px-4 py-2 rounded-lg" onClick={() => setOpen(false)}>Sign In</Link>
              <Link href="/auth/signup" className="text-center text-sm font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }} onClick={() => setOpen(false)}>Check Now</Link>
            </div>
          </div>
        </div>
      )}
      <a href="https://wa.me/971501234567?text=Hello%2C%20I%20need%20legal%20verification%20help" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }} title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.335-1.503A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.986 0-3.842-.538-5.44-1.476l-.39-.232-4.044.959.993-3.938-.254-.406A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </header>
  );
}
