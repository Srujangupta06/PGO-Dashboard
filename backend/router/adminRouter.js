import express from "express";
import {
  adminLogin,
  adminRegistration,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/registration", adminRegistration);

router.post("/login", adminLogin);

export default router;
