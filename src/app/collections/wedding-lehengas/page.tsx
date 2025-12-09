'use client';

import React from 'react';
import styles from '../../shop/shop.module.css';
import ProductCard from '@/components/ProductCard';

export default function WeddingLehengas() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter((p: any) =>
                    (p.tags && p.tags.includes('#WeddingLehenga')) ||
                    (p.title && p.title.toLowerCase().includes('wedding'))
                );
                setProducts(filtered);
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
                <h1 className={styles.title}>Wedding Lehengas</h1>
                <p className={styles.subtitle}>Discover stunning lehengas perfect for wedding celebrations ({products.length} products)</p>
            </div>

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No products found in this collection.</p>
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
