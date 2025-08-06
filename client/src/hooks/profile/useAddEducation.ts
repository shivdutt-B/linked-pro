import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileLoading, setProfileError } from '@/slice/profileSlice';
import { fetchProfile } from '../useFetchUserProfile';

export const useAddEducation = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const addEducation = async (educationData: any) => {
    setLoading(true);
    setError(null);
    dispatch(setProfileLoading(true));
    try {
        const token = await sessionStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/education/${userId}`, educationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
      await fetchProfile(dispatch, userId);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to add education');
      dispatch(setProfileError(err.response?.data || 'Failed to add education'));
    } finally {
      setLoading(false);
      dispatch(setProfileLoading(false));
    }
  };

  return { addEducation, loading, error };
};
