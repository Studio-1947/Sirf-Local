"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Video,
  Grid,
  Zap,
  Box,
  Globe,
  Bell,
  MessageCircle,
  Award,
  MapPin,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useCart, parsePrice } from "@/context/CartContext";
import {
  PRICING_CARDS,
  PRICING_COPY,
  PRICING_TABS,
  type PricingCardData,
  type PricingMode,
} from "@/components/pricing-data";

const iconMap = {
  video: <Video size={18} strokeWidth={1.5} />,
  grid: <Grid size={18} strokeWidth={1.5} />,
  globe: <Globe size={18} strokeWidth={1.5} />,
  zap: <Zap size={18} strokeWidth={1.5} />,
  box: <Box size={18} strokeWidth={1.5} />,
  message: <MessageCircle size={18} strokeWidth={1.5} />,
  award: <Award size={18} strokeWidth={1.5} />,
  map: <MapPin size={18} strokeWidth={1.5} />,
  bell: <Bell size={18} strokeWidth={1.5} />,
} as const;

function BentoCard({ svc, index }: { svc: PricingCardData; index: number }) {
  const { isInCart, toggleItem, openDrawer } = useCart();
  const isAdvance = svc.period === "advance";
  const inCart = isInCart(svc.title);

  function handleCartClick() {
    if (isAdvance || !svc.price) return;
    toggleItem({ id: svc.title, title: svc.title, price: parsePrice(svc.price), period: svc.period, accent: 'var(--accent)' });
    if (!inCart) openDrawer();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden backdrop-blur-2xl bg-white/[0.02] ${
        inCart ? "border-accent shadow-[0_0_30px_rgba(255,255,255,0.15)]" : "border-white/5 hover:border-white/10"
      }`}
    >
      <div className="absolute -top-4 -right-2 font-mono-display text-[100px] font-black text-white/[0.02] select-none leading-none pointer-events-none group-hover:text-white/[0.04] group-hover:scale-110 transition-all duration-700">
        {svc.id}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
            inCart 
              ? 'bg-accent/20 border-accent/40 text-accent' 
              : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-accent group-hover:border-accent/40 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
          }`}>
            {iconMap[svc.icon]}
          </div>
          <span className={`font-mono-display text-[9px] uppercase tracking-[0.2em] font-bold ${svc.period === 'monthly' ? 'text-accent' : 'text-text-muted'}`}>
            {svc.period}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-500">
          {svc.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500 max-w-[240px]">
          {svc.body}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
        {isAdvance ? (
          <div className="w-full flex items-center justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-white text-xs font-mono-display uppercase tracking-[0.14em] hover:border-accent hover:bg-accent hover:text-bg-primary transition-all duration-300"
            >
              Contact Us
              <ArrowRight size={14} />
            </a>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter transition-colors duration-500 group-hover:text-accent">{svc.price}</span>
              <span className="text-[10px] font-mono-display text-text-muted uppercase tracking-widest">Fixed Rate</span>
            </div>

            <button
              onClick={handleCartClick}
              className={`group/btn flex items-center justify-center gap-2 w-10 h-10 rounded-full border transition-all duration-500 ${
                inCart ? "bg-state-success border-state-success text-bg-primary" : "bg-white/5 border-white/10 text-white hover:border-accent hover:bg-accent"
              }`}
            >
              {inCart ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <ShoppingCart size={16} strokeWidth={2} />}
            </button>
          </>
        )}
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const containerRef = useRef(null);
  const [activeMode, setActiveMode] = useState<PricingMode>("monthly");
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const activeServices = PRICING_CARDS[activeMode];

  return (
    <section id="pricing" className="bg-bg-primary py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={containerRef} className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-4">{PRICING_COPY.sectionTag}</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              {PRICING_COPY.titleLineOne} <br />
              <span className="text-accent">{PRICING_COPY.titleLineTwo}</span>
            </motion.h2>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-text-secondary text-lg font-mono-display uppercase tracking-widest max-w-[240px] border-r-2 border-accent pr-6 leading-relaxed">
                {PRICING_COPY.sideNote}
             </p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3 md:gap-4">
          {PRICING_TABS.map((tab) => {
            const isActive = activeMode === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveMode(tab.key)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-mono-display uppercase tracking-[0.15em] border transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-bg-primary border-accent"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((svc, i) => (
            <BentoCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-20 p-1 bg-white/10 rounded-[2.5rem] overflow-hidden">
          <div className="bg-bg-primary rounded-[2.4rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
             <div className="text-left relative z-10">
               <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">{PRICING_COPY.ctaTitle}</h3>
               <p className="text-white/60 text-lg max-w-md opacity-80">{PRICING_COPY.ctaBody}</p>
             </div>
             <a href="#contact" className="group relative z-10 flex items-center gap-4 px-10 py-4 bg-white text-bg-primary font-bold text-sm rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-2xl">
               {PRICING_COPY.ctaLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
