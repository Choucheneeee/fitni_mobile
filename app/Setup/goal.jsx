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

const GOALS = [
  "Lose Weight",
  "Build Muscle",
  "Increase Stamina",
  "Improve Flexibility",
  "General Health",
];

export default function GoalSelection() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState(null); // single selection

  // Load saved goal on mount
  useEffect(() => {
    const loadGoal = async () => {
      try {
        const storedGoal = await AsyncStorage.getItem("goal");
        if (storedGoal) setSelectedGoal(storedGoal);
      } catch (e) {
        console.log("Failed to load goal", e);
      }
    };
    loadGoal();
  }, []);

  // Save goal and continue
  const saveAndContinue = async () => {
    if (!selectedGoal) return;
    try {
      await AsyncStorage.setItem("goal", selectedGoal);
      router.push("/Setup/activity");
    } catch (e) {
      console.log("Failed to save goal", e);
    }
  };

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>
        SELECT YOUR GOAL
      </Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Choose your main goal
      </Text>

      {/* Goals Container */}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {GOALS.map((goal, index) => {
            const isActive = selectedGoal === goal;
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedGoal(goal)}
                style={[
                  styles.goalItem,
                  {
                    backgroundColor: isActive ? theme.chart : theme.background,
                    borderColor: theme.chart,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.goalText,
                    { color: isActive ? "white" : theme.text },
                  ]}
                >
                  {goal}
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
          disabled={!selectedGoal}
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { transform: [{ scale: 0.95 }] },
            { backgroundColor: selectedGoal ? theme.chart : "#aaa" },
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
    height: "70%",
    width: "100%",
    borderRadius: 20,
    padding: 15,
  },
  scrollContent: {
    gap: 15,
    paddingBottom: 20,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "600",
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
