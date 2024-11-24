'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Dashboard.module.scss';
import Link from 'next/link';
import axios from 'axios';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.user.user); 

  useEffect(() => {
    const loadUserPosts = async () => {
      if (!user || !user.uid) {
        console.warn('User not logged in');
        setPosts([]); 
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/userId`, {
          params: { userId: user.uid, page: currentPage },
        });

        const { posts, totalPages } = response.data;
        setPosts(Array.isArray(posts) ? posts : []);
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserPosts();
  }, [user, currentPage]); 

  return (
    <div className={styles.dashboard}>
      <h1 className={styles['dashboard-title']}>My Blogs</h1>

      <div className={styles['create-post-container']}>
        <Link href="/dashboard/create-post">
          <button className={styles['create-post-btn']}>Create New Blog</button>
        </Link>
      </div>

      {loading ? (
        <p className={styles['dashboard-loading']}>Loading blogs...</p>
      ) : (
        <div className={styles['dashboard-posts']}>
          {posts.length === 0 ? (
            <p className={styles['dashboard-no-posts']}>
              You have not created any blogs yet.
            </p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className={styles['dashboard-post']}>
                {post.image && (
                  <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${post.image || 'placeholder.jpg'}`} 
                    alt={post.title}
                    className={styles['dashboard-post-image']}
                  />
                )}
                <h2 className={styles['dashboard-post-title']}>{post.title}</h2>
                <p className={styles['dashboard-post-description']}>
                  {post.description}
                </p>
                <Link href={`/post/${post._id}`} className={styles['dashboard-post-link']}>
                  Read more
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination controls */}
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
