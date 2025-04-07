import React, { useState } from "react";

const Visitors = () => {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      contact: "9876543210",
      purpose: "Meeting",
      checkIn: "2025-03-17T10:00",
      checkOut: "",
      status: "Checked-In",
    },
    {
      id: 2,
      name: "Priya Gupta",
      contact: "9876541230",
      purpose: "Delivery",
      checkIn: "2025-03-17T09:30",
      checkOut: "2025-03-17T10:00",
      status: "Checked-Out",
    },
  ]);

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    contact: "",
    purpose: "",
    checkIn: "",
    checkOut: "",
    status: "Checked-In",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewVisitor({ ...newVisitor, [e.target.name]: e.target.value });
  };

  // Add or update visitor
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setVisitors((prev) =>
        prev.map((visitor) =>
          visitor.id === editingId ? { ...newVisitor, id: editingId } : visitor
        )
      );
      setEditingId(null);
    } else {
      setVisitors([...visitors, { ...newVisitor, id: visitors.length + 1 }]);
    }
    setNewVisitor({ name: "", contact: "", purpose: "", checkIn: "", checkOut: "", status: "Checked-In" });
  };

  // Edit visitor record
  const handleEdit = (id) => {
    const visitor = visitors.find((v) => v.id === id);
    setNewVisitor(visitor);
    setEditingId(id);
  };

  // Delete visitor record
  const handleDelete = (id) => {
    setVisitors(visitors.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Visitor Management</h2>

      {/* Form for adding visitors */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Visitor Name"
            value={newVisitor.name}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={newVisitor.contact}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose (Meeting, Delivery, etc.)"
            value={newVisitor.purpose}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            name="checkIn"
            value={newVisitor.checkIn}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="datetime-local"
            name="checkOut"
            value={newVisitor.checkOut}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <select
            name="status"
            value={newVisitor.status}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="Checked-In">Checked-In</option>
            <option value="Checked-Out">Checked-Out</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editingId !== null ? "Update Visitor" : "Add Visitor"}
        </button>
      </form>

      {/* Visitors Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Check-In</th>
              <th className="p-3 text-left">Check-Out</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{visitor.name}</td>
                <td className="p-3">{visitor.contact}</td>
                <td className="p-3">{visitor.purpose}</td>
                <td className="p-3">{visitor.checkIn}</td>
                <td className="p-3">{visitor.checkOut || "N/A"}</td>
                <td className={`p-3 ${visitor.status === "Checked-Out" ? "text-green-500" : "text-orange-500"}`}>
                  {visitor.status}
                </td>
                <td className="p-3 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(visitor.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(visitor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {visitors.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No visitor records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitors;
