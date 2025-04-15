import React, { useState, useEffect } from "react";
import HostelAndRoomDetails from "./HostelAndRoomdetails";
import ConfirmModal from "./ConfirmModal";
import { backendUrl } from "../utils/utils";
import { toast } from "react-toastify";
import RoomFormModal from "./RoomFormModal";
import HostelForm from "./HostelForm";
const HostelInfo = () => {
  const createHostelUrl = `${backendUrl}/api/hostel/add`;
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const confirmEditUrl = `${backendUrl}/api/hostel/edit`;
  const confirmDeleteUrl = `${backendUrl}/api/hostel/remove`;
  const [hostel, setHostel] = useState(null);
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });
  const [showAddHostelFormModal, setShowAddHostelFormModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditingHostel, setIsEditingHostel] = useState(false);
  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "",
    beds: "",
    availableBeds: "",
    rent: "",
    status: "available",
  });
  const [editRoomId, setEditRoomId] = useState(null);
  const [error, setError] = useState("");
  const [showRoomFormModal, setShowRoomFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState(null);
  const [roomIndexToDelete, setRoomIndexToDelete] = useState(null);
  const [hostelName, setHostelName] = useState("");
  const [hostelCategory, setHostelCategory] = useState("men");
  const [totalRooms, setTotalRooms] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      console.error("Error fetching hostel:", error);
      alert("Failed to fetch hostel data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, []);

  useEffect(() => {
    if (isEditingHostel && hostel) {
      setHostelName(hostel.name || "");
      setHostelCategory(hostel.category || "men");
      setTotalRooms(hostel.totalRooms || "");
      setMaxCapacity(hostel.maxCapacity || "");
    }
  }, [hostel, isEditingHostel]);

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const handleHostelSubmit = async (method, url, hostelData) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hostelData),
      });
      const data = await response.json();
      if (response.ok) {
        setHostel(hostelData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getHostelData = () => {
    return {
      name: hostelName || hostel?.name,
      category: hostelCategory || hostel?.category,
      totalRooms: totalRooms || hostel?.totalRooms,
      maxCapacity: maxCapacity || hostel?.maxCapacity,
    };
  };

  const validateHostelData = (hostelInfo) => {
    if (!hostelInfo.name || !hostelInfo.totalRooms || !hostelInfo.maxCapacity) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const addNewHostel = () => {
    const hostelInfo = getHostelData();
    if (!validateHostelData(hostelInfo)) return;
    handleHostelSubmit("POST", createHostelUrl, hostelInfo);
  };

  const updateHostelDetails = () => {
    const hostelInfo = getHostelData();
    if (!validateHostelData(hostelInfo)) return;
    handleHostelSubmit("PATCH", confirmEditUrl, hostelInfo);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      let beds = "";
      switch (value) {
        case "Single Sharing":
          beds = 1;
          break;
        case "Two Sharing":
          beds = 2;
          break;
        case "Three Sharing":
          beds = 3;
          break;
        case "Four Sharing":
          beds = 4;
          break;
        default:
          beds = "";
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
    const existroom = rooms.some(
      (room, i) => room.number === newRoom.number && i !== editRoomId
    );
    if (existroom) {
      setError("Room number already exists.");
      return;
    }

    const updatedRoom = {
      ...newRoom,
      status: parseInt(newRoom.availableBeds) === 0 ? "Occupied" : "Available",
    };

    if (
      !updatedRoom.number ||
      !updatedRoom.type ||
      updatedRoom.beds === "" ||
      updatedRoom.availableBeds === "" ||
      !updatedRoom.rent
    ) {
      return;
    }

    if (editRoomId !== null) {
      setRooms(
        rooms.map((room, index) => (index === editRoomId ? updatedRoom : room))
      );
      setEditRoomId(null);
    } else {
      setRooms([...rooms, updatedRoom]);
    }

    setNewRoom({ number: "", type: "", beds: "", availableBeds: "", rent: "" });
    setError("");
    setShowRoomFormModal(false);
  };

  const handleDeleteHostelClick = () => {
    setConfirmType("hostel");
    setShowConfirmModal(true);
  };

  const deleteHostelInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(confirmDeleteUrl, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setHostel(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoomClick = (index) => {
    setConfirmType("room");
    setRoomIndexToDelete(index);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (confirmType === "hostel") {
      deleteHostelInfo();
      localStorage.removeItem("rooms");
      setHostel(null);
      setRooms([]);
      setHostelName(null);
      setHostelCategory("men");
      setTotalRooms(null);
      setMaxCapacity(null);
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
  const displayedRooms = rooms.slice(
    (pageNumber - 1) * roomsPerPage,
    pageNumber * roomsPerPage
  );

  const [pageNumber, setPageNumber] = useState(1);
  const roomsPerPage = 10;

  return (
    <div>
      <div className="w-full p-2 min-h-screen flex justify-center items-start relative">
        <div className="w-full p-10 max-w-7xl">
          <h1 className="p-2 text-4xl font-bold mb-2 text-center">
            Hostel Management
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
          ) : !hostel || Object.keys(hostel).length === 0 ? (
            <div className="bg-white w-full max-w-4xl mx-auto flex gap-20">
              <div className="flex flex-col justify-center gap-18">
                <h1 className="font-medium text-2xl text-gray-700 leading-10">
                  List Your
                  <br />
                  <span className="font-bold text-6xl">Hostel</span>
                </h1>
                <h1 className="font-light italic text-xl text-gray-800">
                  It all begins with one click — add your hostel and manage with
                  ease.
                </h1>
                <button
                  onClick={() => {
                    setShowAddHostelFormModal(true);
                  }}
                  className="bg-green-600 text-white w-40 px-4 py-2 rounded-full hover:scale-105 transition flex justify-center items-center"
                >
                  Get Started
                </button>
              </div>
              <div className="h-full w-full">
                <img
                  src="https://img.freepik.com/free-vector/college-student-dorm-interior-young-travelers-stopping-hostel-vector-illustration-alternative-accommodation-backpackers-house-trip-concept_74855-13027.jpg"
                  className="h-120"
                />
              </div>
            </div>
          ) : (
            <HostelAndRoomDetails
              setIsEditingHostel={setIsEditingHostel}
              hostel={hostel}
              handleDeleteHostelClick={handleDeleteHostelClick}
              setShowRoomFormModal={setShowRoomFormModal}
              setEditRoomId={setEditRoomId}
              setNewRoom={setNewRoom}
              displayedRooms={displayedRooms}
              editRoom={editRoom}
              handleDeleteRoomClick={handleDeleteRoomClick}
              setPageNumber={setPageNumber}
              rooms={rooms}
              pageNumber={pageNumber}
              totalPages={totalPages}
            />
          )}

          {showRoomFormModal && (
            <RoomFormModal
              setShowRoomFormModal={setShowRoomFormModal}
              setError={setError}
              editRoomId={editRoomId}
              newRoom={newRoom}
              handleRoomChange={handleRoomChange}
              handleAvailableBedsChange={handleAvailableBedsChange}
              error={error}
              addRoom={addRoom}
            />
          )}

          {(isEditingHostel || showAddHostelFormModal) && (
            <HostelForm
              setHostelName={setHostelName}
              setHostelCategory={setHostelCategory}
              setTotalRooms={setTotalRooms}
              setMaxCapacity={setMaxCapacity}
              addNewHostel={addNewHostel}
              updateHostelDetails={updateHostelDetails}
              hostelName={hostelName}
              hostelCategory={hostelCategory}
              totalRooms={totalRooms}
              maxCapacity={maxCapacity}
              setShowAddHostelFormModal={setShowAddHostelFormModal}
              setIsEditingHostel={setIsEditingHostel}
              isEditingHostel={isEditingHostel}
            />
          )}

          {showConfirmModal && (
            <ConfirmModal
              confirmType={confirmType}
              confirmDelete={confirmDelete}
              setShowConfirmModal={setShowConfirmModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelInfo;
