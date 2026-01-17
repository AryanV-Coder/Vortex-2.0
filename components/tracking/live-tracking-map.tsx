'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from '@/lib/mock-data';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LiveTrackingMapProps {
    deliveryProgress: number;
    sellerLocation: Location;
    customerLocation: Location;
}

// Component to handle map auto-panning
function MapController({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true });
    }, [center, map]);

    return null;
}

export function LiveTrackingMap({
    deliveryProgress,
    sellerLocation,
    customerLocation,
}: LiveTrackingMapProps) {
    const [deliveryPosition, setDeliveryPosition] = useState<[number, number]>([
        sellerLocation.lat,
        sellerLocation.lng,
    ]);

    // Interpolate delivery position based on progress
    useEffect(() => {
        const progress = deliveryProgress / 100;
        const lat = sellerLocation.lat + (customerLocation.lat - sellerLocation.lat) * progress;
        const lng = sellerLocation.lng + (customerLocation.lng - sellerLocation.lng) * progress;
        setDeliveryPosition([lat, lng]);
    }, [deliveryProgress, sellerLocation, customerLocation]);

    const center: [number, number] = [
        (sellerLocation.lat + customerLocation.lat) / 2,
        (sellerLocation.lng + customerLocation.lng) / 2,
    ];

    // Custom icons
    const sellerIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const customerIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const vehicleIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
        >
            <div className="h-[400px] md:h-[500px]">
                <MapContainer
                    center={center}
                    zoom={12}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Route line */}
                    <Polyline
                        positions={[
                            [sellerLocation.lat, sellerLocation.lng],
                            [customerLocation.lat, customerLocation.lng],
                        ]}
                        color="#0D9488"
                        weight={4}
                        opacity={0.6}
                    />

                    {/* Seller marker */}
                    <Marker
                        position={[sellerLocation.lat, sellerLocation.lng]}
                        icon={sellerIcon}
                    />

                    {/* Customer marker */}
                    <Marker
                        position={[customerLocation.lat, customerLocation.lng]}
                        icon={customerIcon}
                    />

                    {/* Delivery vehicle marker (animated) */}
                    <Marker
                        position={deliveryPosition}
                        icon={vehicleIcon}
                    />

                    <MapController center={deliveryPosition} />
                </MapContainer>
            </div>

            {/* Progress indicator */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                    <span className="text-sm font-bold text-teal-600">{Math.round(deliveryProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-teal-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${deliveryProgress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
