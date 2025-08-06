import CreatePost from './CreatePost';
import PostCard from './PostCard';


function MainFeed() {

    const samplePosts = [
    {
      author: {
        name: "Sarah Johnson",
        headline: "Senior Software Engineer at TechCorp",
        verified: true
      },
      content: "Excited to share that our team just launched a new AI-powered feature that improves user experience by 40%! The collaboration between design and engineering was incredible. Here's what we learned during the development process...",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      timestamp: "2h ago",
      likes: 127,
      comments: 23,
      shares: 8
    },
    {
      author: {
        name: "Michael Chen",
        headline: "Product Manager | Startup Enthusiast"
      },
      content: "Just attended an amazing conference on the future of work. Key takeaway: remote collaboration tools will continue to evolve, but human connection remains irreplaceable. What's your take on the future of workplace culture?",
      timestamp: "4h ago",
      likes: 89,
      comments: 31,
      shares: 12
    },
    {
      author: {
        name: "Emma Rodriguez",
        headline: "UX Designer | Design Systems Advocate",
        verified: true
      },
      content: "Design tip of the day: Always consider accessibility from the start, not as an afterthought. Small changes in color contrast and typography can make your product usable for millions more people. 🎨",
      timestamp: "6h ago",
      likes: 203,
      comments: 45,
      shares: 28
    }
  ];
  
  return (
    <div className="lg:col-span-2">
            <div className="space-y-6">
              <CreatePost />
              
              {samplePosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </div>
  )
}

export default MainFeed