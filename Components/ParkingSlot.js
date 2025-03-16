import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { w3cwebsocket as W3CWebSocket } from "websocket"; // WebSocket client

// const PARKING_LOCATION = { latitude: 19.1181449, longitude: 72.8588207 };
const PARKING_LOCATION = { latitude: 17.01706194618706, longitude: 73.33585630398036 };
 

const ESP8266_IP = "192.168.232.215";  // Change this to your ESP8266's local IP 

const WS_URL = `ws://${ESP8266_IP}:8080/`;

const ParkingSlot = () => {
  const navigation = useNavigation();
  const [selectedFloor, setSelectedFloor] = useState("1 Floor");
  const [userLocation, setUserLocation] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [slotStatus, setSlotStatus] = useState({}); // Stores real-time slot status

  const parkingSlots = ["A-1", "A-2", "A-3", "A-4"];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert("Permission Denied", "Allow location access to book parking.");
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setUserLocation(coords);
      setIsWithinRange(getDistance(coords, PARKING_LOCATION) <= 3000);
    })();
  }, []);

  useEffect(() => {
    const client = new W3CWebSocket(WS_URL);

    client.onopen = () => {
      console.log("Connected to WebSocket!");
    };

    client.onmessage = (message) => {
      console.log("WebSocket Data:", message.data);
      try {
        const data = JSON.parse(message.data);
        setSlotStatus({
          "A-1": data.Sensor1,
          "A-2": data.Sensor2,
          "A-3": data.Sensor3,
          "A-4": data.Sensor4,
        });
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    client.onclose = () => {
      console.log("WebSocket Disconnected!");
    };

    return () => client.close();
  }, []);

  const handleBooking = (slotId) => {
    if (isWithinRange) {
      navigation.navigate("Book", { selectedSlot: slotId });
    } else {
      Alert.alert("Warning", "You are too far from the parking location. Try within 3km.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.floorContainer}>
        <Text style={styles.floorText}>Parking Slots</Text>
        <Picker
          selectedValue={selectedFloor}
          onValueChange={(itemValue) => setSelectedFloor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="1 Floor" value="1 Floor" />
          <Picker.Item label="2 Floor" value="2 Floor" />
        </Picker>
      </View>

      <Text style={styles.entryText}>ENTRY ↓</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {parkingSlots.map((slot) => {
          const status = slotStatus[slot];
          let backgroundColor = "#B8D576"; // Green (Available)
          let buttonText = "BOOK";
          let showButton = true;

          if (status === "PRESENT") {
            backgroundColor = "red"; // Occupied
            showButton = false;
          } else if (status === "BOOKED") {
            backgroundColor = "yellow"; // Already booked
            showButton = false;
            buttonText = "BOOKED";
          }

          return (
            <View key={slot} style={styles.slotContainer}>
              <View style={[styles.slotBox, { backgroundColor }]}>
                <Text style={styles.slotText}>{slot}</Text>
                {showButton && (
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBooking(slot)}
                  >
                    <Text style={styles.bookButtonText}>{buttonText}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Text style={styles.entryText}>EXIT ↓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEFC8",
  },
  floorContainer: {
    paddingHorizontal: 16,
    textAlign: "center",
    marginTop: 15,
    alignItems: "center",
  },
  floorText: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: 150,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    alignItems: "center",
  },
  entryText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  gridContainer: {
    padding: 9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  slotContainer: {
    width: "48%",
    marginBottom: 10,
  },
  slotBox: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    padding: 29,
    alignItems: "center",
  },
  slotText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: "#D70654",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ParkingSlot;
