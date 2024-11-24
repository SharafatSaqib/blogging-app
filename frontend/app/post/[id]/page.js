'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { likePost, unlikePost } from '../../../store/reducers/userSlice';
import styles from './Post.module.scss';

const Post = ({ params }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  const likedPosts = useSelector((state) => state.user.likedPosts);

  
  const isLiked = likedPosts.includes(params.id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${params.id}`);
        if (res.data.success) {
          setPost(res.data.data); 
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(params.id));
    } else {
      dispatch(likePost(params.id));
    }
  };

  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.postContainer}>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <img className={styles.postImage} src={`http://localhost:5000/${post.image || 'placeholder.jpg'}`} alt={post.title} />
      <p className={styles.postDescription}>{post.description}</p>
      <div className={styles.postContent}>{post.content}</div>

      <div className={styles.likeContainer}>
        <button
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default Post;
