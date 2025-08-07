import { useState } from 'react';
import axios from 'axios';

export const useRejectConnectionRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rejectRequest = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connections/reject`, { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reject request');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { rejectRequest, loading, error };
};
