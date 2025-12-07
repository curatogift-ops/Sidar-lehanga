'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartIcon from './CartIcon';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>

        <div className={styles.leftSection}>
          <button className={styles.hamburger} aria-label="Menu" onClick={() => setShowMenu(!showMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>

        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.webp" alt="Sider Lehenga Logo" width={100} height={40} style={{ objectFit: 'contain' }} />
          </Link>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.searchIcon} aria-label="Search" onClick={() => setShowSearch(!showSearch)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <CartIcon />
        </div>

      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <>
          <div className={styles.menuOverlay} onClick={closeMenu} />
          <div className={styles.mobileMenu}>
            <div className={styles.menuHeader}>
              <h3>Menu</h3>
              <button onClick={closeMenu} className={styles.closeMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <nav className={styles.menuLinks}>
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/shop" onClick={closeMenu}>All Products</Link>
              <Link href="/cart" onClick={closeMenu}>Shopping Cart</Link>
              <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
            </nav>
            <div className={styles.menuCategories}>
              <h4>Collections</h4>
              <Link href="/shop" onClick={closeMenu}>Wedding Lehengas</Link>
              <Link href="/shop" onClick={closeMenu}>Designer Lehengas</Link>
              <Link href="/shop" onClick={closeMenu}>Bridal Lehengas</Link>
              <Link href="/shop" onClick={closeMenu}>Party Wear Lehengas</Link>
              <Link href="/shop" onClick={closeMenu}>Heavy Embroidery Lehengas</Link>
              <Link href="/shop" onClick={closeMenu}>Haldi & Mehndi Lehenga</Link>
            </div>
          </div>
        </>
      )}

      {/* Search Modal */}
      {showSearch && (
        <>
          <div className={styles.searchOverlay} onClick={() => setShowSearch(false)} />
          <div className={styles.searchModal}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search for lehengas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchSubmit}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button type="button" onClick={() => setShowSearch(false)} className={styles.searchClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </nav>
  );
}
