import { useState } from 'react';
import axios from 'axios';

export const useSendConnectionRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (toId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connections/request`, { toId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send request');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};
