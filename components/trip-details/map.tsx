import { StyleSheet, Text, View } from "react-native";

import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import * as Location from "expo-location";
import "react-native-get-random-values";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import PlaceCard from "./PlaceCard";
import { GetGeoCoordinates } from "../../services/GooglePlaceAPI";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  back_icon: {
    zIndex: 1,
    position: "absolute",
    top: 15,
    left: 20,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});

const MapScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "map"> = useRoute();
  const loc: any = route.params;

  const mapRef = useRef<any>();
  const focusMap = () => {
    if (allCoordinates.length > 0 && allCoordinates[0]?.coordinates) {
      const place = {
        latitude: allCoordinates[0].coordinates.latitude,
        longitude: allCoordinates[0].coordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      mapRef.current?.animateCamera(
        { center: place, zoom: 10 },
        { duration: 3000 }
      );
    }
  };

  const [tripDetails, setTripDetails] = useState<any>();

  const [region, setRegion] = useState<Region>({
    latitude: 11.9404192,
    longitude: 108.4583132,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Oops permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});

    // setRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.005,
    //   longitudeDelta: 0.005,
    // });
  };

  const [allCoordinates, setAllCoordinates] = useState<any[]>([]);

  const GetGoogleGeoCoordinates = async (placeName: string) => {
    const result = await GetGeoCoordinates(placeName);
    if (result) {
      setAllCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        {
          name: placeName,
          coordinates: {
            latitude: result?.lat,
            longitude: result?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        },
      ]);
    }
  };

  function getAllCoordinates() {
    const placeNames: string[] = [];
    if (tripDetails) {
      tripDetails.tripPlan.dayPlans.forEach((dayPlan: any) => {
        dayPlan.activities.forEach((activity: any) => {
          placeNames.push(activity.placeName);
        });
      });
      placeNames.forEach((name) => GetGoogleGeoCoordinates(name));
    }
  }

  useEffect(() => {
    userLocation();
    setTripDetails(JSON.parse(loc));
  }, []);

  useEffect(() => {
    getAllCoordinates();
  }, [tripDetails]);

  useEffect(() => {
    setTimeout(focusMap, 500);
  }, [allCoordinates]);

  return (
    tripDetails &&
    allCoordinates && (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.container}>
          <Ionicons
            style={styles.back_icon}
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />

          <MapView
            key={`map_${allCoordinates.length}`}
            style={styles.map}
            initialRegion={region}
            region={region}
            provider={PROVIDER_DEFAULT}
            // onRegionChangeComplete={(region) => setRegion(region)}
            zoomEnabled={true}
            followsUserLocation
            showsMyLocationButton
            mapType="standard"
            showsUserLocation
            ref={mapRef}
          >
            {allCoordinates.map((val, index) => (
              <Marker
                title={val.name}
                key={index}
                coordinate={val.coordinates}
                description={
                  val.coordinates.latitude + " | " + val.coordinates.longitude
                }
              ></Marker>
            ))}
          </MapView>
        </View>
        {/* {allCoordinates.map((val, index) => (
          <View key={index}>
            <Text>
              {val.name}: {val.coordinates.latitude}, {val.coordinates.longitude}
            </Text>
          </View>
        ))} */}
      </SafeAreaView>
    )
  );
};

export default MapScreen;
