import React, { useState } from "react";

const initialMessDetails = {
  Monday: "Breakfast: Oatmeal, Eggs\nLunch: Vegetable Soup, Bread\nDinner: Chicken Curry, Rice",
  Tuesday: "Breakfast: Pancakes, Fruits\nLunch: Sandwiches, Salad\nDinner: Pasta, Garlic Bread",
  Wednesday: "Breakfast: Cereal, Milk\nLunch: Burgers, Fries\nDinner: Fish Curry, Rice",
  Thursday: "Breakfast: Toast, Boiled Eggs\nLunch: Pizza, Cola\nDinner: Vegetable Biryani",
  Friday: "Breakfast: Idli, Sambar\nLunch: Fried Rice, Manchurian\nDinner: Dal, Roti, Sabzi",
  Saturday: "Breakfast: Dosa, Chutney\nLunch: Noodles, Spring Rolls\nDinner: Paneer Butter Masala, Naan",
  Sunday: "Breakfast: Poha, Tea\nLunch: Pulao, Raita\nDinner: Special Thali"
};

const MessDetails = () => {
  const [messDetails, setMessDetails] = useState(initialMessDetails);
  const [editMode, setEditMode] = useState({});
  const [editedDetails, setEditedDetails] = useState({...initialMessDetails});
  
  const handleEdit = (day) => {
    setEditedDetails(prev => ({ ...prev, [day]: messDetails[day] }));
    setEditMode(prev => ({ ...prev, [day]: true }));
  };
  
  const handleChange = (day, value) => {
    setEditedDetails(prev => ({ ...prev, [day]: value }));
  };
  
  const handleSave = (day) => {
    setMessDetails(prev => ({ ...prev, [day]: editedDetails[day] }));
    setEditMode(prev => ({ ...prev, [day]: false }));
  };
  
  const handleCancel = (day) => {
    setEditMode(prev => ({ ...prev, [day]: false }));
  };

  const daysOfWeek = Object.keys(messDetails);
  
  return (
    // <div className="min-h-screen bg-gray-100 p-6">
    //   <h1 className="text-3xl font-bold text-center mb-6">Weekly Mess Menu</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {daysOfWeek.map((day) => (
    //       <div key={day} className="bg-white rounded-lg shadow p-4 border border-gray-200">
    //         <h2 className="text-xl font-bold mb-3 border-b pb-2">{day}</h2>
    //         {editMode[day] ? (
    //           <>
    //             <textarea
    //               value={editedDetails[day]}
    //               onChange={(e) => handleChange(day, e.target.value)}
    //               className="w-full h-32 p-2 border border-gray-300 rounded mb-3"
    //               placeholder="Enter meal details..."
    //             />
    //             <div className="flex gap-2">
    //               <button
    //                 onClick={() => handleSave(day)}
    //                 className="bg-red-600 text-white px-4 py-2 rounded w-full"
    //               >
    //                 Save
    //               </button>
    //               <button
    //                 onClick={() => handleCancel(day)}
    //                 className="bg-gray-400 text-white px-4 py-2 rounded w-full"
    //               >
    //                 Cancel
    //               </button>
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <div className="min-h-32 mb-3">
    //               <p className="whitespace-pre-line">{messDetails[day]}</p>
    //             </div>
    //             <button
    //               onClick={() => handleEdit(day)}
    //               className="bg-red-600 text-white px-4 py-2 rounded w-full"
    //             >
    //               Edit Menu
    //             </button>
    //           </>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
  <h1 className="text-3xl font-bold text-center mb-8 text-red-700">Weekly Mess Menu</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {daysOfWeek.map((day) => (
      <div
        key={day}
        className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{day}</h2>

        {editMode[day] ? (
          <>
            <textarea
              value={editedDetails[day]}
              onChange={(e) => handleChange(day, e.target.value)}
              className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent mb-4 bg-gray-50 resize-none"
              placeholder="Enter meals (e.g., Breakfast: Idli, Lunch: Rice & Sambar, Dinner: Chapati)"
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleSave(day)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => handleCancel(day)}
                className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="min-h-32 mb-4 text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
              {messDetails[day] || <span className="text-gray-400 italic">No meals added yet</span>}
            </div>
            <button
              onClick={() => handleEdit(day)}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Edit Menu
            </button>
          </>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default MessDetails;