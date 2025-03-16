// Header.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Header = ({ onMenuPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menuButton} >
          ☰
        </Text>{" "}
        {/* <Text style={styles.menuButton} onPress={() => navigation.goBack()}>
        🔙
        </Text>{" "} */}
        {/* Menu icon */}
      </TouchableOpacity>
      <Text style={styles.title}>Smart Car Parking System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    // backgroundColor: '#ffd700',
    // backgroundColor: "#007BFF",
    backgroundColor: "#FFD95F",
    elevation: 2,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  menuButton: {
    fontSize: 24,
  },
});

export default Header;
