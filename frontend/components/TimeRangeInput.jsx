import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const TimeRangePickerModal = ({ placeHolder, icon, onSelect = "" }) => {
    const [showTime, setShowTime] = useState(placeHolder)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (datetime) => {
        try {
            console.log("A Time has been picked: ", datetime)
            const istTime = datetime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            console.warn("IST time: ", istTime);
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };
            const formattedTime = datetime.toLocaleString("en-US", options);
            setShowTime(formattedTime)
            onSelect(istTime);
            hideTimePicker();
        } catch (error) {
            console.log("error at search time", error)
        }
    };
    return (

        <TouchableOpacity className="h-[50px]   items-center  rounded-lg bg-[#F9F9F9] "
            onPress={showTimePicker}>
            <View className=" flex items-center w-28 px-2 rounded-lg  bg-[#F9F9F9]">

                <Image
                    source={icon}
                    className="w-5  h-5 ml-2 "
                    resizeMode='contain'
                />
                <Text className="text-[#9ca3af] ml-4 font-base text-base">{showTime}</Text>
                <DateTimePickerModal
                    display="spinner"
                    isVisible={isTimePickerVisible}
                    dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
                    is24Hour={false}
                    mode="datetime"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    positiveButton={{ label: 'Set', textColor: '#FFCC08' }}
                    negativeButton={{ label: 'Cancel', textColor: '#FFCC08' }}
                />

            </View>
        </TouchableOpacity >
    )
}

export default TimeRangePickerModal
