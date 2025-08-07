import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useFetchConnectionRequests } from '@/hooks/connections/useFetchConnectionRequests';
import { useAcceptConnectionRequest } from '@/hooks/connections/useAcceptConnectionRequest';
import { useRejectConnectionRequest } from '@/hooks/connections/useRejectConnectionRequest';

const ConnectionRequestsDropdown: React.FC = () => {
  const { requests, loading, fetchRequests } = useFetchConnectionRequests();
  const { acceptRequest } = useAcceptConnectionRequest();
  const { rejectRequest } = useRejectConnectionRequest();
  const navigate = useNavigate();

  useEffect(() => { fetchRequests(); }, []);

  const handleAccept = async (id: string) => {
    await acceptRequest(id);
    fetchRequests();
  };
  const handleReject = async (id: string) => {
    await rejectRequest(id);
    fetchRequests();
  };

  return (
    <div className="bg-card border rounded shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
      <h4 className="font-semibold mb-2">Connection Requests</h4>
      {loading && <div>Loading...</div>}
      {requests.length === 0 && <div className="text-muted-foreground">No requests</div>}
      {requests.map((req) => (
        <div key={req.id} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => req.from?.id && navigate(`/profile/${req.from.id}`)}>
            <Avatar className="w-8 h-8">
              {req.from?.displayPic ? (
                <AvatarImage src={req.from.displayPic} alt={req.from.name || 'User'} />
              ) : (
                <AvatarFallback>{req.from?.name?.charAt(0) || 'U'}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="font-medium">{req.from?.name || 'User'}</div>
              <div className="text-xs text-muted-foreground">{req.from?.email}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="professional" onClick={() => handleAccept(req.id)}>Accept</Button>
            <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionRequestsDropdown;
