import { useState } from 'react';
import axios from 'axios';

export const useFetchComments = (postId: string) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data.comments);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  return { comments, loading, error, fetchComments };
};
