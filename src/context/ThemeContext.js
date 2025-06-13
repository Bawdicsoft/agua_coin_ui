// "use client";
// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// // Custom hook for ease of use
// export function useTheme() {
//   return useContext(ThemeContext);
// }



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

// const toggleTheme = () => {
//   const newTheme = theme === "light" ? "dark" : "light";

//   // 1. Create Fade Element
//   const fade = document.createElement("div");
//   fade.className = "theme-fade";
//   document.body.appendChild(fade);

//   // 2. Force reflow to make sure animation triggers
//   void fade.offsetWidth;
//   fade.style.opacity = 1;

//   // 3. After fade-in complete → Change theme → Fade-out
//   setTimeout(() => {
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);

//     // Start fade-out
//     fade.style.opacity = 0;

//     // Remove fade element after transition
//     setTimeout(() => {
//       fade.remove();
//     }, 1000);
//   }, 500); // Start theme switch after fade-in (adjust as needed)
// };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
