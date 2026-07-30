import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/AppShell";
import { letterExamples, letters } from "../data/content";
import { theme } from "../theme";

export default function LetterDetailScreen({ navigation, route }) {
  const letter = letters.find((item) => item.id === route.params?.letterId) || letters[0];
  const letterIndex = letters.findIndex((item) => item.id === letter.id);
  const previousLetter = letters[(letterIndex - 1 + letters.length) % letters.length];
  const nextLetter = letters[(letterIndex + 1) % letters.length];
  const examples = letterExamples[letter.id] || [{ word: letter.word, emoji: letter.emoji }];
  const mainExample = examples[0];

  return (
    <Screen onBack={() => navigation.goBack()} background="bg3">
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
        <Ionicons name="exit-outline" size={24} color={theme.colors.primary} />
      </Pressable>
      <View style={styles.topRow}>
        <Text style={[styles.bigLetter, { color: letter.color }]}>{letter.uppercase}</Text>
        <Text style={[styles.smallLetter, { color: letter.color }]}>{letter.lowercase}</Text>
      </View>
      <View style={styles.wordBox}>
        <Pressable style={styles.sound}>
          <Ionicons name="volume-high" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.emoji}>{mainExample.emoji}</Text>
        <Pressable style={styles.sound}>
          <Ionicons name="volume-high" size={28} color="#fff" />
        </Pressable>
      </View>
      <Text style={styles.word}>{mainExample.word}</Text>
      <View style={styles.cards}>
        {examples.map((item) => (
          <Pressable key={item.word} style={styles.card}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardWord}>{item.word}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.circle} onPress={() => navigation.replace("LetterDetail", { letterId: previousLetter.id })}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <Pressable style={styles.circle} onPress={() => navigation.replace("LetterDetail", { letterId: nextLetter.id })}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    position: "absolute",
    top: 42,
    left: 12,
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    shadowColor: "#111827",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 34
  },
  bigLetter: {
    fontSize: 92,
    fontWeight: "900"
  },
  smallLetter: {
    fontSize: 80,
    fontWeight: "900"
  },
  wordBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18
  },
  sound: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center"
  },
  emoji: {
    fontSize: 118
  },
  word: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center"
  },
  card: {
    width: "30%",
    minWidth: 98,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 22,
    padding: 10,
    alignItems: "center"
  },
  cardEmoji: {
    fontSize: 34
  },
  cardWord: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 12,
    marginTop: 4
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  }
});
