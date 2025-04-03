import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
};

export const adminRegistration = async (req, res) => {
  try {
    const { name, email, password, gender, city, mobile_number } = req.body;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      city === "" ||
      mobile_number === ""
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const adminStatus = await Admin.findOne({ email: email });
    if (adminStatus) {
      res.status(400).send({ message: "Email Already Exists" });
    } else {
      const saltedRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltedRounds);
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        gender,
        city,
        mobile_number,
      });
      await newAdmin.save();
      const token = generateToken(email + password);
      res
        .status(200)
        .json({ message: "Admin Registered Successfully", jwt_token: token });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const adminStatus = await Admin.findOne({ email });
    if (!adminStatus) {
      return res
        .status(404)
        .json({ message: "You don't have an account. Register first" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(
      password,
      adminStatus.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = generateToken(email + password);
    res
      .status(200)
      .json({ message: "User logged in successfully", jwt_token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
