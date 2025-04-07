import React, { useState } from "react";
import { Trash2, Edit, Search, PlusCircle } from "lucide-react";

// Dummy Data for Hostels
const initialHostels = [
  {
    id: 1,
    name: "Sunrise Boys Hostel",
    location: "New Delhi",
    totalRooms: 50,
    occupiedRooms: 35,
    vacancy: 15,
    contact: "9876543210",
  },
  {
    id: 2,
    name: "Moonlight Girls Hostel",
    location: "Mumbai",
    totalRooms: 40,
    occupiedRooms: 25,
    vacancy: 15,
    contact: "8765432109",
  },
];

// HostelListPage Component
const HostelListPage = ({ onAddNew, onEdit, onSearch }) => {
  const [hostels, setHostels] = useState(initialHostels);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Hostels Based on Search
  const filteredHostels = hostels.filter(
    (hostel) =>
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete Hostel
  const handleDelete = (id) => {
    setHostels((prevHostels) => prevHostels.filter((hostel) => hostel.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hostel Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={onSearch}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          >
            <Search size={24} />
          </button>
          <button
            onClick={onAddNew}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
          >
            <PlusCircle size={24} />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search hostels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Hostel List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHostels.map((hostel) => (
          <div key={hostel.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{hostel.name}</h2>
            <p><strong>Location:</strong> {hostel.location}</p>
            <p><strong>Total Rooms:</strong> {hostel.totalRooms}</p>
            <p><strong>Occupied Rooms:</strong> {hostel.occupiedRooms}</p>
            <p><strong>Vacancy:</strong> {hostel.vacancy}</p>
            <p><strong>Contact:</strong> {hostel.contact}</p>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => onEdit(hostel)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(hostel.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelListPage;
