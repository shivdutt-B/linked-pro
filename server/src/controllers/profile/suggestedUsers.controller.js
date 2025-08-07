const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.suggestedUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Step 1: Get all users directly connected to current user
    const directConnections = await prisma.connectionRequest.findMany({
      where: {
        OR: [
          { fromId: userId, status: 'accepted' },
          { toId: userId, status: 'accepted' }
        ]
      },
      select: { fromId: true, toId: true }
    });
    
    // Extract IDs of directly connected users
    const directConnectionIds = new Set();
    directConnections.forEach(conn => {
      if (conn.fromId === userId) {
        directConnectionIds.add(conn.toId);
      } else {
        directConnectionIds.add(conn.fromId);
      }
    });
    
    // Step 2: Find friends of friends
    const friendsOfFriends = await prisma.connectionRequest.findMany({
      where: {
        OR: [
          { fromId: { in: Array.from(directConnectionIds) }, status: 'accepted' },
          { toId: { in: Array.from(directConnectionIds) }, status: 'accepted' }
        ]
      },
      select: { fromId: true, toId: true }
    });
    
    // Extract friends of friends IDs and count mutual connections
    const suggestionCandidates = new Map(); // userId -> count of mutual friends
    
    friendsOfFriends.forEach(conn => {
      let candidateId;
      
      if (directConnectionIds.has(conn.fromId)) {
        candidateId = conn.toId;
      } else if (directConnectionIds.has(conn.toId)) {
        candidateId = conn.fromId;
      }
      
      // Exclude self and direct connections
      if (candidateId && candidateId !== userId && !directConnectionIds.has(candidateId)) {
        suggestionCandidates.set(
          candidateId, 
          (suggestionCandidates.get(candidateId) || 0) + 1
        );
      }
    });
    
    // Step 3: Get top suggestions sorted by mutual friends count
    const sortedSuggestions = Array.from(suggestionCandidates.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by mutual friends count (descending)
      .slice(0, 3) // Take top 3
      .map(([userId, mutualCount]) => ({ userId, mutualCount }));
    
    // Step 4: Fetch user details for suggestions
    const suggestionIds = sortedSuggestions.map(s => s.userId);
    
    const users = await prisma.user.findMany({
      where: { id: { in: suggestionIds } },
      select: { id: true, name: true, header: true, displayPic: true }
    });
    
    // Step 5: Add mutual friends count to response
    const usersWithMutualCount = users.map(user => {
      const suggestion = sortedSuggestions.find(s => s.userId === user.id);
      return {
        ...user,
        mutualFriendsCount: suggestion.mutualCount
      };
    });
    
    res.json({ users: usersWithMutualCount });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};