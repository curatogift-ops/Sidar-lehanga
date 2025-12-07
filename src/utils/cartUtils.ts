import { CartItem, Cart } from '@/types/types';

const CART_STORAGE_KEY = 'curatogift_cart';

// LocalStorage operations
export const getCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
};

export const saveCartToStorage = (items: CartItem[]): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

export const clearCartStorage = (): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(CART_STORAGE_KEY);
        window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
    }
};

// Cart calculations
export const calculateCartTotals = (items: CartItem[]): {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
} => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Free shipping above ₹999, otherwise ₹99
    const shipping = subtotal > 999 ? 0 : 99;

    // No tax
    const tax = 0;

    const total = subtotal + shipping;

    return { subtotal, shipping, tax, total };
};

export const getTotalItems = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
};

// Format price
export const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
};

// Generate unique cart item ID
export const generateCartItemId = (productId: number, size: string): number => {
    return parseInt(`${productId}${size.charCodeAt(0)}${Date.now().toString().slice(-4)}`);
};

// Find item in cart
export const findCartItem = (items: CartItem[], productId: number, size: string): CartItem | undefined => {
    return items.find(item => item.productId === productId && item.size === size);
};

// Validate cart item
export const validateCartItem = (item: Partial<CartItem>): boolean => {
    return !!(
        item.productId &&
        item.name &&
        item.price &&
        item.size &&
        item.quantity &&
        item.quantity > 0 &&
        item.image
    );
};
