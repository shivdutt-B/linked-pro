const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized or post not found" });
    }
    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
