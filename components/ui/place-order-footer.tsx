'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface PlaceOrderFooterProps {
    totalPayable: number;
    onPlaceOrderClick: () => void;
    isLoading: boolean;
}

export function PlaceOrderFooter({
    totalPayable,
    onPlaceOrderClick,
    isLoading,
}: PlaceOrderFooterProps) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={cn(
                'fixed bottom-0 left-0 right-0 md:static',
                'bg-white border-t border-gray-200',
                'p-4',
                'z-20'
            )}
        >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                {/* Total Payable */}
                <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Total Payable</span>
                    <span className="font-bold text-gray-900 text-2xl">
                        {formatCurrency(totalPayable)}
                    </span>
                </div>

                {/* Place Order Button */}
                <motion.button
                    onClick={onPlaceOrderClick}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                    className={cn(
                        'bg-gradient-to-r from-teal-600 to-teal-500',
                        'text-white font-bold text-lg',
                        'rounded-2xl px-8 py-4',
                        'shadow-lg hover:shadow-xl',
                        'transition-shadow duration-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'flex items-center gap-2'
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>Place Order</span>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}
