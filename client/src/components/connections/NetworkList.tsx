import React, { useEffect } from 'react';
import { useFetchConnections } from '@/hooks/connections/useFetchConnections';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const NetworkList: React.FC = () => {
  const { connections, loading, fetchConnections } = useFetchConnections();
  const navigate = useNavigate();

  useEffect(() => { fetchConnections(); }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Connections</h2>
      {loading && <div>Loading...</div>}
      {connections.length === 0 && <div className="text-muted-foreground">No connections yet.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {connections.map((c) => {
          const other = c.fromId === c.toId ? c.from : (c.fromId === c.toId ? c.to : (c.fromId !== c.toId ? (c.fromId === c.from.id ? c.to : c.from) : c.to));
          return (
            <div
              key={c.id}
              className="flex items-center gap-4 border p-4 rounded-xl bg-card shadow-card hover:shadow-card-hover cursor-pointer transition-smooth"
              onClick={() => other?.id && navigate(`/profile/${other.id}`)}
            >
              <Avatar className="w-14 h-14">
                {other?.displayPic ? (
                  <AvatarImage src={other.displayPic} alt={other.name || 'User'} />
                ) : (
                  <AvatarFallback>{other?.name?.charAt(0) || 'U'}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{other?.name || 'User'}</div>
                <div className="text-xs text-muted-foreground">{other?.email}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkList;
