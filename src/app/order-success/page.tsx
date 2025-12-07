'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import styles from './order-success.module.css';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');
    const paymentId = searchParams.get('paymentId');

    return (
        <div className={styles.container}>
            <div className={styles.successCard}>
                <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.successIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.message}>Thank you for your order. Your payment has been processed successfully.</p>

                <div className={styles.orderDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Order ID:</span>
                        <span className={styles.value}>{orderId}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Payment ID:</span>
                        <span className={styles.value}>{paymentId}</span>
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p>We've sent order confirmation details to your contact information. Our team will contact you shortly to confirm your delivery.</p>
                </div>

                <div className={styles.actions}>
                    <Link href="/shop" className={styles.primaryButton}>
                        Continue Shopping
                    </Link>
                    <Link href="/" className={styles.secondaryButton}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className={styles.container}>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
