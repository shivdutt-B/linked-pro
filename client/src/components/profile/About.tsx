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

function About() {
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
                  Hi, I'm a passionate developer with strong expertise in building scalable web applications using the MERN stack and implementing DevOps practices for smooth deployment and automation. I thrive in collaborative environments and love solving real-world problems.
                </p>
                <Button variant="link" className="p-0 mt-2">
                  ...see more
                </Button>
              </CardContent>
            </Card>
  )
}

export default About