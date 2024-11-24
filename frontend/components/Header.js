'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '../store/reducers/userSlice';
import styles from './Header.module.scss';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>My Blog</h1>
      </div>

      {/* Centered navigation links */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Login/Logout buttons inside the hamburger menu (at the bottom) */}
        <div className={`${styles.authButtonsMobile} ${isMenuOpen ? styles.showMobileAuth : ''}`}>
          {user ? (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hamburger button for mobile */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? 'X' : '☰'}
      </button>

      {/* Desktop Login/Logout buttons on the top-right */}
      <div className={styles.authButtonsDesktop}>
        {user ? (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
