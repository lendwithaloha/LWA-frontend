"use client"; // Marks this as a client-side component for Next.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles"; // MUI Theme Provider
import { LightTheme as lightTheme, darkTheme } from "@/styles/theme"; // Import your themes

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // useEffect(() => {
  //   // Add or remove the dark class on <html> based on the current theme mode
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* Apply the Material UI theme based on the current mode */}
      <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context values
export const useTheme = () => useContext(ThemeContext);