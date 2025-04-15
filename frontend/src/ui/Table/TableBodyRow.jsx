import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const TableBodyRow = ({ roomInfo, index }) => {
  const { roomNumber, sharingType } = roomInfo;

  return (
    <tr className="group relative hover:bg-blue-50 transition-colors even:bg-gray-50 cursor-pointer">
      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-700">
        {roomNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {sharingType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {sharingType === "Single"
          ? "1"
          : sharingType === "Double"
          ? "2"
          : sharingType === "Triple"
          ? "3"
          : 4}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{2}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-medium">
        ₹6500
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span className="bg-green-100 text-green-800 px-1.5 py-1 rounded-sm">
          Available
        </span>
      </td>

      {/* 🧊 Floating buttons */}
      <td className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-2 bg-white px-2 py-2 rounded shadow z-10">
        <button className="text-blue-600 text-sm font-medium mr-2 cursor-pointer">
          <FaEdit className="text-blue-600" />
        </button>
        <button className="text-gray-600  text-sm font-medium cursor-pointer">
          <AiFillDelete className="text-gray-600" />
        </button>
      </td>
    </tr>
  );
};

export default TableBodyRow;
