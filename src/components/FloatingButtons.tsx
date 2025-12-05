'use client';

import React, { useState, useEffect } from 'react';
import styles from './FloatingButtons.module.css';

const FloatingButtons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const openWhatsApp = () => {
        window.open('https://wa.me/917359978388', '_blank');
    };

    return (
        <div className={styles.container}>
            {/* WhatsApp Button */}
            <button
                className={styles.whatsappBtn}
                onClick={openWhatsApp}
                aria-label="Chat on WhatsApp"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.61 14.9C16.36 14.78 15.14 14.18 14.91 14.1C14.69 14.02 14.53 13.98 14.36 14.23C14.2 14.48 13.72 15.04 13.57 15.2C13.42 15.36 13.27 15.38 13.02 15.26C12.77 15.13 11.97 14.87 11.02 14.03C10.29 13.38 9.79 12.57 9.67 12.36C9.54 12.14 9.66 12.03 9.78 11.91C9.89 11.8 10.03 11.62 10.16 11.47C10.28 11.31 10.33 11.19 10.41 11.03C10.49 10.87 10.45 10.73 10.39 10.61C10.33 10.48 9.83 9.26 9.62 8.76C9.42 8.27 9.21 8.34 9.06 8.34C8.92 8.34 8.76 8.34 8.59 8.34C8.43 8.34 8.16 8.4 7.93 8.65C7.7 8.9 7.06 9.5 7.06 10.72C7.06 11.95 7.96 13.13 8.09 13.3C8.22 13.47 9.94 16.13 12.58 17.27C13.21 17.54 13.7 17.7 14.09 17.82C14.73 18.03 15.32 18 15.79 17.93C16.32 17.85 17.42 17.26 17.65 16.62C17.88 15.98 17.88 15.43 17.81 15.31C17.74 15.19 17.58 15.15 17.33 15.03L16.61 14.9Z" />
                </svg>
            </button>

            {/* Scroll Top Button */}
            <button
                className={`${styles.scrollTopBtn} ${showScrollTop ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.icon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default FloatingButtons;
