import { create } from 'zustand';
import { CartItem } from '@/types/types';
import {
    getCartFromStorage,
    saveCartToStorage,
    clearCartStorage,
    calculateCartTotals,
    getTotalItems,
    generateCartItemId,
    findCartItem,
    validateCartItem
} from '@/utils/cartUtils';

interface CartStore {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;

    // Actions
    addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
    removeItem: (itemId: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
    loadCart: () => void;
    initializeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    totalItems: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,

    initializeCart: () => {
        if (typeof window !== 'undefined') {
            const items = getCartFromStorage();
            const totals = calculateCartTotals(items);
            const totalItems = getTotalItems(items);

            set({
                items,
                totalItems,
                ...totals
            });

            // Listen for storage changes (cross-tab sync)
            const handleStorageChange = () => {
                get().loadCart();
            };

            window.addEventListener('cartUpdated', handleStorageChange);
            window.addEventListener('storage', handleStorageChange);
        }
    },

    loadCart: () => {
        const items = getCartFromStorage();
        const totals = calculateCartTotals(items);
        const totalItems = getTotalItems(items);

        set({
            items,
            totalItems,
            ...totals
        });
    },

    addItem: (newItem, quantity = 1) => {
        const { items } = get();

        // Validate item
        if (!validateCartItem({ ...newItem, quantity })) {
            console.error('Invalid cart item:', newItem);
            return;
        }

        // Check if item already exists (same product + size)
        const existingItem = findCartItem(items, newItem.productId, newItem.size);

        let updatedItems: CartItem[];

        if (existingItem) {
            // Update quantity of existing item
            updatedItems = items.map(item =>
                item.id === existingItem.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            // Add new item
            const cartItem: CartItem = {
                ...newItem,
                id: generateCartItemId(newItem.productId, newItem.size),
                quantity
            };
            updatedItems = [...items, cartItem];
        }

        // Save to storage and update state
        saveCartToStorage(updatedItems);
        const totals = calculateCartTotals(updatedItems);
        const totalItems = getTotalItems(updatedItems);

        set({
            items: updatedItems,
            totalItems,
            ...totals
        });
    },

    removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);

        saveCartToStorage(updatedItems);
        const totals = calculateCartTotals(updatedItems);
        const totalItems = getTotalItems(updatedItems);

        set({
            items: updatedItems,
            totalItems,
            ...totals
        });
    },

    updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;

        const { items } = get();
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );

        saveCartToStorage(updatedItems);
        const totals = calculateCartTotals(updatedItems);
        const totalItems = getTotalItems(updatedItems);

        set({
            items: updatedItems,
            totalItems,
            ...totals
        });
    },

    clearCart: () => {
        clearCartStorage();
        set({
            items: [],
            totalItems: 0,
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0
        });
    }
}));
