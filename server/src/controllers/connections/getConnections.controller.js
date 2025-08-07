const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    // All accepted connections
    const connections = await prisma.connectionRequest.findMany({
      where: {
        OR: [
          { fromId: userId },
          { toId: userId }
        ],
        status: 'accepted'
      },
      include: { from: true, to: true }
    });
    res.json({ connections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
