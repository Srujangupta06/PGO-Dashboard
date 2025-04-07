import React, { useState } from "react";

const Maintenance = () => {
  // Sample maintenance records
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 1,
      userId: "S101",
      name: "Rahul Sharma",
      roomNumber: "A-101",
      issueType: "Leaking Pipe",
      status: "Pending",
      dateReported: "2024-03-17",
    },
    {
      id: 2,
      userId: "S102",
      name: "Priya Gupta",
      roomNumber: "B-202",
      issueType: "Electrical Issue",
      status: "In Progress",
      dateReported: "2024-03-15",
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    userId: "",
    name: "",
    roomNumber: "",
    issueType: "",
    status: "Pending",
    dateReported: "",
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
      setMaintenanceRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === editingId ? { ...newRecord, id: editingId } : record
        )
      );
      setEditingId(null);
    } else {
      setMaintenanceRecords([
        ...maintenanceRecords,
        { ...newRecord, id: maintenanceRecords.length + 1 },
      ]);
    }
    setNewRecord({ userId: "", name: "", roomNumber: "", issueType: "", status: "Pending", dateReported: "" });
  };

  // Edit record
  const handleEdit = (id) => {
    const record = maintenanceRecords.find((record) => record.id === id);
    setNewRecord(record);
    setEditingId(id);
  };

  // Delete record
  const handleDelete = (id) => {
    setMaintenanceRecords(maintenanceRecords.filter((record) => record.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Maintenance Management</h2>

      {/* Form for adding maintenance issue */}
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
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={newRecord.roomNumber}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="date"
            name="dateReported"
            value={newRecord.dateReported}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="issueType"
            placeholder="Issue Type (e.g. Leaking Pipe)"
            value={newRecord.issueType}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <select
            name="status"
            value={newRecord.status}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editingId !== null ? "Update Record" : "Add Maintenance Request"}
        </button>
      </form>

      {/* Maintenance Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Issue Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date Reported</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRecords.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{record.userId}</td>
                <td className="p-3">{record.name}</td>
                <td className="p-3">{record.roomNumber}</td>
                <td className="p-3">{record.issueType}</td>
                <td className={`p-3 ${record.status === "Resolved" ? "text-green-500" : "text-orange-500"}`}>
                  {record.status}
                </td>
                <td className="p-3">{record.dateReported}</td>
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
            {maintenanceRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No maintenance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;
