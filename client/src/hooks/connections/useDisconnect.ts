import { useState } from 'react';
import axios from 'axios';

export const useDisconnect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disconnect = async (otherUserId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connections/disconnect`, { otherUserId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to disconnect');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { disconnect, loading, error };
};
