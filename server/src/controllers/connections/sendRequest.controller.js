const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.sendRequest = async (req, res) => {
  try {
    const fromId = req.user.id;
    const { toId } = req.body;
    console.log("Sending connection request from:", fromId, "to:", toId);
    if (fromId === toId) return res.status(400).json({ error: 'Cannot connect to yourself' });
    // Check if already connected or request exists
    const existing = await prisma.connectionRequest.findFirst({
      where: {
        OR: [
          { fromId, toId },
          { fromId: toId, toId: fromId }
        ],
        status: { in: ['pending', 'accepted'] }
      }
    });
    if (existing) return res.status(400).json({ error: 'Already connected or request pending' });
    const request = await prisma.connectionRequest.create({
      data: { fromId, toId, status: 'pending' }
    });
    res.json({ request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
