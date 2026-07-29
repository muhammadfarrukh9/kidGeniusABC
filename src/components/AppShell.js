import React from "react";
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { theme } from "../theme";
import { backgrounds } from "../backgrounds";

export function Header({ title, onBack, right }) {
  return (
    <LinearGradient colors={[theme.colors.primary, theme.colors.primaryDark]} style={styles.header}>
      <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.backButton}>
        {onBack ? <Ionicons name="arrow-back" size={24} color="#fff" /> : null}
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>{right}</View>
    </LinearGradient>
  );
}

export function Screen({ children, title, onBack, right, colors = [theme.colors.sky, theme.colors.card], background = "blue" }) {
  const source = backgrounds[background] || backgrounds.blue;

  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      <ImageBackground source={source} resizeMode="cover" style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
        <View style={styles.backgroundWash} />
        <SafeAreaView style={styles.safe}>
          {title ? <Header title={title} onBack={onBack} right={right} /> : null}
          <View style={styles.body}>{children}</View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export function PrimaryButton({ label, onPress, color = theme.colors.primary, style }) {
  const scale = useSharedValue(1);
  const animate = (toValue) => {
    scale.value = withSpring(toValue, { damping: 12, stiffness: 260 });
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View style={[styles.buttonWrap, style, animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animate(0.96)}
        onPressOut={() => animate(1)}
        style={[styles.primaryButton, { backgroundColor: color }]}
      >
        <Text style={styles.primaryText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function StarPill() {
  return (
    <View style={styles.starPill}>
      <Text style={styles.star}>⭐</Text>
      <Text style={styles.starText}>125</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  backgroundImage: {
    flex: 1
  },
  backgroundImageStyle: {
    opacity: 0.98
  },
  backgroundWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.08)"
  },
  safe: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 16,
    zIndex: 1
  },
  header: {
    height: 62,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center"
  },
  headerRight: {
    width: 48,
    alignItems: "flex-end"
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: theme.radius.button,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#111827",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  buttonWrap: {
    alignSelf: "stretch"
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900"
  },
  starPill: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    minWidth: 72,
    height: 34,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  star: {
    fontSize: 18,
    marginRight: 4
  },
  starText: {
    color: theme.colors.text,
    fontWeight: "900"
  }
});
