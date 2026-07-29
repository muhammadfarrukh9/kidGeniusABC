import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
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
    <LinearGradient colors={[theme.colors.sky, theme.colors.card]} style={styles.container}>
      <ImageBackground source={backgrounds.onboarding} resizeMode="cover" style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <View style={styles.artBox}>
            <Text style={[styles.artwork, page === 1 && styles.traceLetter]}>{item.artwork}</Text>
            {page === 1 ? <Text style={styles.hand}>👆</Text> : null}
          </View>
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
    justifyContent: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 26,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  title: {
    color: theme.colors.text,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 14
  },
  artBox: {
    height: 330,
    alignItems: "center",
    justifyContent: "center"
  },
  artwork: {
    fontSize: 76,
    textAlign: "center"
  },
  traceLetter: {
    fontSize: 210,
    color: theme.colors.primary,
    fontWeight: "900"
  },
  hand: {
    fontSize: 54,
    marginTop: -72,
    marginLeft: 130
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
