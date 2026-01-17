'use client';

import { motion, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { DeliveryAddressInline } from './delivery-address-inline';
import type { BillSummary as BillSummaryType, PaymentMethod } from '@/types/order';

interface BillSummaryProps extends BillSummaryType {
    paymentMethod: PaymentMethod;
    deliveryAddress: string;
    onChangeAddress: () => void;
    onEditAddress: () => void;
}

export function BillSummary({
    itemsTotal,
    shippingFee,
    taxes,
    discount,
    totalPayable,
    paymentMethod,
    deliveryAddress,
    onChangeAddress,
    onEditAddress,
}: BillSummaryProps) {
    // Number counting animation for total using useState
    const [displayTotal, setDisplayTotal] = useState(0);

    useEffect(() => {
        const controls = animate(0, totalPayable, {
            duration: 0.8,
            onUpdate: (value) => setDisplayTotal(Math.round(value)),
        });
        return () => controls.stop();
    }, [totalPayable]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={cn('bg-white rounded-2xl p-5 shadow-sm')}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-900">Bill Summary</h2>
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{paymentMethod}</span>
                </div>
            </div>

            {/* Bill Rows */}
            <div className="space-y-2 mb-3">
                <BillRow label="Subtotal (Items Total)" value={itemsTotal} />
                <BillRow label="Shipping Fee" value={shippingFee} />
                <BillRow label="Taxes" value={taxes} />
                <BillRow label="Discount" value={discount} isDiscount />
            </div>

            {/* Total Payable */}
            <div className="bg-primary-50 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">Total Payable</span>
                    <span className="font-bold text-gray-900 text-2xl">
                        {formatCurrency(displayTotal)}
                    </span>
                </div>
            </div>

            {/* Delivery Address */}
            <DeliveryAddressInline
                address={deliveryAddress}
                onChangeClick={onChangeAddress}
                onEditClick={onEditAddress}
            />
        </motion.div>
    );
}

function BillRow({
    label,
    value,
    isDiscount = false,
}: {
    label: string;
    value: number;
    isDiscount?: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <span
                className={cn(
                    'text-sm',
                    isDiscount ? 'text-primary-600 font-semibold' : 'text-gray-600'
                )}
            >
                {label}
            </span>
            <span
                className={cn(
                    'text-sm font-medium',
                    isDiscount ? 'text-primary-600 font-bold' : 'text-gray-900'
                )}
            >
                {isDiscount ? '- ' : ''}
                {formatCurrency(value)}
            </span>
        </div>
    );
}
