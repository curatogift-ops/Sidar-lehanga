'use client';

import React from 'react';
import styles from '../shop/shop.module.css';
import ProductCard from '@/components/ProductCard';

export default function FestivalsPage() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                // Filter products for festive/festival category
                const festiveProducts = data.filter((product: any) =>
                    product.category?.toLowerCase().includes('festive') ||
                    product.category?.toLowerCase().includes('festival') ||
                    product.subcategory?.toLowerCase().includes('festive') ||
                    product.tags?.some((tag: string) =>
                        tag.toLowerCase().includes('festive') ||
                        tag.toLowerCase().includes('festival')
                    )
                );
                setProducts(festiveProducts);
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
                <h1 className={styles.title}>Shop as a Festive Buyer</h1>
                <p className={styles.subtitle}>Discover beautiful outfits for all celebrations</p>
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
