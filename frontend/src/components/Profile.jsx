
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
import { RxCrossCircled } from "react-icons/rx";
import { backendUrl } from "../utils/utils";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {Tooltip as ReactTooltip} from "react-tooltip";
const Profile = ({
  setShowProfileModal,
  profileData,
  setProfileData,
  handleProfilePicChange,
}) => {
  // const [profileData, setProfileData] = useState(null);
  // const getProfileData = async () => {
  //   try {
  //     const apiUrl = `${backendUrl}/api/user/view-profile`;
  //     const options = {
  //       method: "GET",
  //       credentials: "include",
  //     };
  //     const response = await fetch(apiUrl, options);
  //     if (response.ok) {
  //       const data = await response.json();
  //       const { profileInfo } = data;
  //       setProfileData(profileInfo);
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  // const handleProfilePicChange = (e) => e.target.files;

  // useEffect(() => {
  //   getProfileData();
  // }, []);

  if (!profileData) return null;
  const { name, avatarUrl, email, mobileNumber } = profileData;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This span is used to trick the browser into centering the modal contents */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal Panel */}
        <div className="relative inline-block align-bottom bg-blue-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-blue-50 shadow-xl rounded-xl p-8 max-w-lg w-full flex flex-col items-center ">
            <button
              onClick={() => {
                setShowProfileModal(false);
              }}
              className="absolute top-5 right-5"
              data-tooltip-id="profile-close-tooltip"
              data-tooltip-content="Close"
            >
              <RxCrossCircled className="text-2xl text-red-600 cursor-pointer hover:text-red-900" />
            </button>
            <ReactTooltip id="profile-close-tooltip" place="left" effect="solid" className="!bg-red-700 !text-white !text-sm !rounded-sm !px-3 !py-1 shadow-lg"/>
            {/* Admin Profile Picture */}
            <div className="relative mx-auto w-32 h-32 mt-16 group">
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
            <h2 className="text-2xl font-semibold text-blue-500 mt-4">
              {name}
            </h2>
            <p className="text-md text-gray-600 mb-4 font-medium">
              Hostel Administrator
            </p>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner border border-blue-200 w-full">
              <div className="flex items-center justify-start mb-3 text-gray-700">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span>{email}</span>
              </div>
              <div className="flex items-center justify-start mb-3 text-gray-700">
                <FaPhone className="text-blue-500 mr-3 rotate-90" />
                <span>{mobileNumber}</span>
              </div>
              <div className="flex items-center justify-start text-gray-700">
                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                <span>Hyderabad, India</span>
              </div>
            </div>
            {/*Edit profile button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 self-end text-sm cursor-pointer">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
