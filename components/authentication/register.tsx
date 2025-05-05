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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../configs/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

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
    marginTop: -380,
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

const RegisterScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [fullName, setFullName] = useState("");
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

  const onCreateAccount = () => {
    Keyboard.dismiss();

    if (!fullName) {
      notifyMessage("Please enter your full name");
      return;
    }

    if (!email) {
      notifyMessage("Please enter your email");
      return;
    }

    if (!password) {
      notifyMessage("Please enter your password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        notifyMessage(
          "Congratulations, your account has been successfully created!"
        );

        addUserAccount(email, password, fullName);
        
        navigation.goBack();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        notifyMessage(`Error: ${errorMessage}`);
        // ..
      });
  };

  const addUserAccount = async (email: string, password: string, fullName: string) => {
    try {
      const userRef = collection(db, 'UserAccount');
      const q = query(userRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        return;
      }

      const docRef = await addDoc(userRef, {
        email,
        password,
        fullName,
        createdAt: new Date()
      });
  
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/Wallpaper-Mai Chau-Vietnam-Tourism.jpg")}
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
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.description}>
              Let's connect with us right now!
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
                  value={fullName}
                  onChangeText={(value) => setFullName(value)}
                  placeholder="Enter Your Full Name"
                ></TextInput>
              </View>
            </View>

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
              onPress={onCreateAccount}
            >
              <Text style={[styles.button_text, { color: "#fff" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.button_text}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>Privacy Policy • Term of Service</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
