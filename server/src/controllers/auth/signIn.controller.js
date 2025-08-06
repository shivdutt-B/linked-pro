// controllers/authController.js

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../../utils/generateToken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.signIn = async (req, res) => {
  console.log("SignIn controller called", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "An error occured" });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invaild Creds" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invaild Creds" });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({error: 'Server error' });
  }
};
