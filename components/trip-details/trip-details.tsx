import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HotelCard from "./HotelCard";
import PlaceCard from "./PlaceCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    // marginTop: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
  control: {
    minWidth: 30,
    maxWidth: 100,
    // marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  button_icon: {
    marginRight: 10,
  },
  button_text: {
    color: "#333",
  },
  right_icon: {
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});

const TripDetailScreen = () => {
  const route: RouteProp<RootStackParamList, "trip-details"> = useRoute();
  const trip: any = route.params;
  const [tripDetails, setTripDetails] = useState<any>();

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  useEffect(() => {
    setTripDetails(JSON.parse(trip));
    // console.log(JSON.parse(tripDetails.tripData).photoRef);
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          style={styles.right_icon}
          name="explore"
          size={24}
          color="black"
          onPress={() => navigation.navigate("map", trip)}
        />
      ),
    });
  }, []);

  return (
    tripDetails && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: 330,
          }}
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              JSON.parse(tripDetails.tripData).photoRef +
              "&key=" +
              process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {tripDetails.tripPlan.tripDetails.location}
          </Text>
          <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              {moment(JSON.parse(tripDetails.tripData).time.startDate).format(
                "DD MMM yyyy"
              )}
            </Text>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              -{" "}
              {moment(JSON.parse(tripDetails.tripData).time.endDate).format(
                "DD MMM yyyy"
              )}
            </Text>
          </View>
          <Text style={{ color: "#333", fontWeight: 300 }}>
            {JSON.parse(tripDetails.tripData).traveler.icon}{" "}
            {JSON.parse(tripDetails.tripData).traveler.title}
          </Text>

          {/* Flight Info */}
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "lightgray",
              padding: 10,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>
                🛩 Flights
              </Text>
              <View style={styles.control}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#333" }]}
                >
                  <Text style={[styles.button_text, { color: "#fff" }]}>
                    Book here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ color: "#333", fontWeight: 300 }}>
              Airline: {tripDetails.tripPlan.flightDetails.arrivalCity}
            </Text>
            <Text style={{ color: "#333", fontWeight: 300 }}>
              Price:{" "}
              {tripDetails.tripPlan.flightDetails.estimatedFlightPrice.amount}{" "}
              {tripDetails.tripPlan.flightDetails.estimatedFlightPrice.currency}
            </Text>
          </View>

          {/* Hotel List */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
              🏨 Hotel Recommendation
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={tripDetails.tripPlan.hotelOptions}
              renderItem={({ item }) => {
                return <HotelCard item={item} />;
              }}
            />
          </View>

          {/* Trip Day Planner Info */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
              🏕 Plan Details
            </Text>

            {tripDetails.tripPlan.dayPlans.map((dayPlan: any, index: any) => (
              <View key={index}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Day {dayPlan.day}
                </Text>

                {dayPlan.activities.map((activity: any, index: any) => (
                  <PlaceCard key={index} activity={activity} index={index} />
                ))}
              </View>
            ))}

            {/* <FlatList
              showsVerticalScrollIndicator={false}
              data={tripDetails.tripPlan.dayPlans}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>
                      Day {item.day}
                    </Text>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={item.activities}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              padding: 10,
                              borderRadius: 15,
                              marginVertical: 10,
                              borderColor: "#333",
                              backgroundColor: "#e9e9e9",
                            }}
                          >
                            <Image
                              style={{
                                width: "100%",
                                height: 120,
                                borderRadius: 15,
                              }}
                              source={require("../../assets/images/Wallpaper-Hoi An-Vietnam-Tourism.jpg")}
                            />
                            <View style={{ marginTop: 5 }}>
                              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                                {item.placeName}
                              </Text>
                              <Text style={{ color: "#333", fontWeight: 300 }}>
                                {item.placeDetails}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{ marginTop: 5, gap: 5, width: "85%" }}
                                >
                                  <Text style={{ fontSize: 14 }}>
                                    🎟️ Ticket Price:{" "}
                                    <Text style={{ fontWeight: 500 }}>
                                      {item.ticketPricing.amount}{" "}
                                      {item.ticketPricing.currency}
                                    </Text>
                                  </Text>
                                  <Text style={{ fontSize: 14 }}>
                                    ⏰ Time to Travel:{" "}
                                    <Text style={{ fontWeight: 500 }}>
                                      {item.timeToTravel}
                                    </Text>
                                  </Text>
                                </View>
                                <View style={styles.control}>
                                  <TouchableOpacity
                                    style={[
                                      styles.button,
                                      { backgroundColor: "#333" },
                                    ]}
                                  >
                                    <Ionicons
                                      name="navigate"
                                      size={24}
                                      color="#fff"
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                );
              }}
            /> */}
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default TripDetailScreen;
