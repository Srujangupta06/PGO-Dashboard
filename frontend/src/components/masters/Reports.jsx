import React, { useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Meal Consumption - March 2025",
      category: "Meal",
      date: "2025-03-01",
      status: "Generated",
    },
    {
      id: 2,
      title: "Visitor Log - March 2025",
      category: "Visitor",
      date: "2025-03-02",
      status: "Pending",
    },
    {
      id: 3,
      title: "Attendance Report - March 2025",
      category: "Attendance",
      date: "2025-03-03",
      status: "Generated",
    },
  ]);

  const [newReport, setNewReport] = useState({
    title: "",
    category: "Meal",
    date: "",
    status: "Pending",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value });
  };

  // Add or update report
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setReports((prev) =>
        prev.map((report) =>
          report.id === editingId ? { ...newReport, id: editingId } : report
        )
      );
      setEditingId(null);
    } else {
      setReports([...reports, { ...newReport, id: reports.length + 1 }]);
    }
    setNewReport({ title: "", category: "Meal", date: "", status: "Pending" });
  };

  // Edit report
  const handleEdit = (id) => {
    const report = reports.find((r) => r.id === id);
    setNewReport(report);
    setEditingId(id);
  };

  // Delete report
  const handleDelete = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Reports Management</h2>

      {/* Form for adding reports */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Report Title"
            value={newReport.title}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <select
            name="category"
            value={newReport.category}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="Meal">Meal</option>
            <option value="Attendance">Attendance</option>
            <option value="Visitor">Visitor</option>
          </select>
          <input
            type="date"
            name="date"
            value={newReport.date}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
          <select
            name="status"
            value={newReport.status}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="Generated">Generated</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editingId !== null ? "Update Report" : "Add Report"}
        </button>
      </form>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{report.title}</td>
                <td className="p-3">{report.category}</td>
                <td className="p-3">{report.date}</td>
                <td className={`p-3 ${report.status === "Generated" ? "text-green-500" : "text-orange-500"}`}>
                  {report.status}
                </td>
                <td className="p-3 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(report.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No reports available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
