import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen';
import useFonts from 'expo-font'

const StackLayout = () => {
    // const [fontsLoaded] = useFonts({
    //     PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    //     PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf")
    // });

    // useEffect(() => {
    //     async function prepare() {
    //         await SplashScreen.preventAutoHideAsync();
    //     }
    //     prepare();
    // }, []);
    
    // if (!fontsLoaded) {
    //     return undefined;
    // } else {
    //     SplashScreen.hideAsync();
    // }
    
    return (
        <Stack initialRouteName="welcome">
            <Stack.Screen name="welcome"/>
        </Stack>
    )
}