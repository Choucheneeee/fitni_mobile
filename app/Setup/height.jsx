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

const { height: screenHeight } = Dimensions.get("window");
const HEIGHTS = Array.from({ length: 121 }, (_, i) => i + 100); // 100cm → 220cm

export default function Height() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedHeight, setSelectedHeight] = useState(170); // Default height in cm
  const [isCm, setIsCm] = useState(true); // true = cm, false = ft/in
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastUpdateY = useRef(0);

  const initialScrollIndex = HEIGHTS.indexOf(selectedHeight);

  // Load saved height & unit on mount
  useEffect(() => {
    const loadHeight = async () => {
      try {
        const storedHeight = await AsyncStorage.getItem("height");
        const storedUnit = await AsyncStorage.getItem("heightUnit");
        if (storedHeight) setSelectedHeight(parseInt(storedHeight, 10));
        if (storedUnit) setIsCm(storedUnit === "cm");

        // Scroll to saved height
        const index = HEIGHTS.indexOf(storedHeight ? parseInt(storedHeight, 10) : selectedHeight);
        if (index >= 0) {
          flatListRef.current?.scrollToIndex({
            index,
            animated: false,
            viewPosition: 0.5,
          });
        }
      } catch (e) {
        console.log("Failed to load height/unit", e);
      }
    };
    loadHeight();
  }, []);

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 70);
    if (HEIGHTS[index] !== undefined) setSelectedHeight(HEIGHTS[index]);
  };

  const updateSelectedHeight = (offsetY) => {
    if (Math.abs(offsetY - lastUpdateY.current) > 35) {
      const index = Math.round(offsetY / 70);
      if (HEIGHTS[index] !== undefined && HEIGHTS[index] !== selectedHeight) {
        setSelectedHeight(HEIGHTS[index]);
        lastUpdateY.current = offsetY;
      }
    }
  };

  const saveAndContinue = async () => {
    try {
      await AsyncStorage.setItem("height", selectedHeight.toString());
      await AsyncStorage.setItem("heightUnit", isCm ? "cm" : "ft");
      router.push("/Setup/goal");
    } catch (e) {
      console.log("Failed to save height/unit", e);
    }
  };

  const renderHeightItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * 70,
      (index - 1) * 70,
      index * 70,
      (index + 1) * 70,
      (index + 2) * 70,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1.2, 0.9, 0.8],
      extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 0.6, 1, 0.6, 0.4],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.heightItem, { transform: [{ scale }], opacity }]}
      >
        <Text style={[styles.heightText, { color: theme.text }]}>{item}</Text>
      </Animated.View>
    );
  };

  // Conversion logic
  const convertedHeight = isCm
    ? (selectedHeight / 30.48).toFixed(1) // cm → ft
    : (selectedHeight * 30.48).toFixed(1); // ft → cm

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      <Text style={[styles.quote, { color: theme.text }]}>SELECT YOUR HEIGHT</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Scroll vertically to select your height
      </Text>

      {/* Unit Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsCm(true)}
          style={[styles.toggleButton, isCm && { backgroundColor: theme.chart }]}
        >
          <Text style={[styles.toggleText, { color: isCm ? "white" : theme.text }]}>
            CM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsCm(false)}
          style={[styles.toggleButton, !isCm && { backgroundColor: theme.chart }]}
        >
          <Text style={[styles.toggleText, { color: !isCm ? "white" : theme.text }]}>
            FT
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spinnerContainer}>
        <View style={[styles.selectionIndicator, { backgroundColor: theme.chart }]} />
        <View style={[styles.heightsListContainer, { backgroundColor: theme.chart }]}>
          <Animated.FlatList
            ref={flatListRef}
            data={HEIGHTS}
            keyExtractor={(item) => item.toString()}
            renderItem={renderHeightItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={70}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true, listener: (e) => updateSelectedHeight(e.nativeEvent.contentOffset.y) }
            )}
            onScrollEndDrag={handleScrollEnd}
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.flatListContent}
            getItemLayout={(data, index) => ({ length: 70, offset: 70 * index, index })}
            initialScrollIndex={initialScrollIndex}
          />
        </View>
      </View>

      {/* Selected Height Display */}
      <View style={styles.selectedHeightContainer}>
        {isCm ? (
          <Text style={[styles.selectedHeightText, { color: theme.text }]}>
            {selectedHeight} cm ({convertedHeight} ft)
          </Text>
        ) : (
          <Text style={[styles.selectedHeightText, { color: theme.text }]}>
            {selectedHeight} ft ({convertedHeight} cm)
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
  spinnerContainer: { height: 400, width: "40%", position: "relative", marginBottom: 40 },
  selectionIndicator: { position: "absolute", top: "50%", left: "50%", marginLeft: -35, marginTop: -1.5, width: 70, height: 3, borderRadius: 2, zIndex: 2 },
  heightsListContainer: { flex: 1, justifyContent: "center", width: "100%", borderRadius: 10 },
  flatListContent: { alignItems: "center", paddingVertical: 200 },
  heightItem: { width: 70, height: 70, justifyContent: "center", alignItems: "center" },
  heightText: { fontSize: 24, fontWeight: "800", textAlign: "center" },
  selectedHeightContainer: { marginBottom: 40, alignItems: "center" },
  selectedHeightText: { fontSize: 18, fontWeight: "600", textAlign: "center" },
  logoContainernext: { position: "absolute", bottom: 40, width: "100%", justifyContent: "center", alignItems: "center" },
  nextButton: { paddingVertical: 16, paddingHorizontal: 70, alignItems: "center", justifyContent: "center", backgroundColor: "transparent", elevation: 8 },
  nextButtonText: { fontSize: 18, fontWeight: "800", textAlign: "center", textTransform: "uppercase", letterSpacing: 1.2, color: "white" },
});
