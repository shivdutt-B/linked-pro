const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.cancelRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const request = await prisma.connectionRequest.findUnique({ where: { id: requestId } });
    if (!request || request.fromId !== userId || request.status !== 'pending') {
      return res.status(403).json({ error: 'Unauthorized or invalid request' });
    }
    await prisma.connectionRequest.delete({ where: { id: requestId } });
    res.json({ message: 'Request cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
