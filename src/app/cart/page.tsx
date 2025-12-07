'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/cartUtils';
import styles from './cart.module.css';

export default function CartPage() {
    const router = useRouter();
    const { items, totalItems, subtotal, shipping, total, removeItem, updateQuantity, initializeCart } = useCartStore();

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <div className={styles.emptyIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
                <h2>Your cart is empty</h2>
                <p>Add some beautiful pieces to your cart!</p>
                <Link href="/" className={styles.continueShoppingBtn}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Shopping Cart</h1>
                <p>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>

            <div className={styles.content}>
                <div className={styles.itemsSection}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <Link href={`/product/${item.productId}`} className={styles.itemImage}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Link>

                            <div className={styles.itemDetails}>
                                <Link href={`/product/${item.productId}`} className={styles.itemNameLink}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                </Link>
                                <p className={styles.itemSize}>Size: {item.size}</p>

                                <div className={styles.itemPrice}>
                                    <span className={styles.price}>{formatPrice(item.price)}</span>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <span className={styles.originalPrice}>{formatPrice(item.originalPrice)}</span>
                                    )}
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className={styles.quantityBtn}
                                        >
                                            -
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= 10}
                                            className={styles.quantityBtn}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className={styles.removeBtn}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summarySection}>
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal ({totalItems} items)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                        </div>

                        {shipping === 0 && subtotal > 0 && (
                            <div className={styles.freeShippingNote}>
                                🎉 You got free shipping!
                            </div>
                        )}

                        {shipping > 0 && (
                            <div className={styles.shippingNote}>
                                Add {formatPrice(1000 - subtotal)} more to get free shipping
                            </div>
                        )}

                        <div className={styles.divider} />

                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                        <button onClick={handleCheckout} className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>

                        <Link href="/" className={styles.continueLink}>
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
