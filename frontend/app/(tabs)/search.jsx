import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, Alert, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import RecentSearch from '../../components/RecentSearch'
import { router, usePathname } from 'expo-router'
import useFetch from '../../hook/useFetch'
import DropdownComponent1 from '../../components/DropDownInput1'
import useApi from '../../hook/useApi'
import axios from 'axios'

const Search = () => {
    //  const {data:posts}= fetchData(getAllPosts)
    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = async () => {
        setrefreshing(true)
        //load data
        setrefreshing(false)
    }

    const pathName = usePathname()
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

    // const { data, loading, error } = useApi('http://192.168.0.180:3000/api/v1/location/city/places');
    // useEffect(() => {
    //     if (locations) {
    //         console.log(data)
    //         console.log('Locations:', locations);
    //     }
    //     setLocations(data)
    // }, [data]);

    // console.log('state variable outside fn()', locations)
    return (
        <SafeAreaView className="bg-white h-full flex-1">
            <ScrollView>


                <View className="mt-6 px-4 space-y-2">
                    <View className="  items-start  mb-6 " >
                        <View className=" flex-row w-full justify-between items-center   ">
                            <View>
                                <Text className=" font-normal text-base text-black" >
                                    Hello👍
                                </Text>
                                <Text className="font-semibold text-xl">Amarish Singh</Text>
                            </View>
                            <View className="mr-1">
                                <TouchableOpacity>

                                    <Image
                                        source={icons.notification}
                                        className="w-6  h-6 "
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View className="px-4 py-8 ">
                            <Text className="px-1 font-semibold text-xl">Where are you going today?</Text>


                            {/* <SearchInput
                                placeHolder="Choose pick up point"
                                icon={icons.location}
                                value={pickup}
                                handleTextChange={(e) => setPickup(e)}
                            /> */}
                            <DropdownComponent1
                                placeHolder="Choose pick up point"
                                icon={icons.location}
                                locations={locations}
                                onSelect={(selectedPickup) => setPickup(selectedPickup)}

                            />
                            <DropdownComponent1
                                placeHolder="Choose your destination"
                                icon={icons.location}
                                locations={locations}
                                onSelect={(selectedDrop) => setDrop(selectedDrop)}


                            />
                            {console.log('selected pickup', pickup)}
                            {console.log('selected drop', drop)}
                            <DropdownComponent1
                                placeHolder="Schedule Date"
                                icon={icons.calendar}

                            />

                            {/* <SearchInput
                                placeHolder="Choose your destination"
                                icon={icons.location}
                                value={drop}
                                handleTextChange={(e) => setDrop(e)}

                            /> */}
                            {/* <DropdownComponent2 /> */}

                            {/* <SearchInput
                                placeHolder="Schedule Date"
                                icon={icons.calendar}
                            /> */}
                        </View>
                        <CustomButton
                            title="Search Ride"
                            handlePress={() => {
                                if (!pickup && !drop) {
                                    return Alert.alert('Missing Query', "Please input something to search results across database ")
                                }
                                // // if (pathName.startsWith('/searchResult')) {
                                // //     router.setParams(query)
                                // // } 
                                // else {}
                                router.push({
                                    pathname: `searchResult/${pickup}${drop}`,
                                    params: { pickup, drop }
                                });

                            }}
                            containerStyles=" justify-center items-center w-full mt-6 bg-primary"
                        />
                        <Text className="text-sm mt-8 font-semibold text-[#3E4958]">Recent Search</Text>
                    </View>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={[{ id: 1, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 2, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 3, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 4, pick: "Shivaji NAgar", drop: "Bharati Nagar" }, { id: 5, pick: "Shivaji NAgar", drop: "Bharati Nagar" }]}
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
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search