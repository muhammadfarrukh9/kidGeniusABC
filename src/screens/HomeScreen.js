import React from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, StarPill } from "../components/AppShell";
import BottomNav from "../components/BottomNav";
import { homeTiles } from "../data/content";
import { theme } from "../theme";

export default function HomeScreen({ navigation }) {
  return (
    <Screen right={<StarPill />} colors={[theme.colors.sky, theme.colors.card]} background="bg1">
      <View style={styles.hero}>
        <Text style={styles.avatar}>👦</Text>
        <Text style={styles.greeting}>Hi, Buddy!</Text>
        <StarPill />
        <Pressable style={styles.heroIcon} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings" size={21} color={theme.colors.primary} />
        </Pressable>
      </View>
      <FlatList
        data={homeTiles}
        numColumns={3}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tile}
            onPress={() =>
              item.route
                ? navigation.navigate(item.route)
                : navigation.navigate("Activity", { type: item.activity })
            }
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={34} color="#fff" />
            </View>
            <Text style={styles.tileText}>{item.title}</Text>
          </Pressable>
        )}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
        {[
          ["Trace", "trace"],
          ["Balloon", "balloon"],
          ["Train", "train"],
          ["Fishing", "fishing"],
          ["Result", "result"],
          ["Offline", "offline"],
          ["Soon", "comingSoon"],
          ["Parents", "parents"],
          ["Exit", "exit"]
        ].map(([label, type]) => (
          <Pressable
            key={type}
            style={styles.quick}
            onPress={() =>
              type === "parents"
                ? navigation.navigate("ParentInfo")
                : navigation.navigate("Activity", { type })
            }
          >
            <Text style={styles.quickText}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 66,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10
  },
  avatar: {
    fontSize: 34
  },
  greeting: {
    flex: 1,
    color: "#fff",
    fontSize: 19,
    fontWeight: "900"
  },
  heroIcon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {
    paddingVertical: 16
  },
  tile: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: 18
  },
  iconBox: {
    width: 76,
    height: 76,
    borderRadius: theme.radius.tile,
    alignItems: "center",
    justifyContent: "center"
  },
  tileText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6,
    textAlign: "center"
  },
  quickRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 12
  },
  quick: {
    minWidth: 76,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  quickText: {
    color: theme.colors.primary,
    fontWeight: "900",
    fontSize: 12
  }
});
