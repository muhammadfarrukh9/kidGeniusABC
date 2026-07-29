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
    height: 62,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    paddingBottom: 4
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 3
  },
  label: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: "800"
  }
});
