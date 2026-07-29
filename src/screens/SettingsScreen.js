import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/AppShell";
import { theme } from "../theme";

export default function SettingsScreen({ navigation }) {
  const [music, setMusic] = useState(true);
  const [effects, setEffects] = useState(true);

  return (
    <Screen title="Settings" onBack={() => navigation.goBack()} background="bg6">
      <View style={styles.list}>
        <Row icon="musical-notes" label="Music" control={<Switch value={music} onValueChange={setMusic} />} />
        <Row icon="volume-high" label="Sound Effects" control={<Switch value={effects} onValueChange={setEffects} />} />
        <Row icon="person" label="Voice" value="Child" />
        <Row icon="globe" label="Language" value="English" />
        <Pressable onPress={() => navigation.navigate("About")}>
          <Row icon="apps" label="More Apps" value="" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("About")}>
          <Row icon="information-circle" label="About Us" value="" />
        </Pressable>
      </View>
    </Screen>
  );
}

function Row({ icon, label, value, control }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={22} color={theme.colors.primary} />
      <Text style={styles.label}>{label}</Text>
      {control || (
        <>
          <Text style={styles.value}>{value}</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden"
  },
  row: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: 12
  },
  label: {
    flex: 1,
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 15
  },
  value: {
    color: theme.colors.muted,
    fontWeight: "800"
  }
});
