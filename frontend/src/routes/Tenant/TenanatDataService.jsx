// tenantDataService.js
export const fetchTenants = async () => {
  try {
    // In a real app, this would be an API call
    // Simulated API response
    const data = [
      {
        id: 1,
        name: "John Doe",
        roomNumber: "101",
        status: "Active",
        joinDate: "2025-01-15",
        rentAmount: 5000,
      },
      {
        id: 2,
        name: "Jane Smith",
        roomNumber: "102",
        status: "Active",
        joinDate: "2025-02-10",
        rentAmount: 5500,
      },
      {
        id: 3,
        name: "Mike Johnson",
        roomNumber: "103",
        status: "Inactive",
        joinDate: "2025-01-05",
        rentAmount: 4800,
      },
      {
        id: 4,
        name: "Sarah Williams",
        roomNumber: "104",
        status: "Active",
        joinDate: "2025-03-01",
        rentAmount: 6000,
      },
      {
        id: 5,
        name: "David Lee",
        roomNumber: "105",
        status: "Active",
        joinDate: "2025-02-20",
        rentAmount: 5200,
      },
      {
        id: 6,
        name: "Mahi Lee",
        roomNumber: "106",
        status: "Active",
        joinDate: "2025-02-20",
        rentAmount: 5200,
      },
    ];
    return data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
};

export const addTenant = async (tenant) => {
  try {
    // In a real app, this would be an API call
    // Simulated API response - just returning the tenant with an ID
    return {
      id: Date.now(), // Use timestamp as ID for simulation
      ...tenant,
    };
  } catch (error) {
    console.error("Error adding tenant:", error);
    throw error;
  }
};

export const updateTenant = async (id, tenant) => {
  try {
    // In a real app, this would be an API call
    // Just return the updated tenant for simulation
    return {
      id,
      ...tenant,
    };
  } catch (error) {
    console.error("Error updating tenant:", error);
    throw error;
  }
};

export const deleteTenant = async (id) => {
  try {
    // In a real app, this would be an API call
    // Just return success for simulation
    return { success: true };
  } catch (error) {
    console.error("Error deleting tenant:", error);
    throw error;
  }
};
