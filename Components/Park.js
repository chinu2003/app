import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";

// const PARKING_LOCATION = { latitude: 16.9932844, longitude: 73.3285311 };
const PARKING_LOCATION = { latitude: 19.1181449, longitude: 72.8588207 };

const Park = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Your Location: {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : "Fetching..."}

      </Text>
      <Button 
        title="Book Parking Slot" 
        onPress={() => Alert.alert(isWithinRange ? "Success" : "Warning", 
                                  isWithinRange ? "You can book the parking slot!" : "You are too far from the parking location.")} 
      />
    </View>
  );
};

export default Park;