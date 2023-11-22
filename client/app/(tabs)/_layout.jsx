import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import { CheckSquare, Search, ShoppingBag, User } from 'react-native-feather'
import { COLORS, SHADOWS } from '../../constants/theme'

export default tabs = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: COLORS.background,
                    paddingBottom: 48,
                    height: 112,
                    paddingHorizontal: 12,
                    ...SHADOWS.shadow,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                },
                tabBarActiveTintColor: COLORS.accent
            }}
        >
            <Tabs.Screen 
                name="daily" 
                options={{
                    headerShown: false,
                    tabBarLabel: "Daily",
                    tabBarIcon: ({ focused }) => (
                        <CheckSquare stroke={focused ? COLORS.accent : COLORS.gray500}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="discover" 
                options={{
                    headerShown: false,
                    tabBarLabel: "Discover",
                    tabBarIcon: ({ focused }) => (
                        <Search stroke={focused ? COLORS.accent : COLORS.gray500}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="store" 
                options={{
                    headerShown: false,
                    tabBarLabel: "Store",
                    tabBarIcon: ({ focused }) => (
                        <ShoppingBag stroke={focused ? COLORS.accent : COLORS.gray500}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    headerShown: false,
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <User stroke={focused ? COLORS.accent : COLORS.gray500}/>
                    )
                }}
            />
        </Tabs>
    )
}