const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const comment = await prisma.comment.create({
      data: { content, userId, postId },
    });
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
