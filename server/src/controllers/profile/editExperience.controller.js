const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Edit Experience Section
exports.editExperience = async (req, res) => {
  try {
    const { experienceId, title, org, fromDate, toDate } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (!experienceId) {
      return res.status(400).json({ error: "Experience ID is required" });
    }
    const updated = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        title,
        org,
        fromDate: fromDate ? new Date(fromDate) : undefined,
        toDate: toDate ? new Date(toDate) : undefined,
      },
    });
    res.json({ message: "Experience updated", experience: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Experience Section
exports.addExperience = async (req, res) => {
  try {
    const { title, org, fromDate, toDate } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const created = await prisma.experience.create({
      data: {
        title,
        org,
        fromDate: fromDate ? new Date(fromDate) : undefined,
        toDate: toDate ? new Date(toDate) : undefined,
        userId,
      },
    });
    res.json({ message: "Experience added", experience: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
