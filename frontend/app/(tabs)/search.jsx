import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, Alert, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import { router, usePathname } from 'expo-router'
import DropdownComponent2 from '../../components/DropDownInput2'
import axios from 'axios'
// import TimePickerModal from '../../components/TimePickerInput'
import useApi from '../../hook/useApi'
import TimePickerRangeModal from '../../components/TimeRangeInput'


const Search = () => {
    console.log(process.env.EXPO_PUBLIC_IP_ADDRESS)
    const [refreshing, setrefreshing] = useState(false)
    const [pickupId, setPickupId] = useState('')
    const [dropId, setDropId] = useState('')
    const [locations, setLocations] = useState([])
    const [toTime, setToTime] = useState('')
    const [fromTime, setFromTime] = useState(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

    const { data: userData, loading, error } = useApi(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/user/userProfile`);

    const onRefresh = async () => {
        setrefreshing(true)
        setPickupId('')
        setDropId('')
        setLocations([])
        setToTime('')
        setFromTime('');
        await fetchLocations();
        setrefreshing(false)
    }

    // Fetch all places data
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/location/city/places`); // Update URL if necessary
            console.log('response.data', response.data)
            setLocations(response.data); // Assuming the API returns an array of locations
            console.log("state variable inside fn()", locations)
        } catch (error) {
            console.error('Error fetching locations:', error);
            Alert.alert('Error', 'Failed to load locations. Please try again later.');
        }
    };
    useEffect(() => {
        fetchLocations()
        console.log('Locations:', locations);

    }, []);

    if (loading) {
        // Render a loading screen or component while data is being fetched
        return (
            <SafeAreaView className="bg-white h-full flex-1 justify-center items-center">
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView className="bg-white h-full flex-1">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                <View className="mt-6 px-4 space-y-2">
                    <View className="  items-start  mb-6 " >
                        <View className=" flex-row w-full justify-between items-center   ">
                            <View>
                                <Text className=" font-normal text-base text-black" >
                                    Hello👍
                                </Text>
                                <Text className="font-semibold text-xl">{userData.username}</Text>
                            </View>
                            <View className="mr-1">
                                <TouchableOpacity onPress={() => router.push('Rides/myRides')}>

                                    <Image
                                        source={icons.myRide}
                                        className="w-7  h-7"
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View className="px-4 py-8 ">
                            <Text className="px-1 font-semibold text-xl">Where are you going today?</Text>
                            <DropdownComponent2
                                placeHolder="Choose pick up point"
                                icon={icons.location}
                                locations={locations}
                                onSelect={(selectedPickup) => setPickupId(selectedPickup)}

                            />
                            <DropdownComponent2
                                placeHolder="Choose pick up point"
                                icon={icons.location}
                                locations={locations}
                                onSelect={(selectedDrop) => setDropId(selectedDrop)}


                            />
                            {console.log('selected pickupId', pickupId)}
                            {console.log('selected dropId', dropId)}

                            <View className="flex-row w-auto mt-4 justify-between">


                                <TimePickerRangeModal
                                    placeHolder="From"
                                    icon={icons.calendar}
                                    onSelect={(selectedTime) => setFromTime(selectedTime)}
                                />
                                <TimePickerRangeModal
                                    placeHolder="To"
                                    icon={icons.calendar}
                                    onSelect={(selectedTime) => setToTime(selectedTime)}

                                />
                            </View>
                        </View>
                        <CustomButton
                            title="Search Ride"
                            handlePress={() => {
                                console.log("validation before if condition", pickupId, dropId, toTime, fromTime)
                                if (!pickupId || !dropId || !toTime || !fromTime) {

                                    return Alert.alert('Missing Query', "Please input something to search results across database ")
                                }
                                // // if (pathName.startsWith('/searchResult')) {
                                // //     router.setParams(query)
                                // // }
                                // else {}
                                console.log("validation after if condition", pickupId, dropId, toTime, fromTime)

                                router.push({
                                    pathname: `searchResult/${pickupId}${dropId}`,
                                    params: { pickupId, dropId, fromTime, toTime }
                                });

                            }}
                            containerStyles=" justify-center items-center w-full mt-6 bg-primary"
                        />
                        {/* <Text className="text-sm mt-8 font-semibold text-[#3E4958]">Recent Search</Text> */}
                    </View>
                </View>
                {/* <FlatList
                    scrollEnabled={false}
                    data={[{ id: 1, pick: "Shivaji Nagar", drop: "Bharati Nagar" }, { id: 2, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 3, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 4, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 5, pick: "Shivaji NAgar", drop: "Bharati Nagar" }]}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => <View className=" bg-white mx-8 my-2 py-4 space-y-2 px-3 border border-primary rounded-xl border-1">
                        <View className="flex-row space-x-2 items-center">
                            <Image
                                source={icons.location}
                                className="w-5  h-5 "
                                resizeMode='contain'
                            />
                            <Text className="" >{item.pick}</Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image
                                source={icons.location}
                                className="w-5 h-5 "
                                resizeMode='contain'
                            />
                            <Text className="" >{item.drop}</Text>
                        </View>
                    </View>
                    }

                    ListEmptyComponent={() =>
                        <Text className="text-black-200"> No recent rides</Text>
                    }
                    refreshControl={<RefreshControl
                        refereshing={refreshing}
                        onRefresh={onRefresh}

                    />}
                /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search
