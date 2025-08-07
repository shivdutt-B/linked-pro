const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const request = await prisma.connectionRequest.findUnique({ where: { id: requestId } });
    if (!request || request.toId !== userId || request.status !== 'pending') {
      return res.status(403).json({ error: 'Unauthorized or invalid request' });
    }
    await prisma.connectionRequest.update({ where: { id: requestId }, data: { status: 'accepted' } });
    // Optionally, add to connections (if you want a separate table)
    res.json({ message: 'Connection accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
