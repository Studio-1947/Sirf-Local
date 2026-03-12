'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, Phone, Mail, User, ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useCart, formatPrice } from '@/context/CartContext';

// ─── Razorpay global type shim ────────────────────────────────────────────────
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
    return new Promise(resolve => {
        if (document.getElementById('razorpay-sdk')) { resolve(true); return; }
        const script = document.createElement('script');
        script.id = 'razorpay-sdk';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface CheckoutModalProps {
    open: boolean;
    onClose: () => void;
}

type ScreenState = 'form' | 'loading' | 'success' | 'failure';

// ─── Component ────────────────────────────────────────────────────────────────
export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
    const { items, monthlyTotal, onetimeTotal, clearCart } = useCart();

    const grandTotal = monthlyTotal + onetimeTotal;
    const tokenAmount = Math.round(grandTotal * 0.1);   // 10%
    const remaining = grandTotal - tokenAmount;

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [screen, setScreen] = useState<ScreenState>('form');
    const [paymentId, setPaymentId] = useState('');

    const validate = () => {
        const e: { name?: string; phone?: string } = {};
        if (!name.trim()) e.name = 'Please enter your name';
        if (!/^\d{10}$/.test(phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePay = useCallback(async () => {
        if (!validate()) return;
        setScreen('loading');

        const loaded = await loadRazorpayScript();
        if (!loaded) { setScreen('failure'); return; }

        const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!key || key.startsWith('rzp_test_XXXX')) {
            // Dev-mode: simulate success without real key
            setPaymentId('dev_simulated_payment');
            setScreen('success');
            clearCart();
            return;
        }

        const description = items.map(i => `${i.title} (×${i.qty})`).join(', ');

        const rzp = new window.Razorpay({
            key,
            amount: tokenAmount * 100,           // paise
            currency: 'INR',
            name: 'Sirf Local',
            description: `10% booking token — ${description}`,
            prefill: { name: name.trim(), contact: phone.trim(), email: email.trim() },
            theme: { color: 'var(--color-accent)' },
            modal: { ondismiss: () => setScreen('form') },
            handler: (response: { razorpay_payment_id: string }) => {
                setPaymentId(response.razorpay_payment_id);
                setScreen('success');
                clearCart();
            },
        });
        rzp.on('payment.failed', () => setScreen('failure'));
        rzp.open();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, phone, email, tokenAmount, items]);

    const handleClose = () => {
        setScreen('form');
        setErrors({});
        onClose();
    };

    const whatsappText = encodeURIComponent(
        `Hi Sirf Local! I just paid ${formatPrice(tokenAmount)} as a token (ID: ${paymentId}). Here are my services:\n`
        + items.map(i => `• ${i.title} (×${i.qty})`).join('\n')
        + `\nTotal: ${formatPrice(grandTotal)}\nRemaining: ${formatPrice(remaining)}`
    );
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${whatsappText}`; // replace number

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="co-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.80)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 200,
                        }}
                    />

                    {/* Modal Wrapper for Centering */}
                    <div style={{
                        position: 'fixed', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '16px', zIndex: 201, pointerEvents: 'none',
                    }}>
                        {/* Modal panel */}
                        <motion.div
                            key="co-panel"
                            initial={{ opacity: 0, scale: 0.96, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 24 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                            style={{
                                width: '480px', maxWidth: '100%',
                                maxHeight: '100%',
                                overflowY: 'auto',
                                background: 'var(--bg-deep)',
                                border: '1px solid var(--border-card)',
                                borderRadius: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                pointerEvents: 'auto',
                                position: 'relative',
                            }}
                        >
                            {/* ── Header ── */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '20px 24px', borderBottom: '1px solid var(--border-deep)',
                                position: 'sticky', top: 0, background: 'var(--bg-deep)', zIndex: 2,
                            }}>
                                <span className="text-text-cream font-extrabold text-base">
                                    {screen === 'success' ? '🎉 You\'re all set!' : screen === 'failure' ? '⚠️ Payment issue' : 'Complete your booking'}
                                </span>
                                {screen !== 'loading' && (
                                    <button
                                        onClick={handleClose}
                                        className="bg-[#1A1A1A] border border-[#252525] rounded-lg text-[#888] cursor-pointer p-1.5 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* ── Body ── */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                {/* ── SUCCESS SCREEN ── */}
                                {screen === 'success' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', padding: '12px 0' }}>
                                        <div style={{
                                            width: '72px', height: '72px', borderRadius: '50%',
                                            background: 'rgba(76,175,125,0.12)', border: '1.5px solid rgba(76,175,125,0.4)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <CheckCircle2 size={36} color="var(--state-success)" strokeWidth={1.6} />
                                        </div>
                                        <div>
                                            <p className="text-text-cream font-extrabold text-lg" style={{ margin: '0 0 6px' }}>
                                                Booking token paid!
                                            </p>
                                            <p style={{ color: 'var(--text-earth)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                                                We&apos;ve received your <span className="text-accent font-bold">{formatPrice(tokenAmount)}</span> token.
                                                Our team will reach out within <strong className="text-text-warm">24 hours</strong> to kick things off.
                                            </p>
                                        </div>

                                        {paymentId && (
                                            <div style={{
                                                background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '10px',
                                                padding: '10px 16px', width: '100%', textAlign: 'left',
                                            }}>
                                                <p style={{ color: 'var(--text-dark-muted)', fontSize: '11px', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment ID</p>
                                                <p style={{ color: 'var(--text-sand)', fontSize: '13px', fontWeight: 600, margin: 0, wordBreak: 'break-all' }}>{paymentId}</p>
                                            </div>
                                        )}

                                        {/* Remaining due note */}
                                        <div style={{
                                            background: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.2)',
                                            borderRadius: '12px', padding: '14px 18px', width: '100%', textAlign: 'left',
                                        }}>
                                            <p className="text-accent font-bold text-[13px]" style={{ margin: '0 0 4px' }}>Remaining balance</p>
                                            <div style={{ color: 'var(--text-earth)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                                                <span style={{ color: 'var(--text-warm)', fontWeight: 700 }}>{formatPrice(remaining)}</span> is due after we confirm the
                                                final scope with you — no surprises.
                                            </div>
                                        </div>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                width: '100%', padding: '13px 0', borderRadius: '999px',
                                                background: 'var(--whatsapp)', color: 'var(--text-primary)', fontWeight: 800, fontSize: '14px',
                                                textDecoration: 'none', letterSpacing: '0.2px',
                                            }}
                                        >
                                            💬 Message us on WhatsApp <ArrowRight size={15} />
                                        </a>
                                    </div>
                                )}

                                {/* ── FAILURE SCREEN ── */}
                                {screen === 'failure' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', padding: '12px 0' }}>
                                        <div style={{
                                            width: '72px', height: '72px', borderRadius: '50%',
                                            background: 'rgba(224,83,83,0.10)', border: '1.5px solid rgba(224,83,83,0.35)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <AlertCircle size={36} color="var(--state-error)" strokeWidth={1.6} />
                                        </div>
                                        <div>
                                            <p style={{ color: 'var(--text-warm)', fontWeight: 800, fontSize: '18px', margin: '0 0 6px' }}>Payment didn&apos;t go through</p>
                                            <p style={{ color: 'var(--text-sand)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                                                No money was deducted. You can try again or reach us directly on WhatsApp.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setScreen('form')}
                                            className="w-full py-3.5 rounded-full bg-accent text-[#0C0C0C] font-extrabold text-sm border-none cursor-pointer tracking-[0.3px] hover:bg-accent-hover transition-colors"
                                        >
                                            Try again
                                        </button>
                                    </div>
                                )}

                                {/* ── LOADING SCREEN ── */}
                                {screen === 'loading' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 0', textAlign: 'center' }}>
                                        <Loader2 size={40} className="text-accent" style={{ animation: 'spin 1s linear infinite' }} />
                                        <p style={{ color: 'var(--text-earth)', fontSize: '14px', margin: 0 }}>Opening payment window…</p>
                                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                    </div>
                                )}

                                {/* ── FORM SCREEN ── */}
                                {screen === 'form' && (
                                    <>
                                        {/* Order summary */}
                                        <div style={{
                                            background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                                            borderRadius: '14px', overflow: 'hidden',
                                        }}>
                                            <p style={{
                                                color: 'var(--text-dark-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px',
                                                fontWeight: 700, margin: 0, padding: '12px 16px', borderBottom: '1px solid var(--border-deep)',
                                            }}>Your Services</p>
                                            {items.map(item => (
                                                <div key={item.id} style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '10px 16px', borderBottom: '1px solid var(--border-deep)',
                                                }}>
                                                    <div>
                                                        <p style={{ color: 'var(--text-warm)', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</p>
                                                        <p style={{ color: 'var(--text-dark-muted)', fontSize: '11px', margin: 0 }}>
                                                            {item.period === 'monthly'
                                                                ? `${item.qty} month${item.qty > 1 ? 's' : ''}`
                                                                : 'One-time service'}
                                                        </p>
                                                    </div>
                                                    <span style={{ color: item.accent, fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                                                        {formatPrice(item.price * item.qty)}
                                                        {item.period === 'monthly' && (
                                                            <span style={{ fontSize: '10px', opacity: 0.6 }}>/mo</span>
                                                        )}
                                                    </span>
                                                </div>
                                            ))}

                                            {/* Totals */}
                                            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                {onetimeTotal > 0 && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'var(--text-dark-muted)', fontSize: '12px' }}>One-time total</span>
                                                        <span style={{ color: 'var(--text-sand)', fontSize: '12px', fontWeight: 600 }}>{formatPrice(onetimeTotal)}</span>
                                                    </div>
                                                )}
                                                {monthlyTotal > 0 && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'var(--text-dark-muted)', fontSize: '12px' }}>Monthly total</span>
                                                        <span style={{ color: 'var(--text-sand)', fontSize: '12px', fontWeight: 600 }}>{formatPrice(monthlyTotal)}<span style={{ opacity: 0.5, fontSize: '10px' }}>/mo</span></span>
                                                    </div>
                                                )}
                                                <div style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    paddingTop: '8px', borderTop: '1px solid var(--border-card)', marginTop: '2px',
                                                }}>
                                                    <span className="text-text-cream font-extrabold text-sm">Grand Total</span>
                                                    <span className="text-accent font-black text-base">{formatPrice(grandTotal)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 10% token callout */}
                                        <div style={{
                                            background: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.25)',
                                            borderRadius: '14px', padding: '16px 18px',
                                            display: 'flex', flexDirection: 'column', gap: '6px',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span className="text-sand text-[13px]">Due today <span className="text-accent font-bold">(10% token)</span></span>
                                                <span className="text-accent font-black text-xl tracking-tight">{formatPrice(tokenAmount)}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-dark-muted)', fontSize: '12px', margin: 0, lineHeight: 1.55 }}>
                                                You pay just 10% now to confirm your booking. Remaining <span style={{ color: 'var(--text-sand)', fontWeight: 600 }}>{formatPrice(remaining)}</span> is settled after we finalise the details with you.
                                            </p>
                                        </div>

                                        {/* Contact fields */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <p style={{ color: 'var(--text-dark-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, margin: 0 }}>
                                                Your details
                                            </p>

                                            {/* Name */}
                                            <div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    background: 'var(--bg-card)', border: `1px solid ${errors.name ? 'var(--state-error)' : 'var(--border-card)'}`,
                                                    borderRadius: '12px', padding: '10px 14px',
                                                    transition: 'border-color 0.2s',
                                                }}
                                                    onFocus={() => setErrors(p => ({ ...p, name: undefined }))}
                                                >
                                                    <User size={15} color="var(--text-dark-muted)" strokeWidth={2} />
                                                    <input
                                                        type="text"
                                                        placeholder="Your name"
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                        style={{
                                                            flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                            color: 'var(--text-warm)', fontSize: '14px',
                                                        }}
                                                    />
                                                </div>
                                                {errors.name && <p style={{ color: 'var(--state-error)', fontSize: '11px', margin: '4px 4px 0' }}>{errors.name}</p>}
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    background: 'var(--bg-card)', border: `1px solid ${errors.phone ? 'var(--state-error)' : 'var(--border-card)'}`,
                                                    borderRadius: '12px', padding: '10px 14px',
                                                    transition: 'border-color 0.2s',
                                                }}>
                                                    <Phone size={15} color="var(--text-dark-muted)" strokeWidth={2} />
                                                    <input
                                                        type="tel"
                                                        placeholder="10-digit mobile number"
                                                        value={phone}
                                                        onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                        style={{
                                                            flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                            color: 'var(--text-warm)', fontSize: '14px',
                                                        }}
                                                    />
                                                </div>
                                                {errors.phone && <p style={{ color: 'var(--state-error)', fontSize: '11px', margin: '4px 4px 0' }}>{errors.phone}</p>}
                                            </div>

                                            {/* Email — optional */}
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                                                borderRadius: '12px', padding: '10px 14px',
                                            }}>
                                                <Mail size={15} color="var(--text-dark-muted)" strokeWidth={2} />
                                                <input
                                                    type="email"
                                                    placeholder="Email (optional)"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    style={{
                                                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                        color: 'var(--text-warm)', fontSize: '14px',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Pay button */}
                                        <button
                                            onClick={handlePay}
                                            className="w-full py-3.5 rounded-full bg-accent text-[#0C0C0C] font-extrabold text-[15px] border-none cursor-pointer tracking-[0.3px] flex items-center justify-center gap-2 hover:bg-[#E5BA6A] transition-colors"
                                        >
                                            Pay {formatPrice(tokenAmount)} now <ArrowRight size={16} />
                                        </button>

                                        <p style={{ color: 'var(--text-muted)', fontSize: '11.5px', textAlign: 'center', margin: '-8px 0 0', lineHeight: 1.6 }}>
                                            🔒 Secured by Razorpay · UPI, Cards, Net Banking accepted
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
