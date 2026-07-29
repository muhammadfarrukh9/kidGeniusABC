import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/AppShell";
import { letters } from "../data/content";
import BottomNav from "../components/BottomNav";
import { theme } from "../theme";

export default function LearnScreen({ navigation }) {
  return (
    <Screen title="Learn ABC" onBack={() => navigation.goBack()} background="bg2">
      <FlatList
        data={letters}
        numColumns={5}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.letterButton, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate("LetterDetail", { letterId: item.id })}
          >
            <Text style={styles.letter}>{item.uppercase}</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.locked}>
            <Ionicons name="lock-closed" size={24} color="#9ca3af" />
          </View>
        }
      />
      <BottomNav navigation={navigation} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingTop: 10,
    alignItems: "center"
  },
  letterButton: {
    width: 58,
    height: 58,
    margin: 7,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  letter: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900"
  },
  locked: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    alignSelf: "center",
    marginTop: 4
  }
});
