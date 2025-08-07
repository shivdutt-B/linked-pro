import React from "react";
import { Bookmark } from "lucide-react";
import { useSelector } from 'react-redux';
import { useSavedPosts } from '@/hooks/post/useSavedPosts';
import { useUnsavePost } from '@/hooks/post/useUnsavePost';
import PostCard from '../home/PostCard';

const Saved = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const { posts, loading, error } = useSavedPosts();
  const { unsavePost, loading: unsaveLoading } = useUnsavePost();

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <h2 className="text-2xl font-bold mb-2">Saved Posts</h2>
        <p className="text-muted-foreground mb-6">Please sign in to view your saved posts.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h2 className="text-2xl font-bold mb-2">Saved Posts</h2>
      <p className="text-muted-foreground mb-6">All your saved posts will appear here.</p>
      <div className="w-full max-w-xl flex flex-col gap-4">
        {loading ? (
          <span className="text-muted-foreground">Loading...</span>
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className="relative">
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <span className="text-muted-foreground">No saved posts yet.</span>
        )}
      </div>
    </div>
  );
};

export default Saved;
