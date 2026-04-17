import Link from "next/link";
import { CheckCircle, ArrowRight, Shield, Zap, Crown } from "lucide-react";

const plans = [
  { name: "Essential", icon: Shield, price: 299, currency: "AED", description: "Single verification check. Ideal for one-off needs.", features: ["1 service check","Certified PDF report","Results in 24–48 hrs","Email delivery","Basic support"], cta: "Get Started", highlight: false },
  { name: "Professional", icon: Zap, price: 699, currency: "AED", description: "3 checks bundled. Best for returning expats.", features: ["3 service checks","Certified PDF reports","Priority 24-hr processing","Email + dashboard delivery","Live chat support","30-min legal consultation"], cta: "Most Popular", highlight: true },
  { name: "Enterprise", icon: Crown, price: 1499, currency: "AED", description: "Complete package for complex cases or companies.", features: ["Unlimited checks (90 days)","Certified PDF reports","Express 12-hr processing","Full dashboard access","Dedicated account lawyer","3 x 1-hr consultations","Document translation","Court representation referral"], cta: "Contact Sales", highlight: false },
];
const addons = [
  { name: "Travel Ban Check", price: "299 AED", time: "24–48 hrs" },
  { name: "Police Case Check", price: "349 AED", time: "2–3 days" },
  { name: "Court Case Check", price: "399 AED", time: "3–5 days" },
  { name: "Background Screening", price: "499 AED", time: "5–7 days" },
  { name: "Legal Consultation (1 hr)", price: "350 AED", time: "Scheduled" },
  { name: "Document Translation", price: "199 AED", time: "24 hrs" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="py-20" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>PRICING</p>
          <h1 className="text-5xl font-bold text-white mb-4">Transparent. No Surprises.</h1>
          <p className="text-xl text-white/60">Pay once, get your report. No subscriptions. No hidden fees.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-2xl p-8 relative" style={{ border: plan.highlight ? "2px solid var(--gold)" : "1px solid var(--gray-200)", backgroundColor: plan.highlight ? "var(--navy)" : "white" }}>
                {plan.highlight && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>MOST POPULAR</div>)}
                <div className="flex items-center gap-3 mb-4"><plan.icon size={24} style={{ color: plan.highlight ? "var(--gold)" : "var(--navy)" }} /><h3 className="text-xl font-bold" style={{ color: plan.highlight ? "white" : "var(--navy)" }}>{plan.name}</h3></div>
                <div className="mb-2"><span className="text-4xl font-bold" style={{ color: plan.highlight ? "var(--gold)" : "var(--navy)" }}>{plan.price}</span><span className="text-sm ml-2" style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--gray-400)" }}>{plan.currency}</span></div>
                <p className="text-sm mb-6" style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--gray-600)" }}>{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm" style={{ color: plan.highlight ? "white" : "var(--gray-800)" }}><CheckCircle size={16} style={{ color: "var(--green)", flexShrink: 0 }} />{f}</li>))}
                </ul>
                <Link href="/auth/signup" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ backgroundColor: plan.highlight ? "var(--gold)" : "var(--navy)", color: plan.highlight ? "var(--navy)" : "white" }}>{plan.cta} <ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "var(--gray-50)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl font-bold mb-2" style={{ color: "var(--navy)" }}>À La Carte Services</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addons.map((a) => (
              <div key={a.name} className="bg-white rounded-xl p-5 flex items-center justify-between border border-gray-100">
                <div><p className="font-semibold" style={{ color: "var(--navy)" }}>{a.name}</p><p className="text-xs text-gray-400 mt-0.5">Turnaround: {a.time}</p></div>
                <div className="text-right"><p className="font-bold" style={{ color: "var(--gold)" }}>{a.price}</p><Link href="/auth/signup" className="text-xs underline mt-0.5" style={{ color: "var(--navy)" }}>Order →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
