import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const TimeRangePickerModal = ({ value = '', placeHolder, icon, onSelect = "" }) => {
    const [selectedTime, setSelectedTime] = useState(placeHolder)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date) => {
        console.warn("A Time has been picked: ", time);
        const dt = new Date(date)
        const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log(time);

        console.log('time', time)
        setSelectedTime(time)
        console.log('setSelectedTime', setSelectedTime)
        onSelect(time);
        hideTimePicker();
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
                <Text className="text-[#9ca3af] ml-4 font-base text-base">{selectedTime}</Text>
                <DateTimePickerModal
                    display="spinner"
                    isVisible={isTimePickerVisible}
                    mode="time"
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
