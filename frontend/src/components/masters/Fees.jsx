import React, { useState } from "react";
import  Button  from "../ui/button";
import { Download, Trash, Search } from "lucide-react";
import { saveAs } from "file-saver";

const Fees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const students = [
    {
      id: "S101",
      name: "Rahul Sharma",
      totalFee: 50000,
      paidAmount: 40000,
      dueAmount: 10000,
      dueDate: "2024-04-10",
      status: "Pending",
      lastPayment: "2024-02-15",
      mode: "UPI",
    },
    {
      id: "S102",
      name: "Priya Gupta",
      totalFee: 50000,
      paidAmount: 50000,
      dueAmount: 0,
      dueDate: "-",
      status: "Paid",
      lastPayment: "2024-03-01",
      mode: "Bank Transfer",
    },
    {
      id: "S103",
      name: "Aman Verma",
      totalFee: 50000,
      paidAmount: 35000,
      dueAmount: 15000,
      dueDate: "2024-04-15",
      status: "Overdue",
      lastPayment: "2024-01-20",
      mode: "Cash",
    },
  ];

  // Filter Function
  const filteredStudents = students.filter(
    (student) =>
      (filterStatus === "All" || student.status === filterStatus) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSV Export Function
  const exportCSV = () => {
    const csvData = [
      ["Student ID", "Name", "Total Fee", "Paid Amount", "Due Amount", "Due Date", "Payment Status", "Last Payment", "Mode"],
      ...students.map((s) => [s.id, s.name, s.totalFee, s.paidAmount, s.dueAmount, s.dueDate, s.status, s.lastPayment, s.mode]),
    ];
    const csvString = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "fees_data.csv");
  };

  // Delete CSV Function
  const deleteCSV = () => {
    // There is no direct way to delete a file from the user's system using JavaScript.
    // We inform the user instead.
    alert("The CSV file cannot be deleted automatically. Please delete it manually from your downloads.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Student Fees & Payments</h2>
        <div className="flex gap-2">
          <Button onClick={exportCSV} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            <Download size={18} /> Export CSV
          </Button>
          <Button onClick={deleteCSV} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            <Trash size={18} /> Delete CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Name"
            className="pl-8 p-2 border rounded-md w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="p-2 border rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Total Fee</th>
              <th className="p-3 text-left">Paid Amount</th>
              <th className="p-3 text-left">Due Amount</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Last Payment</th>
              <th className="p-3 text-left">Mode</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">₹{student.totalFee.toLocaleString()}</td>
                <td className="p-3">₹{student.paidAmount.toLocaleString()}</td>
                <td className="p-3 text-red-600">₹{student.dueAmount.toLocaleString()}</td>
                <td className="p-3">{student.dueDate}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      student.status === "Paid"
                        ? "bg-green-500"
                        : student.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-3">{student.lastPayment}</td>
                <td className="p-3">{student.mode}</td>
                <td className="p-3 text-center">
                  <button className="text-blue-500 hover:underline">View/Edit</button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
