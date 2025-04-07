// API for adding hostel Info

import { Hostel } from "../models/hostelModel.js";
import { User } from "../models/userModel.js";
import { validateHostelData } from "../utils/validation.js";

// API for Adding a Hostel
export const addHostelInfo = async (req, res) => {
  const { name, category, maxCapacity, totalRooms, rooms, ownerId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.
  try {
    if (token ==="" ) {
      validateHostelData(req);
      // Check only registered User can able to add
      const owner = await User.findById(ownerId);
      if (!owner) {
        return res.status(404).json({ message: "You don't have an Account" });
      } else {
        // Check the Registered User with Hostel Owner Id
        const existingHostel = await Hostel.findOne({ ownerId });
        if (existingHostel) {
          return res.status(400).json({
            message: `You had already added a Hostel named '${existingHostel.name}'`,
          });
        } else {
          const newHostel = new Hostel({
            name,
            category,
            maxCapacity,
            totalRooms,
            rooms,
            ownerId,
          });
          await newHostel.save();
          res
            .status(200)
            .json({ message: "Your Hostel Info Added Successfully" });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// API for Getting Hostel Info
