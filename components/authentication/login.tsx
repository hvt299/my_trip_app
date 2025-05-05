import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    flex: 3,
    width: "100%",
  },
  body: {
    flex: 2,
    width: "100%",
    // alignItems: "center",
    marginTop: -200,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },
  content: {
    // flex: 2,
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
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
    width: "100%",
    gap: 15,
    marginBottom: 30,
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
  form: {
    gap: 15,
    marginBottom: 15,
  },
  form_input_icon: {
    minHeight: 50,
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
  footer: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
  },
  back_icon: {
    position: "absolute",
    top: 60,
    left: 20,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});

const LoginScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function notifyMessage(msg: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  const onSignIn = () => {
    Keyboard.dismiss();

    if (!email) {
      notifyMessage("Please enter your email");
      return;
    }

    if (!password) {
      notifyMessage("Please enter your password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        notifyMessage("Congratulations, Logged in successfully!");
        
        const fullName = await getUserFullNameByEmail(email);

        navigation.navigate("home", {fullName: fullName});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if (errorCode == "auth/invalid-credential") {
          notifyMessage("Incorrect email or password");
        } else {
          notifyMessage(`Error: ${errorMessage}`);
        }
      });
  };

  const getUserFullNameByEmail = async (email: string) => {
    try {
      const userRef = collection(db, 'UserAccount');
      const q = query(userRef, where('email', '==', email));
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/Wallpaper-Ha Giang-Vietnam-Tourism.jpg")}
        ></Image>

        <Ionicons
          style={styles.back_icon}
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.description}>
              Welcome back, you've been missed!
            </Text>
          </View>

          <KeyboardAvoidingView
            style={styles.form}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View>
              <View style={styles.form_input_icon}>
                <TextInput
                  style={styles.form_input}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                ></TextInput>
              </View>
            </View>

            <View>
              <View style={styles.form_input_icon}>
                <TextInput
                  style={styles.form_input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  placeholder="Enter Your Password"
                ></TextInput>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  onPress={toggleShowPassword}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.control}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#333" }]}
              onPress={onSignIn}
            >
              <Text style={[styles.button_text, { color: "#fff" }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("register")}
            >
              <Text style={styles.button_text}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>Privacy Policy • Term of Service</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
