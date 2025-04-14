import React, { useState, useEffect } from "react";

const TenantDetailsModal = ({ tenant, onClose }) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (tenant) {
      setFormData({ ...tenant });
    }
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  if (!tenant) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Edit Tenant Details
          </h2>

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Tenant" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Full Name" className="input" />
            <input type="text" name="gender" value={formData.gender || ""} onChange={handleChange} placeholder="Gender" className="input" />
            <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} className="input" />
            <input type="text" name="emergencyContact" value={formData.emergencyContact || ""} onChange={handleChange} placeholder="Emergency Contact" className="input" />
            <input type="text" name="idProof" value={formData.idProof || ""} onChange={handleChange} placeholder="ID Proof Number" className="input" />
            <input type="text" name="contact" value={formData.contact || ""} onChange={handleChange} placeholder="Phone Number" className="input" />
          </div>

          {/* Room Info */}
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Room Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" name="roomNumber" value={formData.roomNumber || ""} onChange={handleChange} placeholder="Room No" className="input" />
            <input type="text" name="floor" value={formData.floor || ""} onChange={handleChange} placeholder="Floor Number" className="input" />
            <input type="text" name="bedNumber" value={formData.bedNumber || ""} onChange={handleChange} placeholder="Bed Number" className="input" />
            <input type="text" name="roomType" value={formData.roomType || ""} onChange={handleChange} placeholder="Room Type" className="input" />
            <input type="text" name="acFacility" value={formData.acFacility || ""} onChange={handleChange} placeholder="AC/Non-AC" className="input" />
          </div>

          {/* Payments */}
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Payments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="date" name="joinDate" value={formData.joinDate || ""} onChange={handleChange} className="input" />
            <input type="number" name="rentAmount" value={formData.rentAmount || ""} onChange={handleChange} placeholder="Rent Amount (₹)" className="input" />
            <input type="text" name="stayDuration" value={formData.stayDuration || ""} onChange={handleChange} placeholder="Stay Duration" className="input" />
            <input type="date" name="nextDue" value={formData.nextDue || ""} onChange={handleChange} placeholder="Next Payment Due Date" className="input" />
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select name="status" value={formData.status || ""} onChange={handleChange} className="input">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Activities */}
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Hostel Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select name="mess" value={formData.mess || ""} onChange={handleChange} className="input">
              <option value="">Mess Subscription</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <select name="laundry" value={formData.laundry || ""} onChange={handleChange} className="input">
              <option value="">Laundry Access</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input type="text" name="hostelEvents" value={formData.hostelEvents || ""} onChange={handleChange} placeholder="Hostel Events" className="input" />
          </div>

          {/* Timetable (static for now) */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Hostel Timetable</h3>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Activity</th>
                  <th className="py-2 px-4 border">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border">Breakfast</td><td className="py-2 px-4 border">7:00 AM - 8:00 AM</td></tr>
                <tr><td className="py-2 px-4 border">Lunch</td><td className="py-2 px-4 border">1:00 PM - 2:00 PM</td></tr>
                <tr><td className="py-2 px-4 border">Dinner</td><td className="py-2 px-4 border">7:00 PM - 8:00 PM</td></tr>
                <tr><td className="py-2 px-4 border">Study Hours</td><td className="py-2 px-4 border">8:00 PM - 10:00 PM</td></tr>
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => {
                console.log("Updated Data:", formData);
                onClose();
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsModal;
