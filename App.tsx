import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { OPENSANS_REGULAR } from "./utils/const";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";
import { auth } from "./configs/FirebaseConfig";
import TabNavigation from "./components/navigation/tab.navigation";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    [OPENSANS_REGULAR]: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const user = auth.currentUser;

  return (
    <NavigationContainer>
      <AppNavigation />
      {/* {user ? <TabNavigation /> : <AppNavigation />} */}
    </NavigationContainer>
  );
};

export default App;
