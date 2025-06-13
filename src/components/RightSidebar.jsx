"use client";
import React from "react";

export default function RightSidebar() {
  return (
    <div
      style={{
        backgroundColor: "var(--menu-background)",
        padding: "1rem",
        borderRadius: "12px",
        color: "var(--text-primary)",
        width: "100%", // ✅ Always full width of container
        maxWidth: "300px", // ✅ Limited to 300px when inside a larger container
        boxSizing: "border-box",
        alignSelf: "stretch", // ✅ Helps stretch in grid/flex layouts
      }}
    >
      <h3
        style={{
          marginBottom: "1rem",
          fontSize: "1.1rem",
        }}
      >
        Quick Links
      </h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {[
          "Profile Settings",
          "Transaction History",
          "Security Options",
          "Support",
        ].map((link) => (
          <li key={link}>
            <a
              href="#"
              style={{
                color: "var(--accent-yellow)",
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-block",
                width: "100%", // ✅ Link takes full width
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
