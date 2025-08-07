const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.unsavePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        savedBy: {
          disconnect: { id: userId },
        },
      },
      include: { savedBy: true },
    });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
