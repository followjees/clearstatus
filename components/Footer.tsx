import Link from "next/link";

const services = [
  ["Travel Ban Check", "/services/travel-ban"],
  ["Police Case Check", "/services/police-case"],
  ["Court Case Check", "/services/court-case"],
  ["Background Screening", "/services/background-check"],
  ["Legal Consultation", "/lawyers"],
];
const company = [
  ["About Us", "/about"],
  ["Pricing", "/pricing"],
  ["Our Lawyers", "/lawyers"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--canvas)" }} className="px-6 pb-6">
      {/* Glass rounded footer card */}
      <div
        className="max-w-screen-2xl mx-auto rounded-[48px] overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Top CTA strip */}
        <div
          className="px-12 lg:px-20 py-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-xl">
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              ● Legal Intelligence Platform
            </p>
            <h2
              className="text-5xl lg:text-6xl font-black italic tracking-tighter leading-none text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Stay On The<br />
              <span style={{ color: "var(--accent)" }}>Right Side</span><br />
              Of The Law.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth/signup"
              className="btn-squish px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white"
              style={{ background: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}
            >
              Start a Check →
            </Link>
            <a
              href="https://wa.me/971501234567"
              className="btn-squish px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest border"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div
          className="px-12 lg:px-20 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/home" className="inline-block mb-4">
              <span
                className="text-2xl font-black italic tracking-tighter text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Clear<span style={{ color: "var(--accent)" }}>Status.</span>
              </span>
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace", maxWidth: 220 }}
            >
              UAE & GCC legal verification. Fast. Confidential. Expert-verified.
            </p>
            <div className="flex gap-4 mt-6">
              {["+971 50 123 4567", "support@clearstatus.legal"].map((c) => (
                <span
                  key={c}
                  className="text-[10px]"
                  style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {services.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Company
            </p>
            <ul className="space-y-3">
              {company.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Stay Informed
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}>
              Legal updates for UAE expats.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 text-xs rounded-l-full focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "white",
                  fontFamily: "'JetBrains Mono', monospace",
                  borderRight: "none",
                }}
              />
              <button
                className="btn-squish px-4 py-2.5 rounded-r-full text-[10px] font-black text-white"
                style={{ background: "var(--accent)" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[10px]"
            style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 ClearStatus Legal · Not a law firm · Legal verification services only
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-[10px] transition-colors hover:text-white"
                style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
