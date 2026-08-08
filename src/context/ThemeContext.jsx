import { createContext, useEffect } from "react";

export const ThemeContext = createContext();

// The app uses a single, polished light theme. Dark mode classes
// remain for code robustness, but the UI is fixed to light mode.
function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode: false, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

