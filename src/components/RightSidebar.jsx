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
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>Quick Links</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li><a href="#" style={{ color: "var(--accent-yellow)", textDecoration: "none" }}>Profile Settings</a></li>
        <li><a href="#" style={{ color: "var(--accent-yellow)", textDecoration: "none" }}>Transaction History</a></li>
        <li><a href="#" style={{ color: "var(--accent-yellow)", textDecoration: "none" }}>Security Options</a></li>
        <li><a href="#" style={{ color: "var(--accent-yellow)", textDecoration: "none" }}>Support</a></li>
      </ul>
    </div>
  );
}
