'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './VibeSection.module.css';

const vibes = [
    { id: 1, title: 'Wedding Lehengas', image: '/photo_6125111998686543495_y.jpg', link: '/shop' },
    { id: 2, title: 'Designer Lehengas', image: '/photo_6172278620861611696_y_1.jpg', link: '/shop' },
    { id: 3, title: 'Bridal Lehengas', image: '/photo_6258158433270352136_y_1.webp', link: '/shop' },
    { id: 4, title: 'Party Wear Lehengas', image: '/photo_6269479443076595000_y.jpg', link: '/shop' },
    { id: 5, title: 'Heavy Embroidery Lehengas', image: '/photo_6289324309402991350_y.jpg', link: '/shop' },
    { id: 6, title: 'Haldi & Mehndi Lehenga', image: '/photo_6323385680687906435_y.jpg', link: '/shop' },
];

const VibeSection = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = 320; // Card width + gap
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>What's Your Vibe?</h2>

            <div className={styles.carouselContainer}>
                <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={() => scroll('left')}
                    aria-label="Previous"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div className={styles.carousel} ref={carouselRef}>
                    {vibes.map((vibe) => (
                        <Link href={vibe.link} key={vibe.id} className={styles.card}>
                            <Image
                                src={vibe.image}
                                alt={vibe.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 260px, 300px"
                            />
                            <div className={styles.overlay}>
                                <span className={styles.cardTitle}>{vibe.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={() => scroll('right')}
                    aria-label="Next"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default VibeSection;
