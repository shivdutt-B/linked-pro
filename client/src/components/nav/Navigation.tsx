import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Bell, 
  Briefcase, 
  Search,
  Menu
} from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LinkedPro
            </div>
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search professionals, companies, jobs..." 
                className="pl-10 w-64 bg-muted border-0 focus:bg-card focus:shadow-card"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <NavItem icon={Home} label="Home" active />
              <NavItem icon={Users} label="Network" />
              <NavItem icon={Briefcase} label="Jobs" />
              <NavItem icon={MessageCircle} label="Messaging" />
              <NavItem icon={Bell} label="Notifications" count={3} />
            </div>
            
            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
              <span className="hidden md:block text-sm font-medium">You</span>
            </div>
            
            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
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
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, count }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className={`flex flex-col items-center p-2 rounded-lg transition-smooth hover:bg-accent ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}>
        <div className="relative">
          <Icon className="w-5 h-5" />
          {count && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {count}
            </span>
          )}
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