import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import moment from "moment";

type TabParamList = {
  discover: { fullName?: string };
  mytrip: { fullName?: string };
  profile: { fullName?: string };
  setting: { fullName?: string };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    color: "gray",
    fontWeight: 300,
    textAlign: "center",
    marginBottom: 10,
  },
  control: {
    width: "50%",
    // gap: 15,
    // marginBottom: 30,
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
  add_icon: {
    position: "absolute",
    bottom: 60,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
});

const MyTripScreen = () => {
  const navigation: any = useNavigation();
  // const route: RouteProp<RootStackParamList, "home"> = useRoute();
  const route = useRoute<RouteProp<TabParamList, "mytrip">>();
  const { fullName } = route.params ?? {};

  const [userTrips, setUserTrips] = useState<any[]>([]);

  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    // const latestTrip = JSON.parse(userTrips[0].tripData);
    setLoading(false);
  };

  function notifyMessage(msg: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  const handleDeleteTrip = (docID: string) => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete this trip? This process cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "UserTrips", docID));
              setUserTrips((prev) =>
                prev.filter((trip) => trip.docID !== docID)
              );
              notifyMessage("This trip has been deleted.");
            } catch (error) {
              notifyMessage("Delete failed.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <AntDesign
          name="user"
          size={28}
          color="black"
          onPress={() => navigation.navigate("profile")}
        />
      </View>
      {/* {loading && <ActivityIndicator size={"large"} color={"#000"} />} */}
      {userTrips?.length == 0 ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={GetMyTrips} />
          }
        >
          <View style={styles.body}>
            <FontAwesome6 name="location-dot" size={28} color="black" />
            <Text style={styles.heading}>No trips planned yet</Text>
            <Text style={styles.description}>
              Looks like its time to plan a new travel experinece! Get Started
              below
            </Text>

            <View style={styles.control}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#333" }]}
                onPress={() => navigation.navigate("search")}
              >
                <Text style={[styles.button_text, { color: "#fff" }]}>
                  Start a new trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={{ marginBottom: 10 }}>
            {JSON.parse(userTrips[userTrips.length - 1].tripData).photoRef ? (
              <Image
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .photoRef +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }}
              />
            ) : (
              <Image
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
                source={require("../../assets/images/Wallpaper-Danang-Vietnam-Tourism.jpg")}
              />
            )}
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                {userTrips[userTrips.length - 1].tripPlan.tripDetails.location}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#333", fontWeight: 300 }}>
                  {moment(
                    JSON.parse(userTrips[userTrips.length - 1].tripData).time
                      .startDate
                  ).format("DD MMM yyyy")}
                </Text>
                <Text style={{ color: "#333", fontWeight: 300 }}>
                  {
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .traveler.icon
                  }{" "}
                  {
                    JSON.parse(userTrips[userTrips.length - 1].tripData)
                      .traveler.title
                  }
                </Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#333" }]}
                onPress={() =>
                  navigation.navigate(
                    "trip-details",
                    JSON.stringify(userTrips[userTrips.length - 1])
                  )
                }
              >
                <Text style={[styles.button_text, { color: "#fff" }]}>
                  See your plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={userTrips}
            keyExtractor={(trip) => trip.docID + ""}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("trip-details", JSON.stringify(item))
                  }
                  onLongPress={() => handleDeleteTrip(item.docID)}
                >
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* <Image
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 15,
                  }}
                  source={require("../../assets/images/Wallpaper-Hoi An-Vietnam-Tourism.jpg")}
                /> */}
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 15,
                      }}
                      source={{
                        uri:
                          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                          JSON.parse(item.tripData).photoRef +
                          "&key=" +
                          process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                      }}
                    />
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        {item.tripPlan.tripDetails.location}
                      </Text>
                      <Text style={{ color: "#333", fontWeight: 300 }}>
                        {moment(
                          JSON.parse(item.tripData).time.startDate
                        ).format("DD MMM yyyy")}
                      </Text>
                      <Text style={{ color: "#333", fontWeight: 300 }}>
                        {JSON.parse(item.tripData).traveler.icon}{" "}
                        {JSON.parse(item.tripData).traveler.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={GetMyTrips} />
            }
          />
        </View>
      )}
      {userTrips?.length != 0 ? (
        <FontAwesome6
          style={styles.add_icon}
          name="add"
          size={24}
          color="black"
          onPress={() => navigation.navigate("search")}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default MyTripScreen;
