import React, { useEffect, useState } from 'react';
import { useFetchComments } from '@/hooks/post/useFetchComments';
import { useCommentPost } from '@/hooks/post/useCommentPost';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const Comments = ({ postId, onCommentAdded, initialCount }: { postId: string, onCommentAdded?: (count: number) => void, initialCount?: number }) => {
  const { comments, loading, error, fetchComments } = useFetchComments(postId);
  const { commentPost, loading: commentLoading } = useCommentPost();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  useEffect(() => {
    if (onCommentAdded) onCommentAdded(comments.length);
    // eslint-disable-next-line
  }, [comments.length]);

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await commentPost(postId, commentText);
    setCommentText('');
    fetchComments();
  };

  return (
    <div className="mt-2">
      <div className="mb-2 flex gap-2 p-2">
        <input
          className="flex-1 border rounded p-2 text-sm"
          placeholder="Write a comment..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          disabled={commentLoading}
        />
        <Button onClick={handleComment} disabled={commentLoading || !commentText.trim()} size="sm">
          {commentLoading ? '...' : 'Post'}
        </Button>
      </div>
      {loading ? (
        <div className="text-xs text-muted-foreground">Loading comments...</div>
      ) : error ? (
        <div className="text-xs text-red-500">{error}</div>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2 text-sm p-2 border-b">
              <Avatar className="w-7 h-7">
                {c.user?.displayPic ? (
                  <AvatarImage src={c.user.displayPic} alt={c.user.name || 'User'} />
                ) : (
                  <AvatarFallback>{c.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-foreground">{c.user?.name || 'User'}</div>
                <div className="text-muted-foreground break-words">{c.content}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {comments.length === 0 && <div className="text-sm text-muted-foreground p-2">No comments yet.</div>}
        </div>
      )}
    </div>
  );
};

export default Comments;
