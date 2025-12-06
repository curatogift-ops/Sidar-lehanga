'use client';

import React from 'react';
import styles from './shop.module.css';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

// Helper to format price - using simple formatting to avoid hydration mismatches
const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
};

export default function ShopPage() {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <h1 className={styles.title}>All Products</h1>
                <p className={styles.subtitle}>Explore our exclusive collection of {productsData.length} premium lehengas</p>
            </div>

            <div className={styles.grid}>
                {productsData.map(product => (
                    <ProductCard key={product.id} product={{
                        id: product.id,
                        name: product.title,
                        price: formatPrice(product.price),
                        originalPrice: product.originalPrice > product.price ? formatPrice(product.originalPrice) : undefined,
                        discount: product.discount,
                        category: product.category,
                        image: product.images[0]
                    }} />
                ))}
            </div>
        </div>
    );
}
