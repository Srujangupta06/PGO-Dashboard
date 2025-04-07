import React, { useState } from "react";

const MessDetails = () => {
  const [meals, setMeals] = useState([
    { id: 1, date: "2025-03-17", mealType: "Lunch", items: "Rice, Dal, Curry", time: "12:30 PM" },
    { id: 2, date: "2025-03-18", mealType: "Dinner", items: "Roti, Paneer, Salad", time: "08:00 PM" },
  ]);

  const [editMeal, setEditMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({ date: "", mealType: "", items: "", time: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMeal) {
      setMeals(meals.map((meal) => (meal.id === editMeal.id ? { ...editMeal, ...newMeal } : meal)));
      setEditMeal(null);
    } else {
      setMeals([...meals, { id: Date.now(), ...newMeal }]);
    }
    setNewMeal({ date: "", mealType: "", items: "", time: "" });
  };

  const handleEdit = (meal) => {
    setEditMeal(meal);
    setNewMeal(meal);
  };

  const handleDelete = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Mess & Meal Management</h2>

      {/* Form for Adding / Editing Meals */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="date" name="date" value={newMeal.date} onChange={handleChange} className="border p-2 mr-2" required />
        <select name="mealType" value={newMeal.mealType} onChange={handleChange} className="border p-2 mr-2" required>
          <option value="">Select Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Snacks">Snacks</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input type="text" name="items" value={newMeal.items} onChange={handleChange} placeholder="Food Items" className="border p-2 mr-2" required />
        <input type="time" name="time" value={newMeal.time} onChange={handleChange} className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMeal ? "Update" : "Add"} Meal
        </button>
      </form>

      {/* Meal Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Meal Type</th>
            <th className="p-2 border">Food Items</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id} className="text-center">
              <td className="p-2 border">{meal.date}</td>
              <td className="p-2 border">{meal.mealType}</td>
              <td className="p-2 border">{meal.items}</td>
              <td className="p-2 border">{meal.time}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(meal)} className="text-blue-500 px-2">Edit</button>
                <button onClick={() => handleDelete(meal.id)} className="text-red-500 px-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessDetails;
