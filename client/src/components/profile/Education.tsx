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

export default function Education() {
  const { userInfo } = useSelector((state: any) => state.user);
  const {user} = useSelector((state: any) => state.profile);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {user?.educations?.length > 0 ? (
          user.educations.map((edu, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-4">
                {/* <Avatar className="w-12 h-12">
                  <AvatarImage src="/lovable-uploads/7667f267-1807-4c67-9ff3-9c94d977e625.png" />
                  <AvatarFallback>MIT</AvatarFallback>
                </Avatar> */}
                <div className="flex-1">
                  <h3 className="font-medium">{edu.school}</h3>
                  <p className="text-muted-foreground">{edu.title}</p>
                  <p className="text-sm text-muted-foreground">Duration - {edu.year} years</p>
                </div>
              </div>
              {index !== user.educations.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No education info available.</p>
        )}
      </CardContent>
    </Card>
  );
}
