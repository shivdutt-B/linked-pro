import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Bell, 
  Briefcase, 
  Search,
  Menu,
  Bookmark
} from 'lucide-react';
import { useFetchConnectionRequests } from '@/hooks/connections/useFetchConnectionRequests';
import ConnectionRequestsDropdown from '@/components/connections/ConnectionRequestsDropdown';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [showRequests, setShowRequests] = useState(false);
  const { requests, fetchRequests } = useFetchConnectionRequests();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state: any) => state.user.userInfo);

  // Determine which nav is active
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => { fetchRequests(); }, []);

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <span className="block md:hidden">LP</span>
              <span className="hidden md:block">LinkedPro</span>
            </Link>
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search professionals, companies, jobs..." 
                className="pl-10 w-64 bg-muted border-0 focus:bg-card focus:shadow-card"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Always show nav items, horizontal even on small screens */}
            <div className="flex flex-row items-center space-x-4 md:space-x-6">
              <NavItem icon={Home} label="Home" active={isActive('/')} onClick={() => navigate('/')} />
              <NavItem icon={Users} label="Network" active={isActive('/network')} onClick={() => navigate('/network')} />
              {/* <NavItem icon={Briefcase} label="Jobs" /> */}
              {/* <NavItem icon={MessageCircle} label="Messaging" /> */}
              <div className="relative">
                <NavItem icon={Bell} label="Notifications" count={requests.length} active={false} onClick={() => setShowRequests((v) => !v)} />
                {showRequests && (
                  <div className="absolute right-0 mt-2 z-50">
                    <ConnectionRequestsDropdown />
                  </div>
                )}
              </div>
            </div>
            {/* Saved */}
            <NavItem
              icon={Bookmark}
              label="Saved"
              active={isActive('/saved')}
              onClick={() => {
                if (userInfo) {
                  navigate('/saved');
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, count, onClick }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className={`flex flex-col items-center p-2 rounded-lg transition-smooth hover:bg-accent ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}>
        <div className="relative">
          <Icon className="w-5 h-5" />
          {count ? (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {count}
            </span>
          ) : null}
        </div>
        <span className="text-xs mt-1">{label}</span>
      </div>
      {active && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
      )}
    </div>
  );
};

export default Navigation;