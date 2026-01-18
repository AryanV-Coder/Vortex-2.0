'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CancellationReasonOption } from '@/components/ui/cancellation-reason-option';
import { CANCELLATION_REASONS } from '@/types/cancellation';
import { cn, formatCurrency } from '@/lib/utils';

export default function CancelOrderPage() {
    const router = useRouter();
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [customReason, setCustomReason] = useState('');

    // Mock order data (replace with actual data from props/state)
    const orderData = {
        orderId: 'AMZ-932140',
        status: 'Confirmed',
        totalAmount: 44322,
        product: {
            name: 'Noise-Canceling Earbuds',
            quantity: 1,
            price: 7999,
            image: '/placeholder-product.png', // Replace with actual image
            isPrime: true,
        },
        deliveryAddress: '123, Tech Park, Sonipat, Haryana, 131001',
    };

    const handleSubmit = () => {
        if (!selectedReason) return;

        const cancellationRequest = {
            orderId: orderData.orderId,
            reason: selectedReason,
            customReason: selectedReason === 'other' ? customReason : undefined,
            timestamp: new Date(),
        };

        console.log('Cancellation Request:', cancellationRequest);

        // Navigate to confirmation screen with order data
        router.push(
            `/cancellation-confirmed?orderId=${orderData.orderId}&amount=${orderData.totalAmount}`
        );
    };

    const isSubmitDisabled =
        !selectedReason || (selectedReason === 'other' && customReason.trim() === '');

    return (
        <div className="min-h-screen bg-[#F5E6D3] py-6 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Order Cancellation</h1>
                </motion.div>

                {/* Order Status */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-primary-50 rounded-2xl p-4 mb-4 border-2 border-primary-200"
                >
                    <div className="flex items-center gap-3">
                        <span className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            {orderData.status}
                        </span>
                        <span className="text-gray-700 font-medium">
                            Order #{orderData.orderId}
                        </span>
                    </div>
                </motion.div>

                {/* Total Amount */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
                >
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(orderData.totalAmount)}
                    </p>
                </motion.div>

                {/* Product Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <div className="text-4xl">🎧</div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                {orderData.product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Qty: {orderData.product.quantity} •{' '}
                                {formatCurrency(orderData.product.price)}
                            </p>
                        </div>
                        {orderData.product.isPrime && (
                            <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                Prime
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Delivery Address */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="bg-primary-50 rounded-2xl p-5 mb-6 border border-primary-200"
                >
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Delivery Address
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {orderData.deliveryAddress}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Cancellation Reasons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Select Cancellation Reason
                    </h2>

                    <div className="space-y-3 mb-6">
                        {CANCELLATION_REASONS.map((reason, index) => (
                            <motion.div
                                key={reason.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                            >
                                <CancellationReasonOption
                                    id={reason.id}
                                    label={reason.label}
                                    selected={selectedReason === reason.id}
                                    onSelect={() => setSelectedReason(reason.id)}
                                    showCustomInput={reason.requiresCustomInput}
                                    customValue={customReason}
                                    onCustomChange={setCustomReason}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className={cn(
                        'w-full py-4 rounded-full font-bold text-lg transition-all duration-300',
                        'shadow-lg hover:shadow-xl',
                        isSubmitDisabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600'
                    )}
                >
                    Submit Cancellation Request
                </motion.button>
            </div>
        </div>
    );
}
