import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState, useEffect } from 'react'
import CustomButton from '../../components/CustomButton'
import { router, Link } from 'expo-router'
import auth from '@react-native-firebase/auth';

const signIn = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    // Handle the button press
    const signInWithPhoneNumber = async (phoneNumber) => {
        setIsSubmitting(true)
        try {
            console.log("signInWithPhoneNumber()", phoneNumber)
            const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
            console.log("otp sent successfully")
            router.push({
                pathname: '/otpVerify',
                params: { confirmation },
            });
        } catch (error) {
            alert("An internal error has occurred")
            console.log(error)

        }
        setIsSubmitting(false)
    }


    return (
        <SafeAreaView className="bg-white h-full flex-1 ">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="  w-full h-full my-14 min-h-[85vh] px-4">

                    <Text className="text-2xl text-black font-bold">
                        What's your Number?
                    </Text>
                    <Text className=" text-sm font-normal text-gray-950">we'll text a code to verify your phone</Text>
                    <FormField
                        title=""
                        placeHolder="Enter Number"
                        value={phoneNumber}
                        handleChangeText={(e) => setPhoneNumber(e)}
                        otherStyles=""
                    />
                    <CustomButton
                        title="Sent Code"
                        handlePress={() => {
                            // signInWithPhoneNumber(phoneNumber)
                            router.push('/search')
                        }}
                        containerStyles=" w-full mt-[300px] bg-primary"
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signIn

