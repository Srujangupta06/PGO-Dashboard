import React from "react";

const Fees = () => {
  const feesData = [
    {
      tenantName: "John Doe",
      roomNumber: "101",
      joinDate: "2025-01-15",
      rentAmount: 5000,
      paidAmount: 4000,
      depositAmount: 1000,
      paymentStatus: "Due",
      nextDueDate: "2025-05-01",
      lastPaidDate: "2025-04-01",
      paymentMode: "UPI",
    },
    {
      tenantName: "Anjali Sharma",
      roomNumber: "202",
      joinDate: "2025-02-10",
      rentAmount: 6000,
      paidAmount: 6000,
      depositAmount: 2000,
      paymentStatus: "Paid",
      nextDueDate: "2025-05-10",
      lastPaidDate: "2025-04-10",
      paymentMode: "Cash",
    },
    {
      tenantName: "Ravi Teja",
      roomNumber: "303",
      joinDate: "2025-03-05",
      rentAmount: 5500,
      paidAmount: 0,
      depositAmount: 1500,
      paymentStatus: "Due",
      nextDueDate: "2025-04-05",
      lastPaidDate: "N/A",
      paymentMode: "Bank Transfer",
    },
    {
      tenantName: "Sneha Reddy",
      roomNumber: "404",
      joinDate: "2025-01-20",
      rentAmount: 6200,
      paidAmount: 6200,
      depositAmount: 2500,
      paymentStatus: "Paid",
      nextDueDate: "2025-05-20",
      lastPaidDate: "2025-04-20",
      paymentMode: "UPI",
    },
  ];
  

  const statusColor = (status) => {
    return status === "Paid"
      ? "text-green-600 bg-green-100"
      : status === "Due"
      ? "text-red-600 bg-red-100"
      : "text-yellow-600 bg-yellow-100";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment List</h2>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Tenant</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Join Date</th>
              <th className="px-4 py-3 text-left">Deposit</th>

              <th className="px-4 py-3 text-left">Rent</th>
              <th className="px-4 py-3 text-left">Paid </th>

              
              <th className="px-4 py-3 text-left">Last Paid</th>
              <th className="px-4 py-3 text-left">Next Due</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {feesData.map((fee, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{fee.tenantName}</td>
                <td className="px-4 py-3">{fee.roomNumber}</td>
                <td className="px-4 py-3">{fee.joinDate}</td>
                <td className="px-4 py-3">₹{fee.depositAmount}</td>
                <td className="px-4 py-3">₹{fee.rentAmount}</td>
                <td className="px-4 py-3">₹{fee.paidAmount}</td>

                <td className="px-4 py-3">{fee.lastPaidDate}</td>
                <td className="px-4 py-3">{fee.nextDueDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                      fee.paymentStatus
                    )}`}
                  >
                    {fee.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">{fee.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
