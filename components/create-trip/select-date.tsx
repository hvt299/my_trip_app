import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import { useEffect, useState } from "react";
import moment, { Moment } from "moment";

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

const SelectDateScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "select-date"> = useRoute();

  const [startDate, setStartDate] = useState<Moment|null>();
  const [endDate, setEndDate] = useState<Moment|null>();

  function notifyMessage(msg: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  const [tripData, setTripData] = useState<ITripData>({
    name: route.params?.name,
    coordinates: route.params?.coordinates,
    photoRef: route.params?.photoRef,
    url: route.params?.url,
    traveler: route.params?.traveler,
    time: {
      startDate: null,
      endDate: null,
      totalNoOfDays: 0,
    },
    budget: route.params?.budget,
  });

  const onDateChange = (date: Date, type: ChangedDate) => {
    // console.log(date, type);
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    if (startDate == null) {
      notifyMessage("Please select Start Date");
      return;
    }
    
    if (endDate == null) {
      notifyMessage("Please select End Date");
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");
    if (Number.isNaN(totalNoOfDays)) {
      notifyMessage("Please select End Date");
      return;
    }
    
    navigation.navigate("select-budget", tripData);
  };

  useEffect(() => {
    if (endDate == null) {
      return;
    }

    const totalNoOfDays = endDate?.diff(startDate, "days");
    if (Number.isNaN(totalNoOfDays)) {
      return;
    }

    setTripData({
      name: route.params?.name,
      coordinates: route.params?.coordinates,
      photoRef: route.params?.photoRef,
      url: route.params?.url,
      traveler: route.params?.traveler,
      time: {
        startDate: startDate,
        endDate: endDate,
        totalNoOfDays: totalNoOfDays + 1,
      },
      budget: route.params?.budget,
    });
  }, [endDate])

  // useEffect(() => {
  //   console.log(tripData);
  // }, [tripData])

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.title}>Travel Dates</Text>
      </View>

      <View style={{ flex: 1 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: "#333",
          }}
          selectedDayTextStyle={{
            color: "#fff",
          }}
        />
      </View>

      <View style={styles.control}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#333" }]}
          onPress={onDateSelectionContinue}
        >
          <Text style={[styles.button_text, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectDateScreen;
