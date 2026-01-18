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
        console.log('Track Refund Status clicked - navigating to refund tracking...');
        // TODO: Navigate to refund status page when implemented
        alert('Refund tracking will be available soon!');
    };

    const handleBackToOrders = () => {
        router.push('/order/123/tracking');
    };

    return (
        <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                    }}
                    className="mx-auto w-28 h-28 md:w-32 md:h-32 bg-primary-100 rounded-full flex items-center justify-center mb-6"
                    role="img"
                    aria-label="Success"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                            delay: 0.5,
                        }}
                    >
                        <Check className="w-14 h-14 md:w-16 md:h-16 text-primary-600" strokeWidth={3} />
                    </motion.div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-3xl font-bold text-gray-900 mb-3"
                >
                    Cancellation Confirmed
                </motion.h1>

                {/* Order ID */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-lg text-gray-600 mb-4"
                >
                    Order #{orderId}
                </motion.p>

                {/* Refund Method */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-base font-medium text-gray-900 mb-2"
                >
                    Refund Method: {refundMethod}
                </motion.p>

                {/* Refund Details */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-base text-gray-600 leading-relaxed mb-8 px-4"
                >
                    Your refund of <span className="font-semibold text-gray-900">{formatCurrency(refundAmount)}</span> will be processed within{' '}
                    <span className="font-medium">5-7 business days</span>.
                </motion.p>

                {/* Primary Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTrackRefund}
                    className={cn(
                        'w-full py-4 px-8 rounded-full font-bold text-lg',
                        'bg-gradient-to-r from-primary-600 to-primary-500',
                        'text-white shadow-lg hover:shadow-xl',
                        'transition-shadow duration-300',
                        'mb-4'
                    )}
                >
                    Track Refund Status
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackToOrders}
                    className={cn(
                        'w-full py-4 px-8 rounded-full font-bold text-lg',
                        'bg-white border-2 border-gray-300',
                        'text-gray-700 hover:bg-gray-50',
                        'transition-colors duration-300'
                    )}
                >
                    Back to Order Details
                </motion.button>
            </motion.div>
        </div>
    );
}
