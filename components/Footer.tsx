import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--navy)" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={24} style={{ color: "var(--gold)" }} />
              <span className="font-bold text-xl">Clear<span style={{ color: "var(--gold)" }}>Status</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">Professional legal verification services for UAE & GCC. Trusted by thousands of expats worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--gold)" }}>SERVICES</h4>
            <ul className="space-y-2">
              {[["Travel Ban Check","/services/travel-ban"],["Police Case Check","/services/police-case"],["Court Case Check","/services/court-case"],["Background Screening","/services/background-check"],["Legal Consultation","/lawyers"]].map(([label,href]) => (
                <li key={label}><Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--gold)" }}>COMPANY</h4>
            <ul className="space-y-2">
              {[["About Us","/about"],["Pricing","/pricing"],["Contact","/contact"]].map(([label,href]) => (
                <li key={label}><Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--gold)" }}>CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60"><MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />Office 14, Prime Tower, Business Bay, Dubai, UAE</li>
              <li className="flex items-center gap-2 text-sm text-white/60"><Phone size={16} style={{ color: "var(--gold)" }} />+971 50 123 4567</li>
              <li className="flex items-center gap-2 text-sm text-white/60"><Mail size={16} style={{ color: "var(--gold)" }} />support@clearstatus.legal</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40">© 2026 ClearStatus Legal. All rights reserved. Not a law firm. Legal verification services only.</p>
        </div>
      </div>
    </footer>
  );
}
