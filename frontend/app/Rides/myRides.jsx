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

const Search = () => {
    return (
        <SafeAreaView className="bg-white h-full px-4">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View>
                            <Text className="text-base font-medium text-black">Found Rides(10)</Text>
                        </View>
                        <View className="p-4  rounded-xl w-full">
                            <View className="space-y-3">
                                <View className="flex-col space-y-3">
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="font-medium text-sm">Ride Detail</Text>
                                            <Text className="font-normal text-gray-600 text-[8px]">04/08/2024</Text>
                                        </View>
                                        <View className="items-center bg-[#00C247]/[0.22] py-1 px-2 rounded-2xl ">
                                            <Text className="font-medium text-[10px] text-green-500">Active</Text>
                                        </View>
                                    </View>
                                    <View className=" space-y-3 ">
                                        <View className="flex-row space-x-2 items-center">
                                            <Image
                                                source={icons.location}
                                                className="w-5  h-5 "
                                                resizeMode='contain'
                                            />
                                            <Text className="" >Clock Tower</Text>
                                        </View>
                                        <View className="flex-row space-x-2 items-center">
                                            <Image
                                                source={icons.location}
                                                className="w-5 h-5 "
                                                resizeMode='contain'
                                            />
                                            <Text className="" >Raipur</Text>
                                        </View>
                                    </View>

                                </View>
                                <View className=" border border-gray-200" ></View>
                                <View className="flex-row justify-between items-center">
                                    <View className="">
                                        <View className="flex-col">
                                            <Text className="font-normal text-gray-400 text-[8px]">Amount</Text>
                                            <Text className="font-bold text-base ">Rs 150</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between space-x-2 items-center px-4 py-2">
                                        <Image
                                            source={icons.trash}
                                            className=" w-5  h-5 "
                                            resizeMode='contain'
                                        />
                                        <Text className="font-semibold text-sm">Delete</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </>

                )}
            // data={[{ id: 1, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 2, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 3, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 4, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 6, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 7, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 8, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 9, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 10, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 11, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 12, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 13, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 14, pick: "Shivaji NAgar", drop: "Bharati Nagar" }]}
            // keyExtractor={(item) => item.$id}
            // renderItem={({ item }) => <View className=" bg-white mx-8 my-2 py-4 space-y-2 px-3 border border-primary rounded-xl border-1">
            //     <View className="flex-row space-x-2 items-center">
            //         <Image
            //             source={icons.location}
            //             className="w-5  h-5 "
            //             resizeMode='contain'
            //         />
            //         <Text className="" >{item.pick}</Text>
            //     </View>
            //     <View className="flex-row space-x-2 items-center">
            //         <Image
            //             source={icons.location}
            //             className="w-5 h-5 "
            //             resizeMode='contain'
            //         />
            //         <Text className="" >{item.drop}</Text>
            //     </View>
            // </View>
            // }

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