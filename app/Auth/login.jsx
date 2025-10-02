import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";

export default function Login() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(""); // Track which input is focused

  const handleLogin = () => {
    console.log("Login with:", email, password);
    router.push("/Onboarding/indexStep2");
  };

  const getInputBackground = (inputName) => {
    if (focusedInput === inputName) {
      // When focused: lighter in dark, darker in light
      return isDark ? "#555" : "#ddd";
    } else {
      // Normal state
      return theme.text;
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo & Welcome */}
      <View style={styles.logoContainer}>
        <Image
          source={isDark ? require("../../assets/images/logo.png") : require("../../assets/images/logo2d.png")}
          style={styles.logo}
        />
        <Text style={[styles.welcomeText, { color: theme.text }]}>Welcome Back</Text>
        <Text style={[styles.loginSubText, { color: theme.text }]}>
          Log in to continue your fitness journey
        </Text>
      </View>

      {/* Form in sporty rectangle */}
      <View style={[styles.formCard]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: getInputBackground("email"),
              color: isDark ? "#fff" : "#000",
            },
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
            {
              backgroundColor: getInputBackground("password"),
              color: isDark ? "#fff" : "#000",
            },
          ]}
          placeholder="Password"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        {/* Sign Up as button */}
        <Pressable style={styles.signupButton} onPress={() => router.push("/Signup")}>
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
    elevation: 10,
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
  signupButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5722",
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
