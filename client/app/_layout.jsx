import { useCallback } from 'react';
import { Stack } from "expo-router"
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        'PoppinsBold': require("../assets/fonts/Poppins-SemiBold.ttf"),
        'PoppinsRegular': require("../assets/fonts/Poppins-Regular.ttf")
    });
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
        
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <Stack 
            initialRouteName="welcome" onLayout={onLayoutRootView}
        >
            <Stack.Screen 
                name="welcome"
                options={{
                headerStyle: {
                    display: 'none'
                }}}
            />
        </Stack>
    )
}

export default Layout;