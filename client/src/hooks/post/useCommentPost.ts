import { useState } from 'react';
import axios from 'axios';

export const useCommentPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commentPost = async (postId: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/comment`, { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.comment;
    } catch (err: any) {
      setError(err.response?.data || 'Failed to comment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { commentPost, loading, error };
};
