import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

const SelectBudgetScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "select-budget"> = useRoute();

  const [selectBudgetList, setSelectBudgetList] = useState([
    {
      id: 1,
      title: "Cheap",
      description: "Stay conscious of costs",
      icon: "💵",
    },
    {
      id: 2,
      title: "Moderate",
      description: "Keep costs on the average side",
      icon: "💰",
    },
    {
      id: 3,
      title: "Luxury",
      description: "Don't worry about cost",
      icon: "💸",
    },
  ]);
  const [selectedBudget, setSelectedBudget] = useState({
    id: 1,
    title: "Cheap",
    description: "Stay conscious of costs",
    icon: "💵",
  });

  const [tripData, setTripData] = useState<ITripData>({
    name: route.params?.name,
    coordinates: route.params?.coordinates,
    photoRef: route.params?.photoRef,
    url: route.params?.url,
    traveler: route.params?.traveler,
    time: route.params?.time,
    budget: selectedBudget,
  });

  useEffect(() => {
    setTripData({
      name: route.params?.name,
      coordinates: route.params?.coordinates,
      photoRef: route.params?.photoRef,
      url: route.params?.url,
      traveler: route.params?.traveler,
      time: route.params?.time,
      budget: selectedBudget,
    });
  }, [selectedBudget]);

  // useEffect(() => {
  //   console.log(tripData);
  // }, [tripData]);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.title}>Budget</Text>
        <Text style={styles.heading}>Choose spending habits for your trip</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectBudgetList}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => setSelectedBudget(item)}>
              <View
                style={[
                  styles.card,
                  selectedBudget.id === item.id && {
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
          onPress={() => navigation.navigate("review-trip", tripData)}
        >
          <Text style={[styles.button_text, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectBudgetScreen;
