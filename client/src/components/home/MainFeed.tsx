import React, { useEffect } from 'react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { useFeedPosts } from '@/hooks/post/useFeedPosts';


function MainFeed({ filter }: { filter?: string }) {
  const { posts, loading, error, fetchPosts, hasMore, resetFeed } = useFeedPosts();

  useEffect(() => {
    resetFeed();
    fetchPosts(filter);
    // eslint-disable-next-line
  }, [filter]);

  const handlePostCreated = () => {
    resetFeed();
    fetchPosts(filter);
  };

  return (
    <div className="lg:col-span-2">
      <div className="space-y-6">
        <CreatePost onPostCreated={handlePostCreated} />
        {posts.map((post, index) => (
          <PostCard key={post.id || index} post={post} />
        ))}
        {hasMore && (
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-primary text-white rounded mt-2"
              onClick={() => fetchPosts(filter)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View More'}
            </button>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default MainFeed;