'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Features Bar */}
            <div className={styles.featuresBar}>
                <div className={styles.featuresContainer}>
                    <div className={styles.featureItem}>
                        <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Made in India</span>
                    </div>
                    <div className={styles.featureItem}>
                        <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <span>Assured Quality</span>
                    </div>
                    <div className={styles.featureItem}>
                        <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <span>Secure Payments</span>
                    </div>
                    <div className={styles.featureItem}>
                        <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span>Empowering Weavers</span>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className={styles.mainFooter}>
                <div className={styles.footerContainer}>
                    {/* Brand Logo */}
                    <div className={styles.newsletter}>
                        <div className={styles.brand}>
                            <NextImage
                                src="/logo.webp"
                                alt="Sider Lehenga"
                                width={100}
                                height={40}
                                className={styles.logo}
                            />
                        </div>
                    </div>

                    {/* Columns */}
                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <h4>Information</h4>
                            <ul>
                                <li><Link href="/contact">Contact Information</Link></li>
                                <li><Link href="/about-us">About Us</Link></li>

                                <li><Link href="/shipping-policy">Shipping Policy</Link></li>
                                <li><Link href="/about-us">Returns & Refunds Policy</Link></li>
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>

                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className={styles.bottomBar}>
                        <div className={styles.copyright}>
                            &copy; 2025 Sider Lehenga created by Digitech Avenue
                        </div>
                        <div className={styles.paymentIcons}>
                            <div className={styles.paymentIcon} style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#002663', background: 'white', padding: '5px 10px' }}>
                                Razorpay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
