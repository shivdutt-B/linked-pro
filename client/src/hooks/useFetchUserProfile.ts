import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { setProfileLoading, setProfileError, setProfileUser } from '@/slice/profileSlice';

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      dispatch(setProfileLoading(true));
      dispatch(setProfileError(null));
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`);
        dispatch(setProfileUser(response.data));
      } catch (error: any) {
        dispatch(setProfileError(error.response?.data || 'Failed to fetch user profile'));
      } finally {
        dispatch(setProfileLoading(false));
      }
    };
    // Extract userId from URL: /profile/:userId
    const match = location.pathname.match(/\/profile\/(.+)$/);
    const userId = match ? match[1] : null;
    if (userId) {
      fetchProfile(userId);
    }
  }, [location.pathname, dispatch]);
};
