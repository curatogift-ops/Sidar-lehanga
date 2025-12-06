'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import styles from './product.module.css';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

// Helper to format price
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};

export default function ProductPage() {
    const params = useParams();
    const id = params?.id;

    // Handle case where id might not be available yet or is invalid
    if (!id) {
        return null; // or a loading state
    }

    const productId = parseInt(Array.isArray(id) ? id[0] : id);
    const product = productsData.find(p => p.id === productId);

    // Hooks must be called before conditional returns
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [pincode, setPincode] = useState("");

    if (!product) {
        notFound();
    }

    // Get related products (just taking first 4 for now, excluding current)
    const relatedProducts = productsData
        .filter(p => p.id !== product.id)
        .slice(0, 4);

    const currentImage = product.images[selectedImageIndex];

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/">Home</Link> / <Link href="/category/lehenga">{product.category}</Link> / <span>{product.title}</span>
            </div>

            <div className={styles.productLayout}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.thumbnails}>
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className={`${styles.thumbnail} ${selectedImageIndex === index ? styles.active : ''}`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.title} view ${index + 1}`}
                                    fill
                                    className={styles.thumbImage}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <Image
                            src={currentImage}
                            alt={product.title}
                            fill
                            className={styles.image}
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                        <button className={styles.wishlistBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                        <button className={styles.shareBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.mainPrice}>
                        <span className={styles.currency}></span> {formatPrice(product.price)}
                        {product.originalPrice > product.price && (
                            <span className={styles.taxNote} style={{ textDecoration: 'line-through', marginLeft: '10px', color: '#999' }}>
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                        <span className={styles.taxNote} style={{ marginLeft: '10px' }}>
                            ({product.discount}% OFF)
                        </span>
                    </div>
                    <div className={styles.taxNote}>MRP (Inclusive of all taxes)</div>

                    {/* Size Selection */}
                    <div className={styles.optionGroup}>
                        <div className={styles.sizeHeader}>
                            <span className={styles.optionLabel}>SELECT SIZE</span>
                            <button className={styles.sizeChartBtn}>ⓘ Size Chart</button>
                        </div>
                        <div className={styles.sizes}>
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.viewCount}>
                        👁 1,040 people have viewed the product recently
                    </div>

                    {/* Add to Cart Actions */}
                    <div className={styles.actions}>
                        <button className={styles.addToCart}>ADD TO CART</button>
                        <button className={styles.buyNow}>BUY NOW</button>
                    </div>

                    {/* Pincode */}
                    <div className={styles.pincodeContainer}>
                        <input
                            type="text"
                            placeholder="Enter pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className={styles.pincodeInput}
                        />
                        <button className={styles.checkBtn}>CHECK</button>
                    </div>

                    {/* Services */}
                    <div className={styles.services}>
                        <div className={styles.serviceItem}>
                            <span className={styles.serviceIcon}>🚚</span>
                            <div className={styles.serviceText}>
                                <div className={styles.serviceTitle}>Free delivery</div>
                                <div className={styles.serviceSub}>within 2-3 days</div>
                            </div>
                        </div>
                        <div className={styles.serviceItem}>
                            <span className={styles.serviceIcon}>↩️</span>
                            <div className={styles.serviceText}>
                                <div className={styles.serviceTitle}>Easy Exchange in</div>
                                <div className={styles.serviceSub}>10 days</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.description} style={{ marginTop: '2rem' }}>
                        <div className={styles.descriptionTitle} style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Description</div>
                        <div
                            className={styles.descriptionContent}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className={styles.related}>
                <h2 className={styles.relatedTitle}>You may also like</h2>
                <div className={styles.relatedGrid}>
                    {relatedProducts.map((related) => (
                        <ProductCard key={related.id} product={{
                            id: related.id,
                            name: related.title,
                            price: formatPrice(related.price),
                            category: related.category,
                            image: related.images[0]
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
