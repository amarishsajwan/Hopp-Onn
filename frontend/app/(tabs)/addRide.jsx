import { View, Text, FlatList, Image, TouchableOpacity, TextInput, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import RecentSearch from '../../components/RecentSearch'
import { router } from 'expo-router'
import Checkbox from 'expo-checkbox';
import axios from 'axios'
import DropdownComponent2 from '../../components/DropDownInput2'


const create = () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = async () => {
        setrefreshing(true)
        //load data
        setrefreshing(false)
    }
    const [pickup, setPickup] = useState('')
    const [drop, setDrop] = useState('')
    const [locations, setLocations] = useState([])

    // Fetch all places data
    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://192.168.0.180:3000/api/v1/location/city/places'); // Update URL if necessary
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

    const addRide = () => {

        let data = JSON.stringify({
            "pickup": pickup,
            "drop": drop,
            "time": "12"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:192.168.0.180/api/v1/event/create',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiaWQiOiI2NjM0NzBkZDcwMzcxZTYyYWQ1ODdhNTIifSwiaWF0IjoxNzE0NzEyNzk3fQ.EpBWsrvjWKdEkwmgKJZ_0_X-m6W6-ZTZ2zDdkH6U6vI',
                'Content-Type': 'application/json'
            },
            data: data
        };

        async function makeRequest() {
            try {
                const response = await axios.request(config);
                console.log(JSON.stringify(response.data));
            }
            catch (error) {
                console.log(error);
            }
        }

        makeRequest();
    }
    useEffect(() => {
        // addRide()
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 h-full">
            <FlatList
                ListHeaderComponent={() => (
                    <View className="mt-6 px-4 space-y-2">
                        <View className="  items-start  mb-6 " >
                            <View className=" flex-row w-full justify-center items-center ">
                                <Text className="font-semibold w text-xl">Add Ride</Text>
                            </View>
                            <View className=" w-full my-4">
                                {/* <SearchInput
                                    placeHolder="Choose pick up point"
                                    icon={icons.location}
                                />
                                <SearchInput
                                    placeHolder="Choose your destination"
                                    icon={icons.location}
                                />
                                <SearchInput
                                    placeHolder="Schedule Date"
                                    icon={icons.calendar}
                                /> */}


                                <DropdownComponent2
                                    placeHolder="Choose pick up point"
                                    icon={icons.location}
                                    locations={locations}
                                    onSelect={(selectedPickup) => setPickup(selectedPickup)}

                                />
                                <DropdownComponent2
                                    placeHolder="Choose pick up point"
                                    icon={icons.location}
                                    locations={locations}
                                    onSelect={(selectedDrop) => setDrop(selectedDrop)}


                                />

                                {console.log('selected pickup', pickup)}
                                {console.log('selected drop', drop)}
                                <DropdownComponent2
                                    placeHolder="Schedule Date"
                                    icon={icons.calendar}

                                />
                            </View>
                            <View className="my-2">
                                <Text className="text-sm  font-normal text-gray-400" >
                                    Add ride Price
                                </Text>
                                <View className="mx-3 mt-1 flex-row space-x-3" >
                                    <View className="flex-row justify-start items-center space-x-1" >
                                        <Checkbox className=" rounded-full w-4 h-4" value={isChecked1} onValueChange={setChecked1} color={isChecked1 ? '#FFCC08' : ""} />
                                        <Text className="text-sm font-normal" >Free Ride</Text>
                                    </View>
                                    <View className="flex-row justify-start items-center space-x-1">
                                        <Checkbox className=" rounded-full w-4 h-4" value={isChecked2} onValueChange={setChecked2} color={isChecked2 ? '#FFCC08' : ""} />
                                        <Text className="text-sm font-normal" >Paid ride</Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-start items-center ml-1 px-2 my-3 bg-[#F9F9F9]">
                                    <Image
                                        source={icons.moneyAdd}
                                        className="w-5  h-5 "
                                        resizeMode='contain'
                                    />
                                    <TextInput
                                        className="text-black w-[80%] p-1 font-base text-base"
                                        placeholder="Add Price (in Rupees)"
                                        placeholderTextColor="#9ca3af"
                                        style={{ fontSize: 14 }}
                                    // value={value}
                                    // onChangeText={handleTextChange}
                                    />
                                </View>
                            </View>
                            <CustomButton
                                title="Add Ride"
                                handlePress={() => router.push('Rides/myRides')}
                                containerStyles=" justify-center items-center w-full mt-6 bg-primary"
                            />
                            {/* <Text className="text-sm mt-8 font-semibold text-[#3E4958]">Recent Search</Text> */}
                        </View>
                    </View>
                )}
                // data={[{ id: 1, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 2, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 3, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 4, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 5, pick: "Shivaji NAgar", drop: "Bharati Nagar" }]}
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
                refreshControl={<RefreshControl
                    refereshing={refreshing}
                    onRefresh={onRefresh}

                />}
            />
        </SafeAreaView>
    )
}


export default create