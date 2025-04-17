// import React from "react";

// const InnerDashboard = () => {
//   // Change this color in one place and it affects all headings!
//   const headingColor = "text-red-600"; // change to "text-red-600", "text-green-600", etc.

//   return (
//     <div className="p-6 bg-white min-h-screen space-y-6 hover:shadow-lg transition duration-300 rounded-xl">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Rooms */}
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>Rooms</h3>
//           <div className="flex justify-between">
//             <div className="text-center">
//               <p className="text-gray-800 font-bold text-2xl">200</p>
//               <p className="text-gray-600 text-sm mt-1">Total</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-800 font-bold text-2xl">150</p>
//               <p className="text-gray-600 text-sm mt-1">Occupied</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-800 font-bold text-2xl">50</p>
//               <p className="text-gray-600 text-sm mt-1">Vacant</p>
//             </div>
//           </div>
//         </div>

//         {/* Payment */}
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>Payment</h3>
//           <div className="flex justify-between">
//             <div>
//               <p className="text-gray-800 font-bold text-2xl">₹ 1,20,345</p>
//               <p className="text-gray-600 text-sm mt-1">Paid</p>
//             </div>
//             <div>
//               <p className="text-gray-800 font-bold text-2xl">₹ 20,345</p>
//               <p className="text-gray-600 text-sm mt-1">Unpaid</p>
//             </div>
//           </div>
//         </div>

//         {/* Amenities */}
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//             Amenities
//           </h3>
//           <div className="flex justify-between text-center">
//             {[
//               { icon: "💡", label: "Light" },
//               { icon: "💧", label: "Water" },
//               { icon: "📶", label: "Wifi" },
//               { icon: "👕", label: "Laundry" },
//               { icon: "🔥", label: "Hot Water" },
//             ].map((item, index) => (
//               <div
//                 className="flex flex-col items-center hover:scale-110 transition"
//                 key={index}
//               >
//                 <span className="text-2xl mb-1">{item.icon}</span>
//                 <p className="text-gray-600 text-sm">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tenants + Mess */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Tenants */}
//         <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.05] flex flex-col items-center">
//           <h3 className={`${headingColor} font-bold text-xl mb-6`}>Tenants</h3>
//              <div className="relative w-48 h-48 mb-6">
// <svg className="w-full h-full">
// <circle
// cx="96"
// cy="96"
// r="84"
// fill="none"
// stroke="#e5e7eb"
// strokeWidth="16"
// />
// <circle
// cx="96"
// cy="96"
// r="84"
// fill="none"
// stroke="#ef4444"
// strokeWidth="16"
// strokeDasharray={`${(75 / 100) * 527}, 527`}
// transform="rotate(-90 96 96)"
// />
// </svg>
// <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-800">
// 75%
// </div></div>
// <div className="text-center">
// <p className="text-gray-600">
// Capacity: <span className="font-semibold">500</span>
// </p>
// <p className="text-gray-600">
// Occupied:{" "}
// <span className="font-semibold text-green-600">375</span>
// </p>
// </div>
//         </div>

//         {/* Mess Menu */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//             Mess - Today's Meal
//           </h3>
//           <div className="space-y-3 text-gray-700">
//             <div>
//               <p className="font-medium">Breakfast:</p>
//               <p className="ml-2">3 Idli Sambar</p>
//             </div>
//             <div>
//               <p className="font-medium">Lunch:</p>
//               <ul className="list-disc pl-6">
//                 <li>Veg: Sprouts | 3 Chapatis | Rice | Dal</li>
//                 <li>Non-Veg: Egg Biryani</li>
//               </ul>
//             </div>
//             <div>
//               <p className="font-medium">Dinner:</p>
//               <ul className="list-disc pl-6">
//                 <li>Veg: Sprouts | 3 Chapatis | Rice | Dal</li>
//                 <li>Non-Veg: Egg Curry | 3 Chapatis | Rice</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Tickets */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//             Tickets{" "}
//             <span className="text-sm font-normal text-gray-500">
//               (Unresolved - 5)
//             </span>
//           </h3>
//           <ul className="space-y-3 text-gray-700">
//             {[
//               { name: "Mike Ross", issue: "Water not coming" },
//               {
//                 name: "Jennifer Grint",
//                 issue: "Light is not available since last night",
//               },
//               {
//                 name: "Casey Allen",
//                 issue: "WiFi is not working since past week, please fix it.",
//               },
//               {
//                 name: "Tina Harris",
//                 issue:
//                   "Laundry is not working properly, please look into this quickly",
//               },
//               {
//                 name: "Rick Butcher",
//                 issue: "Hot water is broken, please fix it urgently",
//               },
//             ].map((ticket, index) => (
//               <li
//                 key={index}
//                 className="pb-2 border-b border-gray-100 last:border-b-0 hover:pl-2 transition"
//               >
//                 <span className="font-semibold text-gray-800">
//                   {ticket.name}:
//                 </span>{" "}
//                 {ticket.issue}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Visitors + Reports */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Visitors */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//             Visitors{" "}
//             <span className="text-sm font-normal text-gray-500">(Total 2)</span>
//           </h3>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>Building A | Floor 2nd | Room 201</li>
//             <li>Building A | Floor 1st | Room 103</li>
//           </ul>
//         </div>

//         {/* Reports */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//           <h3 className={`${headingColor} font-bold text-lg mb-4`}>Reports</h3>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>Total Number of Vacant Rooms</li>
//             <li>Total Fees Collected</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InnerDashboard;

import React from "react";

const InnerDashboard = () => {
  const headingColor = "text-red-600"; // Customize color here

  return (
    <div className="p-6 bg-white min-h-screen space-y-6 hover:shadow-lg transition duration-300 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rooms */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>Rooms</h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-gray-800 font-bold text-2xl">200</p>
              <p className="text-gray-600 text-sm mt-1">Total</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-bold text-2xl">150</p>
              <p className="text-gray-600 text-sm mt-1">Occupied</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-bold text-2xl">50</p>
              <p className="text-gray-600 text-sm mt-1">Vacant</p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>Payment</h3>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-800 font-bold text-2xl">₹ 1,20,345</p>
              <p className="text-gray-600 text-sm mt-1">Paid</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold text-2xl">₹ 20,345</p>
              <p className="text-gray-600 text-sm mt-1">Unpaid</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>Amenities</h3>
          <div className="flex justify-between text-center">
            {[
              { icon: "💡", label: "Light" },
              { icon: "💧", label: "Water" },
              { icon: "📶", label: "Wifi" },
              { icon: "👕", label: "Laundry" },
              { icon: "🔥", label: "Hot Water" },
            ].map((item, index) => (
              <div
                className="flex flex-col items-center hover:scale-110 transition"
                key={index}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenants + Mess */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tenants */}
        <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.05] flex flex-col items-center">
          <h3 className={`${headingColor} font-bold text-xl mb-6`}>Tenants</h3>
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full">
              <circle
                cx="96"
                cy="96"
                r="84"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
              />
              <circle
                cx="96"
                cy="96"
                r="84"
                fill="none"
                stroke="#ef4444"
                strokeWidth="16"
                strokeDasharray={`${(75 / 100) * 527}, 527`}
                transform="rotate(-90 96 96)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-800">
              75%
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              Capacity: <span className="font-semibold">500</span>
            </p>
            <p className="text-gray-600">
              Occupied:{" "}
              <span className="font-semibold text-green-600">375</span>
            </p>
          </div>
        </div>

        {/* Mess Menu */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>
            Mess - Today's Meal
          </h3>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium">Breakfast:</p>
              <p className="ml-2">3 Idli Sambar</p>
            </div>
            <div>
              <p className="font-medium">Lunch:</p>
              <ul className="list-disc pl-6">
                <li>Veg: Sprouts | 3 Chapatis | Rice | Dal</li>
                <li>Non-Veg: Egg Biryani</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Dinner:</p>
              <ul className="list-disc pl-6">
                <li>Veg: Sprouts | 3 Chapatis | Rice | Dal</li>
                <li>Non-Veg: Egg Curry | 3 Chapatis | Rice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>
            Tickets{" "}
            <span className="text-sm font-normal text-gray-500">
              (Unresolved - 5)
            </span>
          </h3>
          <ul className="space-y-3 text-gray-700">
            {[
              { name: "Mike Ross", issue: "Water not coming" },
              {
                name: "Jennifer Grint",
                issue: "Light is not available since last night",
              },
              {
                name: "Casey Allen",
                issue: "WiFi is not working since past week, please fix it.",
              },
              {
                name: "Tina Harris",
                issue: "Laundry is not working properly, please look into this quickly",
              },
              {
                name: "Rick Butcher",
                issue: "Hot water is broken, please fix it urgently",
              },
            ].map((ticket, index) => (
              <li
                key={index}
                className="pb-2 border-b border-gray-100 last:border-b-0 hover:pl-2 transition"
              >
                <span className="font-semibold text-gray-800">
                  {ticket.name}:
                </span>{" "}
                {ticket.issue}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visitors + Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitors */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>
            Visitors{" "}
            <span className="text-sm font-normal text-gray-500">(Total 2)</span>
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Building A | Floor 2nd | Room 201</li>
            <li>Building A | Floor 1st | Room 103</li>
          </ul>
        </div>

        {/* Reports */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
          <h3 className={`${headingColor} font-bold text-lg mb-4`}>Reports</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Total Number of Vacant Rooms</li>
            <li>Total Fees Collected</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InnerDashboard;
