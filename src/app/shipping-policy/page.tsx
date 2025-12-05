import React from 'react';
import styles from './shipping.module.css';

export default function ShippingPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shipping Policy</h1>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Shipping Charges</h2>
                    <p>We offer free shipping on all domestic orders.</p>
                </section>

                <section className={styles.section}>
                    <h2>Estimated Delivery Time</h2>
                    <ul className={styles.list}>
                        <li>✂️ 7-8 business days for creation.</li>
                        <li>Air shipping 4-5 business days delivery according to your location.</li>
                        <li>Normal shipping 8-10 business days to deliver the package to your address.</li>
                        <li>Delivery will be completed within 12-14 business days.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
