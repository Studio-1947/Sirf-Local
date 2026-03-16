"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCart, parsePrice } from "@/context/CartContext";
import {
  PRICING_CARDS,
  PRICING_COPY,
  PRICING_TABS,
  type PricingCardData,
  type PricingMode,
} from "@/components/pricing-data";

function BentoCard({ svc, index }: { svc: PricingCardData; index: number }) {
  const { isInCart, toggleItem, openDrawer } = useCart();
  const isAdvance = svc.period === "advance";
  const inCart = isInCart(svc.title);
  const displayPrice = isAdvance ? "Custom Quote" : svc.price;
  const cardSurface = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%), linear-gradient(180deg, rgba(var(--bg-rgb, 31, 42, 68), 0.14) 0%, rgba(var(--bg-rgb, 31, 42, 68), 0.2) 100%)",
  };

  function handleCartClick() {
    if (isAdvance || !svc.price) return;
    toggleItem({
      id: svc.title,
      title: svc.title,
      price: parsePrice(svc.price),
      period: svc.period,
      accent: "var(--accent)",
    });
    if (!inCart) openDrawer();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative h-full"
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-4xl border transition-all duration-700 ${
          inCart
            ? "border-accent shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            : "border-white/10 hover:border-white/25"
        }`}
      >
        <div className="relative h-32 md:h-36 w-full overflow-hidden">
          {svc.period === "one-time" && (
            <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full border border-white/25 bg-black/25 px-3 py-1 font-mono-display text-[9px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-xl">
              One-time
            </div>
          )}
          {svc.image ? (
            <Image
              src={svc.image}
              alt={svc.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_42%,transparent_70%)]" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/15" />
        </div>

        <div
          className="relative flex flex-1 flex-col border-t border-white/15 p-5 backdrop-blur-md md:p-6"
          style={cardSurface}
        >
          <div className="pointer-events-none absolute bottom-3 right-4 font-mono-display text-4xl leading-none font-black text-white/12 transition-all duration-700 group-hover:text-white/20">
            *
          </div>

          <div className="relative z-10 flex flex-1 flex-col">
            <div className="min-h-20">
              <h3 className="text-lg font-bold text-white mb-1.5 leading-tight transition-colors duration-500">
                {svc.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500 max-w-56">
                {svc.body}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-3.5">
              <div className="flex min-h-11 flex-col justify-end">
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter transition-colors duration-500 group-hover:text-accent">
                  {displayPrice}
                </span>
              </div>

              {isAdvance ? (
                <a
                  href="#contact"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-[10px] font-mono-display uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg-primary"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </a>
              ) : (
                <button
                  onClick={handleCartClick}
                  className={`inline-flex h-10 cursor-pointer items-center justify-center rounded-full border-2 px-4 text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${
                    inCart
                      ? "border-white bg-white text-bg-primary"
                      : "border-white text-white hover:bg-white hover:text-bg-primary"
                  }`}
                >
                  {inCart ? "Added" : "Add to Cart"}
                </button>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
        </div>
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
    <section
      id="pricing"
      className="bg-bg-primary py-24 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={containerRef}
          className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag block mb-4"
            >
              {PRICING_COPY.sectionTag}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter"
            >
              {PRICING_COPY.titleLineOne} <br className="hidden sm:block" />
              <span className="text-accent">{PRICING_COPY.titleLineTwo}</span>
            </motion.h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-text-secondary text-lg font-mono-display uppercase tracking-widest max-w-60 border-r-2 border-accent pr-6 leading-relaxed">
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

        <div className="mx-auto grid max-w-290 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {activeServices.map((svc, i) => (
            <BentoCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-1 bg-white/10 rounded-[2.5rem] overflow-hidden"
        >
          <div className="bg-bg-primary rounded-[2.4rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
            <div className="text-left relative z-10">
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">
                {PRICING_COPY.ctaTitle}
              </h3>
              <p className="text-white/60 text-lg max-w-md opacity-80">
                {PRICING_COPY.ctaBody}
              </p>
            </div>
            <a
              href="#contact"
              className="group relative z-10 flex items-center gap-4 px-10 py-4 bg-white text-bg-primary font-bold text-sm rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-2xl"
            >
              {PRICING_COPY.ctaLabel}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
