'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    Lock,
    MapPin,
    ShoppingBag,
    CreditCard,
    Loader2,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

// --- Types ---
interface CartItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    imageUrl?: string;
}

// --- Mock Data ---
const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: '1',
        productName: 'Sony WH-1000XM5 Noise Canceling Headphones',
        quantity: 1,
        unitPrice: 24999,
        totalPrice: 24999,
        imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80',
    },
    {
        id: '2',
        productName: 'Protective Hard Case',
        quantity: 1,
        unitPrice: 1999,
        totalPrice: 1999,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&q=80',
    }
];

const MOCK_BILLING = {
    itemsTotal: 26998,
    shippingFee: 0,
    taxes: 4860,
    discount: 1350,
    totalPayable: 30508,
};

const DELIVERY_ADDRESS = "102, Green Park Residency, Sector 4, Bangalore, 560032";

// --- Components ---

const SecureCheckoutBadge = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 bg-orange-600 text-white px-4 py-1.5 rounded-full shadow-sm"
    >
        <Lock className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold tracking-wide uppercase">Secure Checkout</span>
    </motion.div>
);

const OrderItemCard = ({ item, index }: { item: CartItem; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + (index * 0.05) }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
    >
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            {item.imageUrl ? (
                <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                    unoptimized
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.productName}</h3>
            <p className="text-gray-500 text-sm mt-0.5">Qty: {item.quantity}</p>
        </div>
        <div className="text-right shrink-0">
            <p className="font-bold text-gray-900">{formatCurrency(item.totalPrice)}</p>
            {item.quantity > 1 && (
                <p className="text-xs text-gray-400 line-through">{formatCurrency(item.unitPrice)}</p>
            )}
        </div>
    </motion.div>
);

const DeliveryAddressInline = () => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl mt-4">
        <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Delivery to:</p>
            <p className="text-sm text-gray-600 leading-relaxed">{DELIVERY_ADDRESS}</p>
        </div>
        <button className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
            Change
        </button>
    </div>
);

const BillSummary = () => (
    <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
    >
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900">Bill Summary</h2>
            <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> UPI
            </span>
        </div>

        <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span className="font-medium text-gray-900">{formatCurrency(MOCK_BILLING.itemsTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Taxes & Charges</span>
                <span className="font-medium text-gray-900">{formatCurrency(MOCK_BILLING.taxes)}</span>
            </div>
            <div className="flex justify-between text-orange-600 font-medium">
                <span>Discount</span>
                <span>- {formatCurrency(MOCK_BILLING.discount)}</span>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="bg-orange-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold text-orange-900">Total Payable</span>
                <span className="font-bold text-2xl text-orange-900">{formatCurrency(MOCK_BILLING.totalPayable)}</span>
            </div>
        </div>

        <DeliveryAddressInline />
    </motion.div>
);

const PlaceOrderFooter = ({
    total,
    onPlaceOrder,
    isLoading
}: {
    total: number;
    onPlaceOrder: () => void;
    isLoading: boolean;
}) => (
    <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 sm:pb-4 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
    >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:block">
                <p className="text-sm text-gray-500">Total Payable</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
            </div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPlaceOrder}
                disabled={isLoading}
                className={cn(
                    "flex-1 sm:flex-none sm:w-64 py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2",
                    "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600",
                    isLoading && "opacity-80 cursor-not-allowed"
                )}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Place Order
                        <ChevronRight className="w-5 h-5 opacity-80" />
                    </>
                )}
            </motion.button>
        </div>
    </motion.div>
);

const SupportLink = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-6 pb-24 sm:pb-6"
    >
        <button className="text-sm text-gray-400 hover:text-orange-600 underline decoration-gray-300 hover:decoration-orange-600 transition-colors">
            Need help? Contact Support
        </button>
    </motion.div>
);

// --- Main Page Component ---

export default function PlaceOrderPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Reset simulation on mount
        if (typeof window !== 'undefined') {
            localStorage.removeItem('order_simulation_state_123');
            localStorage.removeItem('order_simulation_state_undefined');
        }
    }, []);

    const handlePlaceOrder = async () => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create new simulation state (fresh/default)
        // Since we cleared local storage, navigating to tracking will init fresh state

        router.push('/order-confirmation?orderId=123');
    };

    return (
        <div className="min-h-screen bg-[#F5E6D3]">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/90 backdrop-blur-sm border-b border-orange-100 p-4 sticky top-0 z-10 shadow-sm"
            >
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Place Order</h1>
                        <p className="text-xs text-gray-500 mt-0.5">2 Items in cart</p>
                    </div>
                    <SecureCheckoutBadge />
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto p-4 space-y-6">

                {/* Trust/Offer Banner */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-center gap-2 text-orange-800 text-sm"
                >
                    <ShieldCheck className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">100% Purchase Protection with Easy Returns</span>
                </motion.div>

                {/* Items */}
                <section className="space-y-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-orange-600" />
                        Order Items
                    </h2>
                    <div className="space-y-3">
                        {MOCK_CART_ITEMS.map((item, index) => (
                            <OrderItemCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </section>

                {/* Bill Summary */}
                <BillSummary />

                <SupportLink />
            </main>

            {/* Footer */}
            <PlaceOrderFooter
                total={MOCK_BILLING.totalPayable}
                onPlaceOrder={handlePlaceOrder}
                isLoading={isLoading}
            />
        </div>
    );
}
