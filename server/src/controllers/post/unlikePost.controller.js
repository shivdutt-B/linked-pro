const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        likedBy: {
          disconnect: { id: userId },
        },
      },
      include: { likedBy: true },
    });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
