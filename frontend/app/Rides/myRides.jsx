import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import axios from "axios";

const Search = () => {
  const [rides, setRides] = useState([]); // Store fetched rides
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch rides from backend
  const fetchRides = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/event/myevents`,
      ); // Replace with your backend URL
      setRides(response.data); // Store the fetched data in state
      setLoading(false); // Stop the loading spinner
    } catch (error) {
      Alert.alert("Error", "Failed to load rides. Please try again later.");
      setLoading(false); // Stop the loading spinner in case of error
    }
  };

  useEffect(() => {
    fetchRides();
    // Fetch rides when component mounts
  }, []);

  const formatTime = (timeString) => {
    // Convert the ISO string to a Date object
    const date = new Date(timeString);

    // Format the date into 12-hour format with AM/PM
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    const formattedTime = date.toLocaleString("en-US", options);
    console.log(formattedTime); // Example output: "9:23 PM"
    return formattedTime;
  };

  // Function to delete a ride after confirmation
  const confirmDelete = (rideId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this ride?",
      [
        {
          text: "Cancel",
          style: "cancel", // Does nothing and closes the alert
        },
        {
          text: "Yes",
          onPress: () => deleteRide(rideId), // Calls deleteRide function if user presses "Yes"
        },
      ],
      { cancelable: true },
    );
  };
  const deleteRide = async (rideId) => {
    try {
      const response = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/event/deleteEvent/${rideId}`,
      );
      if (response.status === 200) {
        Alert.alert("Success", "Ride deleted successfully");
        fetchRides(); // Refresh the list after deletion
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete ride. Please try again later.");
    }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Start refreshing
    fetchRides(); // Refetch the API to get the updated data
    setRefreshing(false); // Stop refreshing
  }, [fetchRides]);
  console.log(rides);
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
            <Text className="text-base font-medium mb-4 text-black">
              Found Rides({rides.length})
            </Text>
          </View>
        )}
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-2   bg-[#CBCBCB40]  mb-4 rounded-xl  w-full">
            <View className="space-y-3 ">
              <View className="flex-col space-y-3">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="font-medium text-sm mb-1 ">
                      Ride Detail
                    </Text>
                    <Text className="font-normal text-gray-600 ml-1 text-sm">
                      {formatTime(item.time)}
                    </Text>
                  </View>
                  <View className="items-center bg-[#00C247]/[0.22] py-1 px-2 rounded-2xl ">
                    <Text className="font-medium text-[10px] text-green-500">
                      Active
                    </Text>
                  </View>
                </View>
                <View className=" space-y-3 ">
                  <View className="flex-row space-x-2 items-center">
                    <Image
                      source={icons.location}
                      className="w-5  h-5 "
                      resizeMode="contain"
                    />
                    <Text className="">{item.pickupLocation}</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Image
                      source={icons.location}
                      className="w-5 h-5 "
                      resizeMode="contain"
                    />
                    <Text className="">{item.dropLocation}</Text>
                  </View>
                </View>
              </View>
              <View className=" border border-gray-200"></View>
              <View className="flex-row justify-between items-center">
                <View className="">
                  <View className="flex-col">
                    <Text className="font-normal text-gray-400 text-xs">
                      Amount
                    </Text>
                    <Text className="font-bold text-base ">₹{item.price}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <View className="flex-row justify-between space-x-2 items-center px-4 py-2">
                    <Image
                      source={icons.trash}
                      className=" w-5  h-5 "
                      resizeMode="contain"
                    />
                    <Text className="font-semibold text-sm">Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-black-200"> No recent rides</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
