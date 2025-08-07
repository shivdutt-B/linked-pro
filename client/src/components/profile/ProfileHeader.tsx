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
  Bookmark
} from "lucide-react";
import { useSelector } from "react-redux";
import { useEditAbout } from "@/hooks/profile/useEditAbout";
import ConnectionButton from '@/components/connections/ConnectionButton';


function ProfileHeader() {
  const { user } = useSelector((state: any) => state.profile);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = user?._id || user?.id;
  const isOwner = userInfo && (userInfo._id === userId || userInfo.id === userId);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    header: user?.header || "",
    location: user?.location || ""
  });
  const { editAbout, loading, error } = useEditAbout(userId);

  const handleEdit = () => {
    setForm({
      name: user?.name || "",
      header: user?.header || "",
      location: user?.location || ""
    });
    setIsEditing(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    await editAbout(form);
    setIsEditing(false);
  };

  return (
    <Card>
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-t-lg relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <CardContent className="relative pt-0 pb-6">
          {/* Profile Picture */}
          <div className="absolute -top-20 left-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/lovable-uploads/279df4c1-4a67-48cb-88d2-ee7e85bce433.png" />
              <AvatarFallback className="text-2xl">
                  {user ? user.name.slice(0,2) : ""}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            {isOwner && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit profile
              </Button>
            )}
            {!isOwner && userId && (
              <ConnectionButton profileUserId={userId} />
            )}
          </div>

          {/* Profile Details */}
          <div className="mt-16 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{
                user ? user.name : ""
                }</h1>
              <p className="text-xl text-muted-foreground mt-1">
                {
                  user ? user.header : "--"
                }
              </p>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user ? user.location : "--"}</span>
              </div>
              <div className="flex items-center mt-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-primary font-medium">
                  {user && user.numberOfConnections ? user.numberOfConnections : 0} connections
                </span>
              </div>
            </div>
          </div>
          {/* Edit Modal for Header, Name, Location */}
          {isEditing && isOwner && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                <input
                  className="w-full mb-2 p-2 border rounded"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  className="w-full mb-2 p-2 border rounded"
                  name="header"
                  value={form.header}
                  onChange={handleFormChange}
                  placeholder="Profile headline..."
                />
                <input
                  className="w-full mb-2 p-2 border rounded"
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="Location"
                />
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
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
      </div>
    </Card>
  )
}

export default ProfileHeader