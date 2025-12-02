import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const products = [
  { id: 1, name: "BURNT ORANGE SOFT NET BRIDAL LEHENGA", price: "Rs. 3,450.00", category: "Lehenga", image: "" },
  { id: 2, name: "HOT PINK MULTICOLOR EMBROIDERED", price: "Rs. 3,335.00", category: "Lehenga", image: "" },
  { id: 3, name: "MINT SILVER RADIANCE MIRROR WORK", price: "Rs. 2,075.00", category: "Lehenga", image: "" },
  { id: 4, name: "HOT PINK SOFT NET BRIDAL LEHENGA", price: "Rs. 2,183.00", category: "Lehenga", image: "" },
  { id: 5, name: "SOFT NET EMBROIDERED LEHENGA CHOLI", price: "Rs. 2,020.00", category: "Lehenga", image: "" },
  { id: 6, name: "MAJESTIC MUSTARD YELLOW LEHENGA", price: "Rs. 3,499.00", category: "Lehenga", image: "" },
  { id: 7, name: "PINK AND ORANGE DUAL TONE LEHENGA", price: "Rs. 2,675.00", category: "Lehenga", image: "" },
  { id: 8, name: "POWDER BLUE HEAVY EMBROIDERED", price: "Rs. 3,025.00", category: "Lehenga", image: "" }
];

export default function Home() {
  return (
    <div className={styles.main}>
      <Hero />
      <section className={`container ${styles.section}`}>
        <h2><span>NEW</span> PRODUCTS</h2>
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
