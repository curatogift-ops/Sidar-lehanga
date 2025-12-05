'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product.module.css';
import ProductCard from '@/components/ProductCard';

// Mock data for the product
const product = {
    id: 1,
    title: "Mint Net Lehenga with Multi-Color Embroidery",
    price: 2523,
    originalPrice: 6899,
    sku: "LEH101MINT",
    images: [
        "/hero3.webp",
        "/hero1.webp",
        "/hero2.webp",
        "/hero3.webp",
        "/hero1.webp",
        "/hero2.webp"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Mint", hex: "#98FF98" }]
};

const relatedProducts = [
    { id: 2, name: "HOT PINK SOFT NET BRIDAL", price: "Rs. 2,912.00", category: "Lehenga", image: "/hero2.webp" },
    { id: 3, name: "PREMIUM SOFT NET LEHENGA", price: "Rs. 2,899.00", category: "Lehenga", image: "/hero3.webp" },
    { id: 4, name: "NAVY BLUE HEAVY EMBROIDERED", price: "Rs. 2,912.00", category: "Lehenga", image: "/hero1.webp" },
    { id: 5, name: "MAJESTIC MUSTARD YELLOW", price: "Rs. 2,899.00", category: "Lehenga", image: "/hero2.webp" }
];

export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [pincode, setPincode] = useState("");

    return (
        <div className={styles.container}>
            {/* Breadcrumbs */}


            <div className={styles.productLayout}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.thumbnails}>
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${styles.thumbnail} ${selectedImage === idx ? styles.active : ''}`}
                                onClick={() => setSelectedImage(idx)}
                            >
                                <Image src={img} alt={`Thumbnail ${idx}`} fill style={{ objectFit: 'cover' }} />
                                {idx === 2 && <div className={styles.playIcon}>▶</div>}
                            </div>
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.title}
                            fill
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

                {/* Details */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.mainPrice}>
                        <span className={styles.currency}>₹</span> {product.price.toLocaleString()} <span className={styles.taxNote}>MRP (Inclusive of all taxes)</span>
                    </div>

                    {/* Color Selection */}
                    <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>SELECT COLOUR</span>
                        <div className={styles.colors}>
                            {product.colors.map((color, idx) => (
                                <button
                                    key={idx}
                                    className={styles.colorBtn}
                                    style={{ backgroundColor: color.hex }}
                                    aria-label={color.name}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className={styles.optionGroup}>
                        <div className={styles.sizeHeader}>
                            <span className={styles.optionLabel}>SELECT SIZE</span>
                            <button className={styles.sizeChartBtn}>ⓘ Size Chart</button>
                        </div>
                        <div className={styles.sizes}>
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                    <span className={styles.emailIcon}>✉</span>
                                </button>
                            ))}
                        </div>
                        <button className={styles.moreSizes}>+ More sizes</button>
                    </div>

                    <div className={styles.viewCount}>
                        👁 1,040 people have viewed the product recently
                    </div>

                    {/* Actions */}
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
                        <div className={styles.serviceItem}>
                            <span className={styles.serviceIcon}>📹</span>
                            <div className={styles.serviceText}>
                                <Link href="#" className={styles.serviceLink}>Book a video call</Link>
                            </div>
                        </div>
                        <div className={styles.serviceItem}>
                            <span className={styles.serviceIcon}>🏪</span>
                            <div className={styles.serviceText}>
                                <Link href="#" className={styles.serviceLink}>Book a store visit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className={styles.related}>
                <h2>You may also like</h2>
                <div className={styles.relatedGrid}>
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
