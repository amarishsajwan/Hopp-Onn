import { StyleSheet, Text, TextInput, View } from 'react-native'

const FormField = ({ title, value, placeHolder, handleChangeText, otherStyles }) => {

    return (
        <View className={` ${otherStyles}`}>
            <Text className="text-base text-gray-400 font-medium" >{title}</Text>
            <View className="flex-row  border items-center border-primary w-full h-14 px-4 bg-white rounded-lg">
                <Text className="pr-2 text-base font-base">+ 91</Text>
                <TextInput
                    className="flex-1 text-black font-base text-base"
                    value={value}
                    placeholder={placeHolder}
                    placeholderTextColor="#CECECE"
                    onChangeText={handleChangeText}
                    keyboardType='numeric'

                />
            </View>
        </View>
    )
}

export default FormField