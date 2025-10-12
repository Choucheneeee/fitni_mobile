import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../components/ThemeContext";

const { width } = Dimensions.get("window");

const menuItems = [
  { label: "Workout", icon: <MaterialCommunityIcons name="dumbbell" size={28} color="#4CAF50" /> },
  { label: "Progress Tracking", icon: <MaterialCommunityIcons name="chart-line" size={28} color="#9C27B0" /> },
  { label: "Nutrition", icon: <MaterialCommunityIcons name="food-apple" size={28} color="#FF9800" /> },
  { label: "Community", icon: <MaterialCommunityIcons name="account-group" size={28} color="#03A9F4" /> },
];

const recommendations = [
  {
    title: "Squat Exercise",
    duration: "12 Minutes",
    kcal: "120 kcal",
    image: require("../assets/images/squat.png"),
  },
  {
    title: "Full Body Stretching",
    duration: "12 Minutes",
    kcal: "120 kcal",
    image: require("../assets/images/bodyy.png"),
  },
];

const articles = [
  {
    title: "Supplement Guide",
    image: require("../assets/images/fs.png"),
  },
  {
    title: "15 Quick & Effective Daily Workouts",
    image: require("../assets/images/ss.png"),
  },
];

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.chart }]}>Hi, Madison</Text>
        <Text style={[styles.subGreeting, { color: theme.text }]}>
          It's time to challenge your limits.
        </Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color={theme.chart} />
          <Ionicons name="notifications" size={24} color={theme.chart} />
          <Ionicons name="person" size={24} color={theme.chart} />
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <View key={idx} style={styles.menuItem}>
            {item.icon}
            <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.chart }]}>Recommendations</Text>
          <Pressable>
            <Text style={{ color: "#FFD700" }}>See All →</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          data={recommendations}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Pressable style={[styles.recommendCard, { backgroundColor: theme.chart }]}>
              <Image source={item.image} style={styles.recommendImage} />
              <Text style={styles.recommendTitle}>{item.title}</Text>
              <Text style={styles.recommendInfo}>
                {item.duration} • {item.kcal}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Weekly Challenge */}
     {/* Weekly Challenge */}
<View style={[styles.section, { backgroundColor: "#9C27B0", borderRadius: 20, padding: 15 }]}>
  <Text style={[styles.sectionTitle, { color: "#fff", marginBottom: 10 }]}>Weekly Challenge</Text>
  
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
    <View style={{ flex: 1 }}>
      <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>Plank With Hip Twist</Text>
      <Text style={{ color: "#fff", fontSize: 12 }}>Duration: 12 Minutes • 120 kcal</Text>
    </View>
    
    <Image
      source={require("../assets/images/blank.png")}
      style={{ width: 120, height: 120, borderRadius: 12, marginLeft: 10 }}
      resizeMode="cover"
    />
  </View>
</View>


      {/* Articles & Tips */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.chart }]}>Articles & Tips</Text>
        <FlatList
          horizontal
          data={articles}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Pressable style={[styles.articleCard, { backgroundColor: theme.chart }]}>
              <Image source={item.image} style={styles.articleImage} />
              <Text style={styles.articleTitle}>{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "900",
  },
  subGreeting: {
    fontSize: 16,
    marginVertical: 5,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: -25,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
    width: (width - 60) / 4,
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  recommendCard: {
    width: 160,
    borderRadius: 15,
    marginRight: 15,
    padding: 10,
  },
  recommendImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  recommendTitle: {
    fontWeight: "700",
    marginTop: 5,
    color: "#fff",
  },
  recommendInfo: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  },
  weeklyImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginTop: 10,
  },
  articleCard: {
    width: 200,
    borderRadius: 15,
    marginRight: 15,
    padding: 10,
  },
  articleImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  articleTitle: {
    marginTop: 5,
    fontWeight: "700",
    color: "#fff",
  },
});
