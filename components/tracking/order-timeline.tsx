'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Truck, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SimulationStage } from '@/lib/hooks/use-order-simulation';

interface OrderTimelineProps {
    currentStage: SimulationStage;
    sellerName: string;
    estimatedArrival?: Date | null;
}

export function OrderTimeline({
    currentStage,
    sellerName,
    estimatedArrival,
}: OrderTimelineProps) {
    const steps = [
        {
            id: 'placed',
            label: 'Order Placed',
            description: `Order placed at ${sellerName}`,
            icon: CheckCircle2,
            isComplete: true,
            timestamp: 'Just now',
        },
        {
            id: 'shipped',
            label: 'Order Shipped',
            description: 'Order shipped from warehouse',
            icon: Truck,
            isComplete: currentStage === 'SHIPPED' || currentStage === 'DELIVERED',
        },
        {
            id: 'out_for_delivery',
            label: 'Out for Delivery',
            description: 'Delivery partner assigned',
            subtext: estimatedArrival
                ? `Est. arrival: ${new Date(estimatedArrival).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}`
                : undefined,
            icon: User,
            isComplete: currentStage === 'SHIPPED' || currentStage === 'DELIVERED',
        },
        {
            id: 'delivered',
            label: 'Delivered',
            description: 'Order delivered successfully',
            icon: Home,
            isComplete: currentStage === 'DELIVERED',
        },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="bg-white rounded-2xl p-6 shadow-sm"
        >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Timeline</h3>

            <div className="space-y-6">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === steps.length - 1;

                    return (
                        <motion.div
                            key={step.id}
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            className="relative flex gap-4"
                        >
                            {/* Icon */}
                            <div className="flex flex-col items-center">
                                <motion.div
                                    animate={step.isComplete ? { scale: [0.9, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center',
                                        'z-10',
                                        step.isComplete
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-gray-200 text-gray-400 border-2 border-dashed'
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.div>

                                {/* Connecting line */}
                                {!isLast && (
                                    <div
                                        className={cn(
                                            'w-0.5 flex-1 mt-2',
                                            step.isComplete && steps[index + 1]?.isComplete
                                                ? 'bg-teal-600'
                                                : 'bg-gray-300 border-l-2 border-dashed'
                                        )}
                                        style={{ minHeight: '40px' }}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-6">
                                <h4 className={cn(
                                    'font-semibold text-sm',
                                    step.isComplete ? 'text-gray-900' : 'text-gray-400'
                                )}>
                                    {step.label}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {step.description}
                                </p>
                                {step.subtext && (
                                    <p className="text-xs text-teal-600 font-medium mt-1">
                                        {step.subtext}
                                    </p>
                                )}
                                {step.timestamp && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {step.timestamp}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
