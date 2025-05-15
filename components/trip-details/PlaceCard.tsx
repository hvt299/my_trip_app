import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { GetGeoCoordinates, GetPhotoRef } from "../../services/GooglePlaceAPI";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  control: {
    minWidth: 30,
    maxWidth: 100,
    flexDirection: "row",
    gap: 6,
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
  right_icon: {
    borderRadius: 30,
  },
});

export default function PlaceCard({
  activity,
  index,
}: {
  activity: any;
  index: any;
}) {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [photoRef, setPhotoRef] = useState<any>();
  const [coordinates, setCoordinates] = useState<any>();

  const [destination, setDestination] = useState<any>();
  const [articleList, setArticleList] = useState<any[]>([]);

  useEffect(() => {
    GetGooglePhotoRef();
    GetGoogleGeoCoordinates();
    searchDestination(activity.placeName);
    searchArticles(activity.placeName);
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(activity.placeName);
    setPhotoRef(result.results[0].photos[0].photo_reference);
  };

  const GetGoogleGeoCoordinates = async () => {
    const result = await GetGeoCoordinates(activity.placeName);
    setCoordinates(result);
  };

  const searchDestination = async (name: String) => {
    if (activity) {
      const keyword = name.trim();
      const destinationRef = collection(db, "Destination");
      const q = query(
        destinationRef,
        where("name", ">=", keyword),
        where("name", "<", keyword + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDestination(results[0]);
    }
  };

  // const searchArticles = async (name: String) => {
  //   if (activity) {
  //     const keyword = name.trim();
  //     const destinationRef = collection(db, "Article");
  //     const q = query(
  //       destinationRef,
  //       where("destination", ">=", keyword),
  //       where("destination", "<", keyword + "\uf8ff")
  //     );

  //     const querySnapshot = await getDocs(q);
  //     const results = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setArticleList(results);
  //   }
  // };

  const searchArticles = async (name: string) => {
    if (name) {
      const keyword = name.trim();
      const destinationRef = collection(db, "Article");
      const q = query(
        destinationRef,
        where("destination", ">=", keyword),
        where("destination", "<", keyword + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);

        const promises = querySnapshot.docs.map(async (doc) => {
          const fullName = await getUserFullNameByEmail(doc.data().userEmail);
          return {
            id: doc.id,
            ...doc.data(),
            author: fullName !== "" ? fullName : "Unknown",
          };
        });

        const results = await Promise.all(promises);

        setArticleList(results);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm bài báo: ", error);
      }
    }
  };

  const getUserFullNameByEmail = async (email: string) => {
    try {
      const userRef = collection(db, "UserAccount");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const fullName = userData.fullName;
        return fullName;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  };

  return (
    <View
      key={index}
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
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
      />
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {activity.placeName}
        </Text>
        <Text style={{ color: "#333", fontWeight: "300" }}>
          {activity.placeDetails}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: 5, gap: 5, width: "80%" }}>
            <Text style={{ fontSize: 14 }}>
              🎟️ Ticket Price:{" "}
              <Text style={{ fontWeight: "500" }}>
                {activity.ticketPricing.amount}{" "}
                {activity.ticketPricing.currency}
              </Text>
            </Text>
            <Text style={{ fontSize: 14 }}>
              ⏰ Time to Travel:{" "}
              <Text style={{ fontWeight: "500" }}>{activity.timeToTravel}</Text>
            </Text>
          </View>
          <View style={styles.control}>
            {destination && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#333" }]}
                onPress={() => navigation.navigate("destination", destination)}
              >
                <MaterialIcons
                  style={styles.right_icon}
                  name="info-outline"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
            {articleList.length > 0 && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#333" }]}
                onPress={() => navigation.navigate("article-list", articleList)}
              >
                <MaterialIcons
                  style={styles.right_icon}
                  name="newspaper"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
