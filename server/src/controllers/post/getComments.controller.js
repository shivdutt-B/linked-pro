const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: { user: true },
    });
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
