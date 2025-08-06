// import React from 'react';
// import Navigation from '../components/nav/Navigation';
// import CreatePost from '../components/CreatePost';
// import PostCard from '../components/PostCard';
// import { Button } from '../components/ui/button';
// import { Card } from '../components/ui/card';
// import { 
//   Plus, 
//   TrendingUp, 
//   Users,
//   Eye,
//   Building
// } from 'lucide-react';

// const Index = () => {
//   // Sample data for posts
//   const samplePosts = [
//     {
//       author: {
//         name: "Sarah Johnson",
//         headline: "Senior Software Engineer at TechCorp",
//         verified: true
//       },
//       content: "Excited to share that our team just launched a new AI-powered feature that improves user experience by 40%! The collaboration between design and engineering was incredible. Here's what we learned during the development process...",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
//       timestamp: "2h ago",
//       likes: 127,
//       comments: 23,
//       shares: 8
//     },
//     {
//       author: {
//         name: "Michael Chen",
//         headline: "Product Manager | Startup Enthusiast"
//       },
//       content: "Just attended an amazing conference on the future of work. Key takeaway: remote collaboration tools will continue to evolve, but human connection remains irreplaceable. What's your take on the future of workplace culture?",
//       timestamp: "4h ago",
//       likes: 89,
//       comments: 31,
//       shares: 12
//     },
//     {
//       author: {
//         name: "Emma Rodriguez",
//         headline: "UX Designer | Design Systems Advocate",
//         verified: true
//       },
//       content: "Design tip of the day: Always consider accessibility from the start, not as an afterthought. Small changes in color contrast and typography can make your product usable for millions more people. 🎨",
//       timestamp: "6h ago",
//       likes: 203,
//       comments: 45,
//       shares: 28
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar */}
//           <div className="lg:col-span-1">
//             <Card className="p-4 shadow-card bg-gradient-card">
//               <div className="text-center">
//                 <div className="relative">
//                   <div className="h-16 bg-gradient-hero rounded-t-lg -m-4 mb-0"></div>
//                   <div className="relative -mt-8">
//                     <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl border-4 border-card">
//                       J
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="mt-2 font-semibold text-foreground">John Doe</h3>
//                 <p className="text-sm text-muted-foreground">Full Stack Developer</p>
//                 <div className="mt-4 pt-4 border-t border-border">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Profile views</span>
//                     <span className="text-primary font-semibold">142</span>
//                   </div>
//                   <div className="flex justify-between text-sm mt-2">
//                     <span className="text-muted-foreground">Connections</span>
//                     <span className="text-primary font-semibold">1,234</span>
//                   </div>
//                 </div>
//                 <Button variant="outline" size="sm" className="w-full mt-4">
//                   View Profile
//                 </Button>
//               </div>
//             </Card>

//             {/* Quick Links */}
//             <Card className="p-4 mt-4 shadow-card bg-gradient-card">
//               <h4 className="font-semibold mb-3">Quick Links</h4>
//               <div className="space-y-2">
//                 <QuickLink icon={Users} label="My Network" count="12 new" />
//                 <QuickLink icon={TrendingUp} label="Analytics" />
//                 <QuickLink icon={Building} label="Company Pages" />
//                 <QuickLink icon={Eye} label="Recent Activity" />
//               </div>
//             </Card>
//           </div>

//           {/* Main Feed */}
//           <div className="lg:col-span-2">
//             <div className="space-y-6">
//               <CreatePost />
              
//               {samplePosts.map((post, index) => (
//                 <PostCard key={index} {...post} />
//               ))}
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="lg:col-span-1">
//             <Card className="p-4 shadow-card bg-gradient-card">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-semibold">People you may know</h4>
//                 <Button variant="ghost" size="icon">
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>
//               <div className="space-y-3">
//                 <SuggestedConnection 
//                   name="Alice Cooper"
//                   title="Marketing Director"
//                   mutualConnections={5}
//                 />
//                 <SuggestedConnection 
//                   name="Bob Wilson"
//                   title="Data Scientist"
//                   mutualConnections={12}
//                 />
//                 <SuggestedConnection 
//                   name="Carol Davis"
//                   title="Product Designer"
//                   mutualConnections={3}
//                 />
//               </div>
//             </Card>

//             {/* Trending */}
//             <Card className="p-4 mt-4 shadow-card bg-gradient-card">
//               <h4 className="font-semibold mb-4">Trending in Tech</h4>
//               <div className="space-y-3">
//                 <TrendingTopic topic="Artificial Intelligence" posts="2,341 posts" />
//                 <TrendingTopic topic="Remote Work" posts="1,847 posts" />
//                 <TrendingTopic topic="Sustainability" posts="892 posts" />
//                 <TrendingTopic topic="Web3" posts="1,205 posts" />
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface QuickLinkProps {
//   icon: React.ElementType;
//   label: string;
//   count?: string;
// }

// const QuickLink: React.FC<QuickLinkProps> = ({ icon: Icon, label, count }) => (
//   <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer transition-smooth">
//     <div className="flex items-center space-x-3">
//       <Icon className="w-4 h-4 text-muted-foreground" />
//       <span className="text-sm">{label}</span>
//     </div>
//     {count && <span className="text-xs text-primary">{count}</span>}
//   </div>
// );

// interface SuggestedConnectionProps {
//   name: string;
//   title: string;
//   mutualConnections: number;
// }

// const SuggestedConnection: React.FC<SuggestedConnectionProps> = ({ name, title, mutualConnections }) => (
//   <div className="flex items-center space-x-3">
//     <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
//       {name.charAt(0)}
//     </div>
//     <div className="flex-1 min-w-0">
//       <h5 className="font-medium text-sm truncate">{name}</h5>
//       <p className="text-xs text-muted-foreground truncate">{title}</p>
//       <p className="text-xs text-muted-foreground">{mutualConnections} mutual connections</p>
//     </div>
//     <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
//       Connect
//     </Button>
//   </div>
// );

// interface TrendingTopicProps {
//   topic: string;
//   posts: string;
// }

// const TrendingTopic: React.FC<TrendingTopicProps> = ({ topic, posts }) => (
//   <div className="cursor-pointer hover:bg-accent p-2 rounded-lg transition-smooth">
//     <h5 className="font-medium text-sm">{topic}</h5>
//     <p className="text-xs text-muted-foreground">{posts}</p>
//   </div>
// );

// export default Index;