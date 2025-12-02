import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.column}>
                    <h3 className={styles.heading}>Information</h3>
                    <ul>
                        <li><Link href="/contact">Contact Information</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                        <li><Link href="/returns">Returns & Refunds Policy</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className={styles.social}>
                    {/* Social Icons Placeholder */}
                    <div className={styles.icon}>Instagram</div>
                </div>

                <div className={styles.payment}>
                    {/* Payment Icons Placeholder */}
                    <div className={styles.paymentIcon}>Razorpay</div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} . Powered by Digitech Avenue.</p>
            </div>
        </footer>
    );
}
