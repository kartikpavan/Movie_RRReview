import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
   const [theme, setTheme] = useState(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
   );

   const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dracula" : "light"));
   };

   useEffect(() => {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html").setAttribute("data-theme", localTheme);
   }, [theme]);

   return <ThemeContext.Provider value={{ toggleTheme, theme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
   return useContext(ThemeContext);
};
