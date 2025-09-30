import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../components/ThemeContext";

export default function Home() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontSize: 20 }}>Welcome</Text>

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

      <Pressable
        style={[styles.card, { backgroundColor: theme.card }]}
        onPress={() => router.push("/Onboarding")}
      >
        <Text style={{ color: theme.primary }}>Start Workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoContainer: { marginVertical: 20 },
  logo: { width: 200, height: 200 },
  card: { marginTop: 16, padding: 20, borderRadius: 12, alignItems: "center" },
});
