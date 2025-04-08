import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    console.log("clicked to login");
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="h-16 z-10 flex w-full justify-between items-center bg-white p-4 shadow-md">
      {/* Welcome Message */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Admin
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Here are the latest updated details
        </p>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="text-gray-700 text-2xl rounded-lg hover:scale-110 transition-transform duration-150">
          <FaBell />
        </button>

        {/* Profile Icon */}
        <button
          className="text-gray-700 text-2xl rounded-lg hover:scale-110 transition-transform duration-150"
          onClick={handleProfileClick}
        >
          <FaUserCircle />
        </button>

        {/* Logout Button */}
        <button
          className="text-red-600 text-xl rounded-lg hover:scale-110 transition-transform duration-150"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
