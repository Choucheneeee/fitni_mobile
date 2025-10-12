import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTheme } from "../../components/ThemeContext";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function ActivityLevelSelection() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(null); // single selection

  // Load saved activity level on mount
  useEffect(() => {
    const loadLevel = async () => {
      try {
        const storedLevel = await AsyncStorage.getItem("activityLevel");
        if (storedLevel) setSelectedLevel(storedLevel);
      } catch (e) {
        console.log("Failed to load activity level", e);
      }
    };
    loadLevel();
  }, []);

  // Save and continue
  const saveAndContinue = async () => {
    if (!selectedLevel) return;
    try {
      await AsyncStorage.setItem("activityLevel", selectedLevel);
      router.push("/Setup/profile");
    } catch (e) {
      console.log("Failed to save activity level", e);
    }
  };

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>
        SELECT YOUR ACTIVITY LEVEL
      </Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Choose your main physical activity level
      </Text>

      {/* Levels Container */}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {LEVELS.map((level, index) => {
            const isActive = selectedLevel === level;
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedLevel(level)}
                style={[
                  styles.item,
                  {
                    backgroundColor: isActive ? "#28a745" : theme.background,
                    borderColor: theme.chart,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { color: isActive ? "#1F2937" : theme.chart },
                  ]}
                >
                  {level}
                </Text>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: isActive ? "white" : "transparent",
                      borderColor: isActive ? "white" : theme.chart,
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Continue Button */}
      <View style={[styles.footer, { backgroundColor: theme.background }]}>
        <Pressable
          onPress={saveAndContinue}
          disabled={!selectedLevel}
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { transform: [{ scale: 0.95 }] },
            { backgroundColor: selectedLevel ? theme.chart : "#aaa" },
          ]}
        >
          <Text style={styles.nextButtonText}>Continue →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  container: {
    height: "50%",
    width: "100%",
    borderRadius: 20,
    padding: 15,
    justifyContent: "center",
  },
  scrollContent: {
    gap: 20,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 50,
    borderWidth: 2,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 16,
    paddingHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});
