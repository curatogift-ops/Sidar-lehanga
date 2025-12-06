'use client';

import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import VibeSection from '@/components/VibeSection';

import MostLovedSection from '@/components/MostLovedSection';
import styles from './page.module.css';
import productsData from '@/data/products.json';

// Helper to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export default function Home() {
  // Get latest products (e.g., first 8)
  const newProducts = productsData.slice(0, 8);

  return (
    <div className={styles.main}>
      <Hero />
      <VibeSection />

      <MostLovedSection />
      <section className={`container ${styles.section}`}>
        <h2><span>NEW</span> PRODUCTS</h2>
        <div className={styles.grid}>
          {newProducts.map(product => (
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
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/shop" style={{
            display: 'inline-block',
            padding: '12px 30px',
            backgroundColor: '#333',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            VIEW ALL PRODUCTS
          </a>
        </div>
      </section>
    </div>
  );
}
