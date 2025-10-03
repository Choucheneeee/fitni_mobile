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

export default function Signup() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleLogin = () => {
    console.log("Login with:", email, password);
    router.push("/Onboarding/indexStep2");
  };

  const getInputBackground = (inputName) => {
    if (focusedInput === inputName) {
      return isDark ? "#333" : "#E8F0FE"; // soft focus colors
    }
    return theme.secondary; // neutral when unfocused
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo & Welcome */}
      <View style={styles.logoContainer}>
        <Image
          source={
            isDark
              ? require("../../assets/images/logo.png")
              : require("../../assets/images/logo2d.png")
          }
          style={styles.logo}
        />
        <Text style={[styles.welcomeText, { color: theme.text }]}>
          Create Account
        </Text>
        <Text style={[styles.loginSubText, { color: theme.text }]}>
          Let’s start!
        </Text>
      </View>

      {/* Sporty card form */}
      <View
        style={[
          styles.formCard,
          { backgroundColor: theme.card, shadowColor: theme.primary },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: getInputBackground("email"),
              color: isDark ? "#fff" : "#222",
            },
          ]}
          placeholder="Email"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: getInputBackground("phone"),
              color: isDark ? "#fff" : "#222",
            },
          ]}
          placeholder="Phone"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          onFocus={() => setFocusedInput("phone")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: getInputBackground("password"),
              color: isDark ? "#fff" : "#222",
            },
          ]}
          placeholder="Password"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: getInputBackground("cpassword"),
              color: isDark ? "#fff" : "#222",
            },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          secureTextEntry
          value={cpassword}
          onChangeText={setcPassword}
          onFocus={() => setFocusedInput("cpassword")}
          onBlur={() => setFocusedInput("")}
        />

        {/* Login button */}
        {/* <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable> */}

        {/* Sign Up button */}
        <Pressable
          style={[styles.signupButton, { backgroundColor: theme.chart }]}
          onPress={() => router.push("/Auth/login")}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  loginSubText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  formCard: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  signupButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
