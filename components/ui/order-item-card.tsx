'use client';

import { motion } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';

interface OrderItemCardProps {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    icon?: string;
    imageUrl?: string;
}

export function OrderItemCard({
    productName,
    quantity,
    unitPrice,
    totalPrice,
    icon,
    imageUrl,
}: OrderItemCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                'bg-white rounded-2xl p-4 shadow-sm',
                'flex items-center gap-4'
            )}
        >
            {/* Icon or Image */}
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg text-2xl">
                {imageUrl ? (
                    <img src={imageUrl} alt={productName} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <span>{icon || '📦'}</span>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base truncate">
                    {productName}
                </h3>
                <p className="text-gray-500 text-sm">Qty: {quantity}</p>
            </div>

            {/* Prices */}
            <div className="flex flex-col items-end gap-0.5">
                {quantity > 1 && (
                    <span className="text-gray-400 text-sm line-through">
                        {formatCurrency(unitPrice)}
                    </span>
                )}
                <span className="font-bold text-gray-900 text-lg">
                    {formatCurrency(totalPrice)}
                </span>
            </div>
        </motion.div>
    );
}
