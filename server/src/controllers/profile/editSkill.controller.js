const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Edit Skill Section
exports.editSkill = async (req, res) => {
  try {
    const { skillId, name } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (!skillId) {
      return res.status(400).json({ error: "Skill ID is required" });
    }
    const updated = await prisma.skill.update({
      where: { id: skillId },
      data: { name },
    });
    res.json({ message: "Skill updated", skill: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Skill Section
exports.addSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const created = await prisma.skill.create({
      data: { name, userId },
    });
    res.json({ message: "Skill added", skill: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
