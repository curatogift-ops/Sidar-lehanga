import React from 'react';
import styles from './privacy.module.css';

export default function PrivacyPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>

            <div className={styles.content}>
                <p>Welcome to Sider Lehenga. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make a purchase from our website.</p>

                <section className={styles.section}>
                    <h2>1. Personal Information We Collect</h2>
                    <p>When you visit Sider Lehenga, we automatically collect certain information about your device, including:</p>
                    <ul className={styles.list}>
                        <li>IP address</li>
                        <li>Browser type</li>
                        <li>Time zone</li>
                        <li>Pages you view on our site</li>
                    </ul>
                    <p>We collect this using cookies, log files, and similar technologies.</p>
                    <p>When you make a purchase, we also collect personal details such as:</p>
                    <ul className={styles.list}>
                        <li>Name</li>
                        <li>Billing and shipping address</li>
                        <li>Payment information</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>2. How We Use Your Personal Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className={styles.list}>
                        <li>Process and fulfill your orders</li>
                        <li>Handle payments</li>
                        <li>Communicate with you about your order</li>
                        <li>Prevent fraud and ensure account security</li>
                        <li>Send promotional emails (only with your consent)</li>
                        <li>Improve your browsing experience and our website’s functionality</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Sharing Your Personal Information</h2>
                    <p>We may share your personal information with trusted third-party service providers who help us operate our business and website. These include:</p>
                    <ul className={styles.list}>
                        <li>Shopify – for managing our online store</li>
                        <li>Google Analytics – for tracking website traffic and behavior</li>
                    </ul>
                    <p>We may also disclose information:</p>
                    <ul className={styles.list}>
                        <li>To comply with legal obligations</li>
                        <li>To protect our legal rights</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Behavioral Advertising</h2>
                    <p>We may use your information to show you targeted advertisements through platforms like:</p>
                    <ul className={styles.list}>
                        <li>Facebook</li>
                        <li>Google</li>
                        <li>Bing</li>
                    </ul>
                    <p>You can opt out of these ads using the settings on each platform or by visiting the Digital Advertising Alliance’s opt-out portal at optout.aboutads.info.</p>
                </section>

                <section className={styles.section}>
                    <h2>5. Your Rights (EU Residents)</h2>
                    <p>If you are a resident of the European Union (EU) or European Economic Area (EEA), you have the right to:</p>
                    <ul className={styles.list}>
                        <li>Access your personal data</li>
                        <li>Request correction or deletion</li>
                        <li>Object to or restrict data processing</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                    <p>To exercise these rights, please contact us using the information below.</p>
                </section>

                <section className={styles.section}>
                    <h2>6. Data Retention</h2>
                    <p>We retain your order and personal information as long as necessary for the purposes stated in this policy, unless a longer retention period is required by law.</p>
                </section>

                <section className={styles.section}>
                    <h2>7. Minors</h2>
                    <p>Our website is not intended for individuals under the age of 18. We do not knowingly collect data from children.</p>
                </section>

                <section className={styles.section}>
                    <h2>8. Changes to This Policy</h2>
                    <p>Sider Lehenga may update this Privacy Policy from time to time to reflect:</p>
                    <ul className={styles.list}>
                        <li>Changes in business practices</li>
                        <li>Legal or regulatory updates</li>
                    </ul>
                    <p>We encourage you to review this policy regularly.</p>
                </section>

                <section className={styles.section}>
                    <h2>9. Contact Us</h2>
                    <p>If you have questions, concerns, or complaints about our privacy practices, you may contact us at:</p>
                    <p><strong>Gmail</strong> - satyamlaxman611@gmail.com</p>
                </section>
            </div>
        </div>
    );
}
