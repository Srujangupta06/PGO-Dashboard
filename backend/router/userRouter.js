import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/registration", userRegistration);

router.post("/login", userLogin);

router.get("/get-user-profile", auth, getUserProfile);

router.patch("/update-user-profile", auth, updateUserProfile);

router.delete("/delete-account", auth, deleteUserProfile);

export default router;
