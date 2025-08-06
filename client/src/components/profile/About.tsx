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

function About() {
  const { userInfo, loading } = useSelector((state: any) => state.user);
  const {user} = useSelector((state: any) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">About</h2>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>

        <p className="text-muted-foreground leading-relaxed">
          { user ? (
            user.about
          ) : (
            ""
          )}
        </p>
      </CardContent>
    </Card>
  );
}

export default About;
