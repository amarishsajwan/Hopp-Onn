// {import { View, Text, FlatList, Image, TouchableOpacity, TextInput, RefreshControl, Alert, ScrollView } from 'react-native';
// import { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomButton from '../../components/CustomButton';
// import { icons } from '../../constants';
// import TimePickerModal from '../../components/TimePickerInput';
// import DropdownComponent2 from '../../components/DropDownInput2';
// import Checkbox from 'expo-checkbox';
// import axios from 'axios';
// import { router } from 'expo-router';
// import { IP_ADDRESS } from "@env";

// const CreateRide = () => {
//     const [isChecked1, setChecked1] = useState(false); // Free Ride checkbox
//     const [isChecked2, setChecked2] = useState(false); // Paid Ride checkbox
//     const [pickupId, setPickupId] = useState('')
//     const [dropId, setDropId] = useState('')
//     const [time, setTime] = useState(''); // Time for the ride
//     const [price, setPrice] = useState(''); // Price of the ride
//     const [locations, setLocations] = useState([]); // Location list for dropdown

//     // Fetch all places data
//     const fetchLocations = async () => {
//         try {
//             const response = await axios.get(`http://${process.env.IP_ADDRESS}:3000/api/v1/location/city/places`); // Update URL if necessary
//             console.log('response.data', response.data)
//             setLocations(response.data); // Assuming the API returns an array of locations
//             console.log("state variable inside fn()", locations)
//         } catch (error) {
//             console.error('Error fetching locations:', error);
//             Alert.alert('Error', 'Failed to load locations. Please try again later.');
//         }
//     };
//     useEffect(() => {
//         fetchLocations()
//         console.log('Locations:', locations);

//     }, []);

//     const handleAddRide = async () => {
//         try {
//             // If free ride is selected, set price to 0
//             const finalPrice = isChecked1 ? 0 : price;
//             await addRide(pickup, drop, time, finalPrice); // Call addRide function
//             Alert.alert('Success', 'Ride added successfully');
//             router.push('Rides/myRides'); // Navigate to 'myRides' page after adding the ride
//         } catch (error) {
//             Alert.alert('Error', 'Failed to add ride.');
//         }
//     };
//     const addRide = async (pickup, drop, time, price) => {
//         const data = JSON.stringify({
//             pickup: pickup,
//             drop: drop,
//             time: time,
//             price: price === true ? 0 : price, // If "free ride" is checked, set price to 0
//         });

//         const config = {
//             method: 'post',
//             url: `http://${process.env.IP_ADDRESS}:3000/api/v1/event/create`, // Backend URL
//             headers: {
//                 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with actual token
//                 'Content-Type': 'application/json',
//             },
//             data: data,
//         };

//         try {
//             const response = await axios(config);
//             console.log('Ride added successfully:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('Error adding ride:', error);
//             throw error;
//         }
//     };

//     return (
//         <SafeAreaView className="bg-white flex-1 h-full">
//             <ScrollView>
//                 <View className="mt-6 px-4 space-y-2">
//                     <View className="  items-start  mb-6 ">
//                         <View className=" flex-row w-full justify-center items-center ">
//                             <Text className="font-semibold w text-xl">Add Ride</Text>
//                         </View>
//                         <View className=" w-full my-4">

//                             {/* Pickup Dropdown */}
//                             <DropdownComponent2
//                                 placeHolder="Choose pick up point"
//                                 icon={icons.location}
//                                 locations={locations}
//                                 onSelect={(selectedPickup) => setPickupId(selectedPickup)}

//                             />


//                             {/* Drop Dropdown */}
//                             <DropdownComponent2
//                                 placeHolder="Choose drop point"
//                                 icon={icons.location}
//                                 locations={locations}
//                                 onSelect={(selectedDrop) => setDropId(selectedDrop)}
//                             />

//                             {/* Time Picker */}
//                             <TimePickerModal
//                                 placeHolder="Schedule Date"
//                                 icon={icons.calendar}
//                                 onSelect={(selectedTime) => setTime(selectedTime)}
//                             />
//                             {console.log("pickupId", pickupId)}
//                             {console.log("dropId", dropId)}
//                             {console.log("selected time", time)}
//                         </View>

//                         <View className="my-2">
//                             <Text className="text-sm font-normal text-gray-400">Add Ride Price</Text>

//                             {/* Free Ride and Paid Ride Options */}
//                             <View className="mx-3 mt-1 flex-row space-x-3">
//                                 <View className="flex-row justify-start items-center space-x-1">
//                                     <Checkbox value={isChecked1} onValueChange={() => { setChecked1(true); setChecked2(false); }} color={isChecked1 ? '#FFCC08' : ""} />
//                                     <Text className="text-sm font-normal">Free Ride</Text>
//                                 </View>
//                                 <View className="flex-row justify-start items-center space-x-1">
//                                     <Checkbox value={isChecked2} onValueChange={() => { setChecked2(true); setChecked1(false); }} color={isChecked2 ? '#FFCC08' : ""} />
//                                     <Text className="text-sm font-normal">Paid Ride</Text>
//                                 </View>
//                             </View>

//                             {/* Price Input */}
//                             {isChecked2 && (
//                                 <View className="flex-row justify-start items-center ml-1 px-2 my-3 bg-[#F9F9F9]">
//                                     <Image source={icons.moneyAdd} className="w-5 h-5" resizeMode='contain' />
//                                     <TextInput
//                                         className="text-black w-[80%] p-1 font-base text-base"
//                                         placeholder="Add Price (in Rupees)"
//                                         placeholderTextColor="#9ca3af"
//                                         style={{ fontSize: 14 }}
//                                         value={price}
//                                         onChangeText={(value) => setPrice(value)}
//                                     />
//                                 </View>
//                             )}
//                         </View>

//                         {/* Add Ride Button */}
//                         <CustomButton
//                             title="Add Ride"
//                             handlePress={handleAddRide}
//                             containerStyles="justify-center items-center w-full mt-6 bg-primary"
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default CreateRide;}


import { View, Text, FlatList, Image, TouchableOpacity, TextInput, RefreshControl, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import TimePickerModal from '../../components/TimePickerInput';
import DropdownComponent2 from '../../components/DropDownInput2';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { router } from 'expo-router';
import { IP_ADDRESS } from "@env";

const CreateRide = () => {
    const [isChecked1, setChecked1] = useState(false); // Free Ride checkbox
    const [isChecked2, setChecked2] = useState(false); // Paid Ride checkbox
    const [pickupId, setPickupId] = useState(''); // Pickup Location
    const [dropId, setDropId] = useState(''); // Drop Location
    const [time, setTime] = useState(''); // Time for the ride
    const [price, setPrice] = useState(''); // Price of the ride
    const [locations, setLocations] = useState([]); // Location list for dropdown
    console.log('IP_Address', process.env.IP_ADDRESS)

    // Fetch all places data
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`http://${process.env.IP_ADDRESS}:3000/api/v1/location/city/places`);
            setLocations(response.data); // Assuming the API returns an array of locations
        } catch (error) {
            Alert.alert('Error', 'Failed to load locations. Please try again later.');
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    // Handle adding a ride
    const handleAddRide = async () => {
        if (!pickupId || !dropId || !time) {
            Alert.alert('Error', 'Please fill in all the fields.');
            return;
        }

        try {
            const finalPrice = isChecked1 ? 0 : parseInt(price, 10);
            await addRide(pickupId, dropId, time, finalPrice);
            Alert.alert('Success', 'Ride added successfully');
            router.push('Rides/myRides');
        } catch (error) {
            Alert.alert('Error', 'Failed to add ride.');
        }
    };

    // Add ride function (API call)
    const addRide = async (pickup, drop, time, price) => {
        const data = JSON.stringify({
            pickupId: pickup,
            dropId: drop,
            time: time,
            price: price, // Price 0 for free ride
        });

        const config = {
            method: 'post',
            url: `http://${process.env.IP_ADDRESS}:3000/api/v1/event/create`,
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with actual token
                'Content-Type': 'application/json',
            },
            data: data,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 h-full">
            <ScrollView>
                <View className="mt-6 px-4 space-y-2">
                    <View className="items-start mb-6">
                        <View className="flex-row w-full justify-center items-center">
                            <Text className="font-semibold text-xl">Add Ride</Text>
                        </View>

                        {/* Pickup Dropdown */}
                        <DropdownComponent2
                            placeHolder="Choose pick up point"
                            icon={icons.location}
                            locations={locations}
                            onSelect={(selectedPickup) => setPickupId(selectedPickup)}
                        />

                        {/* Drop Dropdown */}
                        <DropdownComponent2
                            placeHolder="Choose drop point"
                            icon={icons.location}
                            locations={locations}
                            onSelect={(selectedDrop) => setDropId(selectedDrop)}
                        />

                        {/* Time Picker */}
                        <TimePickerModal
                            placeHolder="Schedule Date"
                            icon={icons.calendar}
                            onSelect={(selectedTime) => setTime(selectedTime)}
                        />
                        {console.log('pickupId', pickupId)}
                        {console.log('dropId', dropId)}
                        {console.log('time', time)}
                        {/* Free or Paid Ride */}
                        <View className="my-2">
                            <Text className="text-sm font-normal text-gray-400">Add Ride Price</Text>
                            <View className="mx-3 mt-1 flex-row space-x-3">
                                <View className="flex-row justify-start items-center space-x-1">
                                    <Checkbox value={isChecked1} onValueChange={() => { setChecked1(true); setChecked2(false); }} color={isChecked1 ? '#FFCC08' : ""} />
                                    <Text className="text-sm font-normal">Free Ride</Text>
                                </View>
                                <View className="flex-row justify-start items-center space-x-1">
                                    <Checkbox value={isChecked2} onValueChange={() => { setChecked2(true); setChecked1(false); }} color={isChecked2 ? '#FFCC08' : ""} />
                                    <Text className="text-sm font-normal">Paid Ride</Text>
                                </View>
                            </View>

                            {/* Price Input */}
                            {isChecked2 && (
                                <View className="flex-row justify-start items-center ml-1 px-2 my-3 bg-[#F9F9F9]">
                                    <Image source={icons.moneyAdd} className="w-5 h-5" resizeMode='contain' />
                                    <TextInput
                                        className="text-black w-[80%] p-1 font-base text-base"
                                        placeholder="Add Price (in Rupees)"
                                        placeholderTextColor="#9ca3af"
                                        style={{ fontSize: 14 }}
                                        value={price}
                                        keyboardType="numeric"
                                        onChangeText={(value) => setPrice(value)}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Add Ride Button */}
                        <CustomButton
                            title="Add Ride"
                            handlePress={handleAddRide}
                            containerStyles="justify-center items-center w-full mt-6 bg-primary"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateRide;
