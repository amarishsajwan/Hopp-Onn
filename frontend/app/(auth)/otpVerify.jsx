import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import auth from "@react-native-firebase/auth";
import {} from "expo-router";

import CustomButton from "../../components/CustomButton";
import OtpField from "../../components/OtpField";
const otpVerify = () => {
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirmation } = useLocalSearchParams();

  const confirmCode = async () => {
    if (otp.length !== 6) {
      // Assuming OTP is 6 digits
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsSubmitting(true);
    setConfirm(confirmation);
    try {
      await confirm.confirm(otp);
      console.log("login successfull");
      router.push("/search"); // Navigate to the next screen after successful OTP verification
    } catch (error) {
      console.error("Invalid OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1 ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="  w-full h-full my-14 min-h-[85vh] px-4">
          <Text className="text-2xl text-black font-bold">Enter the Code?</Text>
          <Text className=" text-sm font-normal text-gray-950">
            A code was sent to +91 9876543245
          </Text>

          <OtpField
            otherStyles={"justify-center mt-16 items-center w-full"}
            handleChangeText={(e) => setOtp(e)}
          />
          <CustomButton
            title="Verify"
            handlePress={() => router.push("/search")}
            containerStyles=" w-full mt-[250px] bg-primary"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default otpVerify;
