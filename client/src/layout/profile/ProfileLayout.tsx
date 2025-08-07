import Navigation from "@/components/nav/Navigation";
import About from "@/components/profile/About";
import Education from "@/components/profile/Education";
import Experinece from "@/components/profile/Experinece";
import Profile from "@/components/profile/profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Skills from "@/components/profile/Skills";
import React from "react";
import Post from "@/components/profile/Post";

function ProfileLayout() {
  return (
        <>
        {/* <Navigation /> */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        <ProfileHeader />
        <About />
        <Post />
        <Experinece />
        <Education />
        <Skills />
        </div>
        </>
  );
}

export default ProfileLayout;
