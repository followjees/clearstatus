import Link from "next/link";
import { Shield, Award, Users, Globe, CheckCircle, ArrowRight } from "lucide-react";

const stats = [{value:"12,000+",label:"Cases Resolved"},{value:"60+",label:"Countries Served"},{value:"98.7%",label:"Success Rate"},{value:"24hrs",label:"Avg. Turnaround"}];
const team = [{name:"Khalid Al-Mansoori",role:"Founder & Head of Legal",experience:"18 years UAE law"},{name:"Sara Khalil",role:"Senior Legal Consultant",experience:"12 years GCC courts"},{name:"Ravi Sharma",role:"Head of Verification",experience:"10 years legal research"},{name:"Aisha Al-Naqbi",role:"Client Relations Director",experience:"8 years legal services"}];

export default function AboutPage() {
  return (
    <div>
      <section className="py-24" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>ABOUT US</p>
          <h1 className="text-5xl font-bold text-white mb-6">We Started Because We Needed This Service Too.</h1>
          <p className="text-xl text-white/60 leading-relaxed">Our founder spent 3 weeks in limbo at a UAE airport in 2019. No one told him about a travel ban. That changed everything.</p>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: "var(--gold)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (<div key={s.label} className="text-center"><p className="text-4xl font-bold" style={{ color: "var(--navy)" }}>{s.value}</p><p className="text-sm font-medium mt-1" style={{ color: "var(--navy)", opacity: 0.7 }}>{s.label}</p></div>))}
          </div>
        </div>
      </section>
      <section className="py-24" style={{ backgroundColor: "var(--gray-50)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold" style={{ color: "var(--navy)" }}>The Team Behind Your Case</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>{member.name.split(" ").map((n) => n[0]).join("")}</div>
                <h4 className="font-bold" style={{ color: "var(--navy)" }}>{member.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                <p className="text-xs text-gray-400 mt-1">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to check your status?</h2>
          <p className="text-white/60 mb-8">Join 12,000+ expats who have verified their UAE legal standing with us.</p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>Check Now <ArrowRight size={20} /></Link>
        </div>
      </section>
    </div>
  );
}
