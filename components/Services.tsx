"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MagnifyingGlass,
  Blueprint,
  ChartBar,
  Robot,
  CloudArrowUp,
  AppWindow,
  Palette,
  Megaphone,
  FilmStrip,
} from "@phosphor-icons/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCarousel } from "@/hooks/use-carousel";

/* ── Types ─────────────────────────────────────────────────────── */
interface IconProps {
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

type ServiceIconComponent = React.ComponentType<IconProps>;

interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconComponent;
}

const services: Service[] = [
  {
    id: "01",
    title: "Survey & Research",
    description:
      "From market surveys with responses to deep user interviews, we provide SWOT reports, positioning strategy, and behavioural mapping.",
    icon: MagnifyingGlass as ServiceIconComponent,
  },
  {
    id: "02",
    title: "Service Blueprinting",
    description:
      "We map processes, optimise workflows, design lifecycle customer journeys, and create structured SOP documentation for scale.",
    icon: Blueprint as ServiceIconComponent,
  },
  {
    id: "03",
    title: "Data & Dashboard",
    description:
      "Transforming raw information into live KPI dashboards, structured datasets, and delivering monthly insight and recommendation reports.",
    icon: ChartBar as ServiceIconComponent,
  },
  {
    id: "04",
    title: "AI/ML Integration",
    description:
      "Deploying AI Chatbots Synced with CRMs, sales automation workflows, and advanced custom machine learning solutions.",
    icon: Robot as ServiceIconComponent,
  },
  {
    id: "05",
    title: "ERP & Cloud Systems",
    description:
      "Comprehensive ERP setups (HR, Billing, Inventory) alongside 24x7 monitored cloud hosting, security audits, and compliance.",
    icon: CloudArrowUp as ServiceIconComponent,
  },
  {
    id: "06",
    title: "Web & App Development",
    description:
      "Building responsive websites, e-commerce platforms with payment automation, and Android/iOS mobile applications.",
    icon: AppWindow as ServiceIconComponent,
  },
  {
    id: "07",
    title: "Brand Designs",
    description:
      "Crafting logo and identity basics, full brand manuals, and SKU packaging systems that resonate across all mediums.",
    icon: Palette as ServiceIconComponent,
  },
  {
    id: "08",
    title: "Social Media Storytelling",
    description:
      "Managing monthly content, PR media relations, influencer partnerships executing optimised performance marketing setups.",
    icon: Megaphone as ServiceIconComponent,
  },
  {
    id: "09",
    title: "Video Production",
    description:
      "Executing 1-2 day corporate shoots, scripting and cutting brand films, and directing impactful documentary storytelling.",
    icon: FilmStrip as ServiceIconComponent,
  },
];

/* ── Service Card ──────────────────────────────────────────────── */
function ServiceCard({ svc }: { svc: Service }) {
  const IconComp = svc.icon;

  return (
    <div
      className="group relative flex flex-col justify-between gap-8 border border-white/5 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 overflow-hidden h-full"
    >
      {/* Background ID Watermark (Technical/Studio Look) */}
      <div className="absolute -top-4 -right-2 font-mono-display text-[120px] font-black text-white/[0.02] select-none leading-none pointer-events-none">
        {svc.id}
      </div>

      {/* Top: Icon Container */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_35px_rgba(255,255,255,0.1)] transition-all duration-500">
          <IconComp
            size={28}
            color="var(--text-primary)"
            weight="duotone"
          />
        </div>
      </div>

      {/* Bottom: Title + Description */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono-display text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
            Service {svc.id}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary group-hover:text-white transition-colors leading-tight">
          {svc.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500 max-w-[90%]">
          {svc.description}
        </p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const GAP = 20;

  const {
    trackRef,
    currentIndex,
    maxIndex,
    itemsPerView,
    scrollTo,
    prev,
    next,
    onScroll,
  } = useCarousel({
    itemCount: services.length,
    gap: GAP,
  });

  return (
    <section
      id="services"
      className="bg-bg-primary py-28 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div
          ref={sectionRef}
          className="flex items-end justify-between mb-12 gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag block mb-4"
            >
              Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-6xl font-black text-text-primary leading-tight max-w-2xl"
            >
              Everything You Need to{" "}
              <span className="text-accent">Grow Online</span>
            </motion.h2>
          </div>

          {/* Prev / Next buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 shrink-0"
          >
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous services"
            >
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next services"
            >
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        {/* Carousel track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex overflow-x-auto no-scrollbar scroll-smooth-manual grab-cursor"
            style={{
              gap: GAP,
              scrollSnapType: "x mandatory",
            }}
          >
            {services.map((svc) => (
              <div
                key={svc.id}
                className="shrink-0 scroll-snap-start"
                style={{
                  flex: `0 0 calc((100% - ${GAP * (itemsPerView - 1)}px) / ${itemsPerView})`,
                  minWidth: 0,
                }}
              >
                <ServiceCard svc={svc} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {Array.from({
            length: Math.ceil(services.length / itemsPerView),
          }).map((_, i) => {
            const pageStart = i * itemsPerView;
            const isActive =
              currentIndex >= pageStart &&
              currentIndex < pageStart + itemsPerView;
            return (
              <button
                key={i}
                onClick={() => scrollTo(pageStart)}
                aria-label={`Go to page ${i + 1}`}
                className={`transition-all rounded-full h-2 ${
                  isActive ? "w-6 bg-accent" : "w-2 bg-text-muted"
                }`}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
