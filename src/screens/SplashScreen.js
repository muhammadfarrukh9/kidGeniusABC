import React, { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../theme";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Onboarding"), 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={[theme.colors.sky, theme.colors.card]} style={styles.container}>
      <Image source={require("../../assets/images/splash_screen.png")} style={styles.splashImage} resizeMode="contain" />
      <Text style={styles.loading}>Loading...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  splashImage: {
    width: "100%",
    height: "78%"
  },
  loading: {
    color: theme.colors.primary,
    fontWeight: "900",
    marginTop: 10
  }
});
