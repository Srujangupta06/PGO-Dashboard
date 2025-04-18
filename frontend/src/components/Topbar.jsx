import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { backendUrl, logoutToastNotificationSettings } from "../utils/utils";
import Profile from "./Profile";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Topbar = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

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
    } catch (err) {}
  };

  useEffect(() => {
    getProfileData();
  }, []);

  // const handleProfileClick = () => {
  //   navigate("/profile/view");
  // };

  const handleProfilePicChange = (e) => e.target.files;

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
    toast.success("Logout Successful",logoutToastNotificationSettings);
  };

  return (
    <div className="h-16 z-10 w-full">
      <div className="h-16 z-10 flex w-full justify-between items-center bg-white p-4 shadow-md">
        {/* Welcome Message */}
        {profileData !== null ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back,{profileData?.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Hope your rooms are filling fast today!
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back,Guest
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Hope your rooms are filling fast today!
            </p>
          </div>
        )}

        {/* Icons Section */}
        <div className="flex items-center gap-x-8  px-8">
          {/* Profile Icon */}
          <button
            className="text-blue-500 text-2xl rounded-lg hover:scale-110 transition-transform duration-150 cursor-pointer"
            onClick={() => setShowProfileModal(true)}
            data-tooltip-id="profile-tooltip"
            data-tooltip-content="View Profile"
          >
            <FaUserCircle />
          </button>
          <ReactTooltip
            id="profile-tooltip"
            place="bottom"
            effect="solid"
            positionStrategy="fixed"
          />
          {/* Logout Button */}
          <button
            className="text-blue-500 text-xl rounded-lg hover:scale-110 transition-transform duration-150 cursor-pointer"
            onClick={handleLogout}
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Logout"
          >
            <FaSignOutAlt />
          </button>

          <ReactTooltip
            id="logout-tooltip"
            place="top"
            effect="solid"
            positionStrategy="fixed"
          />
        </div>
      </div>
      {showProfileModal && (
        <Profile
          setShowProfileModal={setShowProfileModal}
          profileData={profileData}
          setProfileData={setProfileData}
          handleProfilePicChange={handleProfilePicChange}
        />
      )}
    </div>
  );
};

export default Topbar;
