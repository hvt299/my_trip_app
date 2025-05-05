import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from "../../utils/const";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ccc",
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontSize: 25
    }
})

const AppHeader = () => {
    const navigation: any = useNavigation();

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <MaterialIcons
                name="menu"
                size={40}
                color="black"
                onPress={() => {navigation.openDrawer()}}
            />
            <Text style={[styles.headerText, globalStyles.globalFont]}>Review App</Text>
        </SafeAreaView>
    )
}

export default AppHeader;