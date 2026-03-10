'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, Phone, Mail, User, ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useCart, formatPrice } from '@/context/CartContext';
import axios from 'axios';
import apiClient from '@/lib/api/api-client';

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
    selectedPercent: number; // 25, 50, or 100
}

type ScreenState = 'form' | 'loading' | 'success' | 'failure';

// ─── Component ────────────────────────────────────────────────────────────────
export default function CheckoutModal({ open, onClose, selectedPercent }: CheckoutModalProps) {
    const { items, monthlyTotal, onetimeTotal, clearCart } = useCart();

    const grandTotal = monthlyTotal + onetimeTotal;

    // Calculate token amount based on selection
    const baseSelectedAmount = Math.round(grandTotal * (selectedPercent / 100));
    const gstAmount = Math.round(baseSelectedAmount * 0.18);
    const tokenAmount = baseSelectedAmount + gstAmount;

    const remaining = grandTotal - baseSelectedAmount;

    const [screen, setScreen] = useState<ScreenState>('form');
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [successData, setSuccessData] = useState<{
        paidAmount: number;
        percent: number;
        remaining: number;
    } | null>(null);

    const handlePay = useCallback(async () => {
        if (!acceptedTerms) {
            alert('Please accept the Terms & Conditions to proceed.');
            return;
        }
        setScreen('loading');

        try {
            const loaded = await loadRazorpayScript();
            if (!loaded) { setScreen('failure'); return; }

            let key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            // If key is missing in frontend env, try fetching from backend
            if (!key) {
                try {
                    const keyRes = await apiClient.get('/payment/key-id');
                    key = keyRes.data.keyId;
                } catch (err) {
                    console.error("Failed to fetch Razorpay Key ID from backend:", err);
                }
            }

            if (!key) {
                console.error("Razorpay Key ID missing");
                setScreen('failure');
                return;
            }

            // 1. Create order on the backend
            const orderRes = await apiClient.post('/payment/orders', {
                amount: tokenAmount,
                currency: 'INR',
                receipt: `receipt_${Date.now()}`
            });

            const orderData = orderRes.data;
            const description = items.map(i => `${i.title} (×${i.qty})`).join(', ');

            // 2. Open Razorpay Checkout
            const rzp = new window.Razorpay({
                key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Sirf Local',
                description: `${selectedPercent}% booking token + 18% GST — ${description}`,
                order_id: orderData.id,
                theme: { color: '#780FF0' },
                modal: { ondismiss: () => setScreen('form') },
                handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
                    try {
                        setScreen('loading');
                        // 3. Verify payment on the backend
                        const verifyRes = await apiClient.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.status === 200) {
                            // Capture data for success screen before clearing cart
                            setSuccessData({
                                paidAmount: tokenAmount,
                                percent: selectedPercent,
                                remaining: remaining
                            });
                            setPaymentId(response.razorpay_payment_id);
                            setScreen('success');
                            clearCart();
                        } else {
                            setScreen('failure');
                        }
                    } catch (err) {
                        console.error("Verification failed:", err);
                        setScreen('failure');
                    }
                },
            });

            rzp.on('payment.failed', () => setScreen('failure'));
            rzp.open();
        } catch (error) {
            console.error("Payment initialization failed:", error);
            setScreen('failure');
        }
    }, [tokenAmount, items, selectedPercent, clearCart, remaining, acceptedTerms]);

    const handleClose = () => {
        setScreen('form');
        setAcceptedTerms(false);
        setPaymentId(null); // Clear payment ID on close
        setSuccessData(null); // Clear success data on close
        onClose();
    };

    const whatsappText = encodeURIComponent(
        `Hi Sirf Local! I just paid ${formatPrice(successData?.paidAmount ?? tokenAmount)} as a token (ID: ${paymentId}). Here are my services:\n`
        + items.map(i => `• ${i.title} (×${i.qty})`).join('\n')
        + `\nTotal: ${formatPrice(grandTotal)}\nRemaining: ${formatPrice(successData?.remaining ?? remaining)}`
    );
    const whatsappUrl = `https://wa.me/919093277919?text=${whatsappText}`; // replace number

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
                                background: '#0E0E0E',
                                border: '1px solid #222',
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
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#780FF0'; (e.currentTarget as HTMLElement).style.color = '#780FF0'; }}
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
                                                We've received your <span style={{ color: '#780FF0', fontWeight: 700 }}>{formatPrice(successData?.paidAmount ?? 0)}</span> payment ({successData?.percent ?? selectedPercent}% + GST).
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
                                            <p style={{ color: '#780FF0', fontWeight: 700, fontSize: '13px', margin: '0 0 4px' }}>Remaining balance</p>
                                            <p style={{ color: '#8A8178', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                                                <span style={{ color: '#F0EBE0', fontWeight: 700 }}>{formatPrice(successData?.remaining ?? 0)}</span> is due after we confirm the
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
                                                background: '#780FF0', color: '#0C0C0C', fontWeight: 800, fontSize: '14px',
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
                                        <Loader2 size={40} color="#780FF0" style={{ animation: 'spin 1s linear infinite' }} />
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
                                                    <span style={{ color: '#780FF0', fontWeight: 900, fontSize: '16px' }}>{formatPrice(grandTotal)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dynamic token callout */}
                                        <div style={{
                                            background: 'rgba(120,15,240,0.05)', border: '1px solid rgba(120,15,240,0.2)',
                                            borderRadius: '14px', padding: '16px 18px',
                                            display: 'flex', flexDirection: 'column', gap: '8px',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ color: '#A89F8C', fontSize: '13px' }}>Base ({selectedPercent}%)</span>
                                                <span style={{ color: '#F5F0E8', fontWeight: 600, fontSize: '14px' }}>{formatPrice(baseSelectedAmount)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ color: '#A89F8C', fontSize: '13px' }}>GST (18%)</span>
                                                <span style={{ color: '#F5F0E8', fontWeight: 600, fontSize: '14px' }}>{formatPrice(gstAmount)}</span>
                                            </div>
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                                                marginTop: '4px', paddingTop: '8px', borderTop: '1px solid rgba(120,15,240,0.1)'
                                            }}>
                                                <span style={{ color: '#F5F0E8', fontWeight: 800, fontSize: '14px' }}>Due Today</span>
                                                <span style={{ color: '#780FF0', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px' }}>{formatPrice(tokenAmount)}</span>
                                            </div>
                                            <p style={{ color: '#555', fontSize: '12px', margin: '4px 0 0', lineHeight: 1.55 }}>
                                                You pay {selectedPercent}% now plus GST. Remaining <span style={{ color: '#A89F8C', fontWeight: 600 }}>{formatPrice(remaining)}</span> is settled after final confirmation.
                                            </p>
                                        </div>

                                        {/* Terms & Conditions */}
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '4px 2px' }}>
                                            <div
                                                onClick={() => setAcceptedTerms(!acceptedTerms)}
                                                style={{
                                                    width: '18px', height: '18px', borderRadius: '4px', border: `1.5px solid ${acceptedTerms ? '#780FF0' : '#333'}`,
                                                    background: acceptedTerms ? '#780FF0' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', flexShrink: 0, marginTop: '2px', transition: 'all 0.2s'
                                                }}
                                            >
                                                {acceptedTerms && <CheckCircle2 size={12} color="#000" strokeWidth={3} />}
                                            </div>
                                            <label style={{ color: '#8A8178', fontSize: '12px', lineHeight: 1.5, cursor: 'pointer', userSelect: 'none' }} onClick={() => setAcceptedTerms(!acceptedTerms)}>
                                                I agree to the <span style={{ color: '#780FF0', fontWeight: 600 }}>Terms & Conditions</span> and understand that this booking token is non-refundable.
                                            </label>
                                        </div>

                                        {/* Pay button */}
                                        <button
                                            onClick={handlePay}
                                            disabled={!acceptedTerms}
                                            style={{
                                                width: '100%', padding: '14px 0', borderRadius: '999px',
                                                background: acceptedTerms ? '#780FF0' : '#1A1A1A',
                                                color: acceptedTerms ? '#0C0C0C' : '#444',
                                                fontWeight: 800, fontSize: '15px',
                                                border: 'none', cursor: acceptedTerms ? 'pointer' : 'not-allowed', letterSpacing: '0.3px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                transition: 'all 0.2s',
                                                opacity: acceptedTerms ? 1 : 0.6
                                            }}
                                            onMouseEnter={e => { if (acceptedTerms) (e.currentTarget as HTMLElement).style.background = '#E5BA6A'; }}
                                            onMouseLeave={e => { if (acceptedTerms) (e.currentTarget as HTMLElement).style.background = '#780FF0'; }}
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
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
