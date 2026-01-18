'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { DeliveryPartner } from '@/lib/mock-data';

interface DeliveryPartnerCardProps extends DeliveryPartner {
    estimatedArrival: Date | null;
}

export function DeliveryPartnerCard({
    name,
    phone,
    photo,
    estimatedArrival,
}: DeliveryPartnerCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', damping: 20 }}
            className={cn(
                'bg-white rounded-2xl p-5 shadow-sm',
                'flex items-center gap-4'
            )}
        >
            {/* Avatar */}
            <div className="w-14 h-14 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center">
                {photo ? (
                    <Image
                        src={photo}
                        alt={name}
                        className="w-full h-full rounded-full object-cover"
                        width={56}
                        height={56}
                        unoptimized
                    />
                ) : (
                    <User className="w-7 h-7 text-primary-600" />
                )}
            </div>

            {/* Partner Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
                <p className="text-sm text-gray-600 font-mono">{phone}</p>

                {/* ETA */}
                {estimatedArrival && (
                    <div className="flex items-center gap-1.5 mt-2 text-primary-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Est. arrival: {new Date(estimatedArrival).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                    </div>
                )}
            </div>

            {/* Call Button */}
            <a
                href={`tel:${phone}`}
                className={cn(
                    'w-12 h-12 flex-shrink-0',
                    'bg-primary-600 text-white',
                    'rounded-full',
                    'flex items-center justify-center',
                    'hover:bg-primary-700 transition-colors',
                    'shadow-md'
                )}
                aria-label="Call delivery partner"
            >
                <Phone className="w-5 h-5" />
            </a>
        </motion.div>
    );
}
