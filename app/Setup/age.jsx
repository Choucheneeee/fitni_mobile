import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useTheme } from "../../components/ThemeContext";

const { width: screenWidth } = Dimensions.get('window');
const AGES = Array.from({ length: 83 }, (_, i) => i + 18); // Ages 18 to 100

export default function Age() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState(25); // Default age
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const lastUpdateX = useRef(0);

  // Calculate the index for initial scroll position
  const initialScrollIndex = AGES.indexOf(selectedAge);

  // Handle scroll end - updates selected age
  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // Calculate which item is centered
    const index = Math.round(contentOffsetX / 70);
    
    if (AGES[index] !== undefined) {
      setSelectedAge(AGES[index]);
    }
  };

  // Update selected age during scroll (throttled)
  const updateSelectedAge = (offsetX) => {
    // Only update if scrolled more than half an item
    if (Math.abs(offsetX - lastUpdateX.current) > 35) {
      const index = Math.round(offsetX / 70);
      if (AGES[index] !== undefined && AGES[index] !== selectedAge) {
        setSelectedAge(AGES[index]);
        lastUpdateX.current = offsetX;
      }
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5 // Center the item
    });
  };

  const renderAgeItem = ({ item, index }) => {
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
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 0.6, 1, 0.6, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View 
        style={[
          styles.ageItem,
          { 
            transform: [{ scale }],
            opacity 
          }
        ]}
      >
        <Text style={[styles.ageText, { color: theme.text }]}>
          {item}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background }]}>
      
      {/* Title */}
      <Text style={[styles.quote, { color: theme.text }]}>
        SELECT YOUR AGE
      </Text>
      
      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Scroll horizontally to select your age
      </Text>

      {/* Age Spinner Container */}
      <View style={styles.spinnerContainer}>
        
        {/* Selection Indicator */}
        <View style={[styles.selectionIndicator, { backgroundColor: theme.chart }]} />
        
        {/* Age List */}
        <View style={styles.agesListContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={AGES}
            keyExtractor={(item) => item.toString()}
            renderItem={renderAgeItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={70}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { 
                useNativeDriver: true,
                listener: (event) => {
                  updateSelectedAge(event.nativeEvent.contentOffset.x);
                }
              }
            )}
            onScrollEndDrag={handleScrollEnd}
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={styles.flatListContent}
            getItemLayout={(data, index) => ({
              length: 70,
              offset: 70 * index,
              index,
            })}
            initialScrollIndex={initialScrollIndex}
          />
        </View>
      </View>

      {/* Selected Age Display */}
      <View style={styles.selectedAgeContainer}>
        <Text style={[styles.selectedAgeText, { color: theme.text }]}>
          {selectedAge} years old
        </Text>
      </View>

      {/* Next Button */}
      <View style={[styles.logoContainernext, { backgroundColor: theme.chart }]}>
        <Pressable
          onPress={() => router.push("/Onboarding/indexStep3")}
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { transform: [{ scale: 0.95 }] },
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  quote: {
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
    marginBottom: 40,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  spinnerContainer: {
    height: 120,
    width: "100%",
    position: "relative",
    marginBottom: 40,
  },
  selectionIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -1.5,
    marginTop: -20,
    width: 3,
    height: 40,
    borderRadius: 2,
    zIndex: 2,
  },
  agesListContainer: {
    flex: 1,
    justifyContent: "center",
  },
  flatListContent: {
    alignItems: "center",
    paddingHorizontal: screenWidth / 2 - 35,
  },
  ageItem: {
    width: 70,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  selectedAgeContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  selectedAgeText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  logoContainernext: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 16,
    paddingHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "white",
  },
});