const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all posts saved by the signed-in user
exports.getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await prisma.post.findMany({
      where: {
        savedBy: {
          some: { id: userId }
        }
      },
      include: {
        user: true,
        likedBy: true,
        savedBy: true,
        comments: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
