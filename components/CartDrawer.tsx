'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Info, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart, formatPrice } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, monthlyTotal, onetimeTotal, totalCount } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPercent, setSelectedPercent] = useState(25); // 25, 50, or 100

  const grandTotal = monthlyTotal + onetimeTotal;

  // Calculations
  const baseSelectedAmount = Math.round(grandTotal * (selectedPercent / 100));
  const gstAmount = Math.round(baseSelectedAmount * 0.18);
  const tokenAmount = baseSelectedAmount + gstAmount;

  const hasOneTime = items.some(i => i.period !== 'monthly');

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[100]"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-bg-deep border-l border-white/5 z-[101] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-none">Studio Cart</h2>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1.5 font-mono-display">Ref: Selection_{totalCount}</p>
                  </div>
                </div>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-white/50 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="text-text-secondary text-sm max-w-[200px]">
                      Your studio cart is currently empty. Let&apos;s architect your digital growth.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-bold text-base group-hover:text-white/80 transition-colors">{item.title}</h3>
                          <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">{item.period} service</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-state-error transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-white font-mono-display text-sm">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-black text-base">{formatPrice(item.price * item.qty)}</p>
                          {item.period === 'monthly' && <p className="text-[10px] text-text-muted">/ monthly</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Summary Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-white/[0.01] border-t border-white/5 space-y-6">
                  <div className="space-y-3">
                    {monthlyTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Monthly Retainer</span>
                        <span className="text-white font-bold">{formatPrice(monthlyTotal)}/mo</span>
                      </div>
                    )}
                    {onetimeTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Setup Modules</span>
                        <span className="text-white font-bold">{formatPrice(onetimeTotal)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-white/5 flex justify-between items-baseline">
                      <span className="text-white font-black uppercase text-xs tracking-widest">Total Investment</span>
                      <span className="text-white font-black text-2xl tracking-tighter">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                    {/* Payment selection checkboxes */}
                    <div style={{
                      marginTop: '12px', padding: '16px', borderRadius: '16px',
                      background: '#111', border: '1px solid #1E1E1E'
                    }}>
                      <p style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, margin: '0 0 12px' }}>
                        Select Token Payment Option
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[25, 50, 100].map(pct => (
                          <button
                            key={pct}
                            onClick={() => setSelectedPercent(pct)}
                            style={{
                              flex: 1, padding: '10px 0', borderRadius: '10px',
                              background: selectedPercent === pct ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                              border: `1px solid ${selectedPercent === pct ? '#FFFFFF' : '#222'}`,
                              color: selectedPercent === pct ? '#FFFFFF' : '#888',
                              fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div style={{
                      display: 'flex', flexDirection: 'column', gap: '8px',
                      background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px',
                      padding: '16px', marginTop: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#A89F8C', fontSize: '13px' }}>Selected ({selectedPercent}%)</span>
                        <span style={{ color: '#F5F0E8', fontWeight: 600, fontSize: '13px' }}>{formatPrice(baseSelectedAmount)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#A89F8C', fontSize: '13px' }}>GST (18%)</span>
                        <span style={{ color: '#F5F0E8', fontWeight: 600, fontSize: '13px' }}>{formatPrice(gstAmount)}</span>
                      </div>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', marginTop: '2px',
                      }}>
                        <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '14px' }}>Due Today</span>
                        <span style={{ color: '#FFFFFF', fontWeight: 900, fontVariantNumeric: 'tabular-nums', fontSize: '20px', letterSpacing: '-0.5px' }}>
                          {formatPrice(tokenAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={() => { closeDrawer(); setCheckoutOpen(true); }}
                      className="w-full py-3.5 rounded-full bg-white text-bg-primary font-extrabold text-sm border-none cursor-pointer flex items-center justify-center gap-2 tracking-[0.3px] hover:opacity-90 transition-colors"
                    >
                      Proceed to Checkout <ArrowRight size={15} />
                    </button>

                    {/* Contact fallback */}
                    <a
                      href="#contact"
                      onClick={closeDrawer}
                      className="block text-center text-text-muted text-[10px] uppercase tracking-widest hover:text-white transition-colors py-2"
                    >
                      Need a custom blueprint instead?
                    </a>

                  {hasOneTime && (
                    <div className="flex items-start gap-2 opacity-60">
                      <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                      <p className="text-[9px] text-text-muted leading-relaxed uppercase tracking-widest font-mono-display">
                        Final price may vary with scope &amp; features — we&apos;ll confirm before starting.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout modal — rendered outside drawer */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPercent={selectedPercent}
      />
    </>
  );
}
