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
            // 1. Create order on the backend
            const orderResponse = await paymentService.createOrder({ amount: 100 }); // Amount in INR

            if (orderResponse && orderResponse.id) {
                const { id: order_id, amount, currency } = orderResponse;

                // 2. Configure Razorpay options
                const options: RazorpayOptions = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                    amount: amount,
                    currency: currency,
                    name: 'Sirf Local',
                    description: 'Payment Integration Test',
                    order_id: order_id,
                    handler: async function (response: any) {
                        // 3. Verify payment on the backend
                        try {
                            const verifyResponse = await paymentService.verifyPayment({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            });

                            if (verifyResponse.success) {
                                setPaymentStatus('success');
                            } else {
                                setPaymentStatus('error');
                            }
                        } catch (error) {
                            console.error('Payment verification failed:', error);
                            setPaymentStatus('error');
                        }
                    },
                    prefill: {
                        name: 'Test User',
                        email: 'test@example.com',
                        contact: '9999999999',
                    },
                    notes: {
                        address: 'Mirik, Darjeeling',
                    },
                    theme: {
                        color: '#780FF0',
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                setPaymentStatus('error');
            }
        } catch (error) {
            console.error('Payment creation failed:', error);
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 border border-[#333] rounded-2xl bg-[#1A1A1A] max-w-md mx-auto my-10">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Integration</h2>
            <p className="text-gray-400 mb-6 text-sm">
                This is a demo of the Razorpay payment integration.
            </p>

            {paymentStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-400 text-sm">
                    Payment Successful! Thank you for your order.
                </div>
            )}

            {paymentStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm">
                    Payment Failed. Please try again.
                </div>
            )}

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-4 px-6 bg-[#780FF0] hover:bg-[#8E3AEE] disabled:bg-gray-700 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                    </>
                ) : (
                    'Test Pay ₹100'
                )}
            </button>
        </div>
    );
}
