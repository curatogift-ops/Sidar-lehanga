'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './product.module.css';
import ProductCard from '@/components/ProductCard';

// Mock data for the product
const product = {
    id: 1,
    title: "Burnt Orange Soft Net Bridal Lehenga with Coding Sequins Embroidery",
    price: 3412,
    originalPrice: 7600,
    images: [
        "/hero1.webp", // Using existing images as placeholders
        "/hero2.webp",
        "/hero3.webp",
        "/hero1.webp",
        "/hero2.webp"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stitching: ["BLOUSE & LEHENGA", "SEMI STITCHING"]
};

const relatedProducts = [
    { id: 2, name: "HOT PINK SOFT NET BRIDAL", price: "Rs. 2,912.00", category: "Lehenga", image: "/hero2.webp" },
    { id: 3, name: "PREMIUM SOFT NET LEHENGA", price: "Rs. 2,899.00", category: "Lehenga", image: "/hero3.webp" },
    { id: 4, name: "NAVY BLUE HEAVY EMBROIDERED", price: "Rs. 2,912.00", category: "Lehenga", image: "/hero1.webp" },
    { id: 5, name: "MAJESTIC MUSTARD YELLOW", price: "Rs. 2,899.00", category: "Lehenga", image: "/hero2.webp" }
];

export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("XS");
    const [selectedStitching, setSelectedStitching] = useState("BLOUSE & LEHENGA");

    return (
        <div className={styles.container}>
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
                    </div>
                </div>

                {/* Details */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.priceContainer}>
                        <span className={styles.price}>Rs. {product.price.toLocaleString()}.00</span>
                        <span className={styles.originalPrice}>Rs. {product.originalPrice.toLocaleString()}.00</span>
                        <span className={styles.saveBadge}>You Save 55%</span>
                    </div>

                    <div className={styles.offerBanner}>
                        <span>Extra ₹200 OFF on Prepaid Orders</span>
                        <span className={styles.timer}>06:31</span>
                    </div>

                    {/* Options */}
                    <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>STITCHING</span>
                        <div className={styles.options}>
                            {product.stitching.map(opt => (
                                <button
                                    key={opt}
                                    className={`${styles.optionBtn} ${selectedStitching === opt ? styles.selected : ''}`}
                                    onClick={() => setSelectedStitching(opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>SIZE</span>
                        <div className={styles.options}>
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`${styles.optionBtn} ${selectedSize === size ? styles.selected : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <div className={styles.quantityControl}>
                            <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input type="text" value={quantity} readOnly className={styles.qtyInput} />
                            <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>

                        <button className={styles.addToCart}>Add to cart</button>
                        <button className={styles.buyNow}>Buy it now</button>
                    </div>

                    {/* Trust Badges */}
                    <div className={styles.trustBadges}>
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>🚚</div>
                            <span>Fast Shipping</span>
                        </div>
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>↩️</div>
                            <span>Easy Returns</span>
                        </div>
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>🔒</div>
                            <span>Secure Payment</span>
                        </div>
                        <div className={styles.badge}>
                            <div className={styles.badgeIcon}>🏆</div>
                            <span>Best Quality</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.description}>
                        <p><strong>Lehenga Details</strong></p>
                        <ul>
                            <li>Lehenga Fabric: Premium quality soft net</li>
                            <li>Lehenga Work: Coding sequins work with cancan and canvas patta</li>
                            <li>Lehenga Flare: 4 meter flared</li>
                            <li>Lehenga Type: Semi stitched</li>
                            <li>Lehenga Length: 42 inches</li>
                        </ul>
                        <p className="mt-4"><strong>Blouse Details</strong></p>
                        <ul>
                            <li>Blouse Fabric: Premium quality soft net with lining</li>
                            <li>Blouse Work: Sequins coding work</li>
                            <li>Blouse Type: 1.3 meter unstitched</li>
                        </ul>
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
