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
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.65)',
                zIndex: 100,
                backdropFilter: 'blur(2px)',
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: '420px', maxWidth: '100vw',
                background: '#0E0E0E',
                borderLeft: '1px solid #1E1E1E',
                zIndex: 101,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px', borderBottom: '1px solid #1C1C1C',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={20} color="#780FF0" strokeWidth={1.8} />
                  <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '16px' }}>Your Cart</span>
                  {totalCount > 0 && (
                    <span style={{
                      background: '#780FF0', color: '#FFFFFF',
                      fontWeight: 800, fontSize: '11px', borderRadius: '999px', padding: '2px 8px',
                    }}>
                      {totalCount} {totalCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeDrawer}
                  style={{
                    background: '#1A1A1A', border: '1px solid #252525', borderRadius: '8px',
                    color: '#888', cursor: 'pointer', padding: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#780FF0'; (e.currentTarget as HTMLElement).style.color = '#780FF0'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#252525'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items list */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.length === 0 ? (
                  <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '14px', padding: '60px 0', textAlign: 'center',
                  }}>
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '20px',
                      background: '#161616', border: '1px solid #222',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <ShoppingBag size={30} color="#333" strokeWidth={1.5} />
                    </div>
                    <p style={{ color: '#555', fontSize: '14px', maxWidth: '200px', lineHeight: 1.5 }}>
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
                        style={{
                          background: '#131313', border: '1px solid #383838',
                          borderRadius: '14px', padding: '14px 16px',
                        }}
                      >
                        {/* Item top row */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ color: '#F0EBE0', fontWeight: 700, fontSize: '14px', margin: '0 0 4px' }}>
                              {item.title}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ color: item.accent, fontWeight: 800, fontSize: '13px' }}>
                                {formatPrice(item.price)}
                              </span>
                              <span style={{
                                color: item.accent, opacity: 0.55, fontSize: '11px',
                                background: `${item.accent}12`, padding: '1px 7px',
                                borderRadius: '999px', border: `1px solid ${item.accent}25`,
                              }}>
                                / {isMonthly ? 'month' : 'one-time'}
                              </span>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              background: 'transparent', border: 'none', color: '#444',
                              cursor: 'pointer', padding: '4px', borderRadius: '6px',
                              display: 'flex', flexShrink: 0,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#E05353'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444'; }}
                            title="Remove service"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Month qty + subtotal — ONLY for monthly services */}
                        {isMonthly ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Months stepper */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#555', fontSize: '12px' }}>Months:</span>
                              <div style={{
                                display: 'flex', alignItems: 'center',
                                border: '1px solid #252525', borderRadius: '8px', overflow: 'hidden',
                              }}>
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  disabled={item.qty <= 1}
                                  style={{
                                    background: 'transparent', border: 'none',
                                    color: item.qty <= 1 ? '#333' : '#888',
                                    cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                                    padding: '5px 10px', display: 'flex', alignItems: 'center',
                                  }}
                                >
                                  <Minus size={12} />
                                </button>
                                <span style={{
                                  color: '#F0EBE0', fontWeight: 700, fontSize: '13px',
                                  minWidth: '28px', textAlign: 'center',
                                  borderLeft: '1px solid #252525', borderRight: '1px solid #252525',
                                  padding: '5px 4px',
                                }}>
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  style={{
                                    background: 'transparent', border: 'none',
                                    color: '#888', cursor: 'pointer',
                                    padding: '5px 10px', display: 'flex', alignItems: 'center',
                                  }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = item.accent; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888'; }}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <span style={{ color: '#A89F8C', fontSize: '13px', fontWeight: 600 }}>
                              {formatPrice(item.price * item.qty)}
                              <span style={{ opacity: 0.5, fontSize: '11px', marginLeft: '3px' }}> total</span>
                            </span>
                          </div>
                        ) : (
                          /* One-time disclaimer */
                          <div style={{
                            display: 'flex', gap: '7px', alignItems: 'flex-start',
                            background: 'rgba(120,15,240,0.05)', borderRadius: '8px',
                            padding: '8px 10px', border: '1px solid rgba(120,15,240,0.12)',
                          }}>
                            <Info size={13} color="#780FF0" style={{ flexShrink: 0, marginTop: '1px' }} strokeWidth={2} />
                            <p style={{ color: '#7A7060', fontSize: '11.5px', lineHeight: 1.55, margin: 0 }}>
                              Final price may vary with scope & features — we'll confirm before starting.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}

                {/* One-time disclaimer banner (only when cart has one-time items) */}
                {hasOneTime && items.length > 0 && (
                  <div style={{
                    background: '#111', border: '1px dashed #2A2A2A',
                    borderRadius: '12px', padding: '12px 14px',
                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                  }}>
                    <Info size={14} color="#555" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ color: '#555', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
                      One-time service prices are <strong style={{ color: '#8E3AEE' }}>starting rates</strong>. Final cost is confirmed after a quick chat about your requirements — no hidden charges.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer — totals + checkout */}
              {items.length > 0 && (
                <div style={{
                  borderTop: '1px solid #1C1C1C', padding: '20px 24px',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  background: '#0A0A0A',
                }}>
                  {/* Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {onetimeTotal > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#666', fontSize: '13px' }}>One-time services</span>
                        <span style={{ color: '#A89F8C', fontWeight: 600, fontSize: '13px' }}>{formatPrice(onetimeTotal)}</span>
                      </div>
                    )}
                    {monthlyTotal > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#666', fontSize: '13px' }}>Monthly services</span>
                        <span style={{ color: '#A89F8C', fontWeight: 600, fontSize: '13px' }}>
                          {formatPrice(monthlyTotal)}<span style={{ opacity: 0.5, fontSize: '11px' }}> total</span>
                        </span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: '10px', borderTop: '1px solid #1E1E1E', marginTop: '4px',
                    }}>
                      <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '15px' }}>Total</span>
                      <span style={{ color: '#780FF0', fontWeight: 900, fontSize: '18px', letterSpacing: '-0.5px' }}>
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    {/* 10% token highlight */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'rgba(120,15,240,0.08)', borderRadius: '10px',
                      padding: '9px 12px', marginTop: '4px',
                      border: '1px solid rgba(120,15,240,0.2)',
                    }}>
                      <span style={{ color: '#A89F8C', fontSize: '12.5px' }}>
                        Due today <span style={{ color: '#780FF0', fontWeight: 700 }}>(10% token)</span>
                      </span>
                      <span style={{ color: '#780FF0', fontWeight: 900, fontSize: '15px' }}>
                        {formatPrice(tokenAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => { closeDrawer(); setCheckoutOpen(true); }}
                    style={{
                      width: '100%', padding: '13px 0', borderRadius: '999px',
                      background: '#780FF0', color: '#FFFFFF',
                      fontWeight: 800, fontSize: '14px', border: 'none',
                      cursor: 'pointer', opacity: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', letterSpacing: '0.3px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8E3AEE'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#780FF0'; }}
                  >
                    Proceed to Checkout <ArrowRight size={15} />
                  </button>

                  {/* Contact fallback */}
                  <a
                    href="#contact"
                    onClick={closeDrawer}
                    style={{
                      display: 'block', width: '100%', padding: '11px 0',
                      borderRadius: '999px', border: '1.5px solid #2A2A2A',
                      color: '#A89F8C', fontWeight: 700, fontSize: '13px',
                      textAlign: 'center', textDecoration: 'none',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#780FF0'; (e.currentTarget as HTMLElement).style.color = '#780FF0'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'; (e.currentTarget as HTMLElement).style.color = '#A89F8C'; }}
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
