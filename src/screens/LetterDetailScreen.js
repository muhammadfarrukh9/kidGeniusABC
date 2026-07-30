import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { Screen } from "../components/AppShell";
import { letterExamples, letters } from "../data/content";
import { theme } from "../theme";

const detailBackgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "blue"];

export default function LetterDetailScreen({ navigation, route }) {
  const letter = letters.find((item) => item.id === route.params?.letterId) || letters[0];
  const letterIndex = letters.findIndex((item) => item.id === letter.id);
  const previousLetter = letters[(letterIndex - 1 + letters.length) % letters.length];
  const nextLetter = letters[(letterIndex + 1) % letters.length];
  const background = detailBackgrounds[letterIndex % detailBackgrounds.length];
  const examples = letterExamples[letter.id] || [{ word: letter.word, emoji: letter.emoji }];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [speakingTarget, setSpeakingTarget] = useState(null);
  const selectedExample = examples[selectedIndex] || examples[0];

  useEffect(() => {
    setSelectedIndex(0);
    setSpeakingTarget(null);
    Speech.stop();
  }, [letter.id]);

  const speakLetter = () => {
    Speech.stop();
    setSpeakingTarget("letter");
    Speech.speak(letter.uppercase, {
      language: "en-US",
      pitch: 1.25,
      rate: 0.72,
      onDone: () => setSpeakingTarget(null),
      onStopped: () => setSpeakingTarget(null),
      onError: () => setSpeakingTarget(null)
    });
  };

  const speakWord = () => {
    Speech.stop();
    setSpeakingTarget("word");
    Speech.speak(selectedExample.word, {
      language: "en-US",
      pitch: 1.15,
      rate: 0.82,
      onDone: () => setSpeakingTarget(null),
      onStopped: () => setSpeakingTarget(null),
      onError: () => setSpeakingTarget(null)
    });
  };

  return (
    <Screen onBack={() => navigation.goBack()} background={background}>
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
        <Ionicons name="exit-outline" size={24} color={theme.colors.primary} />
      </Pressable>
      <View style={styles.topRow}>
        <Text style={[styles.bigLetter, { color: letter.color }]}>{letter.uppercase}</Text>
        <Text style={[styles.smallLetter, { color: letter.color }]}>{letter.lowercase}</Text>
      </View>
      <View style={styles.wordBox}>
        <View style={styles.soundSlot}>
          <Pressable
            accessibilityLabel={`Say letter ${letter.uppercase}`}
            style={[styles.sound, speakingTarget === "letter" && styles.soundSpeaking]}
            onPress={speakLetter}
          >
            <Ionicons name={speakingTarget === "letter" ? "volume-high" : "volume-medium-outline"} size={28} color={speakingTarget === "letter" ? "#fff" : theme.colors.primary} />
            {speakingTarget === "letter" ? <Text style={styles.speakingText}>Speaking</Text> : null}
          </Pressable>
        </View>
        <MovingEmoji emoji={selectedExample.emoji} word={selectedExample.word} />
        <View style={styles.soundSlot}>
          <Pressable
            accessibilityLabel={`Say ${selectedExample.word}`}
            style={[styles.sound, speakingTarget === "word" && styles.soundSpeaking]}
            onPress={speakWord}
          >
            <Ionicons name={speakingTarget === "word" ? "volume-high" : "volume-medium-outline"} size={28} color={speakingTarget === "word" ? "#fff" : theme.colors.primary} />
            {speakingTarget === "word" ? <Text style={styles.speakingText}>Speaking</Text> : null}
          </Pressable>
        </View>
      </View>
      <Text style={styles.word}>{selectedExample.word}</Text>
      <View style={styles.cards}>
        {examples.map((item, index) => (
          <Pressable
            key={item.word}
            style={[styles.card, selectedIndex === index && styles.activeCard]}
            onPress={() => setSelectedIndex(index)}
          >
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

function MovingEmoji({ emoji, word }) {
  const progress = useSharedValue(0);
  const lowerWord = word.toLowerCase();
  const isVehicleMotion =
    lowerWord.includes("van") ||
    lowerWord.includes("train") ||
    lowerWord.includes("car") ||
    lowerWord.includes("rocket") ||
    lowerWord.includes("airplane") ||
    lowerWord.includes("yacht");
  const isFloatingMotion =
    lowerWord.includes("balloon") ||
    lowerWord.includes("kite") ||
    lowerWord.includes("bird") ||
    lowerWord.includes("owl") ||
    lowerWord.includes("whale") ||
    lowerWord.includes("fish");

  useEffect(() => {
    progress.value = 0;
    if (isVehicleMotion) {
      progress.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
          withTiming(-1, { duration: 900, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      );
      return;
    }

    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: isFloatingMotion ? 1100 : 780, easing: Easing.inOut(Easing.quad) }),
        withTiming(-1, { duration: isFloatingMotion ? 1100 : 780, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, [isFloatingMotion, isVehicleMotion, progress, word]);

  const animatedStyle = useAnimatedStyle(() => {
    if (isVehicleMotion) {
      return { transform: [{ translateX: progress.value * 48 }, { translateY: Math.abs(progress.value) * -4 }, { rotate: `${progress.value * 2}deg` }] };
    }
    if (isFloatingMotion) {
      return { transform: [{ translateX: progress.value * 18 }, { translateY: Math.abs(progress.value) * -22 }, { rotate: `${progress.value * 4}deg` }] };
    }
    return { transform: [{ translateY: Math.abs(progress.value) * -18 }, { scale: 1 + Math.abs(progress.value) * 0.04 }] };
  });

  return <Animated.Text style={[styles.emoji, animatedStyle]}>{emoji}</Animated.Text>;
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
    width: 64,
    height: 50,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(79,70,229,0.18)",
    shadowColor: "#111827",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  soundSlot: {
    width: 86,
    alignItems: "center"
  },
  soundSpeaking: {
    width: 86,
    backgroundColor: theme.colors.secondary,
    borderColor: "rgba(255,255,255,0.8)"
  },
  speakingText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "900",
    marginTop: -2
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
  activeCard: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    transform: [{ scale: 1.04 }]
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
