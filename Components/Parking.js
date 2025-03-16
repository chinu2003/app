import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Parking = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Smart Parking</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ParkingSlot')}
        // onPress={() => navigation.navigate('Park')}
      >
        <Text style={styles.buttonText}>View Parking Slots</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Parking;
