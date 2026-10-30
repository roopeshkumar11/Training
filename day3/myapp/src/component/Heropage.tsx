import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Item = {
  id: number;
  name: string;
};

type CardProps = {
  title: string;
  count: number;
};

function Card({ title, count }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>Items: {count}</Text>
    </View>
  );
}

export default function Heropage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Learn React" },
    { id: 2, name: "Learn TypeScript" },
    { id: 3, name: "Build app" },
  ]);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "New Task",
    };

    setItems([...items, newItem]);
  };

  return (
    <View style={styles.container}>
      <Card title="My App" count={items.length} />

      {isLoggedIn ? (
        <Text style={styles.message}>Welcome back!</Text>
      ) : (
        <Text style={styles.message}>Please login first.</Text>
      )}

      <Button title={isLoggedIn ? "Logout" : "Login"} onPress={handleLogin} />

      <View style={styles.space}>
        <Button title="Add Item" onPress={addItem} />
      </View>

      {items.map((item) => (
        <Text key={item.id} style={styles.item}>
          {item.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginTop: 6,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  space: {
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    backgroundColor: "#e0e0e0",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
});
