import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { validateUserSignUpData } from "../utils/validation.js";
const generateToken = ({ email }) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// API for User Registration
export const userRegistration = async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;

  try {
    validateUserSignUpData(req);
    const userStatus = await User.findOne({ email });
    if (userStatus) {
      throw new Error("Already You have an Account. Please Login");
    } else {
      // Check for Password Strength
      if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
      } else {
        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          mobileNumber,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        res
          .status(200)
          .json({ message: "Registration Successful", jwtToken: token });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// API for USer Login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user exists
    const userStatus = await User.findOne({ email });
    if (!userStatus) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userStatus.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: userStatus._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwtToken", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.status(200).json({ message: "Login Successful", jwtToken: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API for get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// API for Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const ALLOWED_FIELDS = ["name", "avatarUrl", "mobileNumber"];
    const { name, avatarUrl, mobileNumber } = req.body;
    const isUserAllowed = Object.keys(req.body).every((key) =>
      ALLOWED_FIELDS.includes(key)
    );
    if (!isUserAllowed) {
      throw new Error(
        "Only name, avatarUrl, mobileNumber are allowed to update"
      );
    } else {
      const user = req.user;
      await User.findByIdAndUpdate(user?.id, {
        name,
        avatarUrl,
        mobileNumber,
      });
      res.status(200).json({ message: "Profile Updated Successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Delete User
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req?.user;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Account Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
