import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSendConnectionRequest } from '@/hooks/connections/useSendConnectionRequest';
import { useDisconnect } from '@/hooks/connections/useDisconnect';
import axios from 'axios';

interface ConnectionButtonProps {
  profileUserId: string;
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({ profileUserId }) => {
  const [status, setStatus] = useState<'none'|'pending'|'connected'>('none');
  const [requestId, setRequestId] = useState<string | null>(null);
  const { sendRequest, loading: sending } = useSendConnectionRequest();
  const { disconnect, loading: disconnecting } = useDisconnect();

  useEffect(() => {
    // Fetch connection/request status
    const fetchStatus = async () => {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/connections/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const connections = res.data.connections;
      const connected = connections.find((c: any) => (c.fromId === profileUserId || c.toId === profileUserId));
      if (connected) {
        setStatus('connected');
        return;
      }
      // Check for pending request
      const reqRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/connections/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const pending = reqRes.data.requests.find((r: any) => r.fromId === profileUserId || r.toId === profileUserId);
      if (pending) {
        setStatus('pending');
        setRequestId(pending.id);
        return;
      }
      setStatus('none');
    };
    fetchStatus();
  }, [profileUserId]);

  const handleConnect = async () => {
    const ok = await sendRequest(profileUserId);
    if (ok) setStatus('pending');
  };

  const handleDisconnect = async () => {
    const ok = await disconnect(profileUserId);
    if (ok) setStatus('none');
  };

  if (status === 'connected') {
    return <Button variant="destructive" size="sm" onClick={handleDisconnect} disabled={disconnecting}>Disconnect</Button>;
  }
  if (status === 'pending') {
    return <Button variant="outline" size="sm" disabled>Request Sent</Button>;
  }
  return <Button variant="professional" size="sm" onClick={handleConnect} disabled={sending}>Connect</Button>;
};

export default ConnectionButton;
