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
            theme: { color: '#D4A853' },
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
        `Hi Sirf Local! I just paid ₹${formatPrice(tokenAmount).replace('₹', '')} as a token (ID: ${paymentId}). Here are my services:\n`
        + items.map(i => `• ${i.title} (×${i.qty})`).join('\n')
        + `\nTotal: ₹${formatPrice(grandTotal).replace('₹', '')}\nRemaining: ₹${formatPrice(remaining).replace('₹', '')}`
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

                    {/* Modal panel */}
                    <motion.div
                        key="co-panel"
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 24 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                        style={{
                            position: 'fixed',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '480px', maxWidth: 'calc(100vw - 32px)',
                            maxHeight: 'calc(100vh - 48px)',
                            overflowY: 'auto',
                            background: '#0E0E0E',
                            border: '1px solid #222',
                            borderRadius: '24px',
                            zIndex: 201,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* ── Header ── */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px 24px', borderBottom: '1px solid #1C1C1C',
                            position: 'sticky', top: 0, background: '#0E0E0E', zIndex: 2,
                        }}>
                            <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '16px' }}>
                                {screen === 'success' ? '🎉 You\'re all set!' : screen === 'failure' ? '⚠️ Payment issue' : 'Complete your booking'}
                            </span>
                            {screen !== 'loading' && (
                                <button
                                    onClick={handleClose}
                                    style={{
                                        background: '#1A1A1A', border: '1px solid #252525', borderRadius: '8px',
                                        color: '#888', cursor: 'pointer', padding: '6px', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4A853'; (e.currentTarget as HTMLElement).style.color = '#D4A853'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#252525'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
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
                                        <CheckCircle2 size={36} color="#4CAF7D" strokeWidth={1.6} />
                                    </div>
                                    <div>
                                        <p style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '18px', margin: '0 0 6px' }}>
                                            Booking token paid!
                                        </p>
                                        <p style={{ color: '#8A8178', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                                            We've received your <span style={{ color: '#D4A853', fontWeight: 700 }}>{formatPrice(tokenAmount)}</span> token.
                                            Our team will reach out within <strong style={{ color: '#F0EBE0' }}>24 hours</strong> to kick things off.
                                        </p>
                                    </div>

                                    {paymentId && (
                                        <div style={{
                                            background: '#141414', border: '1px solid #1E1E1E', borderRadius: '10px',
                                            padding: '10px 16px', width: '100%', textAlign: 'left',
                                        }}>
                                            <p style={{ color: '#555', fontSize: '11px', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment ID</p>
                                            <p style={{ color: '#A89F8C', fontSize: '13px', fontWeight: 600, margin: 0, wordBreak: 'break-all' }}>{paymentId}</p>
                                        </div>
                                    )}

                                    {/* Remaining due note */}
                                    <div style={{
                                        background: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.2)',
                                        borderRadius: '12px', padding: '14px 18px', width: '100%', textAlign: 'left',
                                    }}>
                                        <p style={{ color: '#D4A853', fontWeight: 700, fontSize: '13px', margin: '0 0 4px' }}>Remaining balance</p>
                                        <p style={{ color: '#8A8178', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                                            <span style={{ color: '#F0EBE0', fontWeight: 700 }}>{formatPrice(remaining)}</span> is due after we confirm the
                                            final scope with you — no surprises.
                                        </p>
                                    </div>

                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            width: '100%', padding: '13px 0', borderRadius: '999px',
                                            background: '#25D366', color: '#fff', fontWeight: 800, fontSize: '14px',
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
                                        <AlertCircle size={36} color="#E05353" strokeWidth={1.6} />
                                    </div>
                                    <div>
                                        <p style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '18px', margin: '0 0 6px' }}>Payment didn't go through</p>
                                        <p style={{ color: '#8A8178', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                                            No money was deducted. You can try again or reach us directly on WhatsApp.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setScreen('form')}
                                        style={{
                                            width: '100%', padding: '13px 0', borderRadius: '999px',
                                            background: '#D4A853', color: '#0C0C0C', fontWeight: 800, fontSize: '14px',
                                            border: 'none', cursor: 'pointer', letterSpacing: '0.3px',
                                        }}
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}

                            {/* ── LOADING SCREEN ── */}
                            {screen === 'loading' && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 0', textAlign: 'center' }}>
                                    <Loader2 size={40} color="#D4A853" style={{ animation: 'spin 1s linear infinite' }} />
                                    <p style={{ color: '#8A8178', fontSize: '14px', margin: 0 }}>Opening payment window…</p>
                                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                </div>
                            )}

                            {/* ── FORM SCREEN ── */}
                            {screen === 'form' && (
                                <>
                                    {/* Order summary */}
                                    <div style={{
                                        background: '#131313', border: '1px solid #1E1E1E',
                                        borderRadius: '14px', overflow: 'hidden',
                                    }}>
                                        <p style={{
                                            color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px',
                                            fontWeight: 700, margin: 0, padding: '12px 16px', borderBottom: '1px solid #1C1C1C',
                                        }}>Your Services</p>
                                        {items.map(item => (
                                            <div key={item.id} style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                padding: '10px 16px', borderBottom: '1px solid #191919',
                                            }}>
                                                <div>
                                                    <p style={{ color: '#F0EBE0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</p>
                                                    <p style={{ color: '#555', fontSize: '11px', margin: 0 }}>
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
                                                    <span style={{ color: '#555', fontSize: '12px' }}>One-time total</span>
                                                    <span style={{ color: '#A89F8C', fontSize: '12px', fontWeight: 600 }}>{formatPrice(onetimeTotal)}</span>
                                                </div>
                                            )}
                                            {monthlyTotal > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: '#555', fontSize: '12px' }}>Monthly total</span>
                                                    <span style={{ color: '#A89F8C', fontSize: '12px', fontWeight: 600 }}>{formatPrice(monthlyTotal)}<span style={{ opacity: 0.5, fontSize: '10px' }}>/mo</span></span>
                                                </div>
                                            )}
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                paddingTop: '8px', borderTop: '1px solid #1E1E1E', marginTop: '2px',
                                            }}>
                                                <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '14px' }}>Grand Total</span>
                                                <span style={{ color: '#D4A853', fontWeight: 900, fontSize: '16px' }}>{formatPrice(grandTotal)}</span>
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
                                            <span style={{ color: '#A89F8C', fontSize: '13px' }}>Due today <span style={{ color: '#D4A853', fontWeight: 700 }}>(10% token)</span></span>
                                            <span style={{ color: '#D4A853', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px' }}>{formatPrice(tokenAmount)}</span>
                                        </div>
                                        <p style={{ color: '#555', fontSize: '12px', margin: 0, lineHeight: 1.55 }}>
                                            You pay just 10% now to confirm your booking. Remaining <span style={{ color: '#A89F8C', fontWeight: 600 }}>{formatPrice(remaining)}</span> is settled after we finalise the details with you.
                                        </p>
                                    </div>

                                    {/* Contact fields */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <p style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, margin: 0 }}>
                                            Your details
                                        </p>

                                        {/* Name */}
                                        <div>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#131313', border: `1px solid ${errors.name ? '#E05353' : '#222'}`,
                                                borderRadius: '12px', padding: '10px 14px',
                                                transition: 'border-color 0.2s',
                                            }}
                                                onFocus={() => setErrors(p => ({ ...p, name: undefined }))}
                                            >
                                                <User size={15} color="#555" strokeWidth={2} />
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    style={{
                                                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                        color: '#F0EBE0', fontSize: '14px',
                                                    }}
                                                />
                                            </div>
                                            {errors.name && <p style={{ color: '#E05353', fontSize: '11px', margin: '4px 4px 0' }}>{errors.name}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                background: '#131313', border: `1px solid ${errors.phone ? '#E05353' : '#222'}`,
                                                borderRadius: '12px', padding: '10px 14px',
                                                transition: 'border-color 0.2s',
                                            }}>
                                                <Phone size={15} color="#555" strokeWidth={2} />
                                                <input
                                                    type="tel"
                                                    placeholder="10-digit mobile number"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    style={{
                                                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                        color: '#F0EBE0', fontSize: '14px',
                                                    }}
                                                />
                                            </div>
                                            {errors.phone && <p style={{ color: '#E05353', fontSize: '11px', margin: '4px 4px 0' }}>{errors.phone}</p>}
                                        </div>

                                        {/* Email — optional */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            background: '#131313', border: '1px solid #222',
                                            borderRadius: '12px', padding: '10px 14px',
                                        }}>
                                            <Mail size={15} color="#555" strokeWidth={2} />
                                            <input
                                                type="email"
                                                placeholder="Email (optional)"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                style={{
                                                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                                    color: '#F0EBE0', fontSize: '14px',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Pay button */}
                                    <button
                                        onClick={handlePay}
                                        style={{
                                            width: '100%', padding: '14px 0', borderRadius: '999px',
                                            background: '#D4A853', color: '#0C0C0C', fontWeight: 800, fontSize: '15px',
                                            border: 'none', cursor: 'pointer', letterSpacing: '0.3px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E5BA6A'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#D4A853'; }}
                                    >
                                        Pay {formatPrice(tokenAmount)} now <ArrowRight size={16} />
                                    </button>

                                    <p style={{ color: '#444', fontSize: '11.5px', textAlign: 'center', margin: '-8px 0 0', lineHeight: 1.6 }}>
                                        🔒 Secured by Razorpay · UPI, Cards, Net Banking accepted
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
