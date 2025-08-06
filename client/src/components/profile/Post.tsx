import React, { useEffect } from 'react';
import { useUserPosts } from '@/hooks/post/useUserPosts';
import { useDeletePost } from '@/hooks/post/useDeletePost';
import ProfilePostCard from './ProfilePostCard';
import { useSelector } from 'react-redux';

function Post() {
  const { user } = useSelector((state: any) => state.profile);
  const userId = user?._id || user?.id;
  const { posts, fetchUserPosts } = useUserPosts(userId);
  const { deletePost } = useDeletePost();

  useEffect(() => {
    if (userId) fetchUserPosts();
    // eslint-disable-next-line
  }, [userId]);

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
    fetchUserPosts();
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-foreground">Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
        {posts.length === 0 && <div className="text-muted-foreground">No posts yet.</div>}
      </div>
    </section>
  );
}

export default Post;