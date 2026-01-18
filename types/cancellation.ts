export interface CancellationReason {
    id: string;
    label: string;
    requiresCustomInput?: boolean;
}

export interface CancellationRequest {
    orderId: string;
    reason: string;
    customReason?: string;
    timestamp: Date;
}

export const CANCELLATION_REASONS: CancellationReason[] = [
    { id: 'change-address', label: 'I want to change the delivery address' },
    { id: 'shorter-delivery', label: 'I was hoping for a shorter delivery time' },
    { id: 'change-contact', label: 'I want to change the contact details' },
    { id: 'price-decreased', label: 'Price of the product has decreased' },
    { id: 'better-alternative', label: 'Found a better alternative elsewhere' },
    { id: 'changed-mind', label: 'Changed my mind about the purchase' },
    { id: 'ordered-mistake', label: 'Ordered by mistake' },
    { id: 'specs-not-met', label: "Product specifications don't meet my needs" },
    { id: 'delivery-date', label: 'Delivery date not suitable' },
    { id: 'payment-issues', label: 'Payment issues' },
    { id: 'other', label: 'Other', requiresCustomInput: true },
];
