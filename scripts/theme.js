// theme.js
const lightTheme = {
  background: "#F8F9FA",     // softer light gray
  card: "#FFFFFF",           // clean white for cards
  text: "#000000ff",           // dark gray instead of pure black
  primary: "#2979FF",        // slightly deeper blue, professional
  secondary: "#E3E6EB",      // light gray for secondary elements
  success: "#4CAF50",        // keep green
  danger: "#E53935",         // slightly deeper red
  chart: "#7C4DFF",          // muted purple for charts
};

const darkTheme = {
  background: "#121212",      // darker dark gray for modern look
  card: "#1E1E1E",           // slightly lighter card than background
  text: "#ffffffff",           // soft off-white text
  primary: "#2979FF",        // same blue for contrast
  secondary: "#2C2C2C",      // dark gray secondary
  success: "#4CAF50",
  danger: "#E53935",
  chart: "#7C4DFF",
};

export { darkTheme, lightTheme };

