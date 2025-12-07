'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/cartUtils';
import { UserDetails } from '@/types/types';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalItems, subtotal, shipping, total, clearCart, initializeCart } = useCartStore();

    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        phone: '',
        address: '',
        email: '',
        pincode: ''
    });

    const [errors, setErrors] = useState<Partial<UserDetails>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    useEffect(() => {
        if (items.length === 0 && !isProcessing) {
            router.push('/cart');
        }
    }, [items, router, isProcessing]);

    const validateForm = (): boolean => {
        const newErrors: Partial<UserDetails> = {};

        if (!userDetails.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!userDetails.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(userDetails.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!userDetails.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!userDetails.pincode?.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(userDetails.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        // Email is optional but validate if provided
        if (userDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof UserDetails, value: string) => {
        setUserDetails(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handlePayment = async () => {
        if (!validateForm()) {
            return;
        }

        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        try {
            // Simulate a delay (like payment gateway processing)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate a mock order ID
            const mockOrderId = 'ORD' + Date.now();
            const mockPaymentId = 'PAY' + Date.now();

            // Clear the cart
            clearCart();

            // Redirect to success page
            router.push(`/order-success?orderId=${mockOrderId}&paymentId=${mockPaymentId}`);
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Failed to process payment. Please try again.');
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Checkout</h1>
            </div>

            <div className={styles.content}>
                {/* User Details Form */}
                <div className={styles.formSection}>
                    <h2>Delivery Information</h2>

                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                value={userDetails.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={errors.name ? styles.inputError : ''}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                value={userDetails.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={errors.phone ? styles.inputError : ''}
                                placeholder="10-digit mobile number"
                            />
                            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email (Optional)</label>
                            <input
                                type="email"
                                id="email"
                                value={userDetails.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={errors.email ? styles.inputError : ''}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address">Delivery Address *</label>
                            <textarea
                                id="address"
                                value={userDetails.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className={errors.address ? styles.inputError : ''}
                                placeholder="House no., Street, Area, City, State"
                                rows={4}
                            />
                            {errors.address && <span className={styles.error}>{errors.address}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="pincode">Pincode *</label>
                            <input
                                type="text"
                                id="pincode"
                                value={userDetails.pincode}
                                onChange={(e) => handleInputChange('pincode', e.target.value)}
                                className={errors.pincode ? styles.inputError : ''}
                                placeholder="6-digit PIN code"
                                maxLength={6}
                            />
                            {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}
                        </div>

                        <div className={styles.termsGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                />
                                <span>I agree to the Terms & Conditions and Privacy Policy</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className={styles.summarySection}>
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>

                        <div className={styles.items}>
                            {items.map((item) => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{item.name}</h4>
                                        <p>Size: {item.size} × {item.quantity}</p>
                                        <p className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.summaryRow}>
                            <span>Subtotal ({totalItems} items)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.totalRow}>
                            <span>Total Amount</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={styles.paymentBtn}
                        >
                            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                        </button>

                        <div className={styles.secureNote}>
                            🔒 Secure payment powered by Razorpay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
