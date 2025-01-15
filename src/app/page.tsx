'use client';
import styles from './styles.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome</h1>
        <div className={styles.linkWrapper}>
          <Link href='/posts' className={styles.link}>
            Go to Posts
          </Link>
          <Link href='/createPosts' className={styles.link}>
            Go to Create Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
