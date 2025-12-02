import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductProps {
    id: number;
    name: string;
    price: string;
    category: string;
    image: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                {/* Placeholder instead of img */}
                <div className={styles.placeholder}></div>
                <div className={styles.saleBadge}>Sale</div>
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.priceContainer}>
                    <span className={styles.price}>{product.price}</span>
                    <span className={styles.originalPrice}>Rs. 5,000.00</span>
                </div>
            </div>
        </Link>
    );
}
