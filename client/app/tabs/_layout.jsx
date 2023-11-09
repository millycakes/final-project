import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="Home" />
            <Tabs.Screen name="Daily" />
            <Tabs.Screen name="Discover" />
            <Tabs.Screen name="Profile" />
        </Tabs>
    )

}