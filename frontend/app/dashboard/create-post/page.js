'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from './CreatePost.module.scss'; // Import SCSS module
import axios from 'axios';

export default function CreatePost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); 

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the form data to send
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', description);
    postData.append('content', content);
    postData.append('userId', user.uid);
    
    if (image) {
      console.log('Appending image:', image);
      postData.append('image', image); 
    }
  
    
  
    try {
     
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/dashboard'); 
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
    }
  };
  
  
  

  return (
    <form className={styles['create-post-form']} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles['create-post-input']}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className={styles['create-post-textarea']}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <textarea
        className={styles['create-post-textarea']}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        className={styles['create-post-input']}
        onChange={handleImageChange}
        accept="image/*"
      />
      <button className={styles['create-post-button']} type="submit">
        Create Post
      </button>
    </form>
  );
}
