'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MostLovedCard.module.css';

interface ProductProps {
    id: number;
    name: string;
    price: string;
    image: string;
    badge?: string;
}

export default function MostLovedCard({ product }: { product: ProductProps }) {
    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                <button className={styles.wishlistButton} aria-label="Add to Wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>

                {product.badge && (
                    <div className={styles.badge} suppressHydrationWarning>
                        {product.badge}
                    </div>
                )}
            </div>

            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price} suppressHydrationWarning>{product.price}</div>
            </div>
        </Link>
    );
}
