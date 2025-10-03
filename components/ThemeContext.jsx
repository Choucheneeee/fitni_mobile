import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../scripts/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // default light mode
  const theme = !isDark ?  lightTheme :darkTheme;

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
        
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

