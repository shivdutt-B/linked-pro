import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Calendar,
  Smile,
  X
} from 'lucide-react';
import { useCreatePost } from '@/hooks/post/useCreatePost';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CreatePost = ({ onPostCreated }: { onPostCreated?: () => void }) => {
  const { userInfo } = useSelector((state: any) => state.user);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { createPost, loading } = useCreatePost();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (postContent.trim()) {
      await createPost(postContent); // Only text for now
      setPostContent('');
      setSelectedImage(null);
      setIsExpanded(false);
      if (onPostCreated) onPostCreated();
    }
  };

  const postOptions = [
    // { icon: ImageIcon, label: 'Photo', color: 'text-blue-600', action: () => document.getElementById('image-upload')?.click() },
    // { icon: Video, label: 'Video', color: 'text-green-600' },
    // { icon: FileText, label: 'Article', color: 'text-orange-600' },
    // { icon: Calendar, label: 'Event', color: 'text-purple-600' },
  ];

  if (!userInfo) {
    return (
      <Card className="p-4 shadow-card bg-gradient-card text-center">
        <div className="text-muted-foreground">
          <Link
            to="/auth"
            className="text-blue-600 hover:underline"
            >
              Sign in 
            </Link>
            { " " }
           to create a post.
          </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-card bg-gradient-card">
      {/* Profile and Input */}
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
          {
            userInfo &&
            userInfo.name.charAt(0).toUpperCase()
          }
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
              if (!isExpanded && e.target.value.length > 0) {
                setIsExpanded(true);
              }
            }}
            className="border-0 resize-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            rows={isExpanded ? 4 : 1}
          />
          
          {/* Image Preview */}
          {selectedImage && (
            <div className="mt-3 relative">
              <img src={selectedImage} alt="Preview" className="max-w-full rounded-lg max-h-64 object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Action Buttons */}
      {(isExpanded || postContent.length > 0) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {postOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-2 hover:bg-accent ${option.color}`}
                  onClick={option.action}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:bg-accent text-yellow-600"
              >
                {/* <Smile className="w-4 h-4" />
                <span className="hidden sm:inline">Feeling</span> */}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setPostContent('');
                  setSelectedImage(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="professional"
                size="sm"
                disabled={!postContent.trim() || loading}
                onClick={handlePost}
              >
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions (when not expanded) */}
      {!isExpanded && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {postOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-accent ${option.color}`}
                onClick={option.action}
              >
                <option.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CreatePost;