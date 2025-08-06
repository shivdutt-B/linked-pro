const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator");
const { generateToken } = require( "../../utils/generateToken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.signUp = async (req, res) => {
  console.log("sign up controller called", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "An unexpected error occured" });
  }

  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name
      },
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};