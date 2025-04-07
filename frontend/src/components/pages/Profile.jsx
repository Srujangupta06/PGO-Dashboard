import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

const Profile = () => {
  const name = "Rajesh Kumarrrr"; // Replace with dynamic name if needed
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center transform hover:scale-105 transition duration-300">
        {/* Admin Profile Picture */}
        <div className="relative mx-auto w-32 h-32 rounded-full bg-red-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white -mt-16">
          {initials || "?"} {/* Fallback Initials */}
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
            <span>rajesh.kumar@example.com</span>
          </div>
          <div className="flex items-center justify-start mb-3 text-gray-700">
            <FaPhone className="text-green-500 mr-3" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center justify-start text-gray-700">
            <FaMapMarkerAlt className="text-blue-500 mr-3" />
            <span>Hyderabad, India</span>
          </div>
        </div>

        {/* Hostel Details */}
        <div className="mt-5 bg-gray-50 p-4 rounded-lg shadow-md">
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
        </div>

        {/* Back to Dashboard Button */}
        <Link
          to="/lazy-dashboard"
          className="mt-6 inline-block w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Profile;

// import React from "react";

// const Profile = () => {
//   return <div>Profile</div>;
// };
// export default Profile;
