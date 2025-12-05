'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OccasionSection.module.css';

const occasions = [
    { id: 1, title: 'Wedding', image: '/hero1.webp', link: '/product/1' },
    { id: 2, title: 'Reception', image: '/hero2.webp', link: '/product/1' },
    { id: 3, title: 'Mehendi', image: '/hero3.webp', link: '/product/1' },
    { id: 4, title: 'Haldi', image: '/hero1.webp', link: '/product/1' },
];

const OccasionSection = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Shop The Occasion</h2>

            <div className={styles.tabs}>
                <span className={`${styles.tab} ${styles.activeTab}`}>Women</span>
            </div>

            <div className={styles.grid}>
                {occasions.map((occasion) => (
                    <Link href={occasion.link} key={occasion.id} className={styles.card}>
                        <Image
                            src={occasion.image}
                            alt={occasion.title}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className={styles.overlay}>
                            <span className={styles.cardTitle}>{occasion.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default OccasionSection;
