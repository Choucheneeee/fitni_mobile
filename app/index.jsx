import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useTheme } from "../components/ThemeContext";

export default function Index() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Onboarding");
    }, 3000); // 10 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.logoContainer}>
        <Image
          source={
            isDark
              ? require("../assets/images/logo.png")
              : require("../assets/images/logo2d.png")
          }
          style={styles.logo}
        />
      </View>

      <ActivityIndicator
        size="large"
        color={theme.primary}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoContainer: { marginVertical: 20 },
  logo: { width: 200, height: 200 },
});
