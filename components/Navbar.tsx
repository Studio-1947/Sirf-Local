"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import SVGLIcon from "./SVGLIcon";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(var(--bg-rgb, 31, 30, 31), 0.80)"
              : "rgba(var(--bg-rgb, 31, 30, 31), 0.45)",
            borderColor: scrolled
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(255, 255, 255, 0.08)",
          }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl rounded-full px-5 py-3 flex items-center justify-between backdrop-blur-md border shadow-2xl"
        >
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/Logo.svg"
              alt="Sirf Local"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openDrawer}
              className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 hover:border-white/50 hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] ${
                totalCount > 0
                  ? "border-white/40 bg-white/12"
                  : "border-white/12 bg-white/04"
              }`}
              title="View cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={totalCount > 0 ? "var(--accent)" : "rgba(255,255,255,0.55)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-accent text-white font-black text-[9px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border border-[rgba(31,30,31,0.9)]"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="https://wa.me/919093277919"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] text-sm font-bold rounded-full hover:opacity-90 transition-colors inline-flex items-center gap-2"
            >
              <SVGLIcon name="whatsapp" size={16} />
              Connect Now
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] left-4 right-4 z-40 rounded-2xl px-6 py-6 md:hidden backdrop-blur-md"
            style={{
              background: "rgba(var(--bg-rgb, 31, 30, 31), 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-lg font-medium hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/919093277919"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 bg-white text-bg-primary text-sm font-bold rounded-full text-center hover:opacity-90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <SVGLIcon name="whatsapp" size={16} />
                Connect Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
