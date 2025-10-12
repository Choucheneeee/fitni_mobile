import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../components/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");
const WEIGHTS = Array.from({ length: 151 }, (_, i) => i + 30); // 30kg → 180kg

export default function Weight() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedWeight, setSelectedWeight] = useState(70); // Default weight in kg
  const [isKg, setIsKg] = useState(true); // true = kg, false = lb
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const lastUpdateX = useRef(0);

  const initialScrollIndex = WEIGHTS.indexOf(selectedWeight);

  // Load saved weight & unit on mount
  useEffect(() => {
    const loadWeight = async () => {
      try {
        const storedWeight = await AsyncStorage.getItem("weight");
        const storedUnit = await AsyncStorage.getItem("weightUnit");
        if (storedWeight) setSelectedWeight(parseInt(storedWeight, 10));
        if (storedUnit) setIsKg(storedUnit === "kg");

        // Scroll to saved weight
        const index = WEIGHTS.indexOf(storedWeight ? parseInt(storedWeight, 10) : selectedWeight);
        if (index >= 0) {
          flatListRef.current?.scrollToIndex({
            index,
            animated: false,
            viewPosition: 0.5,
          });
        }
      } catch (e) {
        console.log("Failed to load weight/unit", e);
      }
    };
    loadWeight();
  }, []);

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 70);
    if (WEIGHTS[index] !== undefined) setSelectedWeight(WEIGHTS[index]);
  };

  const updateSelectedWeight = (offsetX) => {
    if (Math.abs(offsetX - lastUpdateX.current) > 35) {
      const index = Math.round(offsetX / 70);
      if (WEIGHTS[index] !== undefined && WEIGHTS[index] !== selectedWeight) {
        setSelectedWeight(WEIGHTS[index]);
        lastUpdateX.current = offsetX;
      }
    }
  };

  const saveAndContinue = async () => {
    try {
      await AsyncStorage.setItem("weight", selectedWeight.toString());
      await AsyncStorage.setItem("weightUnit", isKg ? "kg" : "lb");
      router.push("/Setup/height");
    } catch (e) {
      console.log("Failed to save weight/unit", e);
    }
  };

  const renderWeightItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * 70,
      (index - 1) * 70,
      index * 70,
      (index + 1) * 70,
      (index + 2) * 70,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1.2, 0.9, 0.8],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 0.6, 1, 0.6, 0.4],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.weightItem, { transform: [{ scale }], opacity }]}
      >
        <Text style={[styles.weightText, { color: theme.text }]}>{item}</Text>
      </Animated.View>
    );
  };

  const convertedWeight = isKg
    ? (selectedWeight * 2.20462).toFixed(1) // kg → lb
    : (selectedWeight / 2.20462).toFixed(1); // lb → kg

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      <Text style={[styles.quote, { color: theme.text }]}>SELECT YOUR WEIGHT</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Scroll horizontally to select your weight
      </Text>

      {/* Unit Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsKg(true)}
          style={[styles.toggleButton, isKg && { backgroundColor: theme.chart }]}
        >
          <Text style={[styles.toggleText, { color: isKg ? "white" : theme.text }]}>KG</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsKg(false)}
          style={[styles.toggleButton, !isKg && { backgroundColor: theme.chart }]}
        >
          <Text style={[styles.toggleText, { color: !isKg ? "white" : theme.text }]}>LB</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spinnerContainer}>
        <View style={[styles.selectionIndicator, { backgroundColor: theme.chart }]} />
        <View style={[styles.weightsListContainer, { backgroundColor: theme.chart }]}>
          <Animated.FlatList
            ref={flatListRef}
            data={WEIGHTS}
            keyExtractor={(item) => item.toString()}
            renderItem={renderWeightItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={70}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true, listener: (e) => updateSelectedWeight(e.nativeEvent.contentOffset.x) }
            )}
            onScrollEndDrag={handleScrollEnd}
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.flatListContent}
            getItemLayout={(data, index) => ({ length: 70, offset: 70 * index, index })}
            initialScrollIndex={initialScrollIndex}
          />
        </View>
      </View>

      {/* Selected Weight Display */}
      <View style={styles.selectedWeightContainer}>
        {isKg ? (
          <Text style={[styles.selectedWeightText, { color: theme.text }]}>
            {selectedWeight} kg ({convertedWeight} lb)
          </Text>
        ) : (
          <Text style={[styles.selectedWeightText, { color: theme.text }]}>
            {selectedWeight} lb ({convertedWeight} kg)
          </Text>
        )}
      </View>

      {/* Next Button */}
      <View style={[styles.logoContainernext, { backgroundColor: theme.chart }]}>
        <Pressable onPress={saveAndContinue} style={({ pressed }) => [styles.nextButton, pressed && { transform: [{ scale: 0.95 }] }]}>
          <Text style={[styles.nextButtonText, { color: "white" }]}>Continue →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  quote: { fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.5 },
  subtitle: { fontSize: 15, fontWeight: "500", textAlign: "center", marginBottom: 20, opacity: 0.7, letterSpacing: 0.5 },
  toggleContainer: { flexDirection: "row", marginBottom: 30, borderRadius: 10, overflow: "hidden" },
  toggleButton: { paddingVertical: 10, paddingHorizontal: 25, borderWidth: 1, borderColor: "#888" },
  toggleText: { fontSize: 16, fontWeight: "700" },
  spinnerContainer: { height: 120, width: "120%", position: "relative", marginBottom: 40 },
  selectionIndicator: { position: "absolute", top: "50%", left: "50%", marginLeft: -1.5, marginTop: -20, width: 3, height: 40, borderRadius: 2, zIndex: 2 },
  weightsListContainer: { flex: 1, justifyContent: "center", width: "100%" },
  flatListContent: { alignItems: "center", paddingHorizontal: screenWidth / 2 - 35 },
  weightItem: { width: 70, height: 80, justifyContent: "center", alignItems: "center" },
  weightText: { fontSize: 24, fontWeight: "800", textAlign: "center" },
  selectedWeightContainer: { marginBottom: 40, alignItems: "center" },
  selectedWeightText: { fontSize: 18, fontWeight: "600", textAlign: "center" },
  logoContainernext: { position: "absolute", bottom: 40, width: "100%", justifyContent: "center", alignItems: "center" },
  nextButton: { paddingVertical: 16, paddingHorizontal: 70, alignItems: "center", justifyContent: "center", backgroundColor: "transparent", elevation: 8 },
  nextButtonText: { fontSize: 18, fontWeight: "800", textAlign: "center", textTransform: "uppercase", letterSpacing: 1.2, color: "white" },
});
