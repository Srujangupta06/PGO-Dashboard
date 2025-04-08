import express from "express";
import {
  addHostelInfo,
  addRoomInfo,
  deleteHostelInfo,
  deleteRoomInfo,
  getHostelInfo,
  getRoomsInfo,
  updateHostelSpecificInfo,
  updateRoomInfo,
} from "../controllers/hostelController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

// Hostel
router.post("/add-info", auth, addHostelInfo);

router.get("/get-info", auth, getHostelInfo);

router.patch("/update-info", auth, updateHostelSpecificInfo);

router.delete("/remove-hostel", auth, deleteHostelInfo);

// Room
router.get("/get-rooms", auth, getRoomsInfo);

router.post("/add-room-info", auth, addRoomInfo);

router.patch("/update-room-info/:roomId", auth, updateRoomInfo);

router.delete("/remove-room/:roomId", auth, deleteRoomInfo);

export default router;
