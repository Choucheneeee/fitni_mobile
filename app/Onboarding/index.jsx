import { useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";

export default function Onboarding() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/womanback.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: theme.background }]}>
        <Text style={[styles.login, { color: theme.chart }]}>Welcome</Text>
        <View style={styles.logoContainer}>
          <Image
            source={
              isDark
                ? require("../../assets/images/logo.png")
                : require("../../assets/images/logo2d.png")
            }
            style={styles.logo}
          />
        </View>
         <Pressable
                style={[styles.card, { backgroundColor: theme.chart }]}
                onPress={() => router.push("/Onboarding/indexStep2")}
              >
                <Text style={{ color: theme.card }}>Start Workout</Text>
              </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, alignItems: "center", justifyContent: "center", padding: 0 },
login: {
  fontSize: 24,
  fontWeight: "550",
  letterSpacing: 5,
  textAlign: "center",
  color: "#fff",
  fontFamily: "Poppins-ExtraBold", // <-- custom font
  textShadowColor: "rgba(0,0,0,0.25)",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
  
},

logoContainer: { marginVertical: 20 },
  logo: { width: 200, height: 200,
    marginBottom: 50,
    
   },
     card: { marginTop: 16, padding: 20, borderRadius: 12, alignItems: "center" },

  f3Text: { fontSize: 64, fontWeight: "bold", marginBottom: 5 },
  fitbodyText: { fontSize: 36, fontWeight: "700", letterSpacing: 2 },
});
