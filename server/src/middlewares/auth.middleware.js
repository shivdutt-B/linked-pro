const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Authentication middleware to verify JWT tokens
 */
const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth middleware triggered");
    // Get token from header
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
    console.log("Token received:", token);

    // Check if no token
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, "your_jwt_secret");

    console.log("Decoded token:", decoded);

    // Add user to request
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true},
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found, authorization denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
