import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../authentication/landing";
import LoginScreen from "../authentication/login";
import RegisterScreen from "../authentication/register";
import TabNavigation from "./tab.navigation";
import SearchScreen from "../create-trip/search";
import SelectTravelerScreen from "../create-trip/select-traveler";
import SelectDateScreen from "../create-trip/select-date";
import SelectBudgetScreen from "../create-trip/select-budget";
import ReviewTripScreen from "../create-trip/review-trip";
import GenerateTripScreen from "../create-trip/generate-trip";
import TripDetailScreen from "../trip-details/trip-details";
import MapScreen from "../trip-details/map";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="landing"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="landing"
        component={LandingScreen}
        options={{
          title: "Landing",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Login",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          title: "Register",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="home"
        component={TabNavigation}
        options={{
          title: "Home",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Search",
          // header: () => <></>,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="select-traveler"
        component={SelectTravelerScreen}
        options={{ 
          title: "",
          // header: () => <></>
          headerTransparent: true
         }}
      />
      <Stack.Screen
        name="select-date"
        component={SelectDateScreen}
        options={{ 
          title: "",
          // header: () => <></>
          headerTransparent: true
         }}
      />
      <Stack.Screen
        name="select-budget"
        component={SelectBudgetScreen}
        options={{ 
          title: "",
          // header: () => <></>
          headerTransparent: true
         }}
      />
      <Stack.Screen
        name="review-trip"
        component={ReviewTripScreen}
        options={{ 
          title: "",
          // header: () => <></>
          headerTransparent: true
         }}
      />
      <Stack.Screen
        name="generate-trip"
        component={GenerateTripScreen}
        options={{ 
          title: "",
          header: () => <></>
         }}
      />
      <Stack.Screen
        name="trip-details"
        component={TripDetailScreen}
        options={{ 
          title: "",
          // header: () => <></>
          headerTransparent: true
         }}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={{ 
          title: "",
          header: () => <></>
          // headerTransparent: true
         }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
