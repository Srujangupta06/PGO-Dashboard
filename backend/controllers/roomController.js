import {
  validateRoomInfo,
  validateHostelWithOwnerId,
} from "../utils/validation.js";
import { Hostel } from "../models/hostelModel.js";
export const getRoomsInfo = async (req, res) => {
  try {
    const { id } = req?.user;
    const hostelInfo = await validateHostelWithOwnerId(id);
    res.status(200).json(hostelInfo.rooms);
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
    await validateHostelWithOwnerId(id);
    // Check the room Number status if present no need to add the room
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
    await validateHostelWithOwnerId(id);
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
    await validateHostelWithOwnerId(id);
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
