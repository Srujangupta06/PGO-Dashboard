import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/registration", userRegistration);

router.post("/login", userLogin);

router.get("/get-user-profile/:userId", getUserProfile);

router.patch("/update-user-profile/:userId", updateUserProfile);

router.delete("/delete-account/:userId", deleteUserProfile);

export default router;
