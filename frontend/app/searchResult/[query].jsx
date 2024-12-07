import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import RecentSearch from "../../components/RecentSearch";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import axios from "axios";
import useApi from "../../hook/useApi";
import { openURL } from "expo-linking";

const Search = () => {
  const { pickupId, dropId, fromTime, toTime } = useLocalSearchParams();
  console.log("in query page pickupId  ", pickupId);
  console.log("in query page dropId ", dropId);
  console.log("in query page fromTime ", fromTime);
  console.log("in query page toTime ", toTime);

  const payload = JSON.stringify({
    pickupId,
    dropId,
    fromTime,
    toTime,
  });

  const config = {
    headers: {
      Authorization: "Bearer YOUR_TOKEN_HERE",
      "Content-Type": "application/json",
    },
  };

  // Use the generic hook for POST request
  const {
    data: rides = [],
    loading,
    error,
  } = useApi(
    `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/findEvent`,
    payload,
    "POST",
    config,
  );
  const {
    data: allRides = [],
    loading: loadingAllRides,
    error: errorAllRides,
  } = useApi(
    `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/v1/admin/allEvents`,
  );
  console.log(" search rides", rides);
  console.log(" all rides", allRides);

  if (loading || loadingAllRides) {
    return <Text>Loading rides...</Text>;
  }
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

  if (error) {
    return <Text>Error fetching rides: {error.message}</Text>;
  }
  return (
    <SafeAreaView className="bg-white flex-1  px-4">
      <SectionList
        sections={[
          { title: "Found Rides", data: rides },
          { title: "Other Rides", data: allRides },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-2 border-2 border-[#CBCBCB40] bg-[#CBCBCB40] shadow-black mb-4 rounded-xl  w-full">
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
        renderSectionHeader={({ section }) => (
          <View className="p-1 rounded-xl flex items-center mb-1 bg-slate-200/60">
            <Text className="text-base  font-bold text-black">
              {section.title}
            </Text>
          </View>
        )}
        renderSectionFooter={() => (
          <View className="my-10">
            <View className=" border border-black"></View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
