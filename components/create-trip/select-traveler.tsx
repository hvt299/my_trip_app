import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#e8e8e8",
  },
  card_heading: {
    fontSize: 16,
    fontWeight: "500",
  },
  card_description: {
    color: "gray",
    fontWeight: 300,
  },
  card_icon: {
    fontSize: 40,
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

const SelectTravelerScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "select-traveler"> = useRoute();

  const [selectTravelerList, setSelectTravelerList] = useState([
    {
      id: 1,
      title: "Just Me",
      description: "A solo traveler in exploration",
      icon: "🛩",
      people: "1 people",
    },
    {
      id: 2,
      title: "A Couple",
      description: "Two travelers in tandem",
      icon: "🥂",
      people: "2 peoples",
    },
    {
      id: 3,
      title: "Family",
      description: "A group of fun-loving adventurers",
      icon: "🏡",
      people: "3 to 5 peoples",
    },
    {
      id: 4,
      title: "Friends",
      description: "A bunch of thrill-seekers",
      icon: "⛵",
      people: "5 to 10 peoples",
    },
  ]);
  const [selectedTraveler, setSelectedTraveler] = useState({
    id: 1,
    title: "Just Me",
    description: "A solo traveler in exploration",
    icon: "🛩",
    people: "1 people",
  });

  const [tripData, setTripData] = useState<ITripData>({
    name: route.params?.name,
    coordinates: route.params?.coordinates,
    photoRef: route.params?.photoRef,
    url: route.params?.url,
    traveler: selectedTraveler,
    time: route.params?.time,
    budget: route.params?.budget,
  });

  useEffect(() => {
    setTripData({
      name: route.params?.name,
      coordinates: route.params?.coordinates,
      photoRef: route.params?.photoRef,
      url: route.params?.url,
      traveler: selectedTraveler,
      time: route.params?.time,
      budget: route.params?.budget,
    });
  }, [selectedTraveler]);

  // useEffect(() => {
  //   console.log(tripData);
  // }, [tripData])

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.title}>Who's Traveling?</Text>
        <Text style={styles.heading}>Choose your travelers</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectTravelerList}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => setSelectedTraveler(item)}>
              <View
                style={[
                  styles.card,
                  selectedTraveler.id === item.id && {
                    borderWidth: 2,
                    borderColor: "gray",
                  },
                ]}
              >
                <View>
                  <Text style={styles.card_heading}>{item.title}</Text>
                  <Text style={styles.card_description}>
                    {item.description}
                  </Text>
                </View>

                <Text style={styles.card_icon}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.control}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#333" }]}
          onPress={() => navigation.navigate("select-date", tripData)}
        >
          <Text style={[styles.button_text, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectTravelerScreen;
