const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFeed = async (req, res) => {
  try {
    console.log("Fetching feed with pagination");
    const { skip = 0, take = 5, topic } = req.query;
    let where = {};
    let skipNum = Number(skip);
    let takeNum = Number(take);
    if (topic) {
      where = {
        content: {
          contains: topic,
          mode: 'insensitive',
        },
      };
      skipNum = 0;
      takeNum = 1000; // Arbitrary large number to fetch all
    }
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip: skipNum,
      take: takeNum,
      where,
      include: {
        user: true,
        comments: true,
        likedBy: true,
        savedBy: true,
      },
    });
    console.log("Feed fetched successfully", posts.length, "posts");
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
