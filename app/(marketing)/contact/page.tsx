"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  return (
    <div>
      <section className="py-20" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "var(--gold)" }}>CONTACT</p>
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-white/60">We respond to all inquiries within 2 hours during business hours.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--navy)" }}>Multiple Ways to Reach Us</h2>
              <div className="space-y-6">
                {[{icon:Phone,title:"WhatsApp (Fastest)",info:"+971 50 123 4567",sub:"Available 24/7",href:"https://wa.me/971501234567",color:"#25D366"},{icon:Mail,title:"Email",info:"support@clearstatus.legal",sub:"Response within 2 hours",href:"mailto:support@clearstatus.legal",color:"var(--navy)"},{icon:MapPin,title:"Office",info:"Office 14, Prime Tower",sub:"Business Bay, Dubai, UAE",href:"#",color:"var(--gold)"}].map((item) => (
                  <a key={item.title} href={item.href} className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}><item.icon size={22} style={{ color: item.color }} /></div>
                    <div><p className="font-semibold" style={{ color: "var(--navy)" }}>{item.title}</p><p className="font-medium text-gray-800">{item.info}</p><p className="text-sm text-gray-500 mt-0.5">{item.sub}</p></div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <CheckCircle size={64} style={{ color: "var(--green)" }} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>Send Us a Message</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input required type="text" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="Your name" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="+971..." /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm" placeholder="your@email.com" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label><textarea required rows={5} value={form.message} onChange={(e) => setForm({...form,message:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm resize-none" placeholder="Describe your situation..." /></div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ backgroundColor: "var(--navy)", color: "white" }}><Send size={16} />Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
