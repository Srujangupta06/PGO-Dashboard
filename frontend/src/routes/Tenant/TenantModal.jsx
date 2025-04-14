// TenantModal.jsx
import React from "react";

const TenantModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isEditing = false,
}) => {
  if (!isOpen) return null;

  const title = isEditing ? "Edit Tenant" : "Add New Tenant";
  const submitText = isEditing ? "Update Tenant" : "Add Tenant";
  const idPrefix = isEditing ? "edit-" : "";

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {title}
            </h3>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`${idPrefix}name`}
                >
                  Tenant Name
                </label>
                <input
                  type="text"
                  id={`${idPrefix}name`}
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`${idPrefix}roomNumber`}
                >
                  Room Number
                </label>
                <input
                  type="text"
                  id={`${idPrefix}roomNumber`}
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`${idPrefix}joinDate`}
                >
                  Join Date
                </label>
                <input
                  type="date"
                  id={`${idPrefix}joinDate`}
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`${idPrefix}rentAmount`}
                >
                  Rent Amount
                </label>
                <input
                  type="number"
                  id={`${idPrefix}rentAmount`}
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`${idPrefix}status`}
                >
                  Status
                </label>
                <select
                  id={`${idPrefix}status`}
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {submitText}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantModal;

// TenantModal.jsx
// import React from "react";

// const TenantModal = ({
//   isOpen,
//   onClose,
//   formData,
//   onChange,
//   onSubmit,
//   isEditing = false,
// }) => {
//   if (!isOpen) return null;

//   const title = isEditing ? "Edit Tenant" : "Add New Tenant";
//   const submitText = isEditing ? "Update Tenant" : "Add Tenant";
//   const idPrefix = isEditing ? "edit-" : "";

//   return (
//     <div className="fixed inset-0 z-10 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span
//           className="hidden sm:inline-block sm:align-middle sm:h-screen"
//           aria-hidden="true"
//         >
//           &#8203;
//         </span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//               {title}
//             </h3>
//             <form onSubmit={onSubmit}>
//               {["name", "roomNumber", "joinDate", "rentAmount"].map((field) => (
//                 <div className="mb-4" key={field}>
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor={`${idPrefix}${field}`}
//                   >
//                     {field === "name"
//                       ? "Tenant Name"
//                       : field === "roomNumber"
//                       ? "Room Number"
//                       : field === "joinDate"
//                       ? "Join Date"
//                       : "Rent Amount"}
//                   </label>
//                   <input
//                     type={
//                       field === "rentAmount"
//                         ? "number"
//                         : field === "joinDate"
//                         ? "date"
//                         : "text"
//                     }
//                     id={`${idPrefix}${field}`}
//                     name={field}
//                     value={formData[field]}
//                     onChange={onChange}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>
//               ))}
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor={`${idPrefix}status`}
//                 >
//                   Status
//                 </label>
//                 <select
//                   id={`${idPrefix}status`}
//                   name="status"
//                   value={formData.status}
//                   onChange={onChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   {submitText}
//                 </button>
//                 <button
//                   type="button"
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenantModal;
