import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useTheme } from "../../components/ThemeContext";

// Default girl image
const DEFAULT_GIRL = require("../../assets/images/girl.png");

export default function CompleteProfile() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    console.log({ firstName, lastName, email, phone, profileImage });
    router.push("home");
  };

  const getInputBackground = (inputName) => {
    if (focusedInput === inputName) {
      return isDark ? "#555" : "#ddd";
    }
    return theme.text;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Complete Your Profile
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Fill in your information to continue
      </Text>

      <View style={[styles.formCard]}>
        {/* Profile Image */}
        <Pressable onPress={pickImage} style={styles.imagePicker}>
          <Image
            source={profileImage ? { uri: profileImage } : DEFAULT_GIRL}
            style={styles.profileImage}
          />
          {/* Camera Icon Overlay */}
          <View style={styles.cameraIconContainer}>
            <MaterialIcons name="camera-alt" size={24} color="#fff" />
          </View>
        </Pressable>

        {/* Name & Last Name */}
        <TextInput
          style={[
            styles.input,
            { backgroundColor: getInputBackground("firstName"), color: isDark ? "#fff" : "#1E1E1E" },
          ]}
          placeholder="First Name"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFocusedInput("firstName")}
          onBlur={() => setFocusedInput("")}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: getInputBackground("lastName"), color: isDark ? "#fff" : "#1E1E1E" },
          ]}
          placeholder="Last Name"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setFocusedInput("lastName")}
          onBlur={() => setFocusedInput("")}
        />

        {/* Email & Phone */}
        <TextInput
          style={[
            styles.input,
            { backgroundColor: getInputBackground("email"), color: isDark ? "#fff" : "#1E1E1E" },
          ]}
          placeholder="Email"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: getInputBackground("phone"), color: isDark ? "#fff" : "#1E1E1E" },
          ]}
          placeholder="Phone"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          onFocus={() => setFocusedInput("phone")}
          onBlur={() => setFocusedInput("")}
        />

        {/* Continue Button */}
        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 25,
    opacity: 0.7,
  },
  formCard: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#7C4DFF",
    borderRadius: 16,
    padding: 5,
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    elevation: 3,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C4DFF",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
