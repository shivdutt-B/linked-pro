import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileLoading, setProfileError } from '@/slice/profileSlice';
import { fetchProfile } from '../useFetchUserProfile';

export const useAddExperience = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const addExperience = async (experienceData: any) => {
    setLoading(true);
    setError(null);
    dispatch(setProfileLoading(true));
    try {
        const token = await sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/experience/${userId}`, experienceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
      await fetchProfile(dispatch, userId); // Refresh profile data
    } catch (err: any) {
      setError(err.response?.data || 'Failed to add experience');
      dispatch(setProfileError(err.response?.data || 'Failed to add experience'));
    } finally {
      setLoading(false);
      dispatch(setProfileLoading(false));
    }
  };

  return { addExperience, loading, error };
};
