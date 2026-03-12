'use client';

import React, { useState } from 'react';
import { paymentService } from '@/services/payment.service';

// Interface for Razorpay window object
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes: {
        address: string;
    };
    theme: {
        color: string;
    };
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentIntegrationDemo() {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handlePayment = async () => {
        setLoading(true);
        setPaymentStatus('idle');

        try {
            // Step 1: Create Order on Backend
            const order = await paymentService.createOrder({
                amount: 10000, // INR 500
                currency: 'INR',
                receipt: 'receipt_demo_' + Date.now(),
            });

            console.log('Order created:', order);

            // Step 2: Configure Razorpay Checkout
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SPXwwqnMfW4j1u',
                amount: order.amount,
                currency: order.currency,
                name: 'Sirf Local',
                description: 'Test Transaction',
                order_id: order.id,
                handler: async (response: any) => {
                    // Step 3: Verify Payment on Backend
                    try {
                        const verification = await paymentService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        console.log('Payment verified:', verification);
                        setPaymentStatus('success');
                        alert('🎉 Payment successful and verified!');
                    } catch (error) {
                        console.error('Verification failed:', error);
                        setPaymentStatus('error');
                        alert('❌ Payment verification failed.');
                    }
                },
                prefill: {
                    name: 'Sirf User',
                    email: 'user@sirflocal.in',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Sirf Local Corporate Office',
                },
                theme: {
                    color: 'var(--razorpay)',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert(`Payment failed: ${response.error.description}`);
                setPaymentStatus('error');
            });

            // Step 4: Open Checkout Modal
            rzp.open();

        } catch (error: any) {
            alert('Error initiating payment: ' + error.message);
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Razorpay Checkout Test</h2>
            <p className="text-gray-400 mb-6">Experience the full end-to-end payment flow from order to verification.</p>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
                {loading ? 'Opening Checkout...' : 'Pay ₹10,000 Now'}
            </button>

            {paymentStatus === 'success' && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm font-medium text-green-400">✅ Payment Completed Successfully!</p>
                </div>
            )}

            {paymentStatus === 'error' && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm font-medium text-red-400">❌ Payment failed or cancelled.</p>
                </div>
            )}
        </div>
    );
}
