import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Smile,
  Eye
} from 'lucide-react';

interface PostCardProps {
  author: {
    name: string;
    headline: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  shares
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const reactions = [
    { icon: ThumbsUp, label: 'Like', color: 'text-blue-600' },
    { icon: Heart, label: 'Love', color: 'text-red-500' },
    { icon: Smile, label: 'Celebrate', color: 'text-yellow-500' },
  ];

  return (
    <Card className="p-0 shadow-card hover:shadow-card-hover transition-smooth bg-gradient-card">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                author.name.charAt(0)
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-smooth">
                {author.name}
                {author.verified && <span className="ml-1 text-primary">✓</span>}
              </h3>
              <p className="text-sm text-muted-foreground">{author.headline}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground leading-relaxed">{content}</p>
      </div>

      {/* Post Image */}
      {image && (
        <div className="px-4 pb-3">
          <img 
            src={image} 
            alt="Post content" 
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

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
            <span>{likes} reactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{comments} comments</span>
            <span>{shares} shares</span>
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
              className={`flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 ${
                isLiked ? 'text-blue-600' : ''
              }`}
              onClick={() => setIsLiked(!isLiked)}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </Button>
            
            {/* Reaction Panel */}
            {showReactions && (
              <div 
                className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-full shadow-card-hover p-2 flex space-x-1"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 hover:scale-125 transition-bounce ${reaction.color}`}
                  >
                    <reaction.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-blue-50 hover:text-blue-600 ${isBookmarked ? 'text-blue-600' : ''}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;