export interface DeliveryPartner {
    name: string;
    phone: string;
    photo?: string;
}

export interface Location {
    lat: number;
    lng: number;
    label: string;
}

export const MOCK_DELIVERY_PARTNER: DeliveryPartner = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    photo: undefined, // Will use default avatar
};

export const MOCK_SELLER_LOCATION: Location = {
    lat: 28.6139,
    lng: 77.209,
    label: 'Rahul Shop, Connaught Place',
};

export const MOCK_CUSTOMER_LOCATION: Location = {
    lat: 28.5355,
    lng: 77.391,
    label: '123, Green Street, Noida',
};

export const MOCK_ORDER = {
    id: 'ORD-2026-8898',
    productName: 'Wireless Earbuds',
    quantity: 1,
    icon: '🎧',
    isReturnable: true,
    isExchangeable: false,
    sellerName: 'Rahul Shop',
};
