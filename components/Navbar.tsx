"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

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
              ? "rgba(31,30,31,0.80)"
              : "rgba(31,30,31,0.45)",
            borderColor: scrolled
              ? "rgba(120,15,240,0.25)"
              : "rgba(255,255,255,0.08)",
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
              className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 hover:border-[rgba(120,15,240,0.5)] hover:shadow-[0_0_12px_rgba(120,15,240,0.25)] ${
                totalCount > 0
                  ? "border-[rgba(120,15,240,0.4)] bg-[rgba(120,15,240,0.12)]"
                  : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]"
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
              className="px-5 py-2.5 bg-accent text-text-primary text-sm font-bold rounded-full hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 360 362"
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
                  clipRule="evenodd"
                />
              </svg>
              Connect Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile cart */}
            <button
              onClick={openDrawer}
              className="relative flex items-center justify-center p-1.5 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-accent text-white font-black text-[9px] rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-0.5">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#FFFFFF] p-1"
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
              background: "rgba(31,30,31,0.80)",
              border: "1px solid rgba(120,15,240,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#FFFFFF] text-lg font-medium hover:text-[#780FF0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/919093277919"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 bg-[#780FF0] text-white text-sm font-bold rounded-full text-center hover:bg-[#8E3AEE] transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 360 362"
                  width="16"
                  height="16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
                    clipRule="evenodd"
                  />
                </svg>
                Connect Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
