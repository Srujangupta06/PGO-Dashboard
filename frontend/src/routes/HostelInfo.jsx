import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaPencilAlt } from "react-icons/fa";

const HostelInfo = () => {
  const [hostel, setHostel] = useState(() => {
    const savedHostel = localStorage.getItem('hostel');
    return savedHostel ? JSON.parse(savedHostel) : null;
  });
  
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [newHostel, setNewHostel] = useState({ name: "", type: "", rooms: "", capacity: "" });
  const [isEditingHostel, setIsEditingHostel] = useState(false);
  const [newRoom, setNewRoom] = useState({ number: "", type: "", beds: "", availableBeds: "", rent: "", status: "available" });
  const [editRoomId, setEditRoomId] = useState(null);
  const [error, setError] = useState('');
  const [showRoomFormModal, setShowRoomFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // Conformation to delete Hostel or Room
  const [roomIndexToDelete, setRoomIndexToDelete] = useState(null);

  useEffect(() => {
    if (hostel) {
      localStorage.setItem('hostel', JSON.stringify(hostel));
    }
  }, [hostel]);
  
  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const roomsPerPage = 10;

  const handleHostelChange = (e) => {
    setNewHostel({ ...newHostel, [e.target.name]: e.target.value });
  };

  const addOrUpdateHostel = () => {
    if (!newHostel.name || !newHostel.type || !newHostel.rooms || !newHostel.capacity) return;
    setHostel(newHostel);
    setIsEditingHostel(false);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      let beds = "";
      switch (value) {
        case "Single Sharing": beds = 1; break;
        case "Two Sharing": beds = 2; break;
        case "Three Sharing": beds = 3; break;
        case "Four Sharing": beds = 4; break;
        default: beds = "";
      }
      setNewRoom({ ...newRoom, type: value, beds, availableBeds: beds });
    } else {
      setNewRoom({ ...newRoom, [name]: value });
    }
  };

  const handleAvailableBedsChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= 0 && value <= newRoom.beds) {
      setNewRoom({ ...newRoom, availableBeds: value });
    }
  };

  const addRoom = () => {
    const existroom = rooms.some((room, i) => room.number === newRoom.number && i !== editRoomId);
    if (existroom) {
      setError('Room number already exists.');
      return;
    }

    const updatedRoom = {
      ...newRoom,
      status: parseInt(newRoom.availableBeds) === 0 ? "Occupied" : "Available",
    };

    if (!updatedRoom.number || !updatedRoom.type || updatedRoom.beds === "" || updatedRoom.availableBeds === "" || !updatedRoom.rent) {
      return;
    }

    if (editRoomId !== null) {
      setRooms(rooms.map((room, index) => index === editRoomId ? updatedRoom : room));
      setEditRoomId(null);
    } else {
      setRooms([...rooms, updatedRoom]);
    }

    setNewRoom({ number: "", type: "", beds: "", availableBeds: "", rent: "" });
    setError("");
    setShowRoomFormModal(false);
  };

  // Triggers modal for hostel delete
  const handleDeleteHostelClick = () => {
    setConfirmType("hostel");
    setShowConfirmModal(true);
  };

  // Triggers modal for room delete
  const handleDeleteRoomClick = (index) => {
    setConfirmType("room");
    setRoomIndexToDelete(index);
    setShowConfirmModal(true);
  };

  // Executes confirmed delete action
  const confirmDelete = () => {
    if (confirmType === "hostel") {
      localStorage.removeItem('hostel');
      localStorage.removeItem('rooms');
      setHostel(null);
      setRooms([]);
      setNewHostel({ name: "", type: "", rooms: "", capacity: "" });
    } else if (confirmType === "room" && roomIndexToDelete !== null) {
      setRooms(rooms.filter((_, i) => i !== roomIndexToDelete));
      setRoomIndexToDelete(null);
    }
    setShowConfirmModal(false);
    setConfirmType(null);
  };

  const editRoom = (index) => {
    setNewRoom(rooms[index]);
    setEditRoomId(index);
    setShowRoomFormModal(true);
  };

  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const displayedRooms = rooms.slice((pageNumber - 1) * roomsPerPage, pageNumber * roomsPerPage);

  return (
    <div className="w-full p-10 bg-gray-100 min-h-screen flex justify-center items-start relative">
      <div className="w-full p-10 max-w-7xl bg-white shadow-md rounded-md">
        <h1 className="p-2 text-4xl font-bold mb-2 text-center">Hostel Management</h1>

        {!hostel || isEditingHostel ? (
          <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Hostel</h2>
              <div className="flex justify-end items-center gap-6 mb-4">
                <button onClick={() => setNewHostel({ name: "", type: "", rooms: "", capacity: "" })}
                  className="border-red-600 border-2 gap-2 text-red-600 text-lg p-1 rounded-lg hover:scale-105 transition duration-300 shadow-md w-24 flex justify-center items-center">
                  <FaTimes size={20} /> Reset
                </button>
                <button onClick={addOrUpdateHostel}
                  className="bg-red-600 text-white text-lg p-2 gap-2 w-24 flex justify-center items-center rounded-lg hover:scale-105 transition duration-300 shadow-md">
                  <FaSave size={20} /> Save
                </button>
              </div>
            </div>

            <input type="text" name="name" placeholder="Hostel Name" value={newHostel.name}
              onChange={handleHostelChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <select name="type" value={newHostel.type} onChange={handleHostelChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50">
              <option value="" disabled>Select Hostel Type</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Co-Ed">Co-Ed</option>
            </select>

            <input type="number" min="0" name="rooms" placeholder="Total Rooms" value={newHostel.rooms}
              onChange={handleHostelChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <input type="number" min="0" name="capacity" placeholder="Total Capacity" value={newHostel.capacity}
              onChange={handleHostelChange}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        ) : (
          <div className="w-full mx-auto bg-white p-4">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Hostel Details</h2>
              <div className="flex gap-6 items-center">
                <button onClick={() => setIsEditingHostel(true)}
                  className="text-red-600 flex gap-2 p-1 w-24 border-2 border-red-600 justify-center items-center rounded-lg hover:scale-110 duration-300 transition"><FaEdit size={18} />Edit</button>
                <button onClick={handleDeleteHostelClick}
                  className="text-white bg-red-600 flex gap-2 p-2 w-24 justify-center items-center rounded-lg hover:scale-110 duration-300 transition"><FaTrash size={18} />Delete</button>
              </div>
            </div>
            <div className="pb-6 grid grid-cols-1 gap-3 text-lg">
                <p><strong>Hostel Name:</strong> {hostel.name}</p>
                <p><strong>Hostel Type:</strong> {hostel.type}</p>
                <p><strong>Total Rooms:</strong> {hostel.rooms}</p>
                <p><strong>Total Capacity:</strong> {hostel.capacity}</p>
            </div>
            <div className="flex justify-between items-center my-6">
              <h3 className="text-2xl font-bold text-center">Rooms List</h3>
              <button onClick={() => { setShowRoomFormModal(true); setEditRoomId(null) ; setNewRoom({ number: "", type: "", beds: "", availableBeds: "", rent: "", status: "available" }) }} 
              className="bg-green-600 text-white p-2 px-4 gap-2 rounded-lg hover:scale-105 transition flex justify-center items-center"><FaPlus /> Add New Room</button>
            </div> 

            <table className="w-full mt-2 rounded-md">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2">Room No.</th>
                  <th className="p-2">Room Type</th>
                  <th className="p-2">Beds</th>
                  <th className="p-2">Available Beds</th>
                  <th className="p-2">Room Rent</th>
                  <th className="p-2">Room Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedRooms.map((room, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-center">{room.number}</td>
                    <td className="p-2 text-center">{room.type}</td>
                    <td className="p-2 text-center">{room.beds}</td>
                    <td className="p-2 text-center">{room.availableBeds}</td>
                    <td className="p-2 text-center">{room.rent}</td>
                    <td className="p-2 text-center font-bold">
                      <p className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        room.status === 'Available' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                      }`}>{room.status}</p>
                    </td>
                    <td className="p-2 flex justify-center items-center gap-2">
                      <button onClick={() => editRoom(index)} className="text-gray-600"><FaPencilAlt size={18} /></button>
                      <button onClick={() => handleDeleteRoomClick(index)} className="text-gray-600"><FaTrash size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center gap-4 mt-2 p-2 bg-gray-300">
              <button disabled={pageNumber === 1} onClick={() => setPageNumber(prev => prev - 1)}>Prev</button>
              <span>Page <span className="font-bold">{pageNumber}</span> of {totalPages}</span>
              <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(prev => prev + 1)}>Next</button>
            </div>


          </div>
        )}

        {showRoomFormModal && (
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
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editRoomId !== null ? "Edit Room" : "Add Room"}
                  </h2>
                  <button
                    onClick={() => {setShowRoomFormModal(false),setError(false)}}
                    className="text-gray-600 hover:text-red-600 transition"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
        
                {/* Form Inputs */}
                <div className="gap-4 flex-wrap flex flex-col justify-center">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Room Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Room Number"
                      value={newRoom.number}
                      onChange={handleRoomChange}
                      className="shadow border rounded w-full md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div> 
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Room Type</label>
                    <select
                      name="type"
                      value={newRoom.type}
                      onChange={handleRoomChange}
                      className="flex-1 shadow border rounded w-full md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Room Type
                      </option>
                      <option value="Single Sharing">Single Sharing</option>
                      <option value="Two Sharing">Two Sharing</option>
                      <option value="Three Sharing">Three Sharing</option>
                      <option value="Four Sharing">Four Sharing</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Total Beds</label>
                    <input
                      type="number"
                      min="0"
                      name="beds"
                      placeholder="Beds"
                      value={newRoom.beds}
                      onChange={handleRoomChange}
                      className="shadow border rounded w-full md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>    
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Available Beds</label>
                    <input
                      type="number"
                      min="0"
                      max={newRoom.beds}
                      name="availableBeds"
                      placeholder="Available Beds"
                      value={newRoom.availableBeds}
                      onChange={handleAvailableBedsChange}
                      className="shadow border rounded w-full md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div> 
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Room Rent</label>
                    <input
                      type="number"
                      min="0"
                      name="rent"
                      placeholder="Room Rent"
                      value={newRoom.rent}
                      step={newRoom.rent >= 4000 ? 100 : 500}
                      onChange={handleRoomChange}
                      className="shadow border rounded w-full md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div> 
                </div>
        
                {/* Error Display */}
                {error && (
                  <p className="text-red-600 mt-4 font-semibold text-lg text-center">{error}</p>
                )}
        
                {/* Buttons */}
                <div className="bg-gray-50 px-4 py-3 mt-6 sm:px-6 sm:flex sm:flex-row-reverse flex justify-start">
                  <button
                    onClick={addRoom}
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editRoomId !== null ? "Update Room" : "Add Room"}
                  </button>
                  <button
                    onClick={() => {setShowRoomFormModal(false),setError(false)}}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
        
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                  >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white p-6 rounded-md shadow-md text-center w-96 overflow-hidden transform transition-all sm:align-middle">
                  <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                  <p className="mb-6">
                    {confirmType === "hostel"
                     ? "This will remove the hostel and all rooms."
                     : "This will delete the selected room."}
                  </p>
                  <div className="flex justify-center gap-4">
                     <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                        Confirm
                     </button>
                     <button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                     </button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelInfo;
