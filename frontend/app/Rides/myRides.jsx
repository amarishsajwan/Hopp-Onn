import { View, ScrollView, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import axios from 'axios'

const Search = () => {
    const [rides, setRides] = useState([]);  // Store fetched rides
    const [loading, setLoading] = useState(true);  // Loading state

    // Function to fetch rides from backend
    const fetchRides = async () => {
        try {
            const response = await axios.get(`http://${process.env.IP_ADDRESS}:3000/api/v1/event/myevents`);  // Replace with your backend URL
            setRides(response.data);  // Store the fetched data in state
            setLoading(false);  // Stop the loading spinner
        } catch (error) {
            Alert.alert('Error', 'Failed to load rides. Please try again later.');
            setLoading(false);  // Stop the loading spinner in case of error
        }
    };

    useEffect(() => {
        fetchRides();
        // Fetch rides when component mounts
    }, []);
    console.log(rides)
    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full justify-center items-center">
                <ActivityIndicator size="large" color="#00C247" />
            </SafeAreaView>
        );
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
                                        <Text className="" >{item.dropLocation}</Text>
                                    </View>
                                    <View className="flex-row space-x-2 items-center">
                                        <Image
                                            source={icons.location}
                                            className="w-5 h-5 "
                                            resizeMode='contain'
                                        />
                                        <Text className="" >{item.pickupLocation}</Text>
                                    </View>
                                </View>

                            </View>
                            <View className=" border border-gray-200" ></View>
                            <View className="flex-row justify-between items-center">
                                <View className="">
                                    <View className="flex-col">
                                        <Text className="font-normal text-gray-400 text-[8px]">Amount</Text>
                                        <Text className="font-bold text-base ">Rs {item.price}</Text>
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
                )}

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