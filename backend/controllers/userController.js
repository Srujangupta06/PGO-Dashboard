import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
};

export const userRegistration = async (req, res) => {
  const data = req.body;
  try {
    const userStatus = await User.findOne({ mobileNumber: data?.mobileNumber });
    if (userStatus) {
      throw new Error("Already user exists with same Mobile number");
    } else {
      // Check for Password Strength
      if (!validator.isStrongPassword(data?.password)) {
        throw new Error("Password is not strong enough");
      } else {
        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(data?.password, saltedRounds);
        const newUser = new User({
          name: data?.name,
          email: data?.email,
          password: hashedPassword,
          mobileNumber: data?.mobileNumber,
        });
        await newUser.save();
        const token = generateToken(data?.mobileNumber + data?.password);
        res
          .status(200)
          .json({ message: "User Registered Successfully", jwt_token: token });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    // Check if the user exists
    const userStatus = await User.findOne({ mobileNumber });
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
    const token = generateToken(mobileNumber + password);
    res
      .status(200)
      .json({ message: "User logged in successfully", jwt_token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
