import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const TimePickerModal = () => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        console.warn("A Time has been picked: ", time);
        hideTimePicker();
    };
    return (
        <View className="flex-row mx-4 pl-2  items-center mt-3  rounded-md  bg-[#F9F9F9]">
            <TouchableOpacity onPress={showTimePicker}>
                <Text>Select Time</Text>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                />

            </TouchableOpacity>
        </View>
    )
}

export default TimePickerModal
