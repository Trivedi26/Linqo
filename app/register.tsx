import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { supabase } from "../src/services/supabaseClient";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!fullName || !lastName || !phone || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    // 1️⃣ Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Insert extra profile data into 'profiles' table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user?.id,
      full_name: fullName,
      last_name: lastName,
      phone: phone,
    });

    setLoading(false);

    if (profileError) {
      setError(profileError.message);
    } else {
      router.replace("/"); // Navigate to Login page
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
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
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
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

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            loading={loading}
          >
            Register
          </Button>

          <Button onPress={() => router.push("/")} style={styles.linkButton}>
            Already have an account? Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
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
