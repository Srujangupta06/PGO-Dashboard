import { useState } from "react";
import { FaUser, FaBed, FaUsers, FaTools } from "react-icons/fa";

export default function Dashboard() {
  const [showAdminDetails, setShowAdminDetails] = useState(false);

  const stats = [
    {
      title: "Total Fees Collected",
      value: "₹2,50,000",
      change: "+5.2%",
      icon: "💰",
    },
    {
      title: "Total Students",
      value: "145",
      change: "+12.5%",
      icon: <FaUsers />,
    },
    { title: "Active Staff", value: "8", icon: "👨‍🏫" },
    {
      title: "Pending Complaints",
      value: "5",
      change: "-14.5%",
      icon: <FaTools />,
    },
  ];

  const hostelStatus = [
    {
      title: "Rooms Available",
      current: 40,
      capacity: 100,
      percentage: 40,
      icon: <FaBed />,
    },
    {
      title: "Occupied Rooms",
      current: 60,
      capacity: 100,
      percentage: 60,
      icon: <FaBed />,
    },
  ];

  const recentActivity = [
    { name: "John Doe", type: "Checked-in", time: "10:30 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
    { name: "AC Repair", type: "Maintenance Request", time: "9:15 AM" },
  ];

  return (
    <div className="p-5 h-screen  relative bg-gray-50">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg flex flex-col gap-3 h-40 
             transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <span className="text-3xl text-gray-700">{stat.icon}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            {stat.change && (
              <span className="text-green-500">{stat.change}</span>
            )}
          </div>
        ))}
      </div>

      {/* Hostel Status */}
      <h2 className="mt-10 text-xl font-semibold">Hostel Room Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        {hostelStatus.map((status, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition-all 
             transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl text-blue-600">{status.icon}</span>
              <h3 className="text-lg font-semibold">{status.title}</h3>
            </div>
            <p className="text-gray-600 mt-2">
              {status.current} of {status.capacity}
            </p>
            <div className="relative mt-3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all"
                  style={{ width: `${status.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="mt-10 text-xl font-semibold">Recent Activity</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mt-5 max-h-40 overflow-y-auto">
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between py-2 border-b text-center sm:text-left 
             transition-all hover:bg-gray-100 hover:text-blue-600 hover:font-semibold"
          >
            <span className="font-medium">{activity.name}</span>
            <span className="text-gray-500">{activity.type}</span>
            <span className="text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>

      {/* Admin Details Modal */}
      {showAdminDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-md transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Dashboard
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Name:</strong> Mahendhra Reddy
              </p>
              <p>
                <strong>Email:</strong> mahendhra.reddy@example.com
              </p>
              <p>
                <strong>Role:</strong> Super Admin
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Department:</strong> Hostel Management
              </p>
              <p>
                <strong>Joined:</strong> January 2022
              </p>
            </div>
            <button
              className="mt-6 w-full bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={() => setShowAdminDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
