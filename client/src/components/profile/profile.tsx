// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { 
//   Camera, 
//   MapPin, 
//   Users, 
//   Edit, 
//   Plus, 
//   MoreHorizontal,
//   MessageCircle,
//   Share2,
//   Heart,
//   Bookmark
// } from "lucide-react";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const { user } = useSelector((state: any) => state.profile);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation - keeping existing one */}
//       <div className="sticky top-0 z-50 bg-background border-b">
//         <div className="max-w-6xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-6">
//               <h1 className="text-2xl font-bold text-primary">LinkedPro</h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Profile Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Profile Header Card */}
//             <Card>
//               <div className="relative">
//                 {/* Cover Photo */}
//                 <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-t-lg relative">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
//                   >
//                     <Camera className="h-4 w-4" />
//                   </Button>
//                 </div>

//                 {/* Profile Info */}
//                 <CardContent className="relative pt-0 pb-6">
//                   {/* Profile Picture */}
//                   <div className="absolute -top-20 left-6">
//                     <Avatar className="h-32 w-32 border-4 border-background">
//                       <AvatarImage src="/lovable-uploads/279df4c1-4a67-48cb-88d2-ee7e85bce433.png" />
//                       <AvatarFallback className="text-2xl">{user ? user.name : ""}</AvatarFallback>
//                     </Avatar>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border"
//                     >
//                       <Camera className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex justify-end space-x-2 pt-4">
//                     <Button variant="outline" size="sm">
//                       <Edit className="h-4 w-4 mr-2" />
//                       Edit profile
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       Add profile section
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   {/* Profile Details */}
//                   <div className="mt-16 space-y-4">
//                     <div>
//                       <h1 className="text-3xl font-bold">Shivdutt Bhadakwad</h1>
//                       <p className="text-xl text-muted-foreground mt-1">
//                         Full Stack Developer | MERN | DevOps | BE Computer Engineering 3rd Yr
//                       </p>
//                       <div className="flex items-center text-muted-foreground mt-2">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         <span>Maharashtra, India</span>
//                       </div>
//                       <div className="flex items-center mt-2">
//                         <Users className="h-4 w-4 mr-2" />
//                         <span className="text-primary font-medium">241 connections</span>
//                       </div>
//                     </div>

//                     {/* Open to Work */}
//                     <Card className="bg-blue-50 border-blue-200">
//                       <CardContent className="p-4">
//                         <div className="flex items-start space-x-3">
//                           <div className="flex-1">
//                             <h3 className="font-medium">Open to work</h3>
//                             <p className="text-sm text-muted-foreground">
//                               Web Developer, Frontend Developer and Back End Developer roles
//                             </p>
//                             <Button variant="link" className="p-0 h-auto text-blue-600">
//                               Show details
//                             </Button>
//                           </div>
//                           <Button variant="ghost" size="sm">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CardContent>
//               </div>
//             </Card>

//             {/* About Section */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <h2 className="text-xl font-semibold">About</h2>
//                 <Button variant="ghost" size="sm">
//                   <Edit className="h-4 w-4" />
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Hi, I'm a passionate developer with strong expertise in building scalable web applications using the MERN stack and implementing DevOps practices for smooth deployment and automation. I thrive in collaborative environments and love solving real-world problems.
//                 </p>
//                 <Button variant="link" className="p-0 mt-2">
//                   ...see more
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Activity Section */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">Activity</h2>
//                   <p className="text-sm text-muted-foreground">241 followers</p>
//                 </div>
//                 <Button variant="outline">Create a post</Button>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex space-x-4 mb-4">
//                   <Button variant={true ? "default" : "ghost"} size="sm">Posts</Button>
//                   <Button variant="ghost" size="sm">Comments</Button>
//                   <Button variant="ghost" size="sm">Videos</Button>
//                 </div>

//                 {/* Sample Post */}
//                 <div className="border-t pt-4">
//                   <div className="flex items-start space-x-3">
//                     <Avatar>
//                       <AvatarImage src="/lovable-uploads/279df4c1-4a67-48cb-88d2-ee7e85bce433.png" />
//                       <AvatarFallback>SB</AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-1">
//                         <span className="font-medium">Shivdutt Bhadakwad</span>
//                         <span className="text-muted-foreground">•</span>
//                         <span className="text-sm text-muted-foreground">1mo</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         Full Stack Developer | MERN | DevOps ...
//                       </p>
//                       <p className="mt-2">
//                         🚀 Introducing GORR — A Microservices-Based Deployment Platform Built for Speed & Scale! 🚀
//                         <br />
//                         I'm excited to share GORR, a ...more
//                       </p>
                      
//                       {/* Post Actions */}
//                       <div className="flex items-center space-x-6 mt-4 pt-3 border-t">
//                         <Button variant="ghost" size="sm" className="text-muted-foreground">
//                           <Heart className="h-4 w-4 mr-2" />
//                           Like
//                         </Button>
//                         <Button variant="ghost" size="sm" className="text-muted-foreground">
//                           <MessageCircle className="h-4 w-4 mr-2" />
//                           Comment
//                         </Button>
//                         <Button variant="ghost" size="sm" className="text-muted-foreground">
//                           <Share2 className="h-4 w-4 mr-2" />
//                           Share
//                         </Button>
//                         <Button variant="ghost" size="sm" className="text-muted-foreground">
//                           <Bookmark className="h-4 w-4 mr-2" />
//                           Save
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Experience Section */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <h2 className="text-xl font-semibold">Experience</h2>
//                 <div className="flex space-x-2">
//                   <Button variant="ghost" size="sm">
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
//                       <span className="text-sm font-medium">JT</span>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium">Job Title</h3>
//                       <p className="text-muted-foreground">Organization</p>
//                       <p className="text-sm text-muted-foreground">2023 - present</p>
//                     </div>
//                   </div>
//                   <Button variant="outline" className="w-full">
//                     Add experience
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Education Section */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <h2 className="text-xl font-semibold">Education</h2>
//                 <div className="flex space-x-2">
//                   <Button variant="ghost" size="sm">
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-4">
//                     <Avatar className="w-12 h-12">
//                       <AvatarImage src="/lovable-uploads/7667f267-1807-4c67-9ff3-9c94d977e625.png" />
//                       <AvatarFallback>MIT</AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <h3 className="font-medium">Marathwada Mitra Mandal's Institute of Technology, Lohgaon</h3>
//                       <p className="text-muted-foreground">Bachelor's of computer engineering, Computer Engineering</p>
//                       <p className="text-sm text-muted-foreground">2023 - 2026</p>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-start space-x-4">
//                     <Avatar className="w-12 h-12">
//                       <AvatarFallback>KV</AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <h3 className="font-medium">Kendriya Vidyalaya</h3>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Skills Section */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <h2 className="text-xl font-semibold">Skills</h2>
//                 <div className="flex space-x-2">
//                   <Button variant="ghost" size="sm">
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex flex-wrap gap-2">
//                     <Badge variant="secondary">pandas</Badge>
//                     <Badge variant="secondary">NumPy</Badge>
//                     <Badge variant="secondary">React</Badge>
//                     <Badge variant="secondary">Node.js</Badge>
//                     <Badge variant="secondary">MongoDB</Badge>
//                     <Badge variant="secondary">DevOps</Badge>
//                   </div>
//                   <Button variant="link" className="p-0">
//                     Show all 19 skills →
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Language */}
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-medium">Profile language</h3>
//                     <p className="text-sm text-muted-foreground">English</p>
//                   </div>
//                   <Button variant="ghost" size="sm">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Public Profile */}
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-medium">Public profile & URL</h3>
//                     <p className="text-sm text-muted-foreground">
//                       www.linkedin.com/in/shivdutt-bhadakwad-07a462280
//                     </p>
//                   </div>
//                   <Button variant="ghost" size="sm">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* People Also Viewed */}
//             <Card>
//               <CardHeader>
//                 <h3 className="font-medium">People also viewed</h3>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <Avatar>
//                     <AvatarFallback>SR</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="font-medium text-sm">Saksham Raina</h4>
//                     <p className="text-xs text-muted-foreground">Student | SPPU Pune BE Comp 3rd Year</p>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Message
//                   </Button>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Avatar>
//                     <AvatarFallback>JW</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="font-medium text-sm">Jui Waykole</h4>
//                     <p className="text-xs text-muted-foreground">2nd Year Computer Engineering Student</p>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Connect
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
