const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Authentication middleware to verify JWT tokens
 */
exports.Me = async (req, res) => {
  try {
    console.log("Me controller called");
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if no token
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        about: true,
        location: true,
        connections: { select: { id: true } },
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found, authorization denied" });
    }
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        about: user.about,
        location: user.location,
        numberOfConnections: user.connections.length,
      },
    });
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ error: "Token is not valid" });
  }
};
