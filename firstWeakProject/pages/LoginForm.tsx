import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import Home from "./Home";

const Loginform = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setIslogin] = useState(false);

  const handleLogin = () => {
    if (name.trim() && password.trim()) {
      setIslogin(true);
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  if (islogin) {
    return <Home onLogout={() => setIslogin(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.btn}>
          <Button title="Login" color="#c52c2c" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
};

export default Loginform;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c52c2c",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    color: "#000",
  },
  btn: {
    marginTop: 10,
    borderRadius: 10,
  },
});
