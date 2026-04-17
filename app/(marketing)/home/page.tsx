"use client";
import Link from "next/link";
import { Shield, Clock, Lock, Globe, Star, CheckCircle, ArrowRight, FileSearch, AlertTriangle, Gavel, UserCheck, Phone, ChevronRight } from "lucide-react";

const services = [
  { icon: AlertTriangle, title: "Travel Ban Check", description: "Confirm whether a travel ban exists against your name in UAE before you fly.", price: "From AED 299", turnaround: "24–48 hrs", href: "/services/travel-ban", color: "#e74c3c" },
  { icon: FileSearch, title: "Police Case Check", description: "Verify if any police complaints or criminal records are linked to your passport.", price: "From AED 349", turnaround: "2–3 days", href: "/services/police-case", color: "#2980b9" },
  { icon: Gavel, title: "Court Case Check", description: "Find out if civil or criminal court cases are filed against you in UAE courts.", price: "From AED 399", turnaround: "3–5 days", href: "/services/court-case", color: "#8e44ad" },
  { icon: UserCheck, title: "Background Screening", description: "Comprehensive background check covering employment, financial & legal history.", price: "From AED 499", turnaround: "5–7 days", href: "/services/background-check", color: "#27ae60" },
];
const steps = [
  { number: "01", title: "Submit Your Request", description: "Fill out a simple form with your passport details and select the service you need." },
  { number: "02", title: "We Verify", description: "Our legal team accesses official UAE government and court databases on your behalf." },
  { number: "03", title: "Get Your Report", description: "Receive a certified, downloadable PDF report straight to your dashboard." },
];
const testimonials = [
  { name: "Mohammed Al-Farsi", country: "Jordan", text: "I was terrified about returning to Dubai after 3 years away. ClearStatus confirmed I had no travel ban in 36 hours. Absolutely worth every dirham.", rating: 5 },
  { name: "Priya Nair", country: "India", text: "My employer required a background check before sponsoring my visa. Got a clean report in 5 days. Very professional service.", rating: 5 },
  { name: "Emmanuel Okonkwo", country: "Nigeria", text: "Found out I had a court case I didn't know about. The team helped me connect with a lawyer and resolve it remotely.", rating: 5 },
  { name: "Sarah Lindqvist", country: "Sweden", text: "Smooth process from start to finish. The dashboard made it easy to track everything and communicate with the team.", rating: 5 },
];
const whyUs = [
  { icon: Clock, title: "Fast Turnaround", desc: "Results in as little as 24 hours. No delays, no excuses." },
  { icon: Lock, title: "100% Confidential", desc: "Your data is encrypted and never shared with third parties." },
  { icon: Globe, title: "Global Reach", desc: "We serve clients in 60+ countries who have lived or worked in UAE/GCC." },
  { icon: Shield, title: "Legal Experts", desc: "Every case handled by qualified UAE-registered legal professionals." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center" style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0d2137 60%, #112240 100%)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <Shield size={14} />Trusted by 12,000+ Expats Worldwide
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">Travel Ban in UAE?<br /><span style={{ color: "var(--gold)" }}>Know Before You Go.</span></h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">Check your UAE travel ban, police case, court case & background status — fast, confidential, and from anywhere in the world. Results in 24–72 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>Check Now <ArrowRight size={20} /></Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold border border-white/30 text-white">View Pricing</Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {["12,000+ Cases Resolved","60+ Countries Served","4.9\u2605 Average Rating","UAE Legal Experts"].map((b) => (
                <div key={b} className="flex items-center gap-2"><CheckCircle size={16} style={{ color: "var(--gold)" }} /><span className="text-sm text-white/70">{b}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>OUR SERVICES</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--navy)" }}>What Do You Need to Verify?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <Link key={svc.title} href={svc.href} className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${svc.color}15` }}>
                  <svc.icon size={24} style={{ color: svc.color }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--navy)" }}>{svc.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-gray-400">Starting from</p><p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{svc.price}</p></div>
                  <div className="text-right"><p className="text-xs text-gray-400">Results in</p><p className="text-xs font-semibold" style={{ color: "var(--gold)" }}>{svc.turnaround}</p></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--gray-50)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>HOW IT WORKS</p>
            <h2 className="text-4xl font-bold" style={{ color: "var(--navy)" }}>Three Steps to Clarity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "var(--navy)" }}>
                  <span className="text-3xl font-bold" style={{ color: "var(--gold)" }}>{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105" style={{ backgroundColor: "var(--navy)", color: "white" }}>Start Your Check <ArrowRight size={20} /></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>WHY CHOOSE US</p>
              <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--navy)" }}>The Most Trusted Name in UAE Legal Verification</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">We've helped over 12,000 expats from 60+ countries clear their legal status in the UAE.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl" style={{ backgroundColor: "var(--gray-50)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(10,22,40,0.08)" }}>
                    <item.icon size={24} style={{ color: "var(--navy)" }} />
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: "var(--navy)" }}>{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>CLIENT TESTIMONIALS</p>
            <h2 className="text-4xl font-bold text-white">Real People. Real Results.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl" style={{ backgroundColor: "var(--navy-light)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={14} fill="var(--gold)" style={{ color: "var(--gold)" }} />))}</div>
                <p className="text-sm text-white/70 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>{t.name[0]}</div>
                  <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-white/40">{t.country}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--navy)" }}>Don't Travel Blindly.</h2>
          <p className="text-xl mb-8" style={{ color: "var(--navy)", opacity: 0.8 }}>A 5-minute check can save you from arrest, detention, or a travel ban at the airport.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-xl" style={{ backgroundColor: "var(--navy)", color: "white" }}>Check My Status Now <ArrowRight size={20} /></Link>
            <a href="https://wa.me/971501234567" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold border-2 transition-all hover:scale-105" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}><Phone size={20} />WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
