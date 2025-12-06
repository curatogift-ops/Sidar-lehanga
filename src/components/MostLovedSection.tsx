'use client';

import React from 'react';
import MostLovedCard from './MostLovedCard';
import styles from './MostLovedSection.module.css';
import productsData from '@/data/products.json';

// Helper to format price - using simple formatting to avoid hydration mismatches
const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
};

const MostLovedSection = () => {
    // Pick some "Most Loved" products, e.g., index 8 to 12
    const lovedProducts = productsData.slice(8, 12);

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>MOST LOVED</h2>

            <div className={styles.tabs}>
                <span className={`${styles.tab} ${styles.activeTab}`}>Women</span>
            </div>

            <div className={styles.grid}>
                {lovedProducts.map((product) => (
                    <MostLovedCard key={product.id} product={{
                        id: product.id,
                        name: product.title,
                        price: formatPrice(product.price),
                        image: product.images[0],
                        badge: product.discount > 50 ? `${product.discount}% OFF` : undefined
                    }} />
                ))}
            </div>
        </section>
    );
};

export default MostLovedSection;
