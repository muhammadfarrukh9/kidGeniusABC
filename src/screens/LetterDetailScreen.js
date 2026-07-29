import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/AppShell";
import { letters } from "../data/content";
import { theme } from "../theme";

export default function LetterDetailScreen({ navigation, route }) {
  const letter = letters.find((item) => item.id === route.params?.letterId) || letters[0];
  const examples = letters.filter((item) => item.id !== letter.id).slice(0, 3);

  return (
    <Screen onBack={() => navigation.goBack()} background="bg3">
      <View style={styles.topRow}>
        <Text style={[styles.bigLetter, { color: letter.color }]}>{letter.uppercase}</Text>
        <Text style={[styles.smallLetter, { color: letter.color }]}>{letter.lowercase}</Text>
      </View>
      <View style={styles.wordBox}>
        <Pressable style={styles.sound}>
          <Ionicons name="volume-high" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.emoji}>{letter.emoji}</Text>
        <Pressable style={styles.sound}>
          <Ionicons name="volume-high" size={28} color="#fff" />
        </Pressable>
      </View>
      <Text style={styles.word}>{letter.word}</Text>
      <View style={styles.cards}>
        {[letter, ...examples].map((item) => (
          <Pressable key={item.id} style={styles.card} onPress={() => navigation.navigate("LetterDetail", { letterId: item.id })}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardWord}>{item.word}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.circle} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <Pressable style={styles.circle} onPress={() => navigation.navigate("Activity", { type: "trace" })}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
