import ProfileLayout from '@/layout/profile/ProfileLayout'
import React from 'react'
import { useFetchUserProfile } from '@/hooks/useFetchUserProfile';
import { useSelector } from 'react-redux';
import ProfileLoading from '@/components/profile/ProfileLoading';

function ProfilePage() {
  useFetchUserProfile();

  const { loading } = useSelector((state: any) => state.profile);

  if (loading) {
    return <ProfileLoading />;
  }

  return (
    <ProfileLayout />
  )
}

export default ProfilePage