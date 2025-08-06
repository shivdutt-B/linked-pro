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

function Experinece() {
  return (
    <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Experience</h2>
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
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-medium">JT</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Job Title</h3>
                      <p className="text-muted-foreground">Organization</p>
                      <p className="text-sm text-muted-foreground">2023 - present</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add experience
                  </Button>
                </div>
              </CardContent>
            </Card>
  )
}

export default Experinece