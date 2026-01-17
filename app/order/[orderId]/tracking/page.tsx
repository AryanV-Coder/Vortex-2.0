'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrderSimulation } from '@/lib/hooks/use-order-simulation';
import { MOCK_ORDER, MOCK_SELLER_LOCATION, MOCK_CUSTOMER_LOCATION } from '@/lib/mock-data';
import { TrackingNavbar } from '@/components/tracking/tracking-navbar';
import { OrderHeader } from '@/components/tracking/order-header';
import { CircularCountdownTimer } from '@/components/tracking/circular-countdown-timer';
import { OrderTimeline } from '@/components/tracking/order-timeline';
import { PhotoReviewModal } from '@/components/tracking/photo-review-modal';
import { DeliveryPartnerCard } from '@/components/tracking/delivery-partner-card';
import { LiveTrackingMap } from '@/components/tracking/live-tracking-map';

export default function OrderTrackingPage() {
    const params = useParams();
    const orderId = (params.orderId as string) || MOCK_ORDER.id;

    const simulation = useOrderSimulation(orderId);

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Fixed Navbar */}
            <TrackingNavbar
                canEdit={simulation.stage === 'GRACE_PERIOD'}
                canCancel={simulation.stage === 'GRACE_PERIOD'}
                onEditClick={simulation.editOrder}
                onCancelClick={simulation.cancelOrder}
            />

            {/* Content Container (with top padding for fixed navbar) */}
            <div className="pt-20 px-4 max-w-6xl mx-auto">
                {/* Order Header */}
                <div className="mb-6">
                    <OrderHeader
                        productName={MOCK_ORDER.productName}
                        quantity={MOCK_ORDER.quantity}
                        orderId={orderId}
                        icon={MOCK_ORDER.icon}
                        isReturnable={MOCK_ORDER.isReturnable}
                        isExchangeable={MOCK_ORDER.isExchangeable}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Timer + Timeline */}
                    <div className="space-y-6">
                        {/* Grace Period Timer */}
                        <AnimatePresence mode="wait">
                            {simulation.stage === 'GRACE_PERIOD' && (
                                <motion.div
                                    key="grace-timer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex justify-center"
                                >
                                    <CircularCountdownTimer
                                        timeRemaining={simulation.graceTimeRemaining}
                                        totalTime={30}
                                        label="Time to Shipment"
                                        urgentThreshold={10}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Timeline */}
                        <OrderTimeline
                            currentStage={simulation.stage}
                            sellerName={MOCK_ORDER.sellerName}
                            estimatedArrival={simulation.estimatedArrival}
                        />
                    </div>

                    {/* Right Column: Map + Delivery Partner (when shipped) */}
                    <AnimatePresence mode="wait">
                        {(simulation.stage === 'SHIPPED' || simulation.stage === 'DELIVERED') && (
                            <motion.div
                                key="shipping-content"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="space-y-6"
                            >
                                {/* Delivery Partner Card */}
                                {simulation.deliveryPartner && (
                                    <DeliveryPartnerCard
                                        {...simulation.deliveryPartner}
                                        estimatedArrival={simulation.estimatedArrival}
                                    />
                                )}

                                {/* Live Tracking Map */}
                                <LiveTrackingMap
                                    deliveryProgress={simulation.deliveryProgress}
                                    sellerLocation={MOCK_SELLER_LOCATION}
                                    customerLocation={MOCK_CUSTOMER_LOCATION}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Delivered Message */}
                <AnimatePresence>
                    {simulation.stage === 'DELIVERED' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-center"
                        >
                            <div className="text-5xl mb-3">🎉</div>
                            <h2 className="text-2xl font-bold text-green-900 mb-2">
                                Order Delivered Successfully!
                            </h2>
                            <p className="text-green-700 mb-6">
                                Thank you for your order. We hope you enjoy your {MOCK_ORDER.productName}!
                            </p>

                            {/* Place Another Order Button */}
                            <a
                                href="/place-order"
                                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
                            >
                                <span>Place Another Order</span>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Photo Review Modal */}
            <PhotoReviewModal
                isOpen={simulation.stage === 'PHOTO_REVIEW'}
                photoUrl="/packer-photo.jpg"
                timeRemaining={simulation.photoReviewTimeRemaining}
                onAccept={simulation.acceptPhoto}
                onReject={simulation.rejectPhoto}
            />
        </div>
    );
}
