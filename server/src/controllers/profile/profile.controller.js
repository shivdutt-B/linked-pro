const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: true,
        educations: true,
        experiences: true,
        posts: {
          include: {
            media: true,
            comments: true,
            likedBy: true,
            savedBy: true,
          },
        },
        connections: true,
        connectedTo: true,
      },
    });
    console.log("getUserProfile controller called", user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};