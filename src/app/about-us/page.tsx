import React from 'react';
import styles from './about.module.css';

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us</h1>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Returns & Refund Policy</h2>
                    <p>Hey there! 👋</p>
                    <p>We’re Sider Lehenga, a new but passionate Indian ethnic wear brand. We’re just starting out, but our goal is simple: to provide stylish, well-stitched lehengas at honest prices.</p>
                </section>

                <section className={styles.section}>
                    <h2>Why Choose Us?</h2>
                    <ul className={styles.list}>
                        <li><strong>✔ Good Quality Fabric</strong> – Soft georgette, comfortable net, and premium cotton blends.</li>
                        <li><strong>✔ Trendy Designs</strong> – Latest patterns, vibrant colors, and lightweight fabrics.</li>
                        <li><strong>✔ Budget-Friendly</strong> – No middlemen, no fake discounts—just fair pricing.</li>
                        <li><strong>✔ Easy Returns & Support</strong> – If you don’t like it, we’ll make it right.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Our Story (Short & Real)</h2>
                    <p>We’re a small team who noticed that many lehenga sellers overcharge for average quality. So, we decided to cut the extra costs and deliver decent outfits at reasonable rates.</p>
                    <p><strong>No fake promises:</strong></p>
                    <p>We’re not a "big brand" (yet!) but we care about real customer satisfaction.</p>
                    <p>Every order is checked before shipping.</p>
                    <p>Need help? WhatsApp us—we reply fast!</p>
                </section>
            </div>
        </div>
    );
}
