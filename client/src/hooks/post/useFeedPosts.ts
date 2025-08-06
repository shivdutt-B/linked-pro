import { useState, useCallback } from 'react';
import axios from 'axios';

export const useFeedPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(undefined);
  const take = 5;

  const fetchPosts = useCallback(async (filter?: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/post/feed?skip=${skip}&take=${take}`;
      if (filter) url += `&topic=${encodeURIComponent(filter)}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.posts.length < take) setHasMore(false);
      setPosts(prev => [...prev, ...res.data.posts]);
      setSkip(prev => prev + take);
      setCurrentFilter(filter);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [skip]);

  const resetFeed = () => {
    setPosts([]);
    setSkip(0);
    setHasMore(true);
  };

  return { posts, loading, error, fetchPosts, hasMore, resetFeed, currentFilter };
};
