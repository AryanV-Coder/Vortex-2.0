'use client';

import { useState, useEffect, useCallback } from 'react';
import { MOCK_DELIVERY_PARTNER } from '@/lib/mock-data';
import type { DeliveryPartner } from '@/lib/mock-data';

export type SimulationStage =
    | 'GRACE_PERIOD'
    | 'PHOTO_REVIEW'
    | 'SHIPPED'
    | 'DELIVERED';

export interface SimulationState {
    stage: SimulationStage;
    graceTimeRemaining: number;
    photoReviewTimeRemaining: number;
    deliveryProgress: number;
    deliveryPartner: DeliveryPartner | null;
    estimatedArrival: Date | null;
}

const GRACE_PERIOD_DURATION = 30; // seconds
const PHOTO_REVIEW_DURATION = 20; // seconds
const DELIVERY_DURATION = 60; // seconds for full delivery

const STORAGE_KEY = 'order_simulation_state';

export function useOrderSimulation(orderId: string) {
    const [state, setState] = useState<SimulationState>(() => {
        // Try to restore from localStorage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(`${STORAGE_KEY}_${orderId}`);
            if (stored) {
                return JSON.parse(stored);
            }
        }

        // Initial state
        return {
            stage: 'GRACE_PERIOD' as SimulationStage,
            graceTimeRemaining: GRACE_PERIOD_DURATION,
            photoReviewTimeRemaining: PHOTO_REVIEW_DURATION,
            deliveryProgress: 0,
            deliveryPartner: null,
            estimatedArrival: null,
        };
    });

    // Persist state to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`${STORAGE_KEY}_${orderId}`, JSON.stringify(state));
        }
    }, [state, orderId]);

    // Grace Period Timer
    useEffect(() => {
        if (state.stage !== 'GRACE_PERIOD') return;

        const interval = setInterval(() => {
            setState((prev) => {
                const newTime = prev.graceTimeRemaining - 1;

                if (newTime <= 0) {
                    // Transition to Photo Review
                    return {
                        ...prev,
                        stage: 'PHOTO_REVIEW',
                        graceTimeRemaining: 0,
                        photoReviewTimeRemaining: PHOTO_REVIEW_DURATION,
                    };
                }

                return {
                    ...prev,
                    graceTimeRemaining: newTime,
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [state.stage]);

    // Photo Review Timer
    useEffect(() => {
        if (state.stage !== 'PHOTO_REVIEW') return;

        const interval = setInterval(() => {
            setState((prev) => {
                const newTime = prev.photoReviewTimeRemaining - 1;

                if (newTime <= 0) {
                    // Auto-accept and transition to Shipped
                    const arrival = new Date();
                    arrival.setMinutes(arrival.getMinutes() + 30); // 30 min ETA

                    return {
                        ...prev,
                        stage: 'SHIPPED',
                        photoReviewTimeRemaining: 0,
                        deliveryPartner: MOCK_DELIVERY_PARTNER,
                        estimatedArrival: arrival,
                    };
                }

                return {
                    ...prev,
                    photoReviewTimeRemaining: newTime,
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [state.stage]);

    // Delivery Progress Simulation
    useEffect(() => {
        if (state.stage !== 'SHIPPED') return;

        const interval = setInterval(() => {
            setState((prev) => {
                const increment = (100 / DELIVERY_DURATION) * 2; // Update every 2 seconds
                const newProgress = Math.min(prev.deliveryProgress + increment, 100);

                if (newProgress >= 100) {
                    return {
                        ...prev,
                        stage: 'DELIVERED',
                        deliveryProgress: 100,
                    };
                }

                return {
                    ...prev,
                    deliveryProgress: newProgress,
                };
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [state.stage]);

    // Actions
    const acceptPhoto = useCallback(() => {
        const arrival = new Date();
        arrival.setMinutes(arrival.getMinutes() + 30);

        setState((prev) => ({
            ...prev,
            stage: 'SHIPPED',
            deliveryPartner: MOCK_DELIVERY_PARTNER,
            estimatedArrival: arrival,
        }));
    }, []);

    const rejectPhoto = useCallback(() => {
        // In a real app, this would navigate to a rejection/cancel flow
        alert('Photo rejected! In production, this would open the cancellation flow.');
    }, []);

    const editOrder = useCallback(() => {
        // In a real app, this would open an edit modal
        alert('Edit order! In production, this would open an edit form.');
    }, []);

    const cancelOrder = useCallback(() => {
        // In a real app, this would navigate to cancellation page
        alert('Cancel order! In production, this would navigate to /order/[id]/cancel');
    }, []);

    return {
        ...state,
        acceptPhoto,
        rejectPhoto,
        editOrder,
        cancelOrder,
    };
}
