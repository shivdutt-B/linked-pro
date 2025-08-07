import axios from 'axios';
import { useState } from 'react';

export const useUnlikePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlikePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/unlike`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to unlike post');
    } finally {
      setLoading(false);
    }
  };

  return { unlikePost, loading, error };
};
