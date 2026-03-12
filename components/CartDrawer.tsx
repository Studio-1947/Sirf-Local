'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { useCart, formatPrice } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, monthlyTotal, onetimeTotal, totalCount } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const grandTotal = monthlyTotal + onetimeTotal;
  const tokenAmount = Math.round(grandTotal * 0.1);

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
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-bg-deep border-l border-[#1E1E1E] z-[101] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1C1C1C]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} className="text-accent" strokeWidth={1.8} />
                  <span className="text-text-cream font-extrabold text-base">Your Cart</span>
                  {totalCount > 0 && (
                    <span className="bg-accent text-white font-black text-[11px] rounded-full px-2 py-0.5">
                      {totalCount} {totalCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 bg-[#1A1A1A] border border-[#252525] rounded-lg text-[#888] flex items-center justify-center cursor-pointer hover:border-accent hover:text-accent transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3.5 py-16 text-center">
                    <div className="w-[72px] h-[72px] rounded-[20px] bg-[#161616] border border-[#222] flex items-center justify-center">
                      <ShoppingBag size={30} color="var(--text-dark-muted)" strokeWidth={1.5} />
                    </div>
                    <p className="text-[#555] text-sm max-w-[200px] leading-relaxed">
                      Your cart is empty. Pick services that fit your business.
                    </p>
                  </div>
                ) : (
                  items.map(item => {
                    const isMonthly = item.period === 'monthly';
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        className="bg-bg-card border border-[#383838] rounded-[14px] p-4"
                      >
                        {/* Item top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <p className="text-[#F0EBE0] font-bold text-sm mb-1">{item.title}</p>
                            <div className="flex items-center gap-1.5">
                              <span style={{ color: item.accent }} className="font-extrabold text-[13px]">
                                {formatPrice(item.price)}
                              </span>
                              <span
                                style={{
                                  color: item.accent,
                                  background: `${item.accent}12`,
                                  border: `1px solid ${item.accent}25`,
                                }}
                                className="opacity-55 text-[11px] px-1.5 py-px rounded-full"
                              >
                                / {isMonthly ? 'month' : 'one-time'}
                              </span>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            title="Remove service"
                            className="text-[#444] hover:text-red-400 transition-colors cursor-pointer p-1 rounded-md flex shrink-0"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Month qty + subtotal — ONLY for monthly services */}
                        {isMonthly ? (
                          <div className="flex items-center justify-between">
                            {/* Months stepper */}
                            <div className="flex items-center gap-2">
                              <span className="text-[#555] text-xs">Months:</span>
                              <div className="flex items-center border border-[#252525] rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  disabled={item.qty <= 1}
                                  className="bg-transparent border-none px-2.5 py-1.5 flex items-center cursor-pointer disabled:cursor-not-allowed disabled:text-[#333] text-[#888]"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-[#F0EBE0] font-bold text-[13px] min-w-7 text-center border-x border-[#252525] py-1.5 px-1">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="bg-transparent border-none px-2.5 py-1.5 flex items-center cursor-pointer text-[#888] transition-colors"
                                  style={{}}
                                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = item.accent; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <span className="text-sand text-[13px] font-semibold">
                              {formatPrice(item.price * item.qty)}
                              <span className="opacity-50 text-[11px] ml-0.5">total</span>
                            </span>
                          </div>
                        ) : (
                          /* One-time disclaimer */
                          <div className="flex gap-1.5 items-start bg-accent-muted rounded-lg p-2 border border-accent-border/40">
                            <Info size={13} className="text-accent shrink-0 mt-px" strokeWidth={2} />
                            <p className="text-[#7A7060] text-[11.5px] leading-relaxed m-0">
                              Final price may vary with scope &amp; features — we'll confirm before starting.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}

                {/* One-time disclaimer banner (only when cart has one-time items) */}
                {hasOneTime && items.length > 0 && (
                  <div className="bg-[#111] border border-dashed border-[#2A2A2A] rounded-xl p-3 flex gap-2.5 items-start">
                    <Info size={14} color="var(--text-dark-muted)" className="shrink-0 mt-px" />
                    <p className="text-[#555] text-xs leading-relaxed m-0">
                      One-time service prices are <strong className="text-accent-hover">starting rates</strong>. Final cost is confirmed after a quick chat about your requirements — no hidden charges.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer — totals + checkout */}
              {items.length > 0 && (
                <div className="border-t border-[#1C1C1C] px-6 py-5 flex flex-col gap-3 bg-[#0A0A0A]">
                  {/* Breakdown */}
                  <div className="flex flex-col gap-1.5">
                    {onetimeTotal > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#666] text-[13px]">One-time services</span>
                        <span className="text-sand font-semibold text-[13px]">{formatPrice(onetimeTotal)}</span>
                      </div>
                    )}
                    {monthlyTotal > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#666] text-[13px]">Monthly services</span>
                        <span className="text-sand font-semibold text-[13px]">
                          {formatPrice(monthlyTotal)}<span className="opacity-50 text-[11px]"> total</span>
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2.5 border-t border-[#1E1E1E] mt-1">
                      <span className="text-text-cream font-extrabold text-[15px]">Total</span>
                      <span className="text-accent font-black text-[18px] tracking-tight">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    {/* 10% token highlight */}
                    <div className="flex justify-between items-center bg-accent-muted rounded-[10px] px-3 py-2.5 mt-1 border border-accent-border/60">
                      <span className="text-sand text-[12.5px]">
                        Due today <span className="text-accent font-bold">(10% token)</span>
                      </span>
                      <span className="text-accent font-black text-[15px]">
                        {formatPrice(tokenAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => { closeDrawer(); setCheckoutOpen(true); }}
                    className="w-full py-3.5 rounded-full bg-accent text-white font-extrabold text-sm border-none cursor-pointer flex items-center justify-center gap-2 tracking-[0.3px] hover:bg-accent-hover transition-colors"
                  >
                    Proceed to Checkout <ArrowRight size={15} />
                  </button>

                  {/* Contact fallback */}
                  <a
                    href="#contact"
                    onClick={closeDrawer}
                    className="block w-full py-3 rounded-full border border-[#2A2A2A] text-sand font-bold text-[13px] text-center no-underline hover:border-accent hover:text-accent transition-colors"
                  >
                    Or enquire via Contact →
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout modal — rendered outside drawer */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
