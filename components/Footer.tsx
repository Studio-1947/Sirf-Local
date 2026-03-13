"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Clock,
  Cpu,
  ArrowRight
} from "lucide-react";
import SVGLIcon from "./SVGLIcon";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Solutions', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const socialLinks = [
    { label: 'Instagram', svglName: 'Instagram', href: 'https://instagram.com/sirflocal' },
    { label: 'WhatsApp', svglName: 'whatsapp', href: 'https://wa.me/919093277919' },
    { label: 'Email', svglName: 'gmail', href: 'mailto:hello@sirflocal.com' },
  ];

  return (
    <footer className="relative bg-bg-primary pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Section: High Impact CTA */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <span className="font-mono-display text-[10px] text-accent uppercase tracking-[0.4em] mb-4 block">Ready to go global?</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                Let's build something <br />
                <span className="text-accent">world-class</span> together.
              </h2>
            </div>
            <motion.a
              href="https://wa.me/919093277919"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary shadow-[0_0_30px_rgba(255,255,255,0.1)] !px-8 !py-5"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Middle Section: Studio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24 py-12 border-y border-white/5">

          {/* Brand Info - Final Pixel-Perfect Alignment */}
          <div className="flex flex-col gap-8 lg:gap-12">
            <div className="space-y-8">
              {/* Header-aligned Logo */}
              <div className="h-4 flex items-center">
                <Image src="/Logo.svg" alt="Sirf Local" width={140} height={40} className="h-10 w-auto object-contain" />
              </div>

              {/* Symmetrical Floral Integration - Zero-Gap Base */}
              <div className="flex flex-col justify-center items-center md:-mt-8 md:-mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="w-full max-w-[280px]"
                >
                  <Image
                    src="/sdfghjkl 1 1.svg"
                    alt="Floral Signature"
                    width={280}
                    height={280}
                    className="w-full h-auto object-contain "
                  />
                </motion.div>

                {/* Visual Base Line for the Flower (Pixel-Perfect Foundation) */}
                <div className="h-px w-full bg-white/10" />
              </div>
            </div>

            {/* Description Block */}
            <p className="text-text-secondary text-sm leading-relaxed opacity-80 max-w-xs">
              A digital design studio building high-performance architectures for regional brands. From Mirik to the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono-display text-[9px] text-text-muted uppercase tracking-[0.3em] block mb-8">Navigation</span>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex items-center justify-between text-text-secondary hover:text-white font-bold text-sm transition-colors group/link">
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span className="font-mono-display text-[9px] text-text-muted uppercase tracking-[0.3em] block mb-8">Connect</span>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-white font-bold text-sm transition-colors group/link">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted group-hover/link:text-accent group-hover/link:bg-accent/10 transition-all overflow-hidden p-1.5">
                      <SVGLIcon name={link.svglName} size={18} className="transition-transform group-hover/link:scale-110" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Telemetry */}
          <div className="space-y-8">
            <span className="font-mono-display text-[9px] text-text-muted uppercase tracking-[0.3em] block mb-8">Studio: Telemetry</span>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono-display text-text-muted uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-white font-bold text-xs">Mirik, WB, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono-display text-text-muted uppercase tracking-widest mb-0.5">Mirik_Time (IST)</p>
                  <p className="text-xl font-black text-white tracking-tighter tabular-nums">{time || "00:00:00"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent">
                  <Cpu size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono-display text-text-muted uppercase tracking-widest mb-0.5">Status</p>
                  <p className="text-state-success font-bold text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-state-success rounded-full animate-pulse" />
                    Operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-text-muted text-[10px] font-mono-display uppercase tracking-[0.2em]">
            © 2025 Studio 1947 Initiative. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono-display uppercase tracking-[0.2em] text-text-muted">
            Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-accent"
            >
              ❤
            </motion.span>
            by Sirf Local
          </div>
        </div>

      </div>
    </footer>
  );
}
