import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onboarding } from "../data/content";
import { PrimaryButton } from "../components/AppShell";
import { theme } from "../theme";
import { backgrounds } from "../backgrounds";

export default function OnboardingScreen({ navigation }) {
  const [page, setPage] = useState(0);
  const item = onboarding[page];

  const next = () => {
    if (page === onboarding.length - 1) navigation.replace("Home");
    else setPage(page + 1);
  };

  return (
    <LinearGradient colors={[theme.colors.sky, theme.colors.sky]} style={styles.container}>
      <ImageBackground source={backgrounds.onboarding} resizeMode="stretch" style={styles.background} imageStyle={styles.backgroundImage}>
        <View style={styles.content}>
          <PrimaryButton label={item.cta} onPress={next} color={page === 2 ? theme.colors.secondary : theme.colors.primary} />
          <View style={styles.dots}>
            {onboarding.map((entry, index) => (
              <View key={entry.title} style={[styles.dot, page === index && styles.activeDot]} />
            ))}
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: 30
  },
  dots: {
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#C7D2FE"
  },
  activeDot: {
    width: 20,
    backgroundColor: theme.colors.primary
  }
});
