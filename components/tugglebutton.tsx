import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "./ThemeContext";

export default function ToggleButton() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={toggleTheme}
    >
      <Text style={{ color: "#fff", fontSize: 16 }}>
        {isDark ? "☀️" : "🌙"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor:"#9E89FF",
  },
});
