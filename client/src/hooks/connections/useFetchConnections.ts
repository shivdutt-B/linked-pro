import { useState } from 'react';
import axios from 'axios';

export const useFetchConnections = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/connections/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConnections(res.data.connections);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch connections');
    } finally {
      setLoading(false);
    }
  };

  return { connections, loading, error, fetchConnections };
};
