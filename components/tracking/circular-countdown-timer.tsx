'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CircularCountdownTimerProps {
    timeRemaining: number;
    totalTime: number;
    label: string;
    urgentThreshold?: number;
}

export function CircularCountdownTimer({
    timeRemaining,
    totalTime,
    label,
    urgentThreshold = 10,
}: CircularCountdownTimerProps) {
    const isUrgent = timeRemaining <= urgentThreshold;
    const progress = (timeRemaining / totalTime) * 100;

    // SVG circle calculations
    const size = 150;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
        >
            {/* SVG Circle */}
            <div className="relative">
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-gray-200"
                    />

                    {/* Progress circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={cn(
                            'transition-colors duration-300',
                            isUrgent ? 'text-red-500' : 'text-teal-600'
                        )}
                        animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
                        transition={isUrgent ? { duration: 0.8, repeat: Infinity } : {}}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        key={timeRemaining}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            'text-4xl font-bold',
                            isUrgent ? 'text-red-500' : 'text-gray-900'
                        )}
                    >
                        {timeRemaining}
                    </motion.span>
                    <span className="text-sm text-gray-600">seconds</span>
                </div>
            </div>

            {/* Label */}
            <p className="text-center font-medium text-gray-700">{label}</p>
        </motion.div>
    );
}
