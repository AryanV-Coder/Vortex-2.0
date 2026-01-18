'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function OrderConfirmationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        // Redirect to tracking page after 3 seconds
        const redirectTimer = setTimeout(() => {
            if (orderId) {
                router.push(`/order/${orderId}/tracking`);
            } else {
                router.push('/');
            }
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(redirectTimer);
        };
    }, [router, orderId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full max-w-md"
            >
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    {/* Animated Check Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                        }}
                        className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.3,
                                type: 'spring',
                                stiffness: 300,
                            }}
                        >
                            <Check className="w-14 h-14 text-white stroke-[3]" />
                        </motion.div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-gray-600 text-lg mb-2">
                            Thank you for your purchase
                        </p>
                        {orderId && (
                            <p className="text-sm text-gray-500 font-medium">
                                Order ID: <span className="text-emerald-600">{orderId}</span>
                            </p>
                        )}
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="mt-8 flex justify-center gap-2"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0 }}
                                animate={{ y: [-5, 0, -5] }}
                                transition={{
                                    delay: 0.8 + i * 0.1,
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-2 h-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full"
                            />
                        ))}
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8"
                    >
                        <p className="text-sm text-gray-500 mb-3">
                            Redirecting to order tracking...
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5],
                            x: Math.cos((i * Math.PI * 2) / 8) * 150,
                            y: Math.sin((i * Math.PI * 2) / 8) * 150,
                        }}
                        transition={{
                            delay: 0.8,
                            duration: 1.5,
                            ease: 'easeOut',
                        }}
                        className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                        style={{
                            left: '50%',
                            top: '40%',
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}
