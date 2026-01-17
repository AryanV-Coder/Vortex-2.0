'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SupportLinkProps {
    href?: string;
}

export function SupportLink({ href = '#support' }: SupportLinkProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center py-4"
        >
            <a
                href={href}
                className={cn(
                    'text-sm text-gray-500 hover:text-teal-600',
                    'transition-colors duration-200',
                    'hover:underline'
                )}
            >
                Need help? Contact Support
            </a>
        </motion.div>
    );
}
