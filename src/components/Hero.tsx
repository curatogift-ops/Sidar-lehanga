'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const heroOptions = [
    { id: 1, title: 'SHOP AS A GROOM', link: '/collections/wedding-lehengas' },
    { id: 2, title: 'SHOP AS A WEDDING ATTENDEE', link: '/collections/party-wear-lehengas' },
    { id: 3, title: 'SHOP AS A FESTIVE BUYER', link: '/collections/haldi-mehndi-lehenga' }
];

const Hero = () => {
    const [activeOptionIndex, setActiveOptionIndex] = useState(1); // Start with the middle one active

    useEffect(() => {
        const optionInterval = setInterval(() => {
            setActiveOptionIndex((prevIndex) => (prevIndex + 1) % heroOptions.length);
        }, 3000); // Rotate active option every 3 seconds

        return () => {
            clearInterval(optionInterval);
        };
    }, []);

    return (
        <section className={styles.hero}>
            {/* Image Container - Right Side on Desktop, Top on Mobile */}
            <div className={styles.imageContainer}>
                <Image
                    src="/hero section image .png"
                    alt="Hero Section"
                    fill
                    priority
                    className={styles.image}
                />
            </div>

            {/* Content Container - Left Side on Desktop, Bottom on Mobile */}
            <div className={styles.content}>
                {/* Main Heading */}
                <div className={styles.headingWrapper}>
                    <h1 className={styles.heading}>
                        What's special <br /> today?
                    </h1>
                </div>

                {/* Navigation Menu */}
                <div className={styles.navWrapper}>
                    {heroOptions.map((option, index) => {
                        const isActive = index === activeOptionIndex;
                        return isActive ? (
                            <Link
                                key={option.id}
                                href={option.link}
                                className={`${styles.navItem} ${styles.active}`}
                            >
                                <span>{option.title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.arrowIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                key={option.id}
                                href={option.link}
                                className={styles.navItem}
                            >
                                <span>{option.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hero;
