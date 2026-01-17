export type PaymentMethod = 'UPI' | 'Card' | 'COD';

export interface CartItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    icon?: string;
    imageUrl?: string;
}

export interface Address {
    street: string;
    city: string;
    zipCode: string;
    fullAddress: string;
}

export interface BillSummary {
    itemsTotal: number;
    shippingFee: number;
    taxes: number;
    discount: number;
    totalPayable: number;
}

export interface OrderState {
    cartItems: CartItem[];
    deliveryAddress: Address | null;
    paymentMethod: PaymentMethod;
    billSummary: BillSummary;
}
