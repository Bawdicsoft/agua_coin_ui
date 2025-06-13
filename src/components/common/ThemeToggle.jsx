"use client";
import { useTheme } from "@/context/ThemeContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const activeColor = theme === "light" ? "#facc15" : "#60a5fa"; // yellow / blue

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80px",
        height: "36px",
        borderRadius: "999px",
        background: "var(--button-bg, #222)",
        border: "1px solid var(--border-color)",
        cursor: "pointer",
        padding: "0 8px",
        color: "var(--foreground)",
        overflow: "hidden",
      }}
    >
      {/* Background inactive icons */}
      <MdLightMode
        size={18}
        style={{
          zIndex: 1,
          color: theme === "light" ? activeColor : "var(--foreground)",
          opacity: theme === "light" ? 1 : 0.5,
          transition: "opacity 0.3s ease, color 0.3s ease",
        }}
      />
      <MdDarkMode
        size={18}
        style={{
          zIndex: 1,
          color: theme === "dark" ? activeColor : "var(--foreground)",
          opacity: theme === "dark" ? 1 : 0.5,
          transition: "opacity 0.3s ease, color 0.3s ease",
        }}
      />

      {/* Moving neon ball with active icon */}
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: theme === "light" ? "3px" : "calc(100% - 33px)",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: activeColor,
          opacity: 0.9,
          boxShadow: `0 0 8px ${activeColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          transition: "left 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          zIndex: 2,
        }}
      >
        {theme === "light" ? (
          <MdLightMode size={16} style={{ color: "#000" }} />
        ) : (
          <MdDarkMode size={16} style={{ color: "#000" }} />
        )}
      </div>
    </button>
  );
}
