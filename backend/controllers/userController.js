import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
};

export const userRegistration = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const userStatus = await User.findOne({ mobile });
  if (userStatus) {
    res
      .status(400)
      .json({ message: "Already user exists with same mobile number" });
  } else {
    const saltedRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltedRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    await newUser.save();
    const token = generateToken(mobile + password);
    res
      .status(200)
      .json({ message: "User Registered Successfully", jwt_token: token });
  }
};

export const userLogin = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Check if the user exists
    const userStatus = await User.findOne({ mobile });
    if (!userStatus) {
      return res
        .status(404)
        .json({ message: "You don't have an account. Register first" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, userStatus.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = generateToken(mobile + password);
    res
      .status(200)
      .json({ message: "User logged in successfully", jwt_token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
