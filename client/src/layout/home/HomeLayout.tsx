import React, { useState } from 'react';
import Navigation from '@/components/nav/Navigation'
import LeftSideBar from '@/components/home/LeftSideBar'
import MainFeed from '@/components/home/MainFeed'
import RightSideBar from '@/components/home/RightSideBar'

function HomeLayout() {
  const [feedFilter, setFeedFilter] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <LeftSideBar />
    
            {/* Main Feed */}
            <div className="lg:col-span-2">
                <MainFeed filter={feedFilter} />
            </div>
    
            {/* Right Sidebar */}
            <RightSideBar onTopicClick={setFeedFilter} />
        </div>
        </div>
        </div>

  )
}

export default HomeLayout