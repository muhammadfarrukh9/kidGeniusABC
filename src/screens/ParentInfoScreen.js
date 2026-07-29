import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, PrimaryButton } from "../components/AppShell";
import { theme } from "../theme";

export default function ParentInfoScreen({ navigation }) {
  const items = [
    ["shield-checkmark", "Safe & Secure"],
    ["remove-circle", "No Ads"],
    ["happy", "Age Appropriate"],
    ["school", "Educational Content"]
  ];

  return (
    <Screen title="For Parents" onBack={() => navigation.goBack()} background="blue">
      <View style={styles.list}>
        {items.map(([icon, text]) => (
          <View key={text} style={styles.row}>
            <Ionicons name={icon} size={28} color={theme.colors.secondary} />
            <Text style={styles.label}>{text}</Text>
          </View>
        ))}
      </View>
      <PrimaryButton label="Learn More" color={theme.colors.primary} onPress={() => {}} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: 20,
    gap: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  label: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900"
  }
});
