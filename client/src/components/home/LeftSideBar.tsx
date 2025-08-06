import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Plus, TrendingUp, Users, Eye, Building, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LeftSideBar() {
  const { loading, userInfo } = useSelector((state: any) => state.user);
  return (
    <>
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-4 shadow-card bg-gradient-card">
          <div className="text-center">
            <div className="relative">
              <div className="h-16 bg-gradient-hero rounded-t-lg -m-4 mb-0"></div>
              <div className="relative -mt-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl border-4 border-card">
                  {loading ? (
                    <Loader2 className="animate-spin inline-block w-4 h-4 mr-1" />
                  ) : userInfo ? (
                    userInfo.name[0]
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <h3 className="mt-2 font-semibold text-foreground">
              {loading ? (
                <Loader2 className="animate-spin inline-block w-4 h-4 mr-1" />
              ) : userInfo ? (
                userInfo.name
              ) : (
                ""
              )}
            </h3>
            {/* <p className="text-sm text-muted-foreground">Full Stack Developer</p> */}
            <div className="mt-4 pt-4 border-t border-border">
              {/* <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profile views</span>
                    <span className="text-primary font-semibold">142</span>
                  </div> */}
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Connections</span>
                <span className="text-primary font-semibold">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin inline-block w-4 h-4 mr-1" />
                    </>
                  ) : userInfo ? (
                    userInfo.numberOfConnections
                  ) : (
                    0
                  )}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              {loading ? (
                <Loader2 className="animate-spin inline-block w-4 h-4 mr-1" />
              ) : userInfo ? (
                <Link className="display-block w-full h-full flex justify-center items-center" to={`/profile/${userInfo ? userInfo.id : ""}`}>
                View Profile
              </Link>
              ) : (
                ""
              )}
            </Button>
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="p-4 mt-4 shadow-card bg-gradient-card">
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2">
            <QuickLink icon={Users} label="My Network" count="12 new" />
            <QuickLink icon={TrendingUp} label="Analytics" />
            <QuickLink icon={Building} label="Company Pages" />
            <QuickLink icon={Eye} label="Recent Activity" />
          </div>
        </Card>
      </div>
    </>
  );
}

interface QuickLinkProps {
  icon: React.ElementType;
  label: string;
  count?: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon: Icon, label, count }) => (
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer transition-smooth">
    <div className="flex items-center space-x-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm">{label}</span>
    </div>
    {count && <span className="text-xs text-primary">{count}</span>}
  </div>
);

export default LeftSideBar;
