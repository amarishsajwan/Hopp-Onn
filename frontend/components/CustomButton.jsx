import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { router, Redirect } from 'expo-router'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity className={`bg-white rounded-full  min-h-[56px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-black font-semibold text-base ${textStyles}`} >{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton