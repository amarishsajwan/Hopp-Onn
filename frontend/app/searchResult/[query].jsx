import { View, ScrollView, Text, FlatList, Image, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons, images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import RecentSearch from '../../components/RecentSearch'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '../../hook/useFetch'
import axios from 'axios'
import useApi from '../../hook/useApi';  // Import the generic hook

const Search = () => {
    const { pickupId, dropId } = useLocalSearchParams();
    const time = "11";  // Static time value

    const payload = JSON.stringify({
        pickupId,
        dropId,
        time
    });

    const config = {
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN_HERE',
            'Content-Type': 'application/json',
        },
    };

    // Use the generic hook for POST request
    const { data: rides, loading, error } = useApi('http://192.168.0.180:3000/api/v1/findEvent', payload, 'POST', config);
    console.log('rides', rides)
    if (loading) {
        return <Text>Loading rides...</Text>;
    }

    if (error) {
        return <Text>Error fetching rides: {error.message}</Text>;
    }
    return (
        <SafeAreaView className="bg-white h-full px-4">
            <FlatList
                ListHeaderComponent={() => (

                    <View>
                        <Text className="text-base font-medium text-black">Found Rides({rides.length})</Text>
                    </View>


                )}
                data={rides}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="p-4  rounded-xl w-full">
                        <View className="space-y-3">
                            <View className="flex-col space-y-3">
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="font-medium text-sm">Ride Detail</Text>
                                        <Text className="font-normal text-gray-600 text-[8px]">04/08/2024</Text>
                                    </View>
                                    <Text className="font-bold text-base ">Rs 150</Text>
                                </View>
                                <View className=" space-y-3 ">
                                    <View className="flex-row space-x-2 items-center">
                                        <Image
                                            source={icons.location}
                                            className="w-5  h-5 "
                                            resizeMode='contain'
                                        />
                                        <Text className="" >{item.pickupLocation}</Text>
                                    </View>
                                    <View className="flex-row space-x-2 items-center">
                                        <Image
                                            source={icons.location}
                                            className="w-5 h-5 "
                                            resizeMode='contain'
                                        />
                                        <Text className="" >{item.dropLocation}</Text>
                                    </View>
                                </View>

                            </View>
                            <View className="border border-gray-200" ></View>
                            <View className="flex-row justify-between items-center">
                                <View className=" flex-row gap-[10px]">
                                    <View className=" first-letter:rounded-full border-2 border-green-500">
                                        <Image
                                            source={{
                                                uri:
                                                    item?.user?.profileImg && typeof item.user.profileImg === 'string'
                                                        ? `http://192.168.0.180:3000/${item.user.profileImg.replace(/\\/g, '/')}`
                                                        : Image.resolveAssetSource(icons.user).uri, // Resolve asset source for the default icon
                                            }}
                                            className=" w-[37px]  h-[37px] rounded-full "
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <View className="flex-col space-y-1">
                                        <Text className="font-medium text-sm">{item.user.username}</Text>
                                        <Text className="font-normal text-[8px] text-[#9D9D9D]" >Profile Completed 70%</Text>

                                    </View>

                                </View>
                                <View className="flex-row justify-between space-x-2 items-center px-4 rounded-[60px] py-2 bg-primary">
                                    <Image
                                        source={icons.call}
                                        className=" w-[19px]  h-[19px] "
                                        resizeMode='contain'
                                    />
                                    <Text className="font-semibold text-sm">Call</Text>
                                </View>
                            </View>

                        </View>
                    </View>)

                }

            // ListEmptyComponent={() =>
            //     <Text className="text-black-200"> No recent rides</Text>
            // }
            // refreshControl={<RefreshControl
            //     refereshing={refreshing}
            //     onRefresh={onRefresh}

            // />}
            />

        </SafeAreaView>
    )
}

export default Search