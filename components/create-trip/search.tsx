import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
});

const SearchScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [tripData, setTripData] = useState<ITripData>({
    name: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    photoRef: "",
    url: "",
    traveler: {
      id: 1,
      title: "Just Me",
      description: "A solo traveler in exploration",
      icon: "🛩",
      people: "1 people",
    },
    time: {
      startDate: null,
      endDate: null,
      totalNoOfDays: 0,
    },
    budget: {
      id: 1,
      title: "Cheap",
      description: "Stay conscious of costs",
      icon: "💵",
    },
  });

  useEffect(() => {
    if (tripData.name !== "") {
      navigation.navigate("select-traveler", tripData);
    }
  }, [tripData]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["top"]} style={styles.container}>
        {/* <Text
          onPress={() =>
            setTripData({
              name: "data.description",
              coordinates: {
                lat: 1,
                lng: 1,
              },
              photoRef: "details?.photos[0]?.photo_reference",
              url: "details?.url",
              traveler: {
                id: 1,
                title: "Just Me",
                description: "A solo traveler in exploration",
                icon: "🛩",
                people: "1 people",
              },
              time: {
                startDate: null,
                endDate: null,
                totalNoOfDays: 0,
              },
              budget: {
                id: 1,
                title: "Cheap",
                description: "Stay conscious of costs",
                icon: "💵",
              },
            })
          }
        >
          Click here to continue
        </Text> */}
        <GooglePlacesAutocomplete
          placeholder="Search cities..."
          fetchDetails={true}
          textInputProps={{
            autoFocus: true,
          }}
          onFail={(error) => console.log(error)}
          onPress={(data, details: any = null) => {
            setTripData({
              name: data.description,
              coordinates: details?.geometry.location,
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url,
              traveler: {
                id: 1,
                title: "Just Me",
                description: "A solo traveler in exploration",
                icon: "🛩",
                people: "1 people",
              },
              time: {
                startDate: null,
                endDate: null,
                totalNoOfDays: 0,
              },
              budget: {
                id: 1,
                title: "Cheap",
                description: "Stay conscious of costs",
                icon: "💵",
              },
            });
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: "en",
          }}
          styles={{
            textInputContainer: {
              padding: 4,
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 10,
            },
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;
