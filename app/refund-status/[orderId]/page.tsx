'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Banknote, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TimelineStage {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
    timestamp?: Date;
    icon: React.ComponentType<{ className?: string }>;
}

export default function RefundStatusPage() {
    const router = useRouter();
    const params = useParams();
    const orderId = (params?.orderId as string) || 'AMZ-932140';

    // Mock data
    const refundAmount = 44322;
    const estimatedDate = new Date('2026-01-25');

    const [activeStageIndex, setActiveStageIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Start simulation
        const timer1 = setTimeout(() => setActiveStageIndex(1), 1500); // Switch to Processing after 1.5s
        const timer2 = setTimeout(() => {
            setActiveStageIndex(2); // Switch to Delivered after 3.5s
        }, 3500);
        const timer3 = setTimeout(() => {
            setIsCompleted(true); // Mark all done after 5s
        }, 5000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const getStageStatus = (index: number) => {
        if (index < activeStageIndex) return 'completed';
        if (index === activeStageIndex) return isCompleted ? 'completed' : 'active';
        return 'pending';
    };

    const stages: TimelineStage[] = [
        {
            id: 'initiated',
            title: 'Refund Initiated',
            description: "Your cancellation has been confirmed. We've started processing your refund.",
            status: getStageStatus(0),
            timestamp: new Date('2026-01-18T05:30:00'),
            icon: Check,
        },
        {
            id: 'processing',
            title: 'Bank Processing',
            description:
                'Your refund is being processed by your bank. This typically takes 3-5 business days.',
            status: getStageStatus(1),
            timestamp: activeStageIndex >= 1 ? new Date() : undefined,
            icon: Clock,
        },
        {
            id: 'delivered',
            title: 'Money Delivered to Your Account',
            description:
                'Once processing is complete, the money will appear in your bank account.',
            status: getStageStatus(2),
            timestamp: isCompleted ? new Date() : undefined,
            icon: Banknote,
        },
    ];

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-2xl mx-auto"
            >
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/cancellation-confirmed')}
                    className="flex items-center gap-2 text-teal-700 hover:text-teal-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Tracking</h1>
                    <p className="text-sm text-gray-600 mb-1">Order #{orderId}</p>
                    <p className="text-2xl font-bold text-teal-600">
                        Amount: {formatCurrency(refundAmount)}
                    </p>
                </motion.div>

                {/* Timeline Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6"
                >
                    {stages.map((stage, index) => (
                        <div key={stage.id} className="relative">
                            {/* Timeline Item */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                                className="flex gap-6"
                            >
                                {/* Icon Circle */}
                                <div className="relative flex flex-col items-center">
                                    <motion.div
                                        className={cn(
                                            'w-14 h-14 rounded-full flex items-center justify-center relative z-10',
                                            stage.status === 'completed' &&
                                            'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg',
                                            stage.status === 'active' &&
                                            'bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg',
                                            stage.status === 'pending' && 'bg-gray-200'
                                        )}
                                        animate={
                                            stage.status === 'active'
                                                ? {
                                                    boxShadow: [
                                                        '0 0 0 0 rgba(13, 148, 136, 0.4)',
                                                        '0 0 0 20px rgba(13, 148, 136, 0)',
                                                    ],
                                                }
                                                : {}
                                        }
                                        transition={
                                            stage.status === 'active'
                                                ? {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeOut',
                                                }
                                                : {}
                                        }
                                    >
                                        {stage.status === 'completed' ? (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{
                                                    delay: 0.5 + index * 0.15,
                                                    type: 'spring',
                                                    stiffness: 200,
                                                    damping: 12,
                                                }}
                                            >
                                                <Check className="w-7 h-7 text-white" strokeWidth={3} />
                                            </motion.div>
                                        ) : (
                                            <stage.icon
                                                className={cn(
                                                    'w-7 h-7',
                                                    stage.status === 'active'
                                                        ? 'text-white'
                                                        : 'text-gray-400'
                                                )}
                                            />
                                        )}
                                    </motion.div>

                                    {/* Connector Line */}
                                    {index < stages.length - 1 && (
                                        <div className="absolute top-14 h-16 flex items-center">
                                            {stage.status === 'completed' ? (
                                                <motion.div
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{
                                                        delay: 0.3 + index * 0.15,
                                                        duration: 0.5,
                                                    }}
                                                    className="w-0.5 h-16 bg-teal-500"
                                                    style={{ transformOrigin: 'top' }}
                                                />
                                            ) : (
                                                <div className="w-0.5 h-16 border-l-2 border-dashed border-gray-300" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 transition-shadow hover:shadow-md"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {stage.title}
                                        {stage.status === 'completed' && (
                                            <span className="ml-2 text-emerald-500">✓</span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                        {stage.description}
                                    </p>
                                    {stage.timestamp && (
                                        <p className="text-xs text-gray-500">
                                            {formatDateTime(stage.timestamp)}
                                        </p>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Estimated Completion */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mb-6"
                >
                    <p className="text-sm text-gray-600 mb-1">{isCompleted ? 'Status' : 'Expected completion'}</p>
                    <p className="text-lg font-semibold text-teal-600">
                        {isCompleted ? 'Refund Processed' : formatDate(estimatedDate)}
                    </p>
                </motion.div>

                {/* Support Button */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert('Support chat will open here')}
                    className="w-full py-4 rounded-full border-2 border-teal-200 text-teal-700 font-semibold hover:bg-teal-50 transition-colors"
                >
                    Need Help? Contact Support
                </motion.button>
            </motion.div>
        </div>
    );
}
