import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen, PrimaryButton } from "../components/AppShell";
import { theme } from "../theme";

export default function AboutScreen({ navigation }) {
  return (
    <Screen title="About" onBack={() => navigation.goBack()} colors={[theme.colors.sky, theme.colors.card]} background="bg7">
      <View style={styles.card}>
        <Text style={styles.logo}>KID{"\n"}GENIUS{"\n"}ABC</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.made}>Made with love for kids</Text>
        <PrimaryButton label="Rate Us" color={theme.colors.primary} onPress={() => {}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    color: theme.colors.primary,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900",
    textAlign: "center"
  },
  version: {
    color: theme.colors.text,
    fontWeight: "900",
    marginTop: 28
  },
  made: {
    color: theme.colors.text,
    fontWeight: "800",
    marginVertical: 18
  }
});
