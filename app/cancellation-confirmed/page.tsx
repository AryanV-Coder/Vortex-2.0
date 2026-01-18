'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function CancellationConfirmedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get data from URL params or use mock data
    const orderId = searchParams.get('orderId') || 'AMZ-932140';
    const refundAmount = parseInt(searchParams.get('amount') || '44322');
    const refundMethod = 'Bank Account';

    const handleTrackRefund = () => {
        router.push(`/refund-status/${orderId}`);
    };

    const handlePlaceAnotherOrder = () => {
        router.push('/place-order');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full max-w-md relative"
            >
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    {/* Animated Check Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                        }}
                        className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.3,
                                type: 'spring',
                                stiffness: 300,
                            }}
                        >
                            <Check className="w-14 h-14 text-white stroke-[3]" />
                        </motion.div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Cancellation Confirmed
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mb-4">
                            Order ID: <span className="text-emerald-600">{orderId}</span>
                        </p>
                        <p className="text-base font-medium text-gray-900 mb-2">
                            Refund Method: {refundMethod}
                        </p>
                        <p className="text-base text-gray-600 leading-relaxed px-4">
                            Your refund of <span className="font-semibold text-gray-900">{formatCurrency(refundAmount)}</span> will be processed within{' '}
                            <span className="font-medium">5-7 business days</span>.
                        </p>
                    </motion.div>

                    {/* Decorative Bouncing Dots */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="mt-8 flex justify-center gap-2"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0 }}
                                animate={{ y: [-5, 0, -5] }}
                                transition={{
                                    delay: 0.8 + i * 0.1,
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-2 h-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full"
                            />
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="mt-8 space-y-3"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleTrackRefund}
                            className={cn(
                                'w-full py-4 px-8 rounded-full font-bold text-lg',
                                'bg-gradient-to-r from-emerald-600 to-emerald-500',
                                'text-white shadow-lg hover:shadow-xl',
                                'transition-shadow duration-300'
                            )}
                        >
                            Track Refund Status
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePlaceAnotherOrder}
                            className={cn(
                                'w-full py-4 px-8 rounded-full font-bold text-lg',
                                'bg-white border-2 border-gray-300',
                                'text-gray-700 hover:bg-gray-50',
                                'transition-colors duration-300'
                            )}
                        >
                            Place Another Order
                        </motion.button>
                    </motion.div>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5],
                            x: Math.cos((i * Math.PI * 2) / 8) * 150,
                            y: Math.sin((i * Math.PI * 2) / 8) * 150,
                        }}
                        transition={{
                            delay: 0.8,
                            duration: 1.5,
                            ease: 'easeOut',
                        }}
                        className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                        style={{
                            left: '50%',
                            top: '40%',
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
