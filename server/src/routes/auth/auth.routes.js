const { Router } = require("express");
const {check} = require("express-validator")
const  signIn  = require("../../controllers/auth/signIn.controller");
const  { signUp }  = require("../../controllers/auth/signUp.controller");
const { Me } = require("../../controllers/auth/me.controller");
// import signIn from "../../controllers/auth/signIn.controller"
// import signUp from "../../controllers/auth/signUp.controller"

const router = Router();

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  signIn.signIn
);

// @route   POST api/auth/signup
// @desc    Register user & get token
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  signUp
);

// @route   GET api/auth/me
// @desc    Takes token and returns user data
// @access  Public
router.get(
  "/me",
  Me
);

module.exports = router;