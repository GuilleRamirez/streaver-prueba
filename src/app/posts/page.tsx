'use client';
import styles from './styles.module.css';
import PostCard from '../ components/postCard/postCard';
import { fetchPosts } from '../actions/fetchPosts';
import { useState, useEffect } from 'react';
import PostWithUser from '../interface/postWithUserInterface';

export default function Posts() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    loadPosts();
  }, []);

  function handleDeletePost(id: number) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }

  return (
    <div>
      <h1>Posts</h1>
      <div className={styles.cardsWrapper}>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
}
