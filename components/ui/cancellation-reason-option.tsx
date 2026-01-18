'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CancellationReasonOptionProps {
    id: string;
    label: string;
    selected: boolean;
    onSelect: () => void;
    showCustomInput?: boolean;
    customValue?: string;
    onCustomChange?: (value: string) => void;
}

export function CancellationReasonOption({
    id,
    label,
    selected,
    onSelect,
    showCustomInput = false,
    customValue = '',
    onCustomChange,
}: CancellationReasonOptionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <button
                type="button"
                onClick={onSelect}
                className={cn(
                    'w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300',
                    'hover:border-primary-400 hover:bg-primary-50/30',
                    selected
                        ? 'border-primary-600 bg-primary-50 shadow-sm'
                        : 'border-gray-200 bg-white'
                )}
            >
                <div className="flex items-center gap-3">
                    {/* Custom Radio Button */}
                    <div className="flex-shrink-0 relative w-5 h-5">
                        <div
                            className={cn(
                                'w-5 h-5 rounded-full border-2 transition-all duration-300',
                                selected
                                    ? 'border-primary-600 bg-white'
                                    : 'border-gray-300 bg-white'
                            )}
                        >
                            <AnimatePresence>
                                {selected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 25,
                                        }}
                                        className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary-600"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Label */}
                    <span
                        className={cn(
                            'text-base transition-colors duration-300',
                            selected ? 'text-gray-900 font-medium' : 'text-gray-700'
                        )}
                    >
                        {label}
                    </span>
                </div>
            </button>

            {/* Custom Textarea for "Other" option */}
            <AnimatePresence>
                {showCustomInput && selected && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 px-1">
                            <textarea
                                value={customValue}
                                onChange={(e) => onCustomChange?.(e.target.value)}
                                placeholder="Please specify your reason..."
                                rows={3}
                                className={cn(
                                    'w-full px-4 py-3 rounded-xl border-2 border-gray-200',
                                    'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
                                    'text-gray-900 placeholder:text-gray-400',
                                    'transition-all duration-200 resize-none'
                                )}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
