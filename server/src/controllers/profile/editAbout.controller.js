const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Edit About Section
exports.editAbout = async (req, res) => {
  try {
    const { about, header, name, location } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { about, header, name, location },
    });
    res.json({ message: "About updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
