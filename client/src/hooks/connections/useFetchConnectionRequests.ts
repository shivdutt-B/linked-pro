import { useState } from 'react';
import axios from 'axios';

export const useFetchConnectionRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/connections/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data.requests);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  return { requests, loading, error, fetchRequests };
};
