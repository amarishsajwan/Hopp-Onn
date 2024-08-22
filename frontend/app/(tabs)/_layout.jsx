import { Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants"

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className=" items-center  justify-center gap-1 mb-4">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-semibold' : 'font-normal'} text-xs`} style={{ color: color }}>{name}</Text>
        </View>
    )
}

const TabsLayout
    = () => {
        return (
            <>
                <Tabs
                    screenOptions={{
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: "#FFCC08",
                        tabBarInactiveTintColor: "#9D9D9D",

                        tabBarStyle: {
                            backgroundColor: "#FFFFFF",
                            borderTopWidth: 1,
                            borderTopColor: "#FFFFFF",
                            height: 84

                        }

                    }}
                >
                    <Tabs.Screen
                        name='search'
                        options={{
                            title: "Search",
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={icons.search}
                                    color={color}
                                    name="Search"
                                    focused={focused}
                                />
                            )
                        }}
                    />
                    <Tabs.Screen
                        name='addRide'
                        options={{
                            title: "Add Ride",
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={icons.plus}
                                    color={color}
                                    name="Add Ride"
                                    focused={focused}
                                />
                            )
                        }}
                    />
                    <Tabs.Screen
                        name='profile'
                        options={{
                            title: "Profile",
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={icons.profile}
                                    color={color}
                                    name="Profile"
                                    focused={focused}
                                />
                            )
                        }}
                    />

                </Tabs>
            </>
        )
    }

export default TabsLayout


