import express from "express";

import { createhostel, gethostels, gethostelsbyid } from "../controllers/hostelController.js";
import {upload} from "../middlewares/multer.js";
// import auth from "../middleware/auth.js";
// import router from "./userRouter.js";

const router = express.Router();

// hostelRouter.post(
//   "/add-hostel",

//   upload.fields([
//     {
//       name: "banner_image",
//       maxCount: 1,
//     },

//     {
//       name: "room_images",
//       maxCount: 3,
//     },
//   ]),
//   addHostel
// );

// hostelRouter.get("/list-hostels", getHostels);

// hostelRouter.delete("/remove-hostel", removeHostel);



router.post("/add-hostel", upload.fields([{ name: "hostel_image", maxCount: 1 }, { name: "room_imgs", maxCount: 5 }]), createhostel);
router.get("/gethostels", gethostels)

router.get("/hostel/:hostelId", gethostelsbyid )

export default router;
