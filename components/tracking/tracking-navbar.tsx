'use client';

import { motion } from 'framer-motion';
import { X, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackingNavbarProps {
    canEdit: boolean;
    canCancel: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
}

export function TrackingNavbar({
    canEdit,
    canCancel,
    onEditClick,
    onCancelClick,
}: TrackingNavbarProps) {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={cn(
                'fixed top-0 left-0 right-0',
                'bg-white border-b border-gray-200',
                'px-4 py-3 shadow-md',
                'z-50'
            )}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Cancel Button (Left) */}
                <button
                    onClick={onCancelClick}
                    disabled={!canCancel}
                    className={cn(
                        'flex items-center gap-2',
                        'bg-red-500 text-white',
                        'rounded-full px-6 py-3',
                        'font-semibold text-sm',
                        'transition-all duration-200',
                        'hover:bg-red-600 hover:scale-105',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                        !canCancel && 'grayscale'
                    )}
                    title={!canCancel ? 'Order already shipped' : 'Cancel order'}
                >
                    <X className="w-4 h-4" />
                    <span>Cancel Order</span>
                </button>

                {/* Logo/Title (Center) */}
                <h1 className="text-lg font-bold text-gray-900 hidden md:block">
                    Order Tracking
                </h1>

                {/* Edit Button (Right) */}
                <button
                    onClick={onEditClick}
                    disabled={!canEdit}
                    className={cn(
                        'flex items-center gap-2',
                        'bg-white text-primary-600',
                        'border-2 border-primary-600',
                        'rounded-full px-6 py-3',
                        'font-semibold text-sm',
                        'transition-all duration-200',
                        'hover:bg-primary-50 hover:scale-105',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                        !canEdit && 'grayscale border-gray-300 text-gray-400'
                    )}
                    title={!canEdit ? 'Order already shipped' : 'Edit order'}
                >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Order</span>
                </button>
            </div>
        </motion.nav>
    );
}
