import { useState } from 'react';
import axios from 'axios';

export const useLikePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.post;
    } catch (err: any) {
      setError(err.response?.data || 'Failed to like post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { likePost, loading, error };
};
