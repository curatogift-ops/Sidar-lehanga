'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import styles from './search.module.css';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const formatPrice = (price: number) => {
        return `₹${price.toLocaleString('en-IN')}`;
    };

    const filteredProducts = productsData.filter(product => {
        const searchLower = query.toLowerCase();
        return (
            product.title.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Search Results</h1>
                {query && (
                    <p className={styles.subtitle}>
                        Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{query}"
                    </p>
                )}
            </div>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => (
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
            ) : (
                <div className={styles.noResults}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <h2>No products found</h2>
                    <p>Try searching with different keywords</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className={styles.container}>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
