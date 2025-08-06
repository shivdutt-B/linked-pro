import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ThumbsUp, Smile } from 'lucide-react';
import { useLikePost } from '@/hooks/post/useLikePost';
import { useSavePost } from '@/hooks/post/useSavePost';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';

interface PostCardProps {
  post: any;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const [isLiked, setIsLiked] = useState(post.likedBy?.length > 0);
  const [isBookmarked, setIsBookmarked] = useState(post.savedBy?.length > 0);
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
  const { likePost } = useLikePost();
  const { savePost } = useSavePost();
  const navigate = useNavigate();

  const handleLike = async () => {
    await likePost(post.id);
    setIsLiked((prev) => !prev);
  };

  const handleSave = async () => {
    await savePost(post.id);
    setIsBookmarked((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.userId}`);
  };

  return (
    <Card className="p-0 shadow-card hover:shadow-card-hover transition-smooth bg-gradient-card">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold cursor-pointer" onClick={handleProfileClick}>
              {post.user?.displayPic ? (
                <img src={post.user.displayPic} alt={post.user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                post.user?.name?.charAt(0) || 'U'
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-smooth" onClick={handleProfileClick}>
                {post.user?.name || 'User'}
              </h3>
              <p className="text-sm text-muted-foreground">{post.user?.header || ''}</p>
              <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          {onDelete && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(post.id)}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground leading-relaxed">{post.content}</p>
      </div>
      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white" />
              </div>
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
            <span>{post.likedBy?.length || 0} reactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{commentCount} comments</span>
            <span>{post.shares || 0} shares</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 ${isLiked ? 'text-blue-600' : ''}`}
              onClick={handleLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </Button>
            {/* Reaction Panel (optional) */}
            {showReactions && (
              <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-full shadow-card-hover p-2 flex space-x-1"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {/* ...reaction buttons... */}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600" onClick={() => setShowComments((v) => !v)}>
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
          {/* <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-blue-50 hover:text-blue-600 ${isBookmarked ? 'text-blue-600' : ''}`}
            onClick={handleSave}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && <Comments postId={post.id} onCommentAdded={setCommentCount} initialCount={commentCount} />}
    </Card>
  );
};

export default PostCard;