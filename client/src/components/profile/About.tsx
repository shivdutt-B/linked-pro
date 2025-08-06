import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  MapPin,
  Users,
  Edit,
  Plus,
  MoreHorizontal,
  MessageCircle,
  Share2,
  Heart,
  Loader2,
  Bookmark,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useEditAbout } from "@/hooks/profile/useEditAbout";

function About() {
  const { user } = useSelector((state: any) => state.profile);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = user?._id || user?.id;
  const isOwner = userInfo && (userInfo._id === userId || userInfo.id === userId);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(user?.about || "");
  const { editAbout, loading, error } = useEditAbout(userId);

  const handleEdit = () => {
    setAboutText(user?.about || "");
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    await editAbout({ about: aboutText });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">About</h2>
        {isOwner && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {user ? user.about : ""}
        </p>
        {isEditing && isOwner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit About</h3>
              <textarea
                className="w-full mb-2 p-2 border rounded"
                rows={5}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="About you..."
              />
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={loading}>
                  {loading ? "Saving..." : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default About;
