import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/AppShell";
import { theme } from "../theme";

export default function ProfileScreen({ navigation }) {
  return (
    <Screen onBack={() => navigation.goBack()} right={<Ionicons name="refresh" size={22} color="#fff" />} background="bg5">
      <View style={styles.profile}>
        <Text style={styles.avatar}>👦</Text>
        <Text style={styles.name}>Buddy</Text>
        <Text style={styles.level}>Level 3</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>⭐ 125</Text>
          <Text style={styles.stat}>🪙 50</Text>
        </View>
      </View>
      <Text style={styles.section}>My Badges</Text>
      <View style={styles.badges}>
        {["💰", "👑", "🏅"].map((badge) => (
          <Text key={badge} style={styles.badge}>{badge}</Text>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: 22,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  avatar: {
    fontSize: 86
  },
  name: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  level: {
    color: theme.colors.muted,
    fontWeight: "800"
  },
  stats: {
    flexDirection: "row",
    gap: 34,
    marginTop: 20
  },
  stat: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  section: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 22,
    marginBottom: 12
  },
  badges: {
    flexDirection: "row",
    gap: 20
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF7ED",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 38
  }
});
