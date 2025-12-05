'use client';

import React from 'react';
import MostLovedCard from './MostLovedCard';
import styles from './MostLovedSection.module.css';

const products = [
    { id: 101, name: "Elegant Cream Semi Bridal Lehenga", price: "₹ 19,999", image: "/hero1.webp", badge: "READY TO WEAR" },
    { id: 102, name: "Radiant Mustard Yellow Georgette Indo Western", price: "₹ 11,999", image: "/hero2.webp", badge: "SOLD OUT" },
    { id: 103, name: "Enchanting Beige Georgette Saree", price: "₹ 9,999", image: "/hero3.webp" },
    { id: 104, name: "Soft Lilac with Scallop Patterns & Bel Buti Embroidery Anarkali Suit", price: "₹ 11,999", image: "/hero1.webp" },
];

const MostLovedSection = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>MOST LOVED</h2>

            <div className={styles.tabs}>
                <span className={`${styles.tab} ${styles.activeTab}`}>Women</span>
            </div>

            <div className={styles.grid}>
                {products.map((product) => (
                    <MostLovedCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default MostLovedSection;
