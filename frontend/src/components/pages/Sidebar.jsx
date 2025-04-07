import { useState } from "react";
import {
  FaUser,
  FaBed,
  FaUsers,
  FaMoneyBill,
  FaUtensils,
  FaClipboardList,
  FaTools,
  FaUserShield,
  FaChartBar,
} from "react-icons/fa";
import HostelListPage from "../../components/masters/HostelInfo/HostelListPage";

import TenantManagement from "../masters/TenantMang";
import Fees from "../../components/masters/Fees";
// import MessDetails from "./Mess";
import Attendance from "../../components/masters/Attendance";
import Maintenance from "../../components/masters/Maintenance";
import Visitors from "../../components/masters/Visitors";
import Reports from "../../components/masters/Reports";
import Dashboard from "../../components/masters/Dashboard";
import Topbar from "../../components/pages/Topbar";

const sections = [
  { id: "admin", title: "Dashboard", icon: <FaUser /> },
  { id: "hostel", title: "Hostel Info", icon: <FaBed /> },
  { id: "students", title: "Tenant Management", icon: <FaUsers /> },
  { id: "fees", title: "Fees & Payments", icon: <FaMoneyBill /> },
  { id: "mess", title: "Mess & Food", icon: <FaUtensils /> },
  { id: "attendance", title: "Attendance & Leaves", icon: <FaClipboardList /> },
  { id: "maintenance", title: "Maintenance & Complaints", icon: <FaTools /> },
  { id: "visitors", title: "Visitor Management", icon: <FaUserShield /> },
  { id: "reports", title: "Security Reports", icon: <FaChartBar /> },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("admin");

  const renderContent = () => {
    switch (activeSection) {
      case "admin":
        return <Dashboard />;
      case "hostel":
        return <HostelListPage />;
      case "students":
        return <TenantManagement />;
      case "fees":
        return <Fees />;
      // case "mess":
      //   return <MessDetails />;
      case "attendance":
        return <Attendance />;
      case "maintenance":
        return <Maintenance />;
      case "visitors":
        return <Visitors />;
      case "reports":
        return <Reports />;
      default:
        return (
          <p className="text-gray-500 text-center text-lg font-medium">
            Click on a section to view details
          </p>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white text-gray-900 shadow-xl h-screen flex flex-col border-r border-gray-300">
        <div className="bg-red-600 hover:bg-red-700 text-white font-bold text-3xl h-16 flex items-center justify-start px-6 text-start shadow-lg">
          🏠 Hostel Pro
        </div>

        <ul className="flex-1 overflow-y-auto p-5 space-y-3">
          {sections.map((section) => (
            <li
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-3 py-3 px-5 rounded-md cursor-pointer transition-all duration-300 text-lg font-medium tracking-wide shadow-sm ${
                activeSection === section.id
                  ? "bg-red-600 text-white shadow-md"
                  : "hover:bg-red-700 hover:text-white hover:shadow-md text-gray-900"
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span className="truncate">{section.title}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 bg-gray-50 rounded-lg shadow-lg overflow-hidden relative">
        {/* Fixed Topbar */}
        <div className="fixed top-0 left-72 right-0 h-16 z-10   shadow-md flex items-center ">
          <Topbar />
        </div>

        {/* Content Area */}
        <div className="h-full w-full overflow-x-auto overflow-y-auto p-6 border border-gray-300 rounded-lg pt-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// import React from "react";

// const Sidebar = () => {
//   return <div>Sidebar</div>;
// };

// export default Sidebar;
