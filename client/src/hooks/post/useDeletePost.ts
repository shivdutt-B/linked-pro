import { useState } from 'react';
import axios from 'axios';

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data || 'Failed to delete post');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
};
