import Link from "next/link";
import { Star, Clock, Globe, MessageSquare, ArrowRight } from "lucide-react";

const lawyers = [
  { name: "Khalid Al-Mansoori", title: "Senior Partner", specialties: ["Travel Ban","Criminal Law","Court Cases"], experience: "18 years", languages: ["Arabic","English"], rating: 4.9, reviews: 312, availability: "Available Today", consultFee: "350 AED / hr", bio: "Former UAE Public Prosecution legal advisor. Expertise in UAE criminal code, travel bans, and expat legal rights. Handled 2,000+ cases." },
  { name: "Sara Khalil", title: "Legal Consultant", specialties: ["Police Cases","Labour Law","Visa Issues"], experience: "12 years", languages: ["Arabic","English","French"], rating: 4.8, reviews: 187, availability: "Next available: Tomorrow", consultFee: "300 AED / hr", bio: "Specializes in UAE labour disputes, police complaints, and visa/residency matters for expats. Former Etihad legal department." },
  { name: "Ravi Sharma", title: "Legal Researcher", specialties: ["Background Checks","Civil Law","Debt Cases"], experience: "10 years", languages: ["English","Hindi","Urdu"], rating: 4.7, reviews: 143, availability: "Available Today", consultFee: "250 AED / hr", bio: "Expert in UAE civil court procedures, debt recovery, background screening, and financial dispute resolution." },
  { name: "Aisha Al-Naqbi", title: "Family & Civil Law Specialist", specialties: ["Court Cases","Family Law","Document Legalization"], experience: "9 years", languages: ["Arabic","English"], rating: 4.9, reviews: 224, availability: "Available Today", consultFee: "300 AED / hr", bio: "Focused on UAE family court matters, document legalization, and civil dispute resolution for residents and non-residents." },
];

export default function LawyersPage() {
  return (
    <div>
      <section className="py-20" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>LEGAL CONSULTATION</p>
          <h1 className="text-5xl font-bold text-white mb-4">Talk to a UAE Lawyer Today</h1>
          <p className="text-xl text-white/60 leading-relaxed">Licensed UAE legal professionals available for video and chat consultations. No office visit required.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lawyers.map((lawyer) => (
              <div key={lawyer.name} className="rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0" style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>{lawyer.name.split(" ").map((n) => n[0]).join("")}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl" style={{ color: "var(--navy)" }}>{lawyer.name}</h3>
                    <p className="text-sm text-gray-500">{lawyer.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} fill={i < Math.floor(lawyer.rating) ? "var(--gold)" : "none"} style={{ color: "var(--gold)" }} />))}
                      <span className="text-xs text-gray-500 ml-1">{lawyer.rating} ({lawyer.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: lawyer.availability.includes("Today") ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: lawyer.availability.includes("Today") ? "var(--green)" : "var(--amber)" }}>{lawyer.availability}</div>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{lawyer.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lawyer.specialties.map((s) => (<span key={s} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: "rgba(10,22,40,0.06)", color: "var(--navy)" }}>{s}</span>))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5 p-3 rounded-xl" style={{ backgroundColor: "var(--gray-50)" }}>
                  <div className="text-center"><Clock size={14} className="mx-auto mb-1" style={{ color: "var(--gold)" }} /><p className="text-xs font-semibold" style={{ color: "var(--navy)" }}>{lawyer.experience}</p><p className="text-xs text-gray-400">Experience</p></div>
                  <div className="text-center"><Globe size={14} className="mx-auto mb-1" style={{ color: "var(--gold)" }} /><p className="text-xs font-semibold" style={{ color: "var(--navy)" }}>{lawyer.languages.length}</p><p className="text-xs text-gray-400">Languages</p></div>
                  <div className="text-center"><MessageSquare size={14} className="mx-auto mb-1" style={{ color: "var(--gold)" }} /><p className="text-xs font-semibold" style={{ color: "var(--navy)" }}>{lawyer.consultFee}</p><p className="text-xs text-gray-400">Consult Rate</p></div>
                </div>
                <Link href="/auth/signup" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ backgroundColor: "var(--navy)", color: "white" }}>Book Consultation <ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
