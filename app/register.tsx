import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // temporary simulation
    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/100/000000/chat.png",
          }}
          style={styles.logo}
        />
        <Title style={styles.title}>Create Account</Title>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </Button>

        <Button onPress={() => router.push("/")} style={styles.linkButton}>
          Already have an account? Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#6200ee" },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  input: { marginBottom: 15 },
  button: { marginVertical: 10, paddingVertical: 5, borderRadius: 10 },
  linkButton: { marginTop: 5 },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
