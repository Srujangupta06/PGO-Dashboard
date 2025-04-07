import React, { useState } from "react";

const Attendance = () => {
  // Sample data
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      userId: "S101",
      name: "Rahul Sharma",
      date: "2024-03-17",
      mealType: "Lunch",
      status: "Present",
      time: "12:30 PM",
    },
    {
      id: 2,
      userId: "S102",
      name: "Priya Gupta",
      date: "2024-03-17",
      mealType: "Dinner",
      status: "Absent",
      time: "-",
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    userId: "",
    name: "",
    date: "",
    mealType: "",
    status: "Present",
    time: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  // Add or update record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setAttendanceRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === editingId ? { ...newRecord, id: editingId } : record
        )
      );
      setEditingId(null);
    } else {
      setAttendanceRecords([
        ...attendanceRecords,
        { ...newRecord, id: attendanceRecords.length + 1 },
      ]);
    }
    setNewRecord({ userId: "", name: "", date: "", mealType: "", status: "Present", time: "" });
  };

  // Edit record
  const handleEdit = (id) => {
    const record = attendanceRecords.find((record) => record.id === id);
    setNewRecord(record);
    setEditingId(id);
  };

  // Delete record
  const handleDelete = (id) => {
    setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Attendance Management</h2>

      {/* Form for adding new attendance */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={newRecord.userId}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newRecord.name}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <select
            name="mealType"
            value={newRecord.mealType}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <select
            name="status"
            value={newRecord.status}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input
            type="time"
            name="time"
            value={newRecord.time}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editingId !== null ? "Update Attendance" : "Add Attendance"}
        </button>
      </form>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Meal Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{record.userId}</td>
                <td className="p-3">{record.name}</td>
                <td className="p-3">{record.date}</td>
                <td className="p-3">{record.mealType}</td>
                <td className={`p-3 ${record.status === "Present" ? "text-green-500" : "text-red-500"}`}>
                  {record.status}
                </td>
                <td className="p-3">{record.time}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(record.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {attendanceRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
