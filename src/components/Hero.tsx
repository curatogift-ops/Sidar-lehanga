'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const scrollContainer = heroRef.current;
        if (!scrollContainer) return;

        let currentIndex = 0;
        const images = scrollContainer.querySelectorAll(`.${styles.imageWrapper}`);
        const totalImages = images.length;

        const autoScroll = setInterval(() => {
            if (isPaused) return; // Don't scroll if paused

            currentIndex = (currentIndex + 1) % totalImages;

            const imageWidth = images[0]?.clientWidth || 0;
            const scrollPosition = currentIndex * imageWidth;

            scrollContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 2000); // 2 seconds

        return () => clearInterval(autoScroll);
    }, [isPaused]);

    const handleUserInteraction = () => {
        setIsPaused(true);

        // Clear any existing timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }

        // Resume auto-scroll after 3 seconds of no interaction
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 3000);
    };

    return (
        <section
            className={styles.hero}
            ref={heroRef}
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            onScroll={handleUserInteraction}
        >
            <div className={styles.imageWrapper}>
                <Image src="/hero1.webp" alt="Hero Image 1" fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div className={styles.imageWrapper}>
                <Image src="/hero2.webp" alt="Hero Image 2" fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div className={styles.imageWrapper}>
                <Image src="/hero3.webp" alt="Hero Image 3" fill style={{ objectFit: 'cover' }} priority />
            </div>
        </section>
    );
}
