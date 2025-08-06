const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: true,
        likedBy: true,
        savedBy: true,
      },
    });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
