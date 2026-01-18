'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { SecureCheckoutBadge } from '@/components/ui/secure-checkout-badge';
import { OrderItemCard } from '@/components/ui/order-item-card';
import { BillSummary } from '@/components/ui/bill-summary';
import { PlaceOrderFooter } from '@/components/ui/place-order-footer';
import { SupportLink } from '@/components/ui/support-link';
import { useOrderStore } from '@/lib/store';

export default function PlaceOrderPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const cartItems = useOrderStore((state) => state.cartItems);
    const deliveryAddress = useOrderStore((state) => state.deliveryAddress);
    const paymentMethod = useOrderStore((state) => state.paymentMethod);
    const billSummary = useOrderStore((state) => state.billSummary);
    const placeOrder = useOrderStore((state) => state.placeOrder);

    const handlePlaceOrder = async () => {
        // Validation
        if (!cartItems || cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        if (!deliveryAddress) {
            toast.error('Please select a delivery address');
            return;
        }

        // Start loading
        setIsLoading(true);

        try {
            const { orderId } = await placeOrder();

            // Navigate to confirmation screen
            router.push(`/order-confirmation?orderId=${orderId}`);
        } catch (error) {
            toast.error('Failed to place order. Please try again.');
            setIsLoading(false);
        }
    };

    const handleChangeAddress = () => {
        toast.info('Address change functionality coming soon');
    };

    const handleEditAddress = () => {
        toast.info('Address edit functionality coming soon');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-gray-50 pb-32 md:pb-8"
        >
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Review your items and billing details
                            </p>
                        </div>
                        <SecureCheckoutBadge />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto p-4 space-y-6 mt-4">
                {/* Order Items Section */}
                <section>
                    <h2 className="font-bold text-xl mb-3 text-gray-900">Order Items</h2>
                    <motion.div
                        className="space-y-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                    >
                        {cartItems.map((item) => (
                            <OrderItemCard key={item.id} {...item} />
                        ))}
                    </motion.div>
                </section>

                {/* Bill Summary Section */}
                <section>
                    <BillSummary
                        {...billSummary}
                        paymentMethod={paymentMethod}
                        deliveryAddress={deliveryAddress?.fullAddress || ''}
                        onChangeAddress={handleChangeAddress}
                        onEditAddress={handleEditAddress}
                    />
                </section>
            </main>

            {/* Fixed Footer */}
            <PlaceOrderFooter
                totalPayable={billSummary.totalPayable}
                onPlaceOrderClick={handlePlaceOrder}
                isLoading={isLoading}
            />

            {/* Support Link */}
            <SupportLink />
        </motion.div>
    );
}
