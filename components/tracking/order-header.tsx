'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Repeat2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderHeaderProps {
    productName: string;
    quantity: number;
    orderId: string;
    icon?: string;
    isReturnable?: boolean;
    isExchangeable?: boolean;
}

export function OrderHeader({
    productName,
    quantity,
    orderId,
    icon = '📦',
    isReturnable = false,
    isExchangeable = false,
}: OrderHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
                'bg-white rounded-2xl p-6 shadow-sm',
                'flex items-center gap-4'
            )}
        >
            {/* Product Icon */}
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-teal-50 rounded-xl text-2xl">
                {icon}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900">
                    {productName} × {quantity}
                </h2>
                <p className="text-sm text-gray-600 font-mono mt-1">
                    Order ID: #{orderId}
                </p>
            </div>

            {/* Badges */}
            <div className="flex flex-col gap-2">
                {isReturnable && (
                    <div className={cn(
                        'flex items-center gap-1.5',
                        'bg-green-100 text-green-700',
                        'rounded-full px-3 py-1',
                        'text-xs font-semibold'
                    )}>
                        <BadgeCheck className="w-3 h-3" />
                        <span>Returnable</span>
                    </div>
                )}
                {isExchangeable && (
                    <div className={cn(
                        'flex items-center gap-1.5',
                        'bg-blue-100 text-blue-700',
                        'rounded-full px-3 py-1',
                        'text-xs font-semibold'
                    )}>
                        <Repeat2 className="w-3 h-3" />
                        <span>Exchangeable</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
