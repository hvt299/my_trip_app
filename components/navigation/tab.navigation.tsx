import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "../tabs/discover";
import MyTripScreen from "../tabs/mytrip";
import ProfileScreen from "../tabs/profile";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import SettingScreen from "../tabs/settings";
import { RouteProp, useRoute } from "@react-navigation/native";

type HomeRouteProp = RouteProp<RootStackParamList, 'home'>;

const TabNavigation = () => {
  const route = useRoute<HomeRouteProp>();
  const { fullName } = route.params ?? {};

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="mytrip"
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      <Tab.Screen
        name="discover"
        component={DiscoverScreen}
        initialParams={{ fullName }}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({color}) => <Entypo name="globe" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="mytrip"
        component={MyTripScreen}
        initialParams={{ fullName }}
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({color}) => <FontAwesome6 name="location-dot" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        initialParams={{ fullName }}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="setting"
        component={SettingScreen}
        initialParams={{ fullName }}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({color}) => <AntDesign name="setting" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
