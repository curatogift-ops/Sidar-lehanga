'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../shop/shop.module.css';
import ProductCard from '@/components/ProductCard';

export default function GroomPage() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                // Filter products for groom category
                const groomProducts = data.filter((product: any) =>
                    product.category?.toLowerCase().includes('groom') ||
                    product.subcategory?.toLowerCase().includes('groom') ||
                    product.tags?.some((tag: string) => tag.toLowerCase().includes('groom'))
                );
                setProducts(groomProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Shop as a Groom</h1>
                <p className={styles.subtitle}>Find the perfect outfit for your special day</p>
            </div>

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No products found in this category.</p>
                    <p>Check back soon for new arrivals!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
