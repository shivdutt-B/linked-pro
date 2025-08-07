import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSavedPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/post/saved`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched saved posts:", res.data);
        setPosts(res.data.posts || []);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch saved posts');
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  return { posts, loading, error };
};
