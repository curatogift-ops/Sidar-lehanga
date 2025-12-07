// Product Types
export interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    discount: number;
    category: string;
    images: string[];
    sizes: string[];
    description: string;
}

// Cart Types
export interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    originalPrice?: number;
    size: string;
    quantity: number;
    image: string;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

// User Details
export interface UserDetails {
    name: string;
    phone: string;
    address: string;
    email?: string;
    pincode?: string;
}

// Order Types
export interface Order {
    orderId: string;
    items: CartItem[];
    userDetails: UserDetails;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentId?: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
}

// Razorpay Types
export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayPaymentResponse) => void;
    prefill: {
        name: string;
        contact: string;
        email?: string;
    };
    notes: {
        address: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
}

export interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface CreateOrderResponse {
    orderId: string;
    amount: number;
    currency: string;
}

// Extend Window for Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}
