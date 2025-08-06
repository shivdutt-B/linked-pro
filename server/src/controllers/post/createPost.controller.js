const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  try {
    console.log("Creating post...");
    const { content } = req.body;
    const userId = req.user.id;
    const post = await prisma.post.create({
      data: { content, userId },
    });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
