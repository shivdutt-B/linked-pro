import { useState } from 'react';
import axios from 'axios';

export const useSavePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.post;
    } catch (err: any) {
      setError(err.response?.data || 'Failed to save post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { savePost, loading, error };
};
