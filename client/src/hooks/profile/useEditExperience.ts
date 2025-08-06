import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfileLoading, setProfileError } from '@/slice/profileSlice';
import { fetchProfile } from '../useFetchUserProfile';

export const useEditExperience = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const editExperience = async (experienceData: any) => {
    setLoading(true);
    setError(null);
    dispatch(setProfileLoading(true));
    try {
      const token = await sessionStorage.getItem('token');
      // Convert dates to ISO strings if present
      const dataToSend = {
        ...experienceData,
        fromDate: experienceData.fromDate ? new Date(experienceData.fromDate).toISOString() : undefined,
        toDate: experienceData.toDate ? new Date(experienceData.toDate).toISOString() : undefined,
      };
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile/experience/${userId}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      await fetchProfile(dispatch, userId); // Refresh profile data
    } catch (err: any) {
      setError(err.response?.data || 'Failed to update experience section');
      dispatch(setProfileError(err.response?.data || 'Failed to update experience section'));
    } finally {
      setLoading(false);
      dispatch(setProfileLoading(false));
    }
  };

  return { editExperience, loading, error };
};
