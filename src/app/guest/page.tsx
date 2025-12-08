'use client';

import React from 'react';
import styles from '../shop/shop.module.css';
import ProductCard from '@/components/ProductCard';

export default function GuestPage() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                // Filter products for wedding attendee/guest category
                const guestProducts = data.filter((product: any) =>
                    product.category?.toLowerCase().includes('guest') ||
                    product.category?.toLowerCase().includes('wedding') ||
                    product.subcategory?.toLowerCase().includes('attendee') ||
                    product.tags?.some((tag: string) =>
                        tag.toLowerCase().includes('guest') ||
                        tag.toLowerCase().includes('wedding')
                    )
                );
                setProducts(guestProducts);
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
                <h1 className={styles.title}>Shop as a Wedding Attendee</h1>
                <p className={styles.subtitle}>Find stunning outfits for wedding celebrations</p>
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
