'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './failed.module.css';

export default function OrderFailedPage() {
    const router = useRouter();

    const handleRetry = () => {
        router.push('/checkout');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.errorIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>

                <h1>Payment Failed</h1>
                <p className={styles.subtitle}>We couldn't process your payment</p>

                <div className={styles.message}>
                    <p>Your payment was unsuccessful. This could be due to:</p>
                    <ul>
                        <li>Insufficient balance in your account</li>
                        <li>Payment was cancelled</li>
                        <li>Network connectivity issues</li>
                        <li>Bank declined the transaction</li>
                    </ul>
                    <p>Don't worry, your cart items are still saved. You can try again.</p>
                </div>

                <div className={styles.actions}>
                    <button onClick={handleRetry} className={styles.primaryBtn}>
                        Retry Payment
                    </button>
                    <Link href="/cart" className={styles.secondaryBtn}>
                        Back to Cart
                    </Link>
                    <Link href="/" className={styles.linkBtn}>
                        Continue Shopping
                    </Link>
                </div>

                <div className={styles.support}>
                    <p>Need help? Contact us:</p>
                    <a href="tel:+917359978388">+91 73599 78388</a>
                </div>
            </div>
        </div>
    );
}
