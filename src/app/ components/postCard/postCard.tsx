'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { deletePost } from '../../actions/deletePost';
import PostWithUser from '../../interface/postWithUserInterface';
import { useState } from 'react';
import ConfirmationModal from '../confirmationModal/confirmationModal';

interface PostCardProps {
  post: PostWithUser;
  handleDeletePost: (id: number) => void;
}

export default function PostCard({ post, handleDeletePost }: PostCardProps) {
  const [showModal, setShowModal] = useState(false);

  function truncateString(str: string, maxLength: number) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  async function handleDelete(id: number) {
    try {
      await deletePost(id);
      handleDeletePost(id);
      setShowModal(false);
    } catch (error) {
      console.error(`Failed to delete post with id: ${id}`, error);
    }
  }

  return (
    <>
      <article key={post.id} className={styles.cardWrapper}>
        <div className={styles.postContent}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.cardImage}
              src={'https://picsum.photos/seed/picsum/800/600'}
              alt={'image placeholder'}
              fill={true}
              objectFit='cover'
            />
          </div>
          <div className={styles.titleWrapper}>
            <h2 className={styles.cardTitle}>
              {truncateString(post.title, 65)}
            </h2>
          </div>
          <p>{post.body}</p>
        </div>
        <div className={styles.rightContent}>
          <p className={styles.cardUser}>By: {post.user.name}</p>
          <button
            className={styles.deleteButton}
            onClick={() => setShowModal(true)}
          >
            <Image
              className={styles.deleteIcon}
              src={'/delete.svg'}
              alt={'delete image'}
              width={30}
              height={30}
            />
          </button>
        </div>
      </article>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(post.id)}
        title='Are you sure you want to delete this post?'
      />
    </>
  );
}
