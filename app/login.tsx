import { login } from "@/watermelon/collections/users.collection";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed: ", error);
      Alert.alert(
        "Login Failed",
        error instanceof Error
          ? error.message
          : "Something went wrong during login"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#ccc",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#aaa",
    marginRight: 5,
  },
  linkText: {
    color: "#03DAC6",
    fontWeight: "600",
  },
});
