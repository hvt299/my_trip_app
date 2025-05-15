import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const DestinationScreen = () => {
  const route: RouteProp<RootStackParamList, "destination"> = useRoute();
  const des: any = route.params;
  const [destination, setDestination] = useState<any>();

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  useEffect(() => {
    setDestination(des);
  }, []);

  return (
    destination && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: 330,
          }}
          source={{
            uri: destination.imageURL,
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            gap: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {destination.name} - {destination.city}
          </Text>
          <Text style={{ fontSize: 16, color: "#333", fontWeight: 300 }}>
            {destination.content}
          </Text>
        </View>
      </ScrollView>
    )
  );
};

export default DestinationScreen;
