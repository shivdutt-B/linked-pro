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


function ProfileHeader() {
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
                      <AvatarFallback className="text-2xl">SB</AvatarFallback>
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
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Add profile section
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Profile Details */}
                  <div className="mt-16 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold">Shivdutt Bhadakwad</h1>
                      <p className="text-xl text-muted-foreground mt-1">
                        Full Stack Developer | MERN | DevOps | BE Computer Engineering 3rd Yr
                      </p>
                      <div className="flex items-center text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Maharashtra, India</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-primary font-medium">241 connections</span>
                      </div>
                    </div>

                    {/* Open to Work */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <h3 className="font-medium">Open to work</h3>
                            <p className="text-sm text-muted-foreground">
                              Web Developer, Frontend Developer and Back End Developer roles
                            </p>
                            <Button variant="link" className="p-0 h-auto text-blue-600">
                              Show details
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </div>
            </Card>
  )
}

export default ProfileHeader