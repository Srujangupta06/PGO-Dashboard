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
      <div className="pb-6 grid grid-cols-1 gap-3 text-lg">
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
      </div>
      <div className="flex justify-between items-center my-6">
        <h3 className="text-2xl font-bold text-center">Rooms List</h3>
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
          className="bg-green-600 text-white p-2 px-4 gap-2 rounded-lg hover:scale-105 transition flex justify-center items-center"
        >
          <FaPlus /> Add New Room
        </button>
      </div>

      <table className="w-full mt-2 rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-gray-700 font-medium">Room No.</th>
            <th className="p-2 text-gray-700 font-medium">Room Type</th>
            <th className="p-2 text-gray-700 font-medium">Beds</th>
            <th className="p-2 text-gray-700 font-medium">Available Beds</th>
            <th className="p-2 text-gray-700 font-medium">Room Rent</th>
            <th className="p-2 text-gray-700 font-medium">Room Status</th>
            <th className="p-2 text-gray-700 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedRooms.map((room, index) => (
            <tr key={index} className="border-y border-gray-300">
              <td className="p-4 text-center">{room.number}</td>
              <td className="p-4 text-center">{room.type}</td>
              <td className="p-4 text-center">{room.beds}</td>
              <td className="p-4 text-center">{room.availableBeds}</td>
              <td className="p-4 text-center">{room.rent}</td>
              <td className="p-4 text-center font-bold">
                <p
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                    room.status === "Available"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {room.status}
                </p>
              </td>
              <td className="p-4 flex justify-center items-center gap-2">
                <button
                  onClick={() => editRoom(index)}
                  className="text-gray-600"
                >
                  <FaPencilAlt size={18} />
                </button>
                <button
                  onClick={() => handleDeleteRoomClick(index)}
                  className="text-gray-600"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rooms.length === 0 && (
        <p className="text-center text-gray-700 mt-2">
          No rooms available. Add a new room to get started.
        </p>
      )}

      <div className="flex justify-center gap-4 mt-2 p-2 bg-gray-200 font-medium text-gray-700">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page{" "}
          <span className="font-bold">{totalPages !== 0 ? pageNumber : 0}</span>{" "}
          of {totalPages}
        </span>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HostelAndRoomDetails;
