const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    // Requests sent to this user and still pending
    const requests = await prisma.connectionRequest.findMany({
      where: { toId: userId, status: 'pending' },
      include: { from: true }
    });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
