import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import TenantTable from "./TenantTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import TenantFilters from "./TenantFilters";
import TenantModal from "./TenantModal";
import * as tenantDataService from "./TenanatDataService";

const TenantManagement = () => {
  // State for tenants data
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: "",
    rentMin: "",
    rentMax: "",
    joinDateFrom: "",
    joinDateTo: "",
  });

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);

  // Form state for add/edit tenant
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    status: "Active",
    joinDate: "",
    rentAmount: "",
  });

  // Fetch tenants
  useEffect(() => {
    const loadTenants = async () => {
      try {
        const data = await tenantDataService.fetchTenants();
        setTenants(data);
        setFilteredTenants(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading tenants:", error);
        setIsLoading(false);
      }
    };

    loadTenants();
  }, []);

  // Apply search filter
  useEffect(() => {
    filterTenants();
  }, [searchTerm, activeFilters, tenants]);

  // Filter tenants based on search and filters
  const filterTenants = () => {
    let results = tenants.filter((tenant) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        activeFilters.status === "" || tenant.status === activeFilters.status;

      // Rent range filter
      const matchesRentMin =
        activeFilters.rentMin === "" ||
        parseInt(tenant.rentAmount) >= parseInt(activeFilters.rentMin);
      const matchesRentMax =
        activeFilters.rentMax === "" ||
        parseInt(tenant.rentAmount) <= parseInt(activeFilters.rentMax);

      // Join date filter
      const tenantDate = new Date(tenant.joinDate);
      const matchesJoinDateFrom =
        activeFilters.joinDateFrom === "" ||
        tenantDate >= new Date(activeFilters.joinDateFrom);
      const matchesJoinDateTo =
        activeFilters.joinDateTo === "" ||
        tenantDate <= new Date(activeFilters.joinDateTo);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRentMin &&
        matchesRentMax &&
        matchesJoinDateFrom &&
        matchesJoinDateTo
      );
    });

    setFilteredTenants(results);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastTenant = currentPage * itemsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - itemsPerPage;
  const currentTenants = filteredTenants.slice(
    indexOfFirstTenant,
    indexOfLastTenant
  );
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle filter change
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open edit modal
  const handleEdit = (tenant) => {
    setCurrentTenant(tenant);
    setFormData({
      name: tenant.name,
      roomNumber: tenant.roomNumber,
      status: tenant.status,
      joinDate: tenant.joinDate,
      rentAmount: tenant.rentAmount,
    });
    setShowEditModal(true);
  };

  // Delete tenant
  const handleDelete = async (id) => {
    try {
      await tenantDataService.deleteTenant(id);
      setTenants(tenants.filter((tenant) => tenant.id !== id));
      setFilteredTenants(filteredTenants.filter((tenant) => tenant.id !== id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  // Submit add form
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTenant = await tenantDataService.addTenant(formData);
      setTenants([...tenants, newTenant]);
      setFilteredTenants([...filteredTenants, newTenant]);
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error("Error adding tenant:", error);
    }
  };

  // Submit edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTenant = await tenantDataService.updateTenant(
        currentTenant.id,
        formData
      );

      const updatedTenants = tenants.map((tenant) =>
        tenant.id === currentTenant.id ? updatedTenant : tenant
      );

      setTenants(updatedTenants);
      setFilteredTenants(
        filteredTenants.map((tenant) =>
          tenant.id === currentTenant.id ? updatedTenant : tenant
        )
      );

      setShowEditModal(false);
      setCurrentTenant(null);
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      roomNumber: "",
      status: "Active",
      joinDate: "",
      rentAmount: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Tenant List</h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <div className="flex space-x-2">
          <TenantFilters onFilterChange={handleFilterChange} />
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center space-x-2 hover:bg-red-700"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <TenantTable
          tenants={currentTenants}
          isLoading={isLoading}
          indexOfFirstTenant={indexOfFirstTenant}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination Controls */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* Add Tenant Modal */}
      {showAddModal && (
        <TenantModal
          title="Add New Tenant"
          formData={formData}
          onInputChange={handleInputChange}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          onSubmit={handleAddSubmit}
        />
      )}

      {/* Edit Tenant Modal */}
      {showEditModal && currentTenant && (
        <TenantModal
          title="Edit Tenant"
          formData={formData}
          onInputChange={handleInputChange}
          onClose={() => {
            setShowEditModal(false);
            setCurrentTenant(null);
            resetForm();
          }}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default TenantManagement;

// // TenantManagement.jsx
// import React, { useState, useEffect } from "react";
// import {
//   PencilIcon,
//   TrashIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";
// import TenantFilters from "./TenantFilters";
// import TenantTable from "./TenantTable/TenantTable";

// const TenantManagement = () => {
//   // State for tenants data
//   const [tenants, setTenants] = useState([]);
//   const [filteredTenants, setFilteredTenants] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentTenant, setCurrentTenant] = useState(null);

//   // Form state for add/edit tenant
//   const [formData, setFormData] = useState({
//     name: "",
//     roomNumber: "",
//     status: "Active",
//     joinDate: "",
//     rentAmount: "",
//   });

//   // Fetch tenants (simulated)
//   useEffect(() => {
//     // In a real app, this would be an API call
//     const fetchTenants = async () => {
//       try {
//         // Simulated API response
//         const data = [
//           {
//             id: 1,
//             name: "John Doe",
//             roomNumber: "101",
//             status: "Active",
//             joinDate: "2025-01-15",
//             rentAmount: 5000,
//           },
//           {
//             id: 2,
//             name: "Jane Smith",
//             roomNumber: "102",
//             status: "Active",
//             joinDate: "2025-02-10",
//             rentAmount: 5500,
//           },
//         ];
//         setTenants(data);
//         setFilteredTenants(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching tenants:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchTenants();
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     const results = tenants.filter(
//       (tenant) =>
//         tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tenant.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredTenants(results);
//     setCurrentPage(1);
//   }, [searchTerm, tenants]);

//   // Pagination logic
//   const indexOfLastTenant = currentPage * itemsPerPage;
//   const indexOfFirstTenant = indexOfLastTenant - itemsPerPage;
//   const currentTenants = filteredTenants.slice(
//     indexOfFirstTenant,
//     indexOfLastTenant
//   );
//   const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

//   // Handle page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Open edit modal
//   const handleEdit = (tenant) => {
//     setCurrentTenant(tenant);
//     setFormData({
//       name: tenant.name,
//       roomNumber: tenant.roomNumber,
//       status: tenant.status,
//       joinDate: tenant.joinDate,
//       rentAmount: tenant.rentAmount,
//     });
//     setShowEditModal(true);
//   };

//   // Delete tenant
//   const handleDelete = (id) => {
//     // In a real app, this would be an API call
//     setTenants(tenants.filter((tenant) => tenant.id !== id));
//     setFilteredTenants(filteredTenants.filter((tenant) => tenant.id !== id));
//   };

//   // Submit add form
//   const handleAddSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, this would be an API call
//     const newTenant = {
//       id: tenants.length + 1,
//       ...formData,
//     };
//     setTenants([...tenants, newTenant]);
//     setFilteredTenants([...tenants, newTenant]);
//     setShowAddModal(false);
//     setFormData({
//       name: "",
//       roomNumber: "",
//       status: "Active",
//       joinDate: "",
//       rentAmount: "",
//     });
//   };

//   // Submit edit form
//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, this would be an API call
//     const updatedTenants = tenants.map((tenant) =>
//       tenant.id === currentTenant.id ? { ...tenant, ...formData } : tenant
//     );
//     setTenants(updatedTenants);
//     setFilteredTenants(updatedTenants);
//     setShowEditModal(false);
//     setCurrentTenant(null);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       roomNumber: "",
//       status: "Active",
//       joinDate: "",
//       rentAmount: "",
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header with back button */}
//       <div className="flex items-center mb-6">
//         <h1 className="text-2xl font-bold">Tenant List</h1>
//       </div>

//       {/* Search and Actions Bar */}
//       <div className="flex flex-col md:flex-row justify-between mb-6">
//         <div className="relative w-full md:w-96 mb-4 md:mb-0">
//           <input
//             type="text"
//             placeholder="Search tenant details..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
//         <div className="flex space-x-2">
//           <TenantFilters />
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center space-x-2 hover:bg-red-700"
//             onClick={() => setShowAddModal(true)}
//           >
//             <PlusIcon className="h-5 w-5" />
//             <span>Create New</span>
//           </button>
//         </div>
//       </div>

//       {/* Tenants Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {/* <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sr.No
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Tenant Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Room Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Join Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rent Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-4 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : currentTenants.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-4 text-center">
//                     No tenants found
//                   </td>
//                 </tr>
//               ) : (
//                 currentTenants.map((tenant, index) => (
//                   <tr key={tenant.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {indexOfFirstTenant + index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {tenant.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {tenant.roomNumber}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {tenant.joinDate}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       ₹{tenant.rentAmount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           tenant.status === "Active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {tenant.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => handleEdit(tenant)}
//                         className="text-gray-500 hover:text-gray-700 mr-3"
//                       >
//                         <PencilIcon className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(tenant.id)}
//                         className="text-gray-500 hover:text-red-700"
//                       >
//                         <TrashIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div> */}
//         {/* <TenantTable /> */}

//         {/* Pagination */}
//         <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//           <div className="flex items-center">
//             <span className="text-sm text-gray-700">Items per page: </span>
//             <select
//               className="mx-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={itemsPerPage}
//               onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => paginate(1)}
//               disabled={currentPage === 1}
//               className={`p-1 rounded-md ${
//                 currentPage === 1
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <ChevronDoubleLeftIcon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`p-1 rounded-md ${
//                 currentPage === 1
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <ChevronLeftIcon className="h-5 w-5" />
//             </button>
//             <span className="px-3 py-1 bg-red-600 text-white rounded-md">
//               {currentPage}
//             </span>
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`p-1 rounded-md ${
//                 currentPage === totalPages
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <ChevronRightIcon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => paginate(totalPages)}
//               disabled={currentPage === totalPages}
//               className={`p-1 rounded-md ${
//                 currentPage === totalPages
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <ChevronDoubleRightIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add Tenant Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 transition-opacity"
//               aria-hidden="true"
//             >
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                   Add New Tenant
//                 </h3>
//                 <form onSubmit={handleAddSubmit}>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="name"
//                     >
//                       Tenant Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="roomNumber"
//                     >
//                       Room Number
//                     </label>
//                     <input
//                       type="text"
//                       id="roomNumber"
//                       name="roomNumber"
//                       value={formData.roomNumber}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="joinDate"
//                     >
//                       Join Date
//                     </label>
//                     <input
//                       type="date"
//                       id="joinDate"
//                       name="joinDate"
//                       value={formData.joinDate}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="rentAmount"
//                     >
//                       Rent Amount
//                     </label>
//                     <input
//                       type="number"
//                       id="rentAmount"
//                       name="rentAmount"
//                       value={formData.rentAmount}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="status"
//                     >
//                       Status
//                     </label>
//                     <select
//                       id="status"
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Add Tenant
//                     </button>
//                     <button
//                       type="button"
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                       onClick={() => {
//                         setShowAddModal(false);
//                         resetForm();
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Tenant Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 transition-opacity"
//               aria-hidden="true"
//             >
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                   Edit Tenant
//                 </h3>
//                 <form onSubmit={handleEditSubmit}>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="edit-name"
//                     >
//                       Tenant Name
//                     </label>
//                     <input
//                       type="text"
//                       id="edit-name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="edit-roomNumber"
//                     >
//                       Room Number
//                     </label>
//                     <input
//                       type="text"
//                       id="edit-roomNumber"
//                       name="roomNumber"
//                       value={formData.roomNumber}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="edit-joinDate"
//                     >
//                       Join Date
//                     </label>
//                     <input
//                       type="date"
//                       id="edit-joinDate"
//                       name="joinDate"
//                       value={formData.joinDate}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="edit-rentAmount"
//                     >
//                       Rent Amount
//                     </label>
//                     <input
//                       type="number"
//                       id="edit-rentAmount"
//                       name="rentAmount"
//                       value={formData.rentAmount}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="edit-status"
//                     >
//                       Status
//                     </label>
//                     <select
//                       id="edit-status"
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <button
//                       type="submit"
//                       className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     >
//                       Update Tenant
//                     </button>
//                     <button
//                       type="button"
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                       onClick={() => {
//                         setShowEditModal(false);
//                         setCurrentTenant(null);
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantManagement;
