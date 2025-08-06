import React from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Plus, 
  TrendingUp, 
  Users,
  Eye,
  Building
} from 'lucide-react';

interface RightSideBarProps {
  onTopicClick?: (topic: string) => void;
}

function RightSideBar({ onTopicClick }: RightSideBarProps) {
  return (
    <div className="lg:col-span-1">
            <Card className="p-4 shadow-card bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">People you may know</h4>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <SuggestedConnection 
                  name="Alice Cooper"
                  title="Marketing Director"
                  mutualConnections={5}
                />
                <SuggestedConnection 
                  name="Bob Wilson"
                  title="Data Scientist"
                  mutualConnections={12}
                />
                <SuggestedConnection 
                  name="Carol Davis"
                  title="Product Designer"
                  mutualConnections={3}
                />
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
  name: string;
  title: string;
  mutualConnections: number;
}

const SuggestedConnection: React.FC<SuggestedConnectionProps> = ({ name, title, mutualConnections }) => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
      {name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <h5 className="font-medium text-sm truncate">{name}</h5>
      <p className="text-xs text-muted-foreground truncate">{title}</p>
      <p className="text-xs text-muted-foreground">{mutualConnections} mutual connections</p>
    </div>
    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
      Connect
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