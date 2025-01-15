'use client';

import { useState, useEffect } from 'react';
import fetchUsers from '../actions/fetchUsers';
import styles from './styles.module.css';
import createPost from '../actions/createPost';
import showToast from '../utils/showToast';

interface User {
  id: number;
  name: string;
}

export default function CreatePosts() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
        showToast('Failed to fetch users, please reload the page', true);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      await createPost({
        title: formData.title,
        body: formData.body,
        userId: Number(formData.userId),
      });
      showToast('Post created successfully');
      setFormData({ title: '', body: '', userId: '' }); // Reset form
    } catch (error) {
      console.error('Failed to create post', error);
      showToast('Failed to create post, please try again', true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Create New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='body'>Body:</label>
          <textarea
            id='body'
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='userId'>User:</label>
          <select
            id='userId'
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            required
          >
            <option value=''>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
