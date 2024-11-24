
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import axios from 'axios';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  const user = useSelector((state) => state.user.user); 
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        setPosts(res.data.posts);
        setFeaturedPosts(res.data.posts.slice(0, 3)); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReadMore = (postId) => {
    if (!user) {
      router.push('/login'); 
    } else {
      router.push(`/post/${postId}`); 
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to the Most Inspiring Blog on the Web </h1>
          <p className={styles.heroDescription}>Discover insightful articles on various topics. Stay informed and inspired!</p>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.featuredTitle}>Featured Articles</h2>
        <div className={styles.featuredGrid}>
          {featuredPosts.map((post) => (
            <div key={post._id} className={styles.featuredCard}>
              <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${post.image || 'placeholder.jpg'}`} 
                alt={post.title}
                className={styles.featuredImage}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDescription}>{post.description}</p>
                <button onClick={() => handleReadMore(post._id)} className={styles.readMoreButton}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Join Our Community</h2>
        <p className={styles.ctaDescription}>Be the first to know when new content is published. Join our newsletter for updates, tips, and exclusive content.</p>
        <a href="/" className={styles.ctaButton}>Subscribe Now</a>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
