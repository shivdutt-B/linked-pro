const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.disconnect = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.body;
    // Find accepted connection
    const connection = await prisma.connectionRequest.findFirst({
      where: {
        OR: [
          { fromId: userId, toId: otherUserId },
          { fromId: otherUserId, toId: userId }
        ],
        status: 'accepted'
      }
    });
    if (!connection) return res.status(404).json({ error: 'No connection found' });
    await prisma.connectionRequest.delete({ where: { id: connection.id } });
    res.json({ message: 'Disconnected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
