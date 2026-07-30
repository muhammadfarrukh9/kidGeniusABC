import React, { useMemo, useRef, useState } from "react";
import { PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Canvas, Circle, Group, Path, Skia } from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import { Screen, PrimaryButton } from "../components/AppShell";
import BottomNav from "../components/BottomNav";
import { activities, letters } from "../data/content";
import { theme } from "../theme";

const tracePath = Skia.Path.MakeFromSVGString("M108 304 L174 88 L240 304 M132 232 L216 232");
const traceDots = [
  ["1", 108, 304],
  ["2", 174, 88],
  ["3", 240, 304]
];

function makeStrokePath(points) {
  const path = Skia.Path.Make();
  if (!points.length) return path;
  path.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => path.lineTo(point.x, point.y));
  return path;
}

export default function ActivityScreen({ navigation, route }) {
  const activity = activities[route.params?.type || "trace"] || activities.trace;

  return (
    <Screen
      title={activity.title}
      onBack={() => navigation.goBack()}
      colors={[theme.colors.sky, theme.colors.card]}
      background={activity.background || "bg4"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.prompt}>{activity.prompt}</Text>
        <ActivityBody activity={activity} navigation={navigation} />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </Screen>
  );
}

function ActivityBody({ activity, navigation }) {
  if (activity.mode === "trace") return <TraceCard navigation={navigation} />;
  if (activity.mode === "phonics") return <PhonicsCard />;
  if (activity.mode === "flashcards") return <FlashCard />;
  if (activity.mode === "choices" || activity.mode === "quiz") return <ChoiceGrid choices={activity.choices} />;
  if (activity.mode === "missing") return <MissingLetter choices={activity.choices} />;
  if (activity.mode === "balloon") return <BalloonGame />;
  if (activity.mode === "train") return <TrainGame />;
  if (activity.mode === "fishing") return <FishingGame />;
  if (activity.mode === "result") return <Result />;
  if (activity.mode === "rewards") return <Rewards />;
  if (activity.mode === "progress") return <Progress />;
  if (activity.mode === "achievements") return <Achievements />;
  if (activity.mode === "offline") return <OfflineDownloads />;
  if (activity.mode === "noInternet") return <MessageArt emoji="🐼" button="Try Again" />;
  if (activity.mode === "comingSoon") return <MessageArt emoji="🚀" button="Stay Tuned" />;
  if (activity.mode === "share") return <MessageArt emoji="👦 👧" button="Share Now" color={theme.colors.secondary} />;
  if (activity.mode === "exit") return <MessageArt emoji="🦁" button="Close App" />;
  return null;
}

function TraceCard({ navigation }) {
  const [strokes, setStrokes] = useState([]);
  const [activeStroke, setActiveStroke] = useState([]);
  const activeStrokeRef = useRef([]);
  const drawnPaths = useMemo(
    () => [...strokes, activeStroke].filter((stroke) => stroke.length > 1).map(makeStrokePath),
    [activeStroke, strokes]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          const nextStroke = [{ x: locationX, y: locationY }];
          activeStrokeRef.current = nextStroke;
          setActiveStroke(nextStroke);
        },
        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          const nextStroke = [...activeStrokeRef.current, { x: locationX, y: locationY }];
          activeStrokeRef.current = nextStroke;
          setActiveStroke(nextStroke);
        },
        onPanResponderRelease: () => {
          const finishedStroke = activeStrokeRef.current;
          setStrokes((items) => (finishedStroke.length > 1 ? [...items, finishedStroke] : items));
          activeStrokeRef.current = [];
          setActiveStroke([]);
        },
        onPanResponderTerminate: () => {
          const finishedStroke = activeStrokeRef.current;
          setStrokes((items) => (finishedStroke.length > 1 ? [...items, finishedStroke] : items));
          activeStrokeRef.current = [];
          setActiveStroke([]);
        }
      }),
    []
  );

  return (
    <View style={[styles.centerPanel, styles.tracePanel]}>
      <View style={styles.traceArea} {...panResponder.panHandlers}>
        <Canvas style={styles.traceCanvas}>
          <Group>
            {tracePath ? <Path path={tracePath} color="#DBEAFE" style="stroke" strokeWidth={48} strokeCap="round" strokeJoin="round" /> : null}
            {tracePath ? <Path path={tracePath} color={theme.colors.primary} style="stroke" strokeWidth={5} strokeCap="round" strokeJoin="round" /> : null}
            <Circle cx={108} cy={304} r={12} color={theme.colors.primary} />
            <Circle cx={174} cy={88} r={12} color={theme.colors.primary} />
            <Circle cx={240} cy={304} r={12} color={theme.colors.primary} />
            {drawnPaths.map((path, index) => (
              <Path key={index} path={path} color={theme.colors.accent} style="stroke" strokeWidth={16} strokeCap="round" strokeJoin="round" />
            ))}
          </Group>
        </Canvas>
        {traceDots.map(([number, left, top]) => (
          <View key={number} pointerEvents="none" style={[styles.traceDot, { left: left - 15, top: top - 15 }]}>
            <Text style={styles.traceDotText}>{number}</Text>
          </View>
        ))}
        <Text style={styles.traceHand}>👆</Text>
        <View pointerEvents="none" style={styles.traceHint}>
          <Text style={styles.traceHintText}>Trace here</Text>
        </View>
      </View>
      <View style={styles.row}>
        <PrimaryButton label="Undo" color={theme.colors.primary} style={styles.rowButton} onPress={() => setStrokes((items) => items.slice(0, -1))} />
        <PrimaryButton label="Clear" color={theme.colors.accent} style={styles.rowButton} onPress={() => { activeStrokeRef.current = []; setStrokes([]); setActiveStroke([]); }} />
        <PrimaryButton label="Next" color={theme.colors.secondary} style={styles.rowButton} onPress={() => navigation.navigate("Activity", { type: "phonics" })} />
      </View>
    </View>
  );
}

function PhonicsCard() {
  return (
    <View style={styles.centerPanel}>
      <Text style={styles.phonicsLetter}>A</Text>
      <Text style={styles.badge}>/ae/</Text>
      <Text style={styles.largeEmoji}>🐊</Text>
      <View style={styles.row}>
        <PrimaryButton label="Listen" color={theme.colors.secondary} style={styles.rowButton} onPress={() => {}} />
        <PrimaryButton label="Repeat" color={theme.colors.primary} style={styles.rowButton} onPress={() => {}} />
      </View>
    </View>
  );
}

function FlashCard() {
  return (
    <View style={styles.centerPanel}>
      <Text style={styles.cardCount}>1/26</Text>
      <Text style={styles.phonicsLetter}>A</Text>
      <Text style={styles.largeEmoji}>🍎</Text>
      <Text style={styles.word}>Apple</Text>
    </View>
  );
}

function ChoiceGrid({ choices }) {
  return (
    <View style={styles.choiceGrid}>
      {choices.map((choice, index) => (
        <Pressable key={choice} style={[styles.choice, index === 0 && styles.correctChoice]}>
          <Text style={[styles.choiceText, index === 0 && styles.correctText]}>{choice}</Text>
          {index === 0 ? <Ionicons name="checkmark-circle" size={22} color="#fff" style={styles.check} /> : null}
        </Pressable>
      ))}
    </View>
  );
}

function MissingLetter({ choices }) {
  return (
    <>
      <View style={styles.sequence}>
        {["A", "B", "_", "D"].map((item) => (
          <Text key={item} style={styles.sequenceBox}>{item}</Text>
        ))}
      </View>
      <ChoiceGrid choices={choices} />
    </>
  );
}

function BalloonGame() {
  return (
    <View style={styles.gameScene}>
      {["M", "K", "M", "N"].map((letter, index) => (
        <View key={`${letter}${index}`} style={[styles.balloon, { top: 34 + index * 46, left: 24 + (index % 3) * 92 }]}>
          <Text style={styles.balloonText}>{letter}</Text>
        </View>
      ))}
      <Text style={styles.kid}>👦</Text>
    </View>
  );
}

function TrainGame() {
  return (
    <View style={styles.gameScene}>
      <Text style={styles.train}>🚂</Text>
      <View style={styles.trainLetters}>
        {["A", "B", "D"].map((item) => (
          <Text key={item} style={styles.trainBlock}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

function FishingGame() {
  return (
    <View style={[styles.gameScene, styles.water]}>
      <Text style={styles.rod}>🎣</Text>
      {["P", "R", "B"].map((item, index) => (
        <Text key={item} style={[styles.fish, { left: 60 + index * 78, top: 100 + index * 34 }]}>{item}</Text>
      ))}
    </View>
  );
}

function Rewards() {
  return (
    <View style={styles.centerPanel}>
      <LottieView source={require("../../assets/animations/star-celebration.json")} autoPlay loop style={styles.lottie} />
      <Text style={styles.largeEmoji}>💰</Text>
      <Text style={styles.rewardText}>⭐ 125    🪙 50</Text>
      <Text style={styles.word}>Treasure unlocked!</Text>
    </View>
  );
}

function Result() {
  return (
    <View style={styles.centerPanel}>
      <LottieView source={require("../../assets/animations/star-celebration.json")} autoPlay loop={false} style={styles.lottie} />
      <Text style={styles.messageEmoji}>🦁🏆</Text>
      <Text style={styles.rewardText}>Score 8/10</Text>
      <View style={styles.row}>
        <PrimaryButton label="Home" color={theme.colors.primary} style={styles.rowButton} onPress={() => {}} />
        <PrimaryButton label="Next" color={theme.colors.secondary} style={styles.rowButton} onPress={() => {}} />
      </View>
    </View>
  );
}

function Progress() {
  return (
    <View style={styles.list}>
      {letters.slice(0, 5).map((letter, index) => (
        <View key={letter.id} style={styles.progressRow}>
          <Text style={[styles.progressLetter, { backgroundColor: letter.color }]}>{letter.id}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${40 + index * 12}%` }]} />
          </View>
          <Text>⭐⭐⭐</Text>
        </View>
      ))}
    </View>
  );
}

function Achievements() {
  const rows = [
    ["🏅", "Alphabet Master", "Learn all letters"],
    ["🎖️", "Tracing Pro", "Complete 30 tracing"],
    ["🏆", "Quiz Champion", "Score 100 in quizzes"],
    ["⭐", "Fast Learner", "Learn 20 letters"]
  ];
  return (
    <View style={styles.list}>
      {rows.map(([emoji, title, subtitle]) => (
        <View key={title} style={styles.achievement}>
          <Text style={styles.achievementIcon}>{emoji}</Text>
          <View>
            <Text style={styles.achievementTitle}>{title}</Text>
            <Text style={styles.achievementSub}>{subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function OfflineDownloads() {
  return (
    <View style={styles.list}>
      {[
        ["Alphabet Lessons", "120 MB"],
        ["Tracing Pack", "80 MB"],
        ["Games Pack", "150 MB"],
        ["Stories", "100 MB"]
      ].map(([name, size]) => (
        <View key={name} style={styles.downloadRow}>
          <View>
            <Text style={styles.achievementTitle}>{name}</Text>
            <Text style={styles.achievementSub}>{size}</Text>
          </View>
          <Ionicons name="download" size={23} color="#2563eb" />
        </View>
      ))}
      <PrimaryButton label="Download All" onPress={() => {}} />
    </View>
  );
}

function MessageArt({ emoji, button, color = theme.colors.primary }) {
  return (
    <View style={styles.centerPanel}>
      <Text style={styles.messageEmoji}>{emoji}</Text>
      <PrimaryButton label={button} color={color} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  prompt: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 14
  },
  centerPanel: {
    flex: 1,
    minHeight: 420,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  tracePanel: {
    minHeight: 0,
    paddingVertical: 18,
    justifyContent: "flex-start"
  },
  traceArea: {
    width: 320,
    height: 360,
    alignItems: "center",
    justifyContent: "center"
  },
  traceCanvas: {
    width: 320,
    height: 340
  },
  traceA: {
    fontSize: 300,
    lineHeight: 330,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "#3157d5",
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 0 }
  },
  traceDot: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3
  },
  traceDotText: {
    color: "#fff",
    fontWeight: "900"
  },
  traceHand: {
    position: "absolute",
    fontSize: 42,
    right: 34,
    top: 126,
    zIndex: 2
  },
  traceHint: {
    position: "absolute",
    left: 22,
    top: 16,
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  traceHintText: {
    color: theme.colors.primary,
    fontWeight: "900",
    fontSize: 12
  },
  row: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 12
  },
  rowButton: {
    flex: 1
  },
  phonicsLetter: {
    color: "#EF4444",
    fontSize: 140,
    lineHeight: 160,
    fontWeight: "900"
  },
  badge: {
    position: "absolute",
    right: 20,
    top: 22,
    color: "#be123c",
    backgroundColor: "#FFE4EC",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontWeight: "900"
  },
  largeEmoji: {
    fontSize: 105
  },
  lottie: {
    position: "absolute",
    top: 18,
    width: 150,
    height: 150
  },
  cardCount: {
    alignSelf: "flex-end",
    color: theme.colors.text,
    fontWeight: "900"
  },
  word: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  choiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
    paddingTop: 20
  },
  choice: {
    width: "43%",
    aspectRatio: 1.4,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  correctChoice: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary
  },
  choiceText: {
    color: theme.colors.accent,
    fontSize: 56,
    fontWeight: "900"
  },
  correctText: {
    color: "#fff"
  },
  check: {
    position: "absolute",
    right: 8,
    top: 8
  },
  sequence: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 18
  },
  sequenceBox: {
    width: 62,
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    color: theme.colors.text,
    fontWeight: "900",
    backgroundColor: theme.colors.card
  },
  gameScene: {
    minHeight: 430,
    borderRadius: theme.radius.card,
    overflow: "hidden",
    backgroundColor: theme.colors.sky,
    borderWidth: 1,
    borderColor: "#E0F2FE"
  },
  balloon: {
    position: "absolute",
    width: 72,
    height: 92,
    borderRadius: 36,
    backgroundColor: "#ec4899",
    alignItems: "center",
    justifyContent: "center"
  },
  balloonText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900"
  },
  kid: {
    position: "absolute",
    right: 22,
    bottom: 20,
    fontSize: 92
  },
  train: {
    fontSize: 100,
    marginTop: 220,
    marginLeft: 18
  },
  trainLetters: {
    position: "absolute",
    flexDirection: "row",
    gap: 8,
    bottom: 58,
    left: 100
  },
  trainBlock: {
    width: 62,
    height: 62,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 36,
    fontWeight: "900"
  },
  water: {
    backgroundColor: "#7DD3FC"
  },
  rod: {
    fontSize: 70,
    margin: 16
  },
  fish: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 28,
    fontWeight: "900"
  },
  rewardText: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginVertical: 16
  },
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  progressLetter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "900"
  },
  progressBar: {
    flex: 1,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.border,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#86EFAC"
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4
  },
  achievementIcon: {
    fontSize: 35
  },
  achievementTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  achievementSub: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  downloadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7
  },
  messageEmoji: {
    fontSize: 130,
    marginBottom: 24,
    textAlign: "center"
  }
});
