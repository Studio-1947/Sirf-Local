'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          className="w-full max-w-5xl rounded-full px-5 py-3 flex items-center justify-between backdrop-blur-md"
          style={{
            background: scrolled ? 'rgba(31,30,31,0.80)' : 'rgba(31,30,31,0.45)',
            border: scrolled ? '1px solid rgba(120,15,240,0.25)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
          }}
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
                className="text-sm text-[#9E9E9E] hover:text-[#FFFFFF] transition-colors font-medium tracking-wide"
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
              style={{
                position: 'relative',
                background: totalCount > 0 ? 'rgba(120,15,240,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${totalCount > 0 ? 'rgba(120,15,240,0.35)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              title="View cart"
            >
              <ShoppingCart size={16} color={totalCount > 0 ? '#780FF0' : '#9E9E9E'} strokeWidth={2} />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      background: '#780FF0',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '10px',
                      borderRadius: '999px',
                      minWidth: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 4px',
                      border: '1.5px solid #1F1E1F',
                    }}
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
              className="px-5 py-2.5 bg-[#780FF0] text-white text-sm font-bold rounded-full hover:bg-[#8E3AEE] transition-colors"
            >
              Connect Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile cart */}
            <button
              onClick={openDrawer}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
                color: '#9E9E9E',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
              }}
            >
              <ShoppingCart size={20} color={totalCount > 0 ? '#780FF0' : '#9E9E9E'} strokeWidth={2} />
              {totalCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-4px',
                    background: '#780FF0',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '9px',
                    borderRadius: '999px',
                    minWidth: '15px',
                    height: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
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
        </div>
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
            background: 'rgba(31,30,31,0.80)',
            border: '1px solid rgba(120,15,240,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
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
                className="mt-2 px-5 py-3 bg-[#780FF0] text-white text-sm font-bold rounded-full text-center hover:bg-[#8E3AEE] transition-colors"
              >
                Connect Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
