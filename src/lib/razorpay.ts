import { RazorpayOptions, RazorpayPaymentResponse } from '@/types/types';

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined') {
            resolve(false);
            return;
        }

        // Check if script already loaded
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Initialize Razorpay payment
export const initializeRazorpay = async (
    options: RazorpayOptions
): Promise<void> => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
        throw new Error('Failed to load Razorpay SDK');
    }

    if (!window.Razorpay) {
        throw new Error('Razorpay SDK not available');
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};

// Create Razorpay order
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, currency }),
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (
    paymentId: string,
    orderId: string,
    signature: string,
    userDetails: any,
    cartItems: any[]
) => {
    try {
        const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
                userDetails,
                cartItems,
            }),
        });

        if (!response.ok) {
            throw new Error('Payment verification failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
};
