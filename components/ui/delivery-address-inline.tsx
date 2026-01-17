'use client';

import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeliveryAddressInlineProps {
    address: string;
    onChangeClick: () => void;
    onEditClick: () => void;
}

export function DeliveryAddressInline({
    address,
    onChangeClick,
    onEditClick,
}: DeliveryAddressInlineProps) {
    return (
        <div className={cn('flex items-start gap-3 py-2')}>
            {/* Location Pin Icon */}
            <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />

            {/* Address Text */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-0.5">
                    Delivery Address
                </p>
                <p className="text-sm text-gray-700">{address}</p>
            </div>

            {/* Action Links */}
            <div className="flex flex-col gap-1 text-sm font-medium">
                <button
                    onClick={onChangeClick}
                    className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                    Change
                </button>
                <button
                    onClick={onEditClick}
                    className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
