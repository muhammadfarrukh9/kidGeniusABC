import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, StarPill } from "../components/AppShell";
import BottomNav from "../components/BottomNav";
import { homeTiles } from "../data/content";
import { theme } from "../theme";

export default function HomeScreen({ navigation }) {
  return (
    <Screen colors={[theme.colors.sky, theme.colors.card]} background="bg1">
      <View style={styles.page}>
        <View style={styles.homeCard}>
          <View style={styles.hero}>
            <Text style={styles.avatar}>👦</Text>
            <Text style={styles.greeting}>Hi, Buddy!</Text>
            <StarPill />
          </View>

          <View style={styles.grid}>
            {homeTiles.map((item) => (
              <Pressable
                key={item.title}
                style={styles.tile}
                onPress={() =>
                  item.route
                    ? navigation.navigate(item.route)
                    : navigation.navigate("Activity", { type: item.activity })
                }
              >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={38} color="#fff" />
                </View>
                <Text style={styles.tileText}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <BottomNav navigation={navigation} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-between",
    gap: 14,
    paddingTop: 58,
    paddingBottom: 10
  },
  homeCard: {
    overflow: "hidden",
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.9)",
    shadowColor: "#111827",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5
  },
  hero: {
    height: 66,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  avatar: {
    fontSize: 30
  },
  greeting: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10
  },
  tile: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: 20
  },
  iconBox: {
    width: 86,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#111827",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  tileText: {
    color: theme.colors.text,
    fontSize: 13.5,
    fontWeight: "900",
    marginTop: 7,
    textAlign: "center"
  }
});
