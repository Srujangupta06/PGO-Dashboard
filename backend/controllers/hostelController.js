// API for adding hostel Info

import { Hostel } from "../models/hostelModel.js";
import { User } from "../models/userModel.js";
import { validateHostelData, validateRoomInfo } from "../utils/validation.js";

// API for Adding a Hostel
export const addHostelInfo = async (req, res) => {
  const { name, category, maxCapacity, totalRooms, rooms, ownerId } = req.body;

  try {
    // Validate data
    validateHostelData(req);

    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "You don't have an Account" });
    }

    // Check if hostel already exists
    const existingHostel = await Hostel.findOne({ ownerId });
    if (existingHostel) {
      return res.status(400).json({
        message: `You had already added a Hostel named '${existingHostel.name}'`,
      });
    }

    // Save new hostel
    const newHostel = new Hostel({
      name,
      category,
      maxCapacity,
      totalRooms,
      rooms,
      ownerId,
    });
    await newHostel.save();

    res.status(200).json({ message: "Your Hostel Info Added Successfully" });
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// API for Getting Hostel Info
export const getHostelInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostel = await Hostel.findOne({ ownerId: id });
    if (!hostel) {
      throw new Error("No Hostel Found");
    }
    res.status(200).json({
      name: hostel.name,
      category: hostel.category,
      maxCapacity: hostel.maxCapacity,
      totalRooms: hostel.totalRooms,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateHostelSpecificInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, category, maxCapacity, totalRooms } = req.body;
    // if (!name || !category || !maxCapacity || !totalRooms) {
    //   throw new Error("All fields are required");
    // }
    const updatedHostel = await Hostel.findOneAndUpdate(
      { ownerId: id },
      { name, category, maxCapacity, totalRooms }
    );
    if (!updatedHostel) {
      throw new Error("No Hostel Found to Update");
    }
    res.status(200).json({ message: "Hostel Updated Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteHostelInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostel = await Hostel.findOneAndDelete({ ownerId: id });
    if (!hostel) {
      throw new Error("No Hostel Found to Remove");
    }
    res.status(200).json({ message: "Hostel Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addRoomInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const { roomNumber, sharingType, rent, totalBeds, availableBeds } =
      req.body;
    if (!roomNumber || !sharingType || !rent || !totalBeds || !availableBeds) {
      throw new Error("All Fields are Required");
    }
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      throw new Error("No Hostel Found");
    }
    // Check the room Number
    const existingRoom = hostelInfo.rooms.find(
      (roomInfo) => roomInfo.roomNumber == roomNumber
    );
    if (existingRoom) {
      throw new Error("Room Number Already Exists");
    }
    // Check the beds properly
    if (availableBeds > totalBeds) {
      throw new Error("Available Beds cannot be greater than Total Beds");
    }
    hostelInfo?.rooms.push({
      roomNumber,
      sharingType,
      rent,
      totalBeds,
      availableBeds,
    });
    await hostelInfo.save();
    res.status(200).json({ message: "Room Added Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRoomInfo = async (req, res) => {
  try {
    const { sharingType, rent, totalBeds, availableBeds } = req.body;
    if (!validateRoomInfo(req)) {
      throw new Error(
        "Only sharingType, rent, totalBeds and availableBeds can be updated"
      );
    }
    const { id } = req.user;
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      throw new Error("No Hostel Found");
    }
    const { roomId } = req.params;
    const room = hostelInfo.rooms.find(
      (roomInfo) => roomInfo.roomNumber == roomId
    );

    if (!room) {
      throw new Error("No Room Found");
    }
    room.sharingType = sharingType;
    room.rent = rent;
    room.totalBeds = totalBeds;
    room.availableBeds = availableBeds;
    await hostelInfo.save();
    res.send("Room Updated Successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRoomInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      throw new Error("No Hostel Found");
    }
    const { roomId } = req.params;
    const room = hostelInfo.rooms.find(
      (roomInfo) => roomInfo.roomNumber == roomId
    );
    if (!room) {
      throw new Error("No Room Found");
    }
    hostelInfo.rooms = hostelInfo.rooms.filter(
      (roomInfo) => roomInfo.roomNumber != roomId
    );
    await hostelInfo.save();
    res.status(200).json({ message: "Room Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoomsInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      throw new Error("No Hostel Found");
    }
    res.status(200).json(hostelInfo.rooms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
