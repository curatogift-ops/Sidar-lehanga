'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const heroImages = [
    '/hero1.webp',
    '/hero2.webp',
    '/hero3.webp'
];

const heroOptions = [
    { id: 1, title: 'SHOP AS A GROOM', link: '/groom' },
    { id: 2, title: 'SHOP AS A WEDDING ATTENDEE', link: '/guest' },
    { id: 3, title: 'SHOP AS A FESTIVE BUYER', link: '/festivals' }
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeOptionIndex, setActiveOptionIndex] = useState(1); // Start with the middle one active

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);

        const optionInterval = setInterval(() => {
            setActiveOptionIndex((prevIndex) => (prevIndex + 1) % heroOptions.length);
        }, 3000); // Rotate active option every 3 seconds

        return () => {
            clearInterval(imageInterval);
            clearInterval(optionInterval);
        };
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Images Slider */}
            {heroImages.map((src, index) => (
                <div
                    key={src}
                    className={`${styles.bgImage} ${index === currentImageIndex ? styles.activeImage : ''}`}
                >
                    <Image
                        src={src}
                        alt={`Hero Image ${index + 1}`}
                        fill
                        priority={index === 0}
                        className={styles.image}
                    />
                    <div className={styles.overlay}></div>
                </div>
            ))}

            {/* Content Container */}
            <div className={styles.content}>

                {/* Left Side - Main Heading */}
                <div className={styles.headingWrapper}>
                    <h1 className={styles.heading}>
                        What's special <br /> today?
                    </h1>
                </div>

                {/* Right Side - Navigation Menu */}
                <div className={styles.navWrapper}>
                    {heroOptions.map((option, index) => {
                        const isActive = index === activeOptionIndex;
                        return isActive ? (
                            <div
                                key={option.id}
                                className={`${styles.navItem} ${styles.active}`}
                            >
                                <span>{option.title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.arrowIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        ) : (
                            <div
                                key={option.id}
                                className={styles.navItem}
                            >
                                <span>{option.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Icon - Bottom Right */}


        </section>
    );
};

export default Hero;
