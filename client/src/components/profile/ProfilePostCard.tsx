import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Trash2, MessageCircle, ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';

interface ProfilePostCardProps {
  post: any;
  onDelete: (postId: string) => void;
}

const ProfilePostCard: React.FC<ProfilePostCardProps> = ({ post, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const userId = useSelector((state: any) => state.user.userInfo?.id || state.user.userInfo?._id);
  const isOwner = userId && post.userId === userId;

  return (
    <Card className="p-4 border bg-background shadow-card hover:shadow-card-hover transition-smooth">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-semibold text-lg text-foreground mb-1">{typeof post.user?.name === 'object' ? JSON.stringify(post.user?.name) : String(post.user?.name || 'You')}</div>
          <div className="text-xs text-muted-foreground mb-1">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
        {isOwner && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon" className="ml-2" title="Delete post">
                <Trash2 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post?</DialogTitle>
              </DialogHeader>
              <div>Are you sure you want to delete this post? This action cannot be undone.</div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setShowDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => { onDelete(post.id); setShowDialog(false); }}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="mb-3 text-foreground text-base leading-relaxed">{typeof post.content === 'object' ? JSON.stringify(post.content) : String(post.content)}</div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-2">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{String(post.likedBy?.length || 0)} Likes</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{String(post.comments?.length || 0)} Comments</span>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePostCard;
