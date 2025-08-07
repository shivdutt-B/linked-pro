import React from "react";
import { Bookmark } from "lucide-react";
import { useUnsavePost } from '@/hooks/post/useUnsavePost';

const SavedPosts = () => {
  const { unsavePost, loading: unsaveLoading } = useUnsavePost();
  // Placeholder UI for saved posts
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Saved Posts</h1>
      </div>
      <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
        <Bookmark className="w-16 h-16 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground mb-2">You haven't saved any posts yet.</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          onClick={() => unsavePost('example-id')}
          disabled={unsaveLoading}
        >
          {unsaveLoading ? 'Unsaving...' : 'Unsave Example'}
        </button>
        <p className="text-sm text-muted-foreground">Posts you save will appear here for quick access.</p>
      </div>
    </div>
  );
};

export default SavedPosts;
