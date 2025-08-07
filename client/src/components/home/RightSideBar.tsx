import React, { useEffect } from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Plus, 
  TrendingUp, 
  Users,
  Eye,
  Building
} from 'lucide-react';
import { useSuggestedUsers } from '@/hooks/profile/useSuggestedUsers';
import { useNavigate } from 'react-router-dom';

interface RightSideBarProps {
  onTopicClick?: (topic: string) => void;
}

function RightSideBar({ onTopicClick }: RightSideBarProps) {
  const { users, loading, fetchSuggested } = useSuggestedUsers();
  const navigate = useNavigate();
  useEffect(() => { fetchSuggested(); }, []);
  return (
    <div className="lg:col-span-1">
      <Card className="p-4 shadow-card bg-gradient-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">People you may know</h4>
        </div>
        <div className="space-y-3">
          {loading && <div>Loading...</div>}
          {users.map((user) => (
            <SuggestedConnection
              key={user.id}
              id={user.id}
              name={user.name}
              header={user.header}
              displayPic={user.displayPic}
              onView={() => navigate(`/profile/${user.id}`)}
            />
          ))}
          {users.length === 0 && !loading && <div className="text-muted-foreground">No suggestions</div>}
        </div>
      </Card>

      {/* Trending */}
      <Card className="p-4 mt-4 shadow-card bg-gradient-card">
        <h4 className="font-semibold mb-4">Trending in Tech</h4>
        <div className="space-y-3">
          <TrendingTopic topic="Artificial Intelligence" onClick={onTopicClick} />
          <TrendingTopic topic="Remote Work" onClick={onTopicClick} />
          <TrendingTopic topic="Sustainability" onClick={onTopicClick} />
          <TrendingTopic topic="Web3" onClick={onTopicClick} />
        </div>
      </Card>
    </div>
  )
}
interface SuggestedConnectionProps {
  id: string;
  name: string;
  header: string;
  displayPic?: string;
  onView: () => void;
}

const SuggestedConnection: React.FC<SuggestedConnectionProps> = ({ name, header, displayPic, onView }) => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm overflow-hidden">
      {displayPic ? <img src={displayPic} alt={typeof name === 'object' ? JSON.stringify(name) : String(name)} className="w-full h-full object-cover rounded-full" /> : (typeof name === 'object' ? JSON.stringify(name) : String(name.charAt(0)))}
    </div>
    <div className="flex-1 min-w-0">
      <h5 className="font-medium text-sm truncate">{typeof name === 'object' ? JSON.stringify(name) : String(name)}</h5>
      <p className="text-xs text-muted-foreground truncate">{typeof header === 'object' ? JSON.stringify(header) : String(header)}</p>
    </div>
    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto" onClick={onView}>
      view
    </Button>
  </div>
);

interface TrendingTopicProps {
  topic: string;
  onClick?: (topic: string) => void;
}

const TrendingTopic: React.FC<TrendingTopicProps> = ({ topic, onClick }) => (
  <div
    className="cursor-pointer hover:bg-accent p-2 rounded-lg transition-smooth border "
    onClick={() => onClick && onClick(topic)}
  >
    <h5 className="font-medium text-sm">{topic}</h5>
  </div>
);


export default RightSideBar