import AppLoading from "expo-app-loading"; // for splash while fonts load
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemeProvider } from "../components/ThemeContext";
import ToggleButton from "../components/tugglebutton";

export default function Layout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    // "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />; // show splash until fonts loaded

  return (
    <ThemeProvider>
      <View style={styles.toggleContainer}>
        <ToggleButton />
      </View>

      {/* Stack handles all routes */}
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
