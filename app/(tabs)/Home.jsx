import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemeProvider, useTheme } from "../../components/ThemeContext";
import ToggleButton from "../../components/tugglebutton";

function HomeContent() {
  const { theme, isDark } = useTheme(); // ✅ get isDark

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontSize: 20 }}>Welcome</Text>

      {/* Logo section */}
      <View style={styles.logoContainer}>
        <Image
          source={
            isDark
              ? require("../../assets/images/logo.png") // dark mode logo
              : require("../../assets/images/logo2d.png") // light mode logo
          }
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={{ color: theme.primary }}>Start Workout</Text>
      </View>

      {/* Reusable toggle button */}
      <ToggleButton />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  card: {
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
});
