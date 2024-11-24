'use client';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo and About Section */}
        <div className={styles.footerAbout}>
          <h2 className={styles.footerLogo}>My Blog</h2>
          <p className={styles.footerDescription}>
            Your go-to platform for insightful blogs and articles.
          </p>
        </div>

        {/* Navigation Links */}
        <div className={styles.footerLinks}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerList}>
            <li className={styles.footerItem}>
              <a href="/" className={styles.footerLink}>Home</a>
            </li>
            <li className={styles.footerItem}>
              <a href="/blogs" className={styles.footerLink}>Blogs</a>
            </li>
            <li className={styles.footerItem}>
              <a href="/dashboard" className={styles.footerLink}>Dashboard</a>
            </li>
            <li className={styles.footerItem}>
              <a href="/contact" className={styles.footerLink}>Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className={styles.footerContact}>
          <h3 className={styles.footerTitle}>Contact Us</h3>
          <ul className={styles.footerList}>
            <li className={styles.footerItem}>Email: info@myblog.com</li>
            <li className={styles.footerItem}>Phone: +123 456 7890</li>
            <li className={styles.footerItem}>
              Address: 123 Blog Street, City, Country
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className={styles.footerSocial}>
          <h3 className={styles.footerTitle}>Follow Us</h3>
          <ul className={styles.footerList}>
            <li className={styles.footerItem}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Facebook
              </a>
            </li>
            <li className={styles.footerItem}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Twitter
              </a>
            </li>
            <li className={styles.footerItem}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={styles.footerLink}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className={styles.footerBottom}>
        <p className={styles.footerBottomText}>
          &copy; {new Date().getFullYear()} My Blog. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
