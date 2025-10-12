import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";

export default function Gender() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState(null);

  // Load saved gender from local storage when component mounts
  useEffect(() => {
    const loadGender = async () => {
      try {
        const storedGender = await AsyncStorage.getItem("gender");
        if (storedGender) setSelectedGender(storedGender);
      } catch (e) {
        console.log("Failed to load gender from storage", e);
      }
    };
    loadGender();
  }, []);

  // Only update state when selecting gender
  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  // Save gender and navigate when Continue is clicked
  const handleContinue = async () => {
    if (!selectedGender) return;
    try {
      await AsyncStorage.setItem("gender", selectedGender);
      router.push("/Setup/age");
    } catch (e) {
      console.log("Failed to save gender", e);
    }
  };

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      <Text style={[styles.quote, { color: theme.text }]}>
        SELECT YOUR GENDER
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        This helps us personalize your experience
      </Text>

      <View style={styles.genderContainer}>
        <Pressable style={styles.genderCard} onPress={() => handleSelectGender("male")}>
          <Image
            source={require("../../assets/images/Bot-Gender-Male.png")}
            style={[
              styles.genderImage,
              selectedGender === "male" ? styles.selectedImage : styles.unselectedImage,
            ]}
          />
          <Text style={[styles.genderText, { color: theme.text }]}>MALE</Text>
        </Pressable>

        <Pressable style={styles.genderCard} onPress={() => handleSelectGender("female")}>
          <Image
            source={require("../../assets/images/Bot-Gender-Female.png")}
            style={[
              styles.genderImage,
              selectedGender === "female" ? styles.selectedImage : styles.unselectedImage,
            ]}
          />
          <Text style={[styles.genderText, { color: theme.text }]}>FEMALE</Text>
        </Pressable>
      </View>

      <View style={[styles.logoContainernext, { backgroundColor: theme.chart }]}>
        <Pressable
          disabled={!selectedGender}
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { transform: [{ scale: 0.95 }] },
            !selectedGender && { opacity: 0.4 },
          ]}
        >
          <Text style={[styles.nextButtonText, { color: "white" }]}>
            Continue →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  quote: { fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.5 },
  subtitle: { fontSize: 15, fontWeight: "500", textAlign: "center", marginBottom: 40, opacity: 0.7, letterSpacing: 0.5 },
  genderContainer: { flexDirection: "column", alignItems: "center", width: "100%", marginBottom: 60 },
  genderCard: { width: "80%", alignItems: "center", marginVertical: 20 },
  genderImage: { width: 140, height: 140, resizeMode: "contain", marginBottom: 12, borderRadius: 70 },
  genderText: { fontSize: 20, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1.2 },
  logoContainernext: { position: "absolute", bottom: 40, width: "100%", justifyContent: "center", alignItems: "center" },
  nextButton: { paddingVertical: 16, paddingHorizontal: 70, alignItems: "center", justifyContent: "center", backgroundColor: "transparent", elevation: 8 },
  nextButtonText: { fontSize: 18, fontWeight: "800", textAlign: "center", textTransform: "uppercase", letterSpacing: 1.2, color: "white" },
  selectedImage: { opacity: 1, transform: [{ scale: 1.2 }], bordershadowColor: "#E53935" },
  unselectedImage: { opacity: 0.4, transform: [{ scale: 1 }] },
});
