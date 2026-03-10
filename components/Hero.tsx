"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import TopographicBg from "./TopographicBg";

const clientLogos = [
  { file: "/images/clients/bazmkaar.svg", alt: "Bazmkaar" },
  { file: "/images/clients/nesthomes.svg", alt: "NestHomes" },
  { file: "/images/clients/remodel.svg", alt: "Remodel" },
  { file: "/images/clients/bhagyam.svg", alt: "Bhagyam" },
  { file: "/images/clients/ecopt.svg", alt: "Ecopt" },
  { file: "/images/clients/sikkim.svg", alt: "Sikkim" },
  { file: "/images/clients/Bhagirath.svg", alt: "Bhagirath" },
];

// Drop images into public/images/hero/ and list them here
const heroPhotos = [
  { file: "/images/hero/1.webp", alt: "" },
  { file: "/images/hero/2.webp", alt: "" },
  { file: "/images/hero/3.webp", alt: "" },
  { file: "/images/hero/4.webp", alt: "" },
];

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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#1F1E1F]"
    >
      {/* Topographic animated background */}
      <TopographicBg />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#9E9E9E] text-base mb-4 font-medium"
            >
              Welcome to Sirf Local
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-6"
            >
              <span className="text-[#FFFFFF]">World-Class</span>
              <br />
              <span className="text-[#FFFFFF]">Design </span>
              <span className="text-[#780FF0]">for Your</span>
              <br />
              <span className="text-[#FFFFFF]">Local Business</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="max-w-xl text-[#9E9E9E] text-lg leading-relaxed mb-10"
            >
              Homestays, shops, and local crafts — get the agency quality you
              deserve at a price that makes meaningful impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="group flex items-center gap-2 px-7 py-4 bg-[#780FF0] text-white font-bold rounded-full hover:bg-[#8E3AEE] transition-all hover:gap-3"
              >
                Start Your Journey
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#services"
                className="px-7 py-4 border border-[#525252] text-[#FFFFFF] font-medium rounded-full hover:border-[#780FF0] hover:text-[#780FF0] transition-all"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          {/* Right column — photo marquee with pills */}
          <div className="relative hidden lg:block">
            {/* Top pill: Trusted Clients */}
            <div className="absolute top-0 left-6 -translate-y-1/2 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-[#383838] border border-[#525252] text-sm font-semibold text-white shadow-lg whitespace-nowrap">
              {/* Stacked avatars */}
              <div className="flex items-center">
                {[1, 2, 3, 4].map((n, i) => (
                  <div
                    key={n}
                    className="relative w-7 h-7 rounded-full border-2 border-[#383838] overflow-hidden"
                    style={{ marginLeft: i === 0 ? 0 : "-8px", zIndex: 4 - i }}
                  >
                    <Image
                      src={`/images/avatars/${n}.png`}
                      alt={`Client ${n}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              10+ Trusted Clients
            </div>

            {/* Photo marquee container */}
            <div className="relative h-[520px] rounded-2xl overflow-hidden border border-[#525252]">
              {/* Left fade */}
              <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#1F1E1F] to-transparent z-10 pointer-events-none" />
              {/* Right fade */}
              <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#1F1E1F] to-transparent z-10 pointer-events-none" />
              <div className="flex flex-row h-full w-max gap-3 animate-marquee-horizontal">
                {[...heroPhotos, ...heroPhotos].map((photo, i) => (
                  <Image
                    key={i}
                    src={photo.file}
                    alt={photo.alt}
                    width={800}
                    height={520}
                    className="h-full w-auto shrink-0 object-cover rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Bottom pill: Google Rating */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#383838] border border-[#525252] text-sm font-semibold text-white shadow-lg whitespace-nowrap">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              5.0 on Google
            </div>
          </div>
        </div>
      </motion.div>

      {/* Client Logo Marquee */}
      <div className="relative z-10 border-t border-[#525252] overflow-hidden py-5 bg-[#1F1E1F]/80 backdrop-blur-sm">
        <p className="text-center text-xs text-[#6B6B6B] font-mono-display tracking-widest uppercase mb-4">
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
