
'use client';

import { signInWithGoogle } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { useRouter } from 'next/navigation';  
import { FaGoogle } from 'react-icons/fa';
import styles from './Login.module.scss'; 

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

 
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      dispatch(setUser({ user })); 
      router.push('/dashboard'); 
    } catch (error) {
      console.error('Error during Google login', error);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles['login-title']}>Login with Google</h1>
      <button 
        className={styles['login-button']} 
        onClick={handleGoogleLogin}>
        <FaGoogle className={styles['google-icon']} /> Login with Google
      </button>
    </div>
  );
}
