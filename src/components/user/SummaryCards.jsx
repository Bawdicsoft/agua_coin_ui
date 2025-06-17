// "use client";
// import React from "react";

// export default function SummaryCards() {
//   const cards = [
//     { title: "Total Balance", value: "$12,340", color: "var(--accent-yellow)" },
//     { title: "Pending Orders", value: "32", color: "var(--accent-orange)" },
//     { title: "Earnings", value: "$4,120", color: "var(--accent-green, #4caf50)" },
//     { title: "Notifications", value: "7", color: "var(--accent-blue, #3b82f6)" },
//   ];

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
//       {cards.map((card, idx) => (
//         <div
//           key={idx}
//           style={{
//             backgroundColor: "var(--menu-background)",
//             padding: "1rem",
//             borderRadius: "12px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             color: "var(--text-primary)",
//           }}
//         >
//           <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{card.title}</div>
//           <div style={{ fontSize: "1.5rem", color: card.color, marginTop: "0.5rem" }}>{card.value}</div>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";
import React from "react";

export default function SummaryCards() {
  const cards = [
    { title: "Total Balance", value: "$12,340", color: "var(--accent-yellow)" },
    { title: "Pending Orders", value: "32", color: "var(--accent-orange)" },
    { title: "Earnings", value: "$4,120", color: "var(--accent-green, #4caf50)" },
    { title: "Notifications", value: "7", color: "var(--accent-blue, #3b82f6)" },
  ];

  const containerStyle = {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // ✅ Responsive grid
  };

  const cardStyle = {
    backgroundColor: "var(--menu-background)",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    color: "var(--text-primary)",
  };

  const titleStyle = {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
  };

  const valueStyle = (color) => ({
    fontSize: "1.5rem",
    color,
    marginTop: "0.5rem",
  });

  return (
    <div style={containerStyle}>
      {cards.map((card, idx) => (
        <div key={idx} style={cardStyle}>
          <div style={titleStyle}>{card.title}</div>
          <div style={valueStyle(card.color)}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}
