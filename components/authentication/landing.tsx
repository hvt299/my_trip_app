import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
// import appIcon from "../../assets/images/Galactic-Empire-emblem.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    flex: 10,
    width: "100%",
  },
  body: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    // borderWidth: 1,
    // borderColor: "red",
  },
  content: {
    flex: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    color: "gray",
    fontWeight: 300,
    textAlign: "center",
  },
  control: {
    flex: 2,
    width: "100%",
    gap: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  button_icon: {
    marginRight: 10,
  },
  button_text: {
    color: "#333",
    fontSize: 16,
  },
  footer: {
    flex: 1,
    color: "gray",
    fontSize: 12,
  },
});

const LandingScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Wallpaper-Ha Noi-Vietnam-Tourism.jpg")}
      ></Image>

      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.heading}>MyTrip - AI Travel Planner</Text>
          <Text style={styles.description}>
            Generate a personalized itinerary for your trip in seconds. Simply
            input your travel preferences for a seamless experience.
          </Text>
        </View>

        {/* <View style={{ width: "100%", flex: 1 }}>
          <Divider
            style={{
              height: 1,
              backgroundColor: "lightgray",
              marginVertical: 15,
            }}
          />
        </View> */}

        <View style={styles.control}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#333" }]}
            onPress={() => navigation.navigate("login")}
          >
            {/* <AntDesign style={styles.button_icon} name="google" size={24} color="#fff" /> */}
            <Text style={[styles.button_text, { color: "#fff" }]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>Privacy Policy • Term of Service</Text>
    </View>
  );
};

export default LandingScreen;
