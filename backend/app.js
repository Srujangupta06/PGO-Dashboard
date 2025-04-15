import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./router/userRouter.js";
import hostelRoutes from "./router/hostelRouter.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./router/roomRouter.js";
import authRoutes from "./router/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
<<<<<<< HEAD
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
=======
    methods: ["GET", "POST", "DELETE", "PATCH"],
>>>>>>> fdc679784bfc379ddde0aad41b5708dae35fdc98
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/hostel", hostelRoutes);

app.use("/api/hostel/room", roomRoutes);
const initializeDBAndServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connection: Success");
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
initializeDBAndServer();
