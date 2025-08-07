import { useState } from 'react';
import axios from 'axios';

export const useCancelConnectionRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelRequest = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connections/cancel`, { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to cancel request');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { cancelRequest, loading, error };
};
