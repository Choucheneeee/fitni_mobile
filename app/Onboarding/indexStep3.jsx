import { BlurView } from 'expo-blur';
import { useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";

export default function Onboarding() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/womennut.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: theme.background + "33" }]}>

        {/* Start Container with Steps */}
        <View style={styles.startContainer}>

          {/* Step indicators */}
         

          {/* Icon */}
          <Image
            source={require("../../assets/images/Nutrition.png")}
            style={styles.icon}
          />

          {/* Text */}
          <Text style={[styles.startText, { color: theme.text }]}>
            Find nutrition tips that fit your lifestyle
          </Text>
           <View style={styles.stepsRow}>
            <Image
              source={require("../../assets/images/Rectangle 109.png")} // current step (purple)
              style={styles.stepRect}
            />
             <Image
              source={require("../../assets/images/Rectangle 112.png")} // inactive step (white)
              style={styles.stepRect}
            />
            
            <Image
              source={require("../../assets/images/Rectangle 109.png")} // current step (purple)
              style={styles.stepRect}
            />
           
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.logoContainernext}>
      <Pressable onPress={() => router.push("/Onboarding/indexStep4")}>
        <BlurView intensity={20}  style={styles.nextButton}>
          <Text style={[styles.nextButtonText,{color:theme.text}]}>Next</Text>
        </BlurView>
      </Pressable>
    </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, alignItems: "center", justifyContent: "center", padding: 0 },

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
    fontWeight: "600",
    textAlign: "center",
  },

  overlay: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoContainer: { marginVertical: 20 },

  icon: { width: 40, height: 40, marginBottom: 10,marginTop:10 },

  // Start Container
  startContainer: {
    width: "100%",
    backgroundColor: "#9E89FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    paddingVertical: 20,
    marginTop: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    height:180,
    elevation: 6,
  },
  logoContainernext: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    paddingVertical: 20,
    marginTop: 20,
  },

  stepsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    marginTop:20,
  },
  stepRect: {
    width: 30,
    height: 6,
    marginHorizontal: 4,
    borderRadius: 3,
    resizeMode: "contain",
  },

  startText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
    
  },
});
