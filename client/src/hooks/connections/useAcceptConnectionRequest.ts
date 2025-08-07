import { useState } from 'react';
import axios from 'axios';

export const useAcceptConnectionRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptRequest = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connections/accept`, { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to accept request');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { acceptRequest, loading, error };
};
