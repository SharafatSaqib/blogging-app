

import styles from './BlogsPage.module.scss'; 
import Head from 'next/head'; 
import axios from 'axios';
import Link from 'next/link';


export default async function BlogsPage({ searchParams }) {
  const currentPage = parseInt(searchParams.page) || 1; 
  try {
   
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      params: { page: currentPage },
    });

    const { posts, totalPages } = res.data;

    return (
      <div className={styles.blogPage}>
        {/* Dynamic meta tags for SEO */}
        <Head>
          <title>Blog Posts | My Website</title>
          <meta name="description" content="Explore the latest blog posts on My Website. Stay updated with the newest articles on various topics." />
          <meta property="og:title" content="Blog Posts | My Website" />
          <meta property="og:description" content="Explore the latest blog posts on My Website. Stay updated with the newest articles on various topics." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mywebsite.com" />
          <meta property="og:image" content="/images/og-image.jpg" />
          <link rel="canonical" href="https://mywebsite.com" />
        </Head>

        <h1 className={styles.blogTitle}>All Blogs</h1>

        {/* Display posts */}
        <div className={styles.blogPosts}>
          {posts.map((post) => (
            <div key={post._id} className={styles.blogPost}>
              {post.image && (
                <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${post.image || 'placeholder.jpg'}`} // Assuming the image URL is available in the post object
                  alt={post.title}
                  className={styles.blogPostImage}
                />
              )}
              <h2 className={styles.blogPostTitle}>{post.title}</h2>
              <p className={styles.blogPostDescription}>{post.description}</p>
              <a href={`/post/${post._id}`} className={styles.readMoreLink}>
                Read more
              </a>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className={styles.paginationControls}>
          <button
            className={styles.paginationButton}
            disabled={currentPage === 1}
          >
            <a href={`/blogs?page=${Math.max(currentPage - 1, 1)}`} className={styles.paginationButtonLink}>
              Previous
            </a>
          </button>

          <span className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
          >
            <Link href={`/blogs?page=${Math.min(currentPage + 1, totalPages)}`} className={styles.paginationButtonLink}>
              Next
            </Link>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className={styles.blogPage}>
        <h1>Failed to load posts</h1>
      </div>
    );
  }
}
