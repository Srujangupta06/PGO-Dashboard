import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const HostelForm = ({
  setHostelName,
  setHostelCategory,
  setTotalRooms,
  setMaxCapacity,
  addNewHostel,
  updateHostelDetails,
  hostelName,
  hostelCategory,
  totalRooms,
  maxCapacity,
  setShowAddHostelFormModal,
  setIsEditingHostel,
  isEditingHostel,
}) => {
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Add Hostel
              </h2>
              <div className="flex justify-end items-center gap-6 mb-4">
                <button
                  onClick={() => {
                    setHostelName(""),
                      setHostelCategory(""),
                      setTotalRooms(""),
                      setMaxCapacity("");
                  }}
                  className="border-red-600 border-2 gap-2 text-red-600 text-lg p-1 rounded-lg hover:scale-105 transition duration-300 shadow-md w-24 flex justify-center items-center"
                >
                  <FaTimes size={20} /> Reset
                </button>
                <button
                  onClick={() => {
                    isEditingHostel ? updateHostelDetails() : addNewHostel();
                    setShowAddHostelFormModal(false);
                    setIsEditingHostel(false);
                  }}
                  className="bg-red-600 text-white text-lg p-2 gap-2 w-24 flex justify-center items-center rounded-lg hover:scale-105 transition duration-300 shadow-md"
                >
                  <FaSave size={20} /> Save
                </button>
              </div>
            </div>

            <label>Hostel Name</label>
            <input
              type="text"
              name="name"
              placeholder="Hostel Name"
              value={hostelName}
              className="w-full mt-1 p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setHostelName(e.target.value)}
            />
            <label>Hostel Category</label>
            <select
              name="category"
              value={hostelCategory}
              onChange={(e) => setHostelCategory(e.target.value)}
              className="w-full mt-1 p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            >
              <option value="" disabled>
                Select Hostel Type
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            <label>Total Rooms</label>
            <input
              type="number"
              min="0"
              name="totalRooms"
              placeholder="Total Rooms"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              className="w-full mt-1 p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label>Total Capacity</label>
            <input
              type="number"
              min="0"
              name="maxCapacity"
              placeholder="Total Capacity"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              className="w-full mt-1 p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => {
                setShowAddHostelFormModal(false), setIsEditingHostel(false);
              }}
              className="bg-red-600 mt-4 text-white text-lg p-2 gap-2 w-24 flex justify-center items-center rounded-lg hover:scale-105 transition duration-300 shadow-md"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelForm;
