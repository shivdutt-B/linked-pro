import { useState } from 'react';
import axios from 'axios';

export const useUserPosts = (userId: string) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/post/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data.posts);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch user posts');
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, fetchUserPosts };
};
