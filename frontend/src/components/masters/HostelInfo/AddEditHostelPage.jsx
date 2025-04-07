// AddEditHostelPage Component
const AddEditHostelPage = ({ 
    onSave, 
    onCancel, 
    initialData = {
      name: '',
      location: '',
      totalRooms: '',
      occupiedRooms: '',
      contact: ''
    }
  }) => {
    const [hostelData, setHostelData] = useState(initialData);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setHostelData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(hostelData);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {initialData.id ? 'Edit Hostel' : 'Add New Hostel'}
          </h2>
          
          <div className="mb-4">
            <label className="block mb-2">Hostel Name</label>
            <input
              type="text"
              name="name"
              value={hostelData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter hostel name"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={hostelData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter location"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Total Rooms</label>
            <input
              type="number"
              name="totalRooms"
              value={hostelData.totalRooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter total rooms"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Occupied Rooms</label>
            <input
              type="number"
              name="occupiedRooms"
              value={hostelData.occupiedRooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter occupied rooms"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={hostelData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter contact number"
            />
          </div>
  
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };
  export default AddEditHostelPage;
  