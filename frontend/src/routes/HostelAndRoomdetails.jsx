import React from "react";
import { FaEdit, FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

const HostelAndRoomDetails = ({
  setIsEditingHostel,
  hostel,
  handleDeleteHostelClick,
  setShowRoomFormModal,
  setEditRoomId,
  setNewRoom,
  displayedRooms,
  editRoom,
  handleDeleteRoomClick,
  setPageNumber,
  rooms,
  pageNumber,
  totalPages,
}) => {
  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Hostel Details</h2>
        <div className="flex gap-6 items-center">
          <button
            onClick={() => setIsEditingHostel(true)}
            className="text-red-600 flex gap-2 p-1 w-24 border-2 border-red-600 justify-center items-center rounded-lg hover:scale-110 duration-300 transition"
          >
            <FaEdit size={18} />
            Edit
          </button>
          <button
            onClick={handleDeleteHostelClick}
            className="text-white bg-red-600 flex gap-2 p-2 w-24 justify-center items-center rounded-lg hover:scale-110 duration-300 transition"
          >
            <FaTrash size={18} />
            Delete
          </button>
        </div>
      </div>
      {/* <div className="pb-6 grid grid-cols-1 gap-3 text-lg">
        <p>
          <strong>Hostel Name:</strong> {hostel.name}
        </p>
        <p>
          <strong>Hostel Category:</strong> {hostel.category}
        </p>
        <p>
          <strong>Total Rooms:</strong> {hostel.totalRooms}
        </p>
        <p>
          <strong>Total Capacity:</strong> {hostel.maxCapacity}
        </p>
      </div> */}
      {/* changes to card data wise */}
      <div className="p-6 rounded-2xl border border-gray-300 bg-white shadow-md text-lg grid grid-cols-1 gap-3">
        <p>
          <strong className="text-gray-700">Hostel Name:</strong> {hostel.name}
        </p>
        <p>
          <strong className="text-gray-700">Hostel Category:</strong>{" "}
          {hostel.category}
        </p>
        <p>
          <strong className="text-gray-700">Total Rooms:</strong>{" "}
          {hostel.totalRooms}
        </p>
        <p>
          <strong className="text-gray-700">Total Capacity:</strong>{" "}
          {hostel.maxCapacity}
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 mt-4 space-y-3">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Rooms List</h3>
          <button
            onClick={() => {
              setShowRoomFormModal(true);
              setEditRoomId(null);
              setNewRoom({
                number: "",
                type: "",
                beds: "",
                availableBeds: "",
                rent: "",
                status: "available",
              });
            }}
            className="bg-green-600 text-white py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-green-700 hover:scale-105 transition duration-200"
          >
            <FaPlus className="text-white" />
            Add New Room
          </button>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-gray-700 font-semibold">Room No.</th>
              <th className="p-3 text-gray-700 font-semibold">Room Type</th>
              <th className="p-3 text-gray-700 font-semibold">Beds</th>
              <th className="p-3 text-gray-700 font-semibold">
                Available Beds
              </th>
              <th className="p-3 text-gray-700 font-semibold">Room Rent</th>
              <th className="p-3 text-gray-700 font-semibold">Room Status</th>
              <th className="p-3 text-gray-700 font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRooms.map((room, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-center">{room.number}</td>
                <td className="p-3 text-center">{room.type}</td>
                <td className="p-3 text-center">{room.beds}</td>
                <td className="p-3 text-center">{room.availableBeds}</td>
                <td className="p-3 text-center">{room.rent}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${
                      room.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center items-center gap-3">
                  <button
                    onClick={() => editRoom(index)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaPencilAlt size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteRoomClick(index)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <p className="text-center text-gray-600 py-4">
            No rooms available. Add a new room to get started.
          </p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium text-gray-700">
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
            className={`px-4 py-2 rounded-md ${
              pageNumber === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>
          <span>
            Page{" "}
            <span className="font-bold">
              {totalPages !== 0 ? pageNumber : 0}
            </span>{" "}
            of {totalPages}
          </span>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber((prev) => prev + 1)}
            className={`px-4 py-2 rounded-md ${
              pageNumber === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelAndRoomDetails;
