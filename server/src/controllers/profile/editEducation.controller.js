const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Edit Education Section
exports.editEducation = async (req, res) => {
  try {
    const { educationId, school, title, year } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (!educationId) {
      return res.status(400).json({ error: "Education ID is required" });
    }
    const updated = await prisma.education.update({
      where: { id: educationId },
      data: { school, title, year },
    });
    res.json({ message: "Education updated", education: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Education Section
exports.addEducation = async (req, res) => {
  try {
    const { school, title, year } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const created = await prisma.education.create({
      data: { school, title, year, userId },
    });
    res.json({ message: "Education added", education: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
