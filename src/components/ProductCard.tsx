import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductProps {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    discount?: number;
    category: string;
    image: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.discount && product.discount > 0 && (
                    <div className={styles.saleBadge} suppressHydrationWarning>-{product.discount}%</div>
                )}
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.priceContainer} suppressHydrationWarning>
                    <span className={styles.price} suppressHydrationWarning>{product.price}</span>
                    {product.originalPrice && (
                        <span className={styles.originalPrice} suppressHydrationWarning>{product.originalPrice}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
