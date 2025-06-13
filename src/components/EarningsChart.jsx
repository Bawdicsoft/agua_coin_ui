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

// // Mock datasets (replace with real API later)
// const DATA = {
//   AG: {
//     year: [
//       { name: "Jan", earnings: 3000 },
//       { name: "Feb", earnings: 2800 },
//       { name: "Mar", earnings: 4000 },
//       { name: "Apr", earnings: 3200 },
//       { name: "May", earnings: 3500 },
//       { name: "Jun", earnings: 3700 },
//       { name: "Jul", earnings: 3900 },
//       { name: "Aug", earnings: 4100 },
//       { name: "Sep", earnings: 4300 },
//       { name: "Oct", earnings: 4400 },
//       { name: "Nov", earnings: 4200 },
//       { name: "Dec", earnings: 4500 },
//     ],
//     month: [
//       { name: "Week 1", earnings: 800 },
//       { name: "Week 2", earnings: 950 },
//       { name: "Week 3", earnings: 1000 },
//       { name: "Week 4", earnings: 1100 },
//     ],
//     week: [
//       { name: "Mon", earnings: 150 },
//       { name: "Tue", earnings: 200 },
//       { name: "Wed", earnings: 180 },
//       { name: "Thu", earnings: 240 },
//       { name: "Fri", earnings: 280 },
//       { name: "Sat", earnings: 300 },
//       { name: "Sun", earnings: 350 },
//     ],
//   },
//   AU: {
//     year: [
//       { name: "Jan", earnings: 5000 },
//       { name: "Feb", earnings: 5200 },
//       { name: "Mar", earnings: 5300 },
//       { name: "Apr", earnings: 5100 },
//       { name: "May", earnings: 5000 },
//       { name: "Jun", earnings: 5400 },
//       { name: "Jul", earnings: 5500 },
//       { name: "Aug", earnings: 5600 },
//       { name: "Sep", earnings: 5700 },
//       { name: "Oct", earnings: 5900 },
//       { name: "Nov", earnings: 6000 },
//       { name: "Dec", earnings: 6200 },
//     ],
//     month: [
//       { name: "Week 1", earnings: 1200 },
//       { name: "Week 2", earnings: 1500 },
//       { name: "Week 3", earnings: 1400 },
//       { name: "Week 4", earnings: 1300 },
//     ],
//     week: [
//       { name: "Mon", earnings: 220 },
//       { name: "Tue", earnings: 260 },
//       { name: "Wed", earnings: 280 },
//       { name: "Thu", earnings: 250 },
//       { name: "Fri", earnings: 300 },
//       { name: "Sat", earnings: 350 },
//       { name: "Sun", earnings: 400 },
//     ],
//   },
//   AGUA: {
//     year: [
//       { name: "Jan", earnings: 4000 },
//       { name: "Feb", earnings: 3900 },
//       { name: "Mar", earnings: 4200 },
//       { name: "Apr", earnings: 4100 },
//       { name: "May", earnings: 4300 },
//       { name: "Jun", earnings: 4500 },
//       { name: "Jul", earnings: 4600 },
//       { name: "Aug", earnings: 4700 },
//       { name: "Sep", earnings: 4800 },
//       { name: "Oct", earnings: 4900 },
//       { name: "Nov", earnings: 5000 },
//       { name: "Dec", earnings: 5100 },
//     ],
//     month: [
//       { name: "Week 1", earnings: 950 },
//       { name: "Week 2", earnings: 900 },
//       { name: "Week 3", earnings: 1000 },
//       { name: "Week 4", earnings: 1050 },
//     ],
//     week: [
//       { name: "Mon", earnings: 160 },
//       { name: "Tue", earnings: 190 },
//       { name: "Wed", earnings: 210 },
//       { name: "Thu", earnings: 230 },
//       { name: "Fri", earnings: 260 },
//       { name: "Sat", earnings: 300 },
//       { name: "Sun", earnings: 320 },
//     ],
//   },
// };

// export default function EarningsChart() {
//   const [filter, setFilter] = useState("year");
//   const [category, setCategory] = useState("AG");

//   return (
//     <div
//       style={{
//         backgroundColor: "var(--menu-background)",
//         padding: "1rem",
//         borderRadius: "12px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "0.8rem",
//         }}
//       >
//         <h3 style={{ color: "var(--text-primary)", margin: 0 }}>
//           Earnings Overview
//         </h3>

//         <div style={{ display: "flex", gap: "0.5rem" }}>
//           {FILTERS.map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               style={{
//                 padding: "0.3rem 0.8rem",
//                 borderRadius: "6px",
//                 backgroundColor:
//                   filter === type
//                     ? "var(--color-accent)"
//                     : "var(--button-bg)",
//                 color: filter === type ? "#fff" : "var(--button-text)",
//                 border: "1px solid var(--border-color)",
//                 cursor: "pointer",
//                 fontSize: "0.85rem",
//               }}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: "0.5rem",
//           marginBottom: "1rem",
//         }}
//       >
//         {CATEGORIES.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             style={{
//               padding: "0.3rem 0.8rem",
//               borderRadius: "6px",
//               backgroundColor:
//                 category === cat ? "var(--color-primary)" : "var(--button-bg)",
//               color: category === cat ? "#fff" : "var(--button-text)",
//               border: "1px solid var(--border-color)",
//               cursor: "pointer",
//               fontSize: "0.85rem",
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={DATA[category][filter]}>
//           <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
//           <XAxis dataKey="name" stroke="var(--text-secondary)" />
//           <YAxis stroke="var(--text-secondary)" />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "var(--tooltip-background)",
//               border: "1px solid var(--border-color)",
//               borderRadius: "6px",
//               color: "var(--tooltip-text)",
//             }}
//             itemStyle={{
//               color: "var(--tooltip-text)",
//               fontSize: "0.9rem",
//             }}
//             cursor={{ fill: "var(--accent-orange)", opacity: 0.1 }}
//           />
//           <Bar
//             dataKey="earnings"
//             fill="var(--accent-orange)"
//             radius={[8, 8, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
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

// Mock data (replace with real API later)
const DATA = {
  AG: {
    current: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 3000 + Math.random() * 2000,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 800 + Math.random() * 500,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 150 + Math.random() * 200,
      })),
    },
    last: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 2500 + Math.random() * 1500,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 700 + Math.random() * 400,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 100 + Math.random() * 150,
      })),
    },
  },
  AU: {
    current: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 4500 + Math.random() * 2500,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 1200 + Math.random() * 700,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 200 + Math.random() * 250,
      })),
    },
    last: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 4000 + Math.random() * 2000,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 1000 + Math.random() * 600,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 150 + Math.random() * 200,
      })),
    },
  },
  AGUA: {
    current: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 3800 + Math.random() * 1800,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 950 + Math.random() * 500,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 170 + Math.random() * 200,
      })),
    },
    last: {
      year: [...Array(12)].map((_, i) => ({
        name: new Date(0, i).toLocaleString("default", { month: "short" }),
        earnings: 3300 + Math.random() * 1600,
      })),
      month: ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({
        name: week,
        earnings: 800 + Math.random() * 450,
      })),
      week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        earnings: 140 + Math.random() * 180,
      })),
    },
  },
};


// Mock data (same as yours, omitted for brevity)

export default function EarningsChart() {
  const [filter, setFilter] = useState("year");
  const [category, setCategory] = useState("AG");
  const [viewLast, setViewLast] = useState(false);

  const currentData = DATA[category][viewLast ? "last" : "current"][filter];

  return (
    <div
      style={{
        backgroundColor: "var(--menu-background)",
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "0.75rem",
          flexWrap: "wrap", // ✅ Enables wrapping on smaller screens
        }}
      >
        {/* Left: Category Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "6px",
                backgroundColor:
                  category === cat ? "var(--color-primary)" : "var(--button-bg)",
                color: category === cat ? "#fff" : "var(--button-text)",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                fontSize: "0.85rem",
                minWidth: "65px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Center: Heading */}
        <h3
          style={{
            color: "var(--text-primary)",
            margin: 0,
            textAlign: "center",
            flex: "1",
            minWidth: "150px",
            fontSize: "1.1rem",
          }}
        >
          Earnings Overview
        </h3>

        {/* Right: Filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "6px",
                backgroundColor:
                  filter === type ? "var(--color-accent)" : "var(--button-bg)",
                color: filter === type ? "#fff" : "var(--button-text)",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                fontSize: "0.85rem",
                minWidth: "70px",
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Last Year Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem",
          flexWrap: "wrap", // ✅ Makes this row responsive
        }}
      >
        <span
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.8rem",
            minWidth: "fit-content",
          }}
        >
          Show Last {TIME_LABELS[filter]}
        </span>
        <button
          onClick={() => setViewLast(!viewLast)}
          style={{
            padding: "0.3rem 0.8rem",
            borderRadius: "6px",
            backgroundColor: viewLast
              ? "var(--color-primary)"
              : "var(--button-bg)",
            color: viewLast ? "#fff" : "var(--button-text)",
            border: "1px solid var(--border-color)",
            cursor: "pointer",
            fontSize: "0.8rem",
            minWidth: "55px",
          }}
        >
          {viewLast ? "ON" : "OFF"}
        </button>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: "300px", minHeight: "250px" }}>
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
      </div>
    </div>
  );
}
