import React from 'react';
import styles from './contact.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Information</h1>

            <div className={styles.content}>
                <div className={styles.infoItem}>
                    <strong>Trade Name:</strong> Sider Lehenga
                </div>
                <div className={styles.infoItem}>
                    <strong>Email:</strong> support@siderlehenga.com
                </div>
                <div className={styles.infoItem}>
                    <strong>Address:</strong> Narayan Nagar Industrial Estate 1, Parvat Gam, Surat, Gujarat, 395012
                </div>
                <div className={styles.infoItem}>
                    (Mon to Sat 10 AM to 7 PM)
                </div>
            </div>
        </div>
    );
}
