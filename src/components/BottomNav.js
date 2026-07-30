import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

const items = [
  ["Home", "home"],
  ["Learn", "book"],
  ["Games", "game-controller"],
  ["Profile", "person-circle"]
];

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.nav}>
      {items.map(([label, icon]) => (
        <Pressable
          key={label}
          style={styles.item}
          onPress={() => {
            if (label === "Home") navigation.navigate("Home");
            if (label === "Learn") navigation.navigate("Learn");
            if (label === "Profile") navigation.navigate("Profile");
            if (label === "Games") navigation.navigate("Activity", { type: "balloon" });
          }}
        >
          <Ionicons name={icon} size={22} color={theme.colors.primary} />
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 76,
    borderColor: "rgba(199,210,254,0.9)",
    borderWidth: 1,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    paddingHorizontal: 8,
    shadowColor: "#111827",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  label: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "900"
  }
});
