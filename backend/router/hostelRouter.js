import express from "express";
import {
  addHostelInfo,
  deleteHostelInfo,
  deleteRoomInfo,
  getHostelInfo,
  updateHostelSpecificInfo,
  updateRoomInfo,
} from "../controllers/hostelController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/add-info", auth, addHostelInfo);

router.get("/get-info", auth, getHostelInfo);

router.patch("/update-info", auth, updateHostelSpecificInfo);

router.patch("/update-room-info", auth, updateRoomInfo);

router.delete("/remove-room", auth, deleteRoomInfo);

router.delete("/remove-hostel", auth, deleteHostelInfo);

export default router;
