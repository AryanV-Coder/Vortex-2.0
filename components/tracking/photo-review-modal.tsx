'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PhotoReviewModalProps {
    isOpen: boolean;
    photoUrl: string;
    timeRemaining: number;
    onAccept: () => void;
    onReject: () => void;
}

export function PhotoReviewModal({
    isOpen,
    photoUrl,
    timeRemaining,
    onAccept,
    onReject,
}: PhotoReviewModalProps) {
    const isUrgent = timeRemaining < 5;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onReject}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className={cn(
                            'relative bg-white rounded-2xl',
                            'max-w-md w-full p-6',
                            'shadow-2xl'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                Review Packer Photo
                            </h2>

                            {/* Timer Badge */}
                            <motion.div
                                animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
                                transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
                                className={cn(
                                    'flex items-center gap-1.5 px-3 py-1 rounded-full',
                                    isUrgent
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-teal-100 text-teal-700'
                                )}
                            >
                                <Clock className="w-4 h-4" />
                                <span className="font-bold text-sm">{timeRemaining}s</span>
                            </motion.div>
                        </div>

                        {/* Photo */}
                        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                            <Image
                                src={photoUrl}
                                alt="Packer photo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Helper Text */}
                        <p className="text-sm text-gray-600 text-center mb-6">
                            Please review the photo. If the product looks incorrect, reject the order.
                        </p>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onReject}
                                className={cn(
                                    'bg-red-500 text-white',
                                    'rounded-full px-6 py-3',
                                    'font-semibold',
                                    'hover:bg-red-600 transition-colors',
                                    'flex items-center justify-center gap-2'
                                )}
                            >
                                <X className="w-5 h-5" />
                                <span>Reject</span>
                            </button>

                            <button
                                onClick={onAccept}
                                className={cn(
                                    'bg-teal-600 text-white',
                                    'rounded-full px-6 py-3',
                                    'font-semibold',
                                    'hover:bg-teal-700 transition-colors',
                                    'flex items-center justify-center gap-2'
                                )}
                            >
                                <span>Accept</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
