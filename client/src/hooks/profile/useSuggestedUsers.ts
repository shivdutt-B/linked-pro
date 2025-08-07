import { useState } from 'react';
import axios from 'axios';

export const useSuggestedUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggested = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/suggested`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchSuggested };
};
