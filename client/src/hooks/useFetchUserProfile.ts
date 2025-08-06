import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { setProfileLoading, setProfileError, setProfileUser } from '@/slice/profileSlice';

export const fetchProfile = async (dispatch: any, userId: string) => {
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

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Extract userId from URL: /profile/:userId
    const match = location.pathname.match(/\/profile\/(.+)$/);
    const userId = match ? match[1] : null;
    if (userId) {
      fetchProfile(dispatch, userId);
    }
  }, [location.pathname, dispatch]);
};
