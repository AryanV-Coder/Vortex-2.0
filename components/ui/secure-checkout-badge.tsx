'use client';

import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SecureCheckoutBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
                'inline-flex items-center gap-1.5',
                'bg-primary-600 text-white',
                'rounded-full px-4 py-1.5',
                'text-sm font-medium',
                'shadow-sm'
            )}
        >
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
        </motion.div>
    );
}
