import { create } from 'zustand';
import type { OrderState, CartItem, Address } from '@/types/order';

interface OrderStore extends OrderState {
    placeOrder: () => Promise<{ orderId: string }>;
    setDeliveryAddress: (address: Address) => void;
}

// Mock data for demonstration
const mockCartItems: CartItem[] = [
    {
        id: '1',
        productName: 'Wireless Earbuds',
        quantity: 1,
        unitPrice: 1799,
        totalPrice: 1799,
        icon: '🎧',
    },
    {
        id: '2',
        productName: 'Cotton T-Shirt (Blue)',
        quantity: 2,
        unitPrice: 999,
        totalPrice: 1998,
        icon: '👕',
    },
];

const mockAddress: Address = {
    street: '123, Green Street',
    city: 'Teal City',
    zipCode: '56789',
    fullAddress: '123, Green Street, Teal City, 56789',
};

const calculateBillSummary = (items: CartItem[]) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const shippingFee = 50;
    const taxes = 210;
    const discount = 300;
    const totalPayable = itemsTotal + shippingFee + taxes - discount;

    return {
        itemsTotal,
        shippingFee,
        taxes,
        discount,
        totalPayable,
    };
};

export const useOrderStore = create<OrderStore>((set) => ({
    cartItems: mockCartItems,
    deliveryAddress: mockAddress,
    paymentMethod: 'UPI',
    billSummary: calculateBillSummary(mockCartItems),

    setDeliveryAddress: (address) => set({ deliveryAddress: address }),

    placeOrder: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const orderId = `ORD-2026-${Math.floor(Math.random() * 10000)}`;

        return { orderId };
    },
}));
