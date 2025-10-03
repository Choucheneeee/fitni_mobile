import { BlurView } from 'expo-blur';
import { useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/beautifu.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: theme.background + "33" }]}>
        
        {/* Quote */}
        <Text style={styles.quote}>
          CONSISTENCY IS{"\n"}
          THE KEY TO PROGRESS.{"\n"}
          DON'T GIVE UP!
        </Text>

        {/* Start Container with Steps */}
        <View style={styles.startContainer}>
          {/* Icon */}
          <Image
            source={require("../../assets/images/Vector.png")}
            style={styles.icon}
          />

          {/* Text */}
          <Text style={[styles.startText, { color: theme.text }]}>
            Start your journey towards a more active lifestyle
          </Text>

          {/* Step indicators */}
          <View style={styles.stepsRow}>
            <Image
              source={require("../../assets/images/Rectangle 112.png")} // inactive
              style={styles.stepRect}
            />
            <Image
              source={require("../../assets/images/Rectangle 109.png")} // active
              style={styles.stepRect}
            />
            <Image
              source={require("../../assets/images/Rectangle 109.png")} // active
              style={styles.stepRect}
            />
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.logoContainernext}>
          <Pressable onPress={() => router.push("/Setup/gender")}>
            <BlurView intensity={20} style={styles.nextButton}>
              <Text style={[styles.nextButtonText, { color: theme.text }]}>
                NEXT
              </Text>
            </BlurView>
          </Pressable>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "black" },

  overlay: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 20 },

  // Quote on top
  quote: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginTop: 200,
    
    textTransform: "uppercase", // ensures uppercase
    lineHeight: 28,
  },

  // Start Container
  startContainer: {
    width: "100%",
    backgroundColor: "#9E89FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 20,
    marginTop: "auto",   // pushes it down near bottom
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  icon: { width: 40, height: 40, marginBottom: 10 },

  startText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  stepsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  stepRect: {
    width: 30,
    height: 6,
    marginHorizontal: 4,
    borderRadius: 3,
    resizeMode: "contain",
  },

  // Next Button
  logoContainernext: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: "#E53935",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
