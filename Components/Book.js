import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const Book = ({ route, navigation }) => {
  const selectedSlot = route?.params?.selectedSlot || "Not Selected";
  const [name, setName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [carNo, setCarNo] = useState("");
  const [selectedTime, setSelectedTime] = useState(30);
  const [amount, setAmount] = useState(0);

  // Define pricing per time slot
  const pricing = {
    30: 50,
    60: 100,
    120: 150,
    180: 200,
    240: 300,
    300: 350,
    360: 400,
  };

  // Update amount when time changes
  useEffect(() => {
    setAmount(pricing[selectedTime]);
  }, [selectedTime]);

  const handlePayment = () => {
    alert(`Payment of ₹${amount} successful for slot ${selectedSlot}`);
    navigation.goBack();
  };

  const handleCancel = () => {
    alert("Booking canceled.");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Car Image */}
      <Image
        source={require("../assets/car.png")}
        style={styles.carImage}
      />

      {/* Title */}
      <Text style={styles.title}>Book Now</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Name Input */}
      <Text style={styles.label}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={name}
        onChangeText={setName}
      />

      {/* Car Number Input */}
      <Text style={styles.label}>Enter Car No.</Text>
      <TextInput
        style={styles.input}
        placeholder="MH12 AB 1234"
        value={carNo}
        onChangeText={setCarNo}
      />

      {/* Mobile Number Input */}
      <Text style={styles.label}>Enter Mobile No.</Text>
      <TextInput
        style={styles.input}
        placeholder="+91**********"
        value={mobNo}
        onChangeText={setMobNo}
      />

      {/* Timeline Selection */}
      <Text style={styles.label}>Select Time (minutes)</Text>
      <View style={styles.timelineContainer}>
        {Object.keys(pricing).map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime == time && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(Number(time))}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Slot */}
      <View style={styles.slotContainer}>
        <Text style={styles.slotText}>Selected Slot:</Text>
        <Text style={styles.slotBox}>{selectedSlot}</Text>
      </View>

      {/* Amount */}
      <Text style={styles.amountText}>Amount to be Paid: ₹{amount}</Text>

      {/* Buttons - Cancel & Pay Now */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = {
  container: {
    padding: 25,
    alignItems: "center",
    backgroundColor: "#FFEFC8",
  },
  carImage: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: 2,
    backgroundColor: "#ccc",
    width: "80%",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFD95F",
    borderRadius: 5,
    marginBottom: 15,
  },
  timelineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  timeButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectedTime: {
    backgroundColor: "#FFD95F",
    color: "white",
  },
  slotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FFF5D1",
    padding: 10,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 18,
    marginRight: 10,
  },
  slotBox: {
    backgroundColor: "#FFD95F",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  amountText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  payButton: {
    backgroundColor: "#D70654",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
};

export default Book;
