import axios from 'axios';
import { useState } from 'react';

export const useUnsavePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unsavePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/unsave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to unsave post');
    } finally {
      setLoading(false);
    }
  };

  return { unsavePost, loading, error };
};
