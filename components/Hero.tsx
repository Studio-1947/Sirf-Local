'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TopographicBg from './TopographicBg';
import CountUp from './CountUp';

const clientLogos = [
  { file: '/images/clients/bazmkaar.svg',   alt: 'Bazmkaar'    },
  { file: '/images/clients/givfunds.svg',   alt: 'GivFunds'    },
  { file: '/images/clients/nesthomes.svg',  alt: 'NestHomes'   },
  { file: '/images/clients/remodel.svg',    alt: 'Remodel'     },
  { file: '/images/clients/bhagyam.svg',    alt: 'Bhagyam'     },
  { file: '/images/clients/ecopt.svg',      alt: 'Ecopt'       },
  { file: '/images/clients/awch.svg',       alt: 'AWCH'        },
  { file: '/images/clients/sikkim.svg',     alt: 'Sikkim'      },
  { file: '/images/clients/ecological.svg', alt: 'Ecological'  },
  { file: '/images/clients/Sundergaan.svg', alt: 'Sundergaan'  },
];

const avatars = [
  { file: '/images/avatars/1.png', alt: 'Client A' },
  { file: '/images/avatars/2.png', alt: 'Client B' },
  { file: '/images/avatars/3.png', alt: 'Client C' },
  { file: '/images/avatars/4.png', alt: 'Client D' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0C0C0C]"
    >
      {/* Topographic animated background */}
      <TopographicBg />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="section-tag">by Studio 1947</span>
          <span className="w-8 h-px bg-[#D4A853]" />
          <span className="text-xs text-[#A89F8C] tracking-widest uppercase font-mono">
            Mirik, Darjeeling
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#A89F8C] text-base mb-4 font-medium"
        >
          Welcome to Sirf Local
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-[#F5F0E8]">World-Class</span>
          <br />
          <span className="text-[#F5F0E8]">Design </span>
          <span className="text-[#D4A853]">for Your</span>
          <br />
          <span className="text-[#F5F0E8]">Local Business</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="max-w-xl text-[#A89F8C] text-lg leading-relaxed mb-10"
        >
          Homestays, shops, and local crafts — get the agency quality you deserve
          at a price that makes meaningful impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-4 bg-[#D4A853] text-[#0C0C0C] font-bold rounded-full hover:bg-[#E5BA6A] transition-all hover:gap-3"
          >
            Start Your Journey
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="px-7 py-4 border border-[#2A2A2A] text-[#F5F0E8] font-medium rounded-full hover:border-[#D4A853] hover:text-[#D4A853] transition-all"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Social Proof — real avatar images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {avatars.map((av, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#0C0C0C] overflow-hidden"
              >
                <Image
                  src={av.file}
                  alt={av.alt}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-[#F5F0E8] text-sm font-semibold">Trusted by 10+ Clients</p>
            <p className="text-[#A89F8C] text-xs">From all over India</p>
          </div>
          <div className="h-8 w-px bg-[#2A2A2A] mx-2 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-3xl font-black text-[#D4A853]"><CountUp value={98} suffix="%" /></span>
            <span className="text-xs text-[#A89F8C] leading-tight">Success<br />Rate</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Client Logo Marquee */}
      <div className="relative z-10 border-t border-[#2A2A2A] overflow-hidden py-5 bg-[#0C0C0C]/80 backdrop-blur-sm">
        <p className="text-center text-xs text-[#3A3A3A] font-mono-display tracking-widest uppercase mb-4">
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
