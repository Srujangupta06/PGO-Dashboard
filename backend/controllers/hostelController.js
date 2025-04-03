import { hostel } from "../models/hostelModel.js";
import cloudinary from "../cloudinary/cloudinary.js";

// Upload Image to Cloudinary Function
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "hostels", // Cloudinary folder name
    });
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
// Create a new hostel with image upload
export const createhostel = async (req, res) => {
  try {
    const {
      hostel_name,
      hostel_category,
      hostel_address,
      room_details,
      amenities,
      owner_name,
      contact_no,
    } = req.body;

    // Handle uploaded images

    const hostel_image_url = req.files["hostel_image"]
      ? await uploadToCloudinary(req.files["hostel_image"][0].path)
      : "";

    const room_imgs = req.files["room_imgs"]
      ? await Promise.all(
          req.files["room_imgs"].map((file) => uploadToCloudinary(file.path))
        )
      : [];

    const newHostel = new hostel({
      hostel_name:hostel_name.trim(),
      hostel_category,
      hostel_address: JSON.parse(hostel_address),
      room_details: JSON.parse(room_details).map((room, index) => ({
        ...room,
        room_imgs: room_imgs[index] || "",
      })),
      amenities: JSON.parse(amenities),
      owner_name:owner_name.trim(),
      contact_no,
      hostel_image_url,
    });

    await newHostel.save();
    res.status(201).json({
      message: "Hostel Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

export const gethostels = async (req, res) => {
  try {
    const hostels = await hostel.find({});
    const newResponse = hostels.map((eachHostel) => {
      const {
        _id,
        hostel_name,
        hostel_category,
        hostel_address,
        room_details,
        hostel_image_url,
      } = eachHostel;
      return {
        _id,
        hostel_name,
        hostel_category,
        hostel_address,
        hostel_image_url,
        starting_price: room_details[0].room_rent, // filter smaller price and send as min-price
      };
    });

    res.status(200).json({ data: newResponse });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error", err });
  }
};

export const gethostelsbyid = async (req, res) => {
  try {
    const id = req.params.hostelId;
    //   console.log(id)
    const hostel_info = await hostel.findById(id);

    if (!hostel_info) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.json({ hostel_info });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
