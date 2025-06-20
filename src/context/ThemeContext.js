
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);



const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";

  // 1. Create overlay
  const overlay = document.createElement("div");
  overlay.className = "theme-overlay";
  document.body.appendChild(overlay);

  // 2. Apply new theme
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);

  // 3. Remove overlay after animation completes
  setTimeout(() => {
    overlay.remove();
  }, 500);
};


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
