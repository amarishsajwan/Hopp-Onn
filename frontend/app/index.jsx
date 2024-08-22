import { ScrollView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

const index = () => {
    return (
        <SafeAreaView className="bg-primary h-full flex-1" >
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className=" w-full min-h-[85vh] px-12 justify-center items-center ">
                    <Image source={images.logo} resizeMode="contain" />
                    <View className=" w-full justify-center items-center absolute bottom-4">

                        <CustomButton
                            title="Get Started"
                            handlePress={() => router.push('/signIn')}
                            containerStyles="w-full mb-2 "
                        />
                        <Text className=" text-sm text-center font-normal text-gray-950">Get ride to great ride without the hasssel , dsfdfd dfd f dfd fdd</Text>
                    </View>

                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622"
                style="light" />
        </SafeAreaView >
    );
};

export default index;
