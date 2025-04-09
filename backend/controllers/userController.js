import { User } from "../models/userModel.js";

import {
  validateUserProfileInputData,
} from "../utils/validation.js";

// API for get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { user } = req;
    const profileInfo = {
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      avatarUrl: user.avatarUrl,
    };
    res.status(200).json({profileInfo});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// API for Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const isEditAllowed = validateUserProfileInputData(req);
    if (!isEditAllowed) {
      throw new Error("Only name, avatarUrl and mobileNumber can be updated");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.name}, Your Profile has Updated Successfully`,
    });
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
