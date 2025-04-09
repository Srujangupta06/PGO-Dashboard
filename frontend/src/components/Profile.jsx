import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { backendUrl } from "../utils/utils";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const getProfileData = async () => {
    try {
      const apiUrl = `${backendUrl}/api/user/view-profile`;
      const options = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        const { profileInfo } = data;
        setProfileData(profileInfo);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleProfilePicChange = (e) => e.target.files;

  useEffect(() => {
    getProfileData();
  }, []);

  if (!profileData) return null;
  const { name, avatarUrl, email, mobileNumber } = profileData;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center ">
        {/* Admin Profile Picture */}
        <div className="relative mx-auto w-32 h-32 -mt-16 group">
          {!avatarUrl ? (
            <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
              {initials || "?"}
            </div>
          ) : (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}

          {/* Edit Icon Overlay */}
          <label
            htmlFor="profilePicInput"
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition group-hover:scale-110"
          >
            ✏️ {/* Or use an SVG/icon here */}
          </label>

          {/* Hidden File Input */}
          <input
            type="file"
            id="profilePicInput"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Admin Details */}
        <h2 className="text-3xl font-extrabold text-gray-900 mt-4">{name}</h2>
        <p className="text-lg text-gray-600 mb-4 font-medium">
          Hostel Administrator
        </p>

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="flex items-center justify-start mb-3 text-gray-700">
            <FaEnvelope className="text-red-500 mr-3" />
            <span>{email}</span>
          </div>
          <div className="flex items-center justify-start mb-3 text-gray-700">
            <FaPhone className="text-green-500 mr-3" />
            <span>{mobileNumber}</span>
          </div>
          <div className="flex items-center justify-start text-gray-700">
            <FaMapMarkerAlt className="text-blue-500 mr-3" />
            <span>Hyderabad, India</span>
          </div>
        </div>

        {/* Hostel Details */}
        {/* <div className="mt-5 bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-start mb-3 text-gray-700">
            <FaBuilding className="text-red-500 mr-3" />
            <span>
              <strong>Hostel Name:</strong> Sunrise Boys Hostel
            </span>
          </div>
          <div className="flex items-center justify-start mb-3 text-gray-700">
            <FaUsers className="text-orange-500 mr-3" />
            <span>
              <strong>Capacity:</strong> 250 Students
            </span>
          </div>
          <div className="flex items-center justify-start text-gray-700">
            <FaClipboardList className="text-purple-500 mr-3" />
            <span>
              <strong>Responsibilities:</strong> Hostel Management & Maintenance
            </span>
          </div>
        </div> */}

        {/* Back to Dashboard Button */}
        <Link
          to="/dashboard"
          className="mt-6 inline-block w-full bg-red-600 text-white py-2 rounded-lg text-md  hover:bg-red-700 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Profile;
