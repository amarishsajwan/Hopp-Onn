import { View, Text, FlatList, Image, TouchableOpacity, TextInput, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import RecentSearch from '../../components/RecentSearch'
import { router } from 'expo-router'
import Checkbox from 'expo-checkbox';

const create = () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = async () => {
        setrefreshing(true)
        //load data
        setrefreshing(false)
    }
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
                                <SearchInput
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