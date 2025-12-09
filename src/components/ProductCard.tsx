import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductProps {
    id: number;
    name?: string;
    title?: string;
    price: string | number;
    originalPrice?: string | number;
    discount?: number;
    category: string;
    image?: string;
    images?: string[];
}

export default function ProductCard({ product }: { product: ProductProps }) {
    const name = product.name || product.title || 'Untitled Product';
    const image = product.image || (product.images && product.images.length > 0 ? product.images[0] : '') || '/placeholder.jpg';

    const formatPrice = (price: string | number) => {
        if (typeof price === 'number') {
            return `₹${price.toLocaleString('en-IN')}`;
        }
        return price;
    };

    const displayPrice = formatPrice(product.price);
    const displayOriginalPrice = product.originalPrice ? formatPrice(product.originalPrice) : undefined;

    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.discount && product.discount > 0 && (
                    <div className={styles.saleBadge} suppressHydrationWarning>-{product.discount}%</div>
                )}
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.priceContainer} suppressHydrationWarning>
                    <span className={styles.price} suppressHydrationWarning>{displayPrice}</span>
                    {displayOriginalPrice && (
                        <span className={styles.originalPrice} suppressHydrationWarning>{displayOriginalPrice}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
