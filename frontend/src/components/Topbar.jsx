import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { toastNoficationSettings } from "../utils/utils";
const Topbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile/view");
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
    toast.success("Logout Successful",toastNoficationSettings);
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
        {/* <button className="text-gray-700 text-2xl rounded-lg hover:scale-110 transition-transform duration-150">
          <FaBell />
        </button> */}

        {/* Profile Icon */}
        <button
          className="text-gray-700 text-2xl rounded-lg hover:scale-110 transition-transform duration-150"
          onClick={handleProfileClick}
        >
          <FaUserCircle />
        </button>

        {/* Logout Button */}
        <button
          className="cursor-pointer text-blue-500 text-xl rounded-lg hover:scale-110 transition-transform duration-150"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
