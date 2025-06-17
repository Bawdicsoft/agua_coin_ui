// "use client";
// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const CATEGORIES = ["AG", "AU", "AGUA"];
// const FILTERS = ["year", "month", "week"];
// const TIME_LABELS = {
//   year: "Year",
//   month: "Month",
//   week: "Week",
// };

// // Mock data (replace with real API later)
// const DATA = {
//   AG: {
//     current: {
//       year: [...Array(12)].map((_, i) => ({
//         name: new Date(0, i).toLocaleString("default", { month: "short" }),
//         earnings: 3000 + Math.random() * 2000,
//       })),
//       month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
//         name: week,
//         earnings: 800 + Math.random() * 500,
//       })),
//       week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
//         name: day,
//         earnings: 150 + Math.random() * 200,
//       })),
//     },
//     last: {
//       year: [...Array(12)].map((_, i) => ({
//         name: new Date(0, i).toLocaleString("default", { month: "short" }),
//         earnings: 2500 + Math.random() * 1500,
//       })),
//       month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
//         name: week,
//         earnings: 700 + Math.random() * 400,
//       })),
//       week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
//         name: day,
//         earnings: 100 + Math.random() * 150,
//       })),
//     },
//   },
//   // ...AU, AGUA data same as yours (omit for brevity)
// };

// export default function EarningsChart() {
//   const [filter, setFilter] = useState("year");
//   const [category, setCategory] = useState("AG");
//   const [viewLast, setViewLast] = useState(false);

//   const currentData = DATA[category][viewLast ? "last" : "current"][filter];

//   return (
//     <div className="h-full w-full flex gap-4 flex-col justify-between rounded-xl p-4 bg-[var(--menu-background)] overflow-hidden">
//       {/* Header Row */}
//       <div className="w-full flex gap-4  flex-wrap justify-between items-center ">
//         {/* Category Buttons */}
//         <div className="flex gap-4 flex-wrap">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-3 py-1 rounded-md text-sm border transition ${
//                 category === cat
//                   ? "bg-[var(--color-primary)] text-white"
//                   : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Heading */}
//         <h3 className="text-[var(--text-primary)] text-2xl text-center font-medium ">
//           Earnings Overview
//         </h3>

//         {/* Filter Buttons */}
//         <div className="flex gap-4 flex-wrap">
//           {FILTERS.map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`px-3 py-1 rounded-md text-sm border transition ${
//                 filter === type
//                   ? "bg-[var(--color-accent)] text-white"
//                   : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
//               }`}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Toggle Last Period */}
//       <div className="w-full flex flex-wrap justify-end items-center gap-2 mb-2">
//         <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
//           Show Last {TIME_LABELS[filter]}
//         </span>
//         <button
//           onClick={() => setViewLast(!viewLast)}
//           className={`px-3 py-[0.3rem] rounded-md text-xs border transition ${
//             viewLast
//               ? "bg-[var(--color-primary)] text-white"
//               : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
//           }`}
//         >
//           {viewLast ? "ON" : "OFF"}
//         </button>
//       </div>

//       {/* Chart */}
//       <div className="w-full h-[300px] min-h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={currentData}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="var(--border-color)"
//             />
//             <XAxis
//               dataKey="name"
//               stroke="var(--text-secondary)"
//               tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
//             />
//             <YAxis
//               stroke="var(--text-secondary)"
//               tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "var(--tooltip-background)",
//                 border: "1px solid var(--border-color)",
//                 borderRadius: "6px",
//                 color: "var(--tooltip-text)",
//               }}
//               itemStyle={{
//                 color: "var(--tooltip-text)",
//                 fontSize: "0.9rem",
//               }}
//               cursor={{ fill: "var(--accent-orange)", opacity: 0.1 }}
//             />
//             <Bar
//               dataKey="earnings"
//               fill="var(--accent-orange)"
//               radius={[8, 8, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CATEGORIES = ["AG", "AU", "AGUA"];
const FILTERS = ["year", "month", "week"];
const TIME_LABELS = {
  year: "Year",
  month: "Month",
  week: "Week",
};

// Helper to generate mock data
const generateData = (base, spread) => ({
  year: [...Array(12)].map((_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "short" }),
    earnings: base + Math.random() * spread,
  })),
  month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
    name: week,
    earnings: (base / 4) + Math.random() * (spread / 4),
  })),
  week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    name: day,
    earnings: (base / 30) + Math.random() * (spread / 30),
  })),
});

// Mock data for all categories
const DATA = {
  AG: {
    current: generateData(3000, 2000),
    last: generateData(2500, 1500),
  },
  AU: {
    current: generateData(3500, 2200),
    last: generateData(2800, 1700),
  },
  AGUA: {
    current: generateData(4000, 2500),
    last: generateData(3000, 1800),
  },
};

export default function EarningsChart() {
  const [filter, setFilter] = useState("year");
  const [category, setCategory] = useState("AG");
  const [viewLast, setViewLast] = useState(false);

  const categoryData = DATA[category];
  const currentData = categoryData ? categoryData[viewLast ? "last" : "current"][filter] : [];

  return (
    <div className="h-full w-full flex gap-4 flex-col justify-between rounded-xl p-4 bg-[var(--menu-background)] overflow-hidden">
      {/* Header Row */}
      <div className="w-full flex gap-4 flex-wrap justify-between items-center">
        {/* Category Buttons */}
        <div className="flex gap-4 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                category === cat
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Heading */}
        <h3 className="text-[var(--text-primary)] text-2xl text-center font-medium">
          Earnings Overview
        </h3>

        {/* Filter Buttons */}
        <div className="flex gap-4 flex-wrap">
          {FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                filter === type
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Last Period */}
      <div className="w-full flex flex-wrap justify-end items-center gap-2 mb-2">
        <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
          Show Last {TIME_LABELS[filter]}
        </span>
        <button
          onClick={() => setViewLast(!viewLast)}
          className={`px-3 py-[0.3rem] rounded-md text-xs border transition ${
            viewLast
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--border-color)]"
          }`}
        >
          {viewLast ? "ON" : "OFF"}
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px] min-h-[350px]">
        {categoryData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis
                dataKey="name"
                stroke="var(--text-secondary)"
                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
              />
              <YAxis
                stroke="var(--text-secondary)"
                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-background)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  color: "var(--tooltip-text)",
                }}
                itemStyle={{
                  color: "var(--tooltip-text)",
                  fontSize: "0.9rem",
                }}
                cursor={{ fill: "var(--accent-orange)", opacity: 0.1 }}
              />
              <Bar
                dataKey="earnings"
                fill="var(--accent-orange)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-red-500 text-lg">
            No data available for {category}
          </div>
        )}
      </div>
    </div>
  );
}
