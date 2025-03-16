
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Parking from "./Components/Parking";
import ParkingSlot from "./Components/ParkingSlot";
import Header from "./Components/Header";
import Book from "./Components/Book";
import Park from "./Components/Park";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Move the Header inside the Stack.Navigator if you want it to appear on all screens */}
      <Stack.Navigator
        initialRouteName="Parking"
        screenOptions={{
          header: () => <Header />, // Use the Header as a custom header for all screens
        }}
      >
        <Stack.Screen
          name="Parking"
          component={Parking}
          options={{ title: "Parking" }} // Optional: Set a title for the screen
        />
        <Stack.Screen
          name="ParkingSlot"
          component={ParkingSlot}
          options={{ title: "Parking Slot" }} // Optional: Set a title for the screen
        />
        <Stack.Screen
          name="Park"
          component={Park}
          options={{ title: "Park" }} // Optional: Set a title for the screen
        />
        <Stack.Screen name="Book" component={Book} options={{ title: "Book Slot" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
