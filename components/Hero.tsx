"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import TopographicBg from "./TopographicBg";
import { HeroFigure } from "./HeroFigure";

const clientLogos = [
  { file: "/images/clients/bazmkaar.svg", alt: "Bazmkaar" },
  { file: "/images/clients/nesthomes.svg", alt: "NestHomes" },
  { file: "/images/clients/remodel.svg", alt: "Remodel" },
  { file: "/images/clients/bhagyam.svg", alt: "Bhagyam" },
  { file: "/images/clients/ecopt.svg", alt: "Ecopt" },
  { file: "/images/clients/sikkim.svg", alt: "Sikkim" },
  { file: "/images/clients/Bhagirath.svg", alt: "Bhagirath" },
];

const heroPhotos = [
  { file: "/images/hero/1.webp", alt: "" },
  { file: "/images/hero/2.webp", alt: "" },
  { file: "/images/hero/3.webp", alt: "" },
  { file: "/images/hero/4.webp", alt: "" },
];

const HERO_COPY = {
  topLabel: "Welcome to Sirf Local",
  heading: {
    line1: "World-Class",
    line2Prefix: "Design",
    line2Emphasis: "for Your",
    line3: "Local Business",
  },
  description:
"Elevate your local business with premium agency standards. Professional services from ₹999."
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <TopographicBg />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-base mb-4 font-medium"
            >
              {HERO_COPY.topLabel}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-6"
            >
              <span className="text-white/70">{HERO_COPY.heading.line1}</span>
              <br />
              <span className="text-white/70">{HERO_COPY.heading.line2Prefix} </span>
              <span className="text-white underline decoration-white/20 underline-offset-8">{HERO_COPY.heading.line2Emphasis}</span>
              <br />
              <span className="text-white/70">{HERO_COPY.heading.line3}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="max-w-xl text-text-secondary text-lg leading-relaxed mb-10"
            >
              {HERO_COPY.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href="#contact" className="btn-primary">
                Start Your Journey
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#services"
                className="px-9 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-bg-primary transition-all flex items-center gap-2"
              >
                Explore Services
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          <div className="relative block lg:block">
            <HeroFigure images={heroPhotos.slice(0, 4).map(p => p.file)} />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 border-t border-white/10 overflow-hidden py-5 bg-bg-primary/80 backdrop-blur-sm">
        <p className="text-center text-xs text-white/40 font-mono-display tracking-widest uppercase mb-4">
          Trusted by local businesses across India
        </p>
        <div className="flex animate-marquee whitespace-nowrap gap-[50px]">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center min-w-[140px] px-6 opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src={logo.file}
                alt={logo.alt}
                width={140}
                height={48}
                className="h-10 w-auto max-w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
