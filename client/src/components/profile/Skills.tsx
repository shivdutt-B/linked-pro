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

function Skills() {
  return (
    <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Skills</h2>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">pandas</Badge>
                    <Badge variant="secondary">NumPy</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">DevOps</Badge>
                  </div>
                  <Button variant="link" className="p-0">
                    Show all 19 skills →
                  </Button>
                </div>
              </CardContent>
            </Card>
  )
}

export default Skills