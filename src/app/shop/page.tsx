'use client';

import React, { useState, useMemo } from 'react';
import styles from './shop.module.css';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

// Helper to format price - using simple formatting to avoid hydration mismatches
const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
};

type SortOption = 'featured' | 'best-selling' | 'alpha-asc' | 'alpha-desc' | 'price-asc' | 'price-desc' | 'date-old' | 'date-new';

export default function ShopPage() {
    const [sortBy, setSortBy] = useState<SortOption>('best-selling');
    const [showFilter, setShowFilter] = useState(false);

    const sortedProducts = useMemo(() => {
        const products = [...productsData];

        switch (sortBy) {
            case 'best-selling':
                return products.sort((a, b) => b.discount - a.discount);
            case 'alpha-asc':
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case 'alpha-desc':
                return products.sort((a, b) => b.title.localeCompare(a.title));
            case 'price-asc':
                return products.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return products.sort((a, b) => b.price - a.price);
            case 'date-old':
                return products.sort((a, b) => a.id - b.id);
            case 'date-new':
                return products.sort((a, b) => b.id - a.id);
            case 'featured':
            default:
                return products;
        }
    }, [sortBy]);

    const getSortLabel = () => {
        switch (sortBy) {
            case 'best-selling': return 'Best selling';
            case 'alpha-asc': return 'Alphabetically, A-Z';
            case 'alpha-desc': return 'Alphabetically, Z-A';
            case 'price-asc': return 'Price, low to high';
            case 'price-desc': return 'Price, high to low';
            case 'date-old': return 'Date, old to new';
            case 'date-new': return 'Date, new to old';
            case 'featured':
            default: return 'Featured';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>All Products</h1>
                <p className={styles.subtitle}>Explore our exclusive collection of {productsData.length} premium lehengas</p>
            </div>

            <div className={styles.filterBar}>
                <button className={styles.filterButton} onClick={() => setShowFilter(!showFilter)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5" />
                    </svg>
                    Filter
                </button>
                <span className={styles.filterLabel}>{getSortLabel()}</span>
            </div>

            {showFilter && (
                <>
                    <div className={styles.filterOverlay} onClick={() => setShowFilter(false)} />
                    <div className={styles.filterModal}>
                        <div className={styles.filterHeader}>
                            <h3>Filter</h3>
                            <button className={styles.closeButton} onClick={() => setShowFilter(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className={styles.filterOptions}>
                            <button
                                className={sortBy === 'featured' ? styles.active : ''}
                                onClick={() => { setSortBy('featured'); setShowFilter(false); }}
                            >
                                <span>Featured</span>
                                {sortBy === 'featured' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'best-selling' ? styles.active : ''}
                                onClick={() => { setSortBy('best-selling'); setShowFilter(false); }}
                            >
                                <span>Best selling</span>
                                {sortBy === 'best-selling' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'alpha-asc' ? styles.active : ''}
                                onClick={() => { setSortBy('alpha-asc'); setShowFilter(false); }}
                            >
                                <span>Alphabetically, A-Z</span>
                                {sortBy === 'alpha-asc' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'alpha-desc' ? styles.active : ''}
                                onClick={() => { setSortBy('alpha-desc'); setShowFilter(false); }}
                            >
                                <span>Alphabetically, Z-A</span>
                                {sortBy === 'alpha-desc' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'price-asc' ? styles.active : ''}
                                onClick={() => { setSortBy('price-asc'); setShowFilter(false); }}
                            >
                                <span>Price, low to high</span>
                                {sortBy === 'price-asc' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'price-desc' ? styles.active : ''}
                                onClick={() => { setSortBy('price-desc'); setShowFilter(false); }}
                            >
                                <span>Price, high to low</span>
                                {sortBy === 'price-desc' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'date-old' ? styles.active : ''}
                                onClick={() => { setSortBy('date-old'); setShowFilter(false); }}
                            >
                                <span>Date, old to new</span>
                                {sortBy === 'date-old' && <div className={styles.radio} />}
                            </button>

                            <button
                                className={sortBy === 'date-new' ? styles.active : ''}
                                onClick={() => { setSortBy('date-new'); setShowFilter(false); }}
                            >
                                <span>Date, new to old</span>
                                {sortBy === 'date-new' && <div className={styles.radio} />}
                            </button>
                        </div>

                        <button className={styles.seeItemsButton} onClick={() => setShowFilter(false)}>
                            See {sortedProducts.length} items
                        </button>
                    </div>
                </>
            )}

            <div className={styles.grid}>
                {sortedProducts.map(product => (
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
