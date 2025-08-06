import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileLoading, setProfileError } from '@/slice/profileSlice';
import { fetchProfile } from '../useFetchUserProfile';

export const useEditAbout = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const editAbout = async (aboutData: any) => {
    console.log("Editing about section for user:", userId, "with data:", aboutData);
    setLoading(true);
    setError(null);
    dispatch(setProfileLoading(true));
    try {
        const token = await sessionStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile/about/${userId}`, aboutData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
      await fetchProfile(dispatch, userId);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to update about section');
      dispatch(setProfileError(err.response?.data || 'Failed to update about section'));
    } finally {
      setLoading(false);
      dispatch(setProfileLoading(false));
    }
  };

  return { editAbout, loading, error };
};
