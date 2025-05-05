import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  card_icon: {
    fontSize: 24,
  },
  card_heading: {
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
  },
  card_description: {
    fontSize: 16,
    fontWeight: 500,
  },
  control: {
    width: "100%",
    marginVertical: 10,
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
});

const ReviewTripScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "select-budget"> = useRoute();

  const [tripData, setTripData] = useState<ITripData>({
    name: route.params?.name,
    coordinates: {
      lat: route.params?.coordinates.lat,
      lng: route.params?.coordinates.lng,
    },
    photoRef: route.params?.photoRef,
    url: route.params?.url,
    traveler: route.params?.traveler,
    time: route.params?.time,
    budget: route.params?.budget,
  });

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Review your trip</Text>
        <Text style={styles.heading}>
          Before generating your trip, please review your selection
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.card}>
          <Text style={styles.card_icon}>📍</Text>
          <View>
            <Text style={styles.card_heading}>Destination</Text>
            <Text style={styles.card_description}>{tripData.name}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.card_icon}>🗓</Text>
          <View>
            <Text style={styles.card_heading}>Travel Date</Text>
            <Text style={styles.card_description}>
              {moment(tripData.time.startDate).format("DD MMM")} to{" "}
              {moment(tripData.time.endDate).format("DD MMM")} (
              {tripData.time.totalNoOfDays} days)
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.card_icon}>🚎</Text>
          <View>
            <Text style={styles.card_heading}>Who is Traveling</Text>
            <Text style={styles.card_description}>
              {tripData.traveler.title}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.card_icon}>💰</Text>
          <View>
            <Text style={styles.card_heading}>Budget</Text>
            <Text style={styles.card_description}>{tripData.budget.title}</Text>
          </View>
        </View>
      </View>

      <View style={styles.control}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#333" }]}
          onPress={() => navigation.navigate("generate-trip", tripData)}
        >
          <Text style={[styles.button_text, { color: "#fff" }]}>Build My Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewTripScreen;
