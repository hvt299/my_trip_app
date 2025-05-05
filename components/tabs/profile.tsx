import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 10,
  },
  form: {
    gap: 15,
    marginBottom: 15,
  },
  form_input_icon: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
  },
  form_input: {
    flex: 1,
  },
  control: {
    width: "100%",
    gap: 15,
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

const ProfileScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<RouteProp<TabParamList, "profile">>();
  const { fullName } = route.params ?? {};

  const [fName, setfName] = useState(fullName);
  const [currentfName, setCurrentfName] = useState(fullName);
  const user = auth.currentUser;

  function notifyMessage(msg: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  const updateFName = async () => {
    Keyboard.dismiss();

    if (!fName) {
      notifyMessage("Please enter your full name");
      return;
    }

    try {
      const userRef = collection(db, "UserAccount");
      const q = query(userRef, where("email", "==", user?.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        notifyMessage("User not found");
        return;
      }

      querySnapshot.forEach(async (userDoc) => {
        await updateDoc(doc(db, "UserAccount", userDoc.id), {
          fullName: fName
        });
        setCurrentfName(fName);
        notifyMessage("Full Name has been successfully updated!");
      });
    } catch (error) {
      notifyMessage("Error");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <MaterialIcons name="delete" size={28} color="black" />
        </View>
        <View style={styles.body}>
          <AntDesign name="user" size={36} color="black" />
          <Text style={styles.heading}>{currentfName}</Text>
          <Text style={styles.description}>{user?.email}</Text>
          <View style={styles.form}>
            <View style={styles.form_input_icon}>
              <AntDesign name="user" size={24} color="black" />
              <TextInput
                style={styles.form_input}
                value={fName}
                onChangeText={(value) => setfName(value)}
                placeholder="Enter Your Full Name"
              ></TextInput>
              {!fName ? null : (
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  onPress={() => setfName("")}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.control}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#333" }]}
            onPress={() => updateFName()}
          >
            <Text style={[styles.button_text, { color: "#fff" }]}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;
