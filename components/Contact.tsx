"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Mail, MessageSquare, MapPin } from "lucide-react";
import SVGLIcon from "./SVGLIcon";

const SERVICES = [
  "Monthly Reels",
  "Monthly Content Posts",
  "The Brand Makeover",
  "Premium Product Packaging",
  "Your One-Page Website",
  "Catchy Social Media Posts",
  "Your WhatsApp Shop",
  "The Professional Look",
  "Get Found on Google Maps",
  "Not sure yet — need guidance",
];

interface ContactCard {
  id: string;
  label: string;
  value: string;
  href: string;
  brand: string;
}

const contactCards: ContactCard[] = [
  { id: 'COMM-01', label: "Email", value: "team@1947.io", href: "mailto:team@1947.io", brand: "Gmail" },
  { id: 'COMM-02', label: "WhatsApp", value: "+91 90932 77919", href: "https://wa.me/919093277919", brand: "WhatsApp" },
  { id: 'COMM-03', label: "Location", value: "Mirik, Darjeeling", href: "https://maps.google.com/?q=Mirik,Darjeeling", brand: "Google Maps" },
];

function InfoCard({ card, index }: { card: ContactCard; index: number }) {
  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.02] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[180px]"
    >
       <div className="relative z-10">
          <span className="font-mono-display text-[10px] text-text-muted uppercase tracking-[0.2em] group-hover:text-accent transition-colors">COMM-{index + 1}</span>
          <div className="mt-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 text-white/40 group-hover:bg-accent group-hover:border-accent/40 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
             <SVGLIcon name={card.brand} size={20} />
          </div>
       </div>
       <div>
          <p className="text-[10px] font-mono-display text-text-muted uppercase tracking-[0.2em] mb-2">{card.label}</p>
          <p className="text-white font-bold text-base tracking-tight">{card.value}</p>
       </div>
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.a>
  );
}

function FormCell({ label, children, focused }: { label: string; children: React.ReactNode; focused: boolean; filled: boolean }) {
  return (
    <div className={`relative p-8 transition-all duration-500 ${focused ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
       <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary">
          {label}
       </label>
       <div className="mt-2">{children}</div>
       {/* Focus Beam */}
       <div className={`absolute left-0 top-0 bottom-0 w-px bg-accent transition-transform duration-500 origin-top ${focused ? 'scale-y-100' : 'scale-y-0'}`} />
    </div>
  );
}

export default function Contact() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing!");
      setStatus('error');
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
          from_name: "Sirf Local Website",
          subject: `New Inquiry from ${form.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('sent');
        setForm({ name: "", email: "", service: "", message: "" });
      } else {
        console.error("Error", data);
        setStatus('error');
      }
    } catch (error) {
      console.error("Error", error);
      setStatus('error');
    }
  };

  const completion = [
    form.name.length > 0,
    form.email.length > 0,
    form.service.length > 0,
    form.message.length > 0
  ];

  return (
    <section id="contact" className="bg-bg-primary py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={containerRef} className="mb-20">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-4">Communication Hub</motion.span>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Let&apos;s Build <br />
              <span className="text-accent italic">Together.</span>
            </motion.h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-[320px] border-l border-white/20 pl-6 mb-2">
              Based in Mirik, built for the world. Reach out to start your digital journey.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Info Modules */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-6">
             {contactCards.map((card, i) => (
               <InfoCard key={card.label} card={card} index={i} />
             ))}
          </div>

          {/* Form Module */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="lg:col-span-2 relative rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-sm">
                    {status === 'error' ? 'Submission Failed' : 'Start a Conversation'}
                  </span>
               </div>
               <div className="flex gap-2.5">
                  {completion.map((filled, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        filled 
                          ? 'bg-accent shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                          : 'bg-white/10'
                      }`} 
                    />
                  ))}
               </div>
            </div>

            <div className="relative z-10">
               <AnimatePresence mode="wait">
                 {status === 'sent' ? (
                   <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-32">
                      <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8">
                         <CheckCircle size={40} className="text-accent" />
                      </div>
                      <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Inquiry Received.</h3>
                      <p className="text-text-secondary text-lg mb-12 max-w-sm mx-auto">Our studio will analyze your brief and contact you within 24 hours.</p>
                      <button onClick={() => setStatus('idle')} className="text-accent font-mono-display text-[10px] uppercase tracking-[0.3em] font-bold border border-accent/20 px-8 py-3 rounded-full hover:bg-accent/10 transition-colors">Submit New Entry</button>
                   </motion.div>
                 ) : (
                   <motion.form key="form" onSubmit={handleSubmit}>
                      {status === 'error' && (
                        <div className="p-4 bg-state-error/10 border-b border-state-error/20 text-state-error text-xs font-bold uppercase tracking-widest text-center">
                          Something went wrong. Please try again or email us directly.
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 border-b border-white/5">
                         <FormCell label="Client Name" focused={focusedField === 'name'} filled={completion[0]}>
                            <input 
                              type="text" name="name" required placeholder="Anjali Chettri" 
                              className="w-full bg-transparent py-2 text-white outline-none placeholder:text-white/20 placeholder:font-normal text-base font-bold"
                              onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                            />
                         </FormCell>
                         <FormCell label="Email Address" focused={focusedField === 'email'} filled={completion[1]}>
                            <input 
                              type="email" name="email" required placeholder="you@studio.com" 
                              className="w-full bg-transparent py-2 text-white outline-none placeholder:text-white/20 placeholder:font-normal text-base font-bold"
                              onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                            />
                         </FormCell>
                      </div>

                      <div className="border-b border-white/5">
                         <FormCell label="Technical Module" focused={focusedField === 'service'} filled={completion[2]}>
                            <div className="relative">
                               <select 
                                 name="service"
                                 className={`w-full bg-transparent py-2 outline-none appearance-none cursor-pointer text-base transition-colors duration-500 ${
                                   form.service ? 'text-white font-bold' : 'text-white/20 font-normal'
                                 }`}
                                 onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
                                 value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                               >
                                  <option value="" disabled className="bg-bg-primary text-white/20 font-normal">Select a Service...</option>
                                  {SERVICES.map(s => <option key={s} value={s} className="bg-bg-primary text-white font-bold">{s}</option>)}
                               </select>
                               <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                  <ArrowRight size={14} className="rotate-90" />
                                </div>
                            </div>
                         </FormCell>
                      </div>

                      <div>
                         <FormCell label="Project Brief" focused={focusedField === 'message'} filled={completion[3]}>
                            <textarea 
                              name="message"
                              rows={4} placeholder="Describe your business vision..." 
                              className="w-full bg-transparent py-2 text-white outline-none placeholder:text-white/20 placeholder:font-normal resize-none text-base font-bold leading-relaxed"
                              onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                              value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                            />
                         </FormCell>
                      </div>
                      
                      <div className="p-8 md:p-10 flex justify-between items-center bg-white/[0.005]">
                         <span className="font-mono-display text-[9px] text-text-muted uppercase tracking-[0.4em] hidden md:block">
                           {status === 'sending' ? 'Transmitting Data...' : 'Ready for Transmission'}
                         </span>
                         <button 
                           type="submit" 
                           disabled={status === 'sending'}
                           className={`group flex items-center gap-4 px-10 py-4 font-bold text-sm rounded-full transition-all duration-300 shadow-2xl ${
                             status === 'sending' 
                               ? 'bg-white/20 text-white cursor-not-allowed' 
                               : 'bg-white text-bg-primary hover:bg-accent hover:text-white hover:scale-[1.02]'
                           }`}
                         >
                            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                            <ArrowRight size={18} className={`transition-transform ${status === 'sending' ? '' : 'group-hover:translate-x-1'}`} />
                         </button>
                      </div>
                   </motion.form>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
