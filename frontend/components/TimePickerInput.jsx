import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerModal = ({ value, placeHolder, icon, onSelect = "" }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [showTime, setShowTime] = useState(placeHolder);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (datetime) => {
    try {
      console.log("A Time has been picked: ", datetime);
      const istTime = datetime.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      console.warn("IST time: ", istTime);
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const formattedTime = datetime.toLocaleString("en-US", options);
      setShowTime(istTime);
      onSelect(istTime);
      hideTimePicker();
    } catch (error) {
      console.log("error in handle time confirm", error);
    }
  };
  return (
    <View className=" flex items-center m-2 rounded-lg w-[270px] bg-[#F9F9F9]">
      <TouchableOpacity
        className="h-[50px] w-full flex-row  items-center  rounded-lg bg-[#F9F9F9] "
        onPress={showTimePicker}
      >
        <Image source={icon} className="w-5  h-5 ml-2 " resizeMode="contain" />
        <Text className="text-[#9ca3af] ml-4 font-base text-base">
          {showTime}
        </Text>
        <DateTimePickerModal
          display="spinner"
          isVisible={isTimePickerVisible}
          mode="datetime"
          is24Hour={false}
          // timeZoneName={'Europe/London'}
          maximumDate={new Date(2025, 11, 31)}
          minimumDate={new Date()}
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          positiveButton={{ label: "Set", textColor: "#FFCC08" }}
          negativeButton={{ label: "Cancel", textColor: "#FFCC08" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TimePickerModal;
