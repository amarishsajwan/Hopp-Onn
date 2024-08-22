import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import { MaterialIcons } from '@expo/vector-icons'
import SearchInput from '../../components/SearchInput'
import RecentSearch from '../../components/RecentSearch'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField'
import * as DocumentPicker from 'expo-document-picker'

const profile = () => {
    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = async () => {
        setrefreshing(true)
        //load data
        setrefreshing(false)
    }

    const [selectedImage, SetSelectedImage] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [document, setDocument] = useState(null);

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })
        console.log(result)
        if (!result.canceled) {
            SetSelectedImage(result.assets[0].uri)
        }
    }

    const selectDoc = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({});
            console.log(result)
            if (result.type === 'success') {
                setDocument(result);
            }
        } catch (error) {
            console.log("User cancelled the upload", error)
        }

    }
    // Upload document to backend
    // const uploadDocument = async () => {
    //     if (document) {
    //         const uri = document.uri;
    //         const fileType = document.mimeType;
    //         const fileName = document.name;

    //         // Example upload function
    //         try {
    //             const response = await FileSystem.uploadAsync('https://your-server-url/upload', uri, {
    //                 headers: {
    //                     'Content-Type': fileType,
    //                     'File-Name': fileName
    //                 },
    //                 httpMethod: 'POST',
    //                 uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    //             });
    //             console.log('Upload response:', response);
    //         } catch (error) {
    //             console.error('Upload error:', error);
    //         }
    //     }
    // };
    return (
        <SafeAreaView className="bg-white h-full flex-1  ">
            <ScrollView>
                <View className="mt-6 space-y-2 px-5 mb-10">
                    <View className="  items-start  mb-6 " >
                        <View className=" flex-row w-full mb-5 justify-between items-center   ">
                            <View>
                                <Text className="font-semibold text-xl">Profile</Text>
                            </View>
                            <View className="mr-1">
                                <TouchableOpacity>
                                    <Image
                                        source={icons.notification}
                                        className="w-6  h-6  "
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className=" w-full flex-col mt-5 justify-center items-center">
                            <View className="rounded-full border-2 border-black">
                                <TouchableOpacity onPress={handleImageSelection} >
                                    <Image
                                        source={{ uri: selectedImage }}
                                        className="w-[100px]  h-[100px]  rounded-full"
                                        resizeMode='contain'
                                    />

                                    <Image
                                        source={icons.camera}
                                        className="w-8 h-8 absolute z-[100] bottom-0 right-[2px]"
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text className="font-semibold text-xl text-[#0D0D0D] mt-4">{name} </Text>
                        </View>
                    </View>

                    <View className="mt-5 flex-col gap-y-4">
                        <View className="flex-col gap-y-2">
                            <Text className="font-normal text-xs text-[#858585]" >Name</Text>
                            <TextInput
                                className="text-black w-full font-normal text-sm px-4 py-3  rounded-md bg-[#F9F9F9]"
                                placeholder=""
                                placeholderTextColor="#505050"
                                style={{ fontSize: 14 }}
                                value={name}
                                onChangeText={value => setName(value)}
                                editable={true}
                            />

                        </View>
                        <View className="flex-col gap-y-2">
                            <Text className="font-normal text-xs text-[#858585]" >Phone Number</Text>
                            <View className="flex-row px-4 py-3 space-x-2 justify-start items-center rounded-md bg-[#F9F9F9]">
                                <Text className="font-normal text-sm" >+91</Text>
                                <TextInput
                                    className="text-black font-normal w-[65%] text-sm "
                                    placeholder=""
                                    placeholderTextColor="#505050"
                                    style={{ fontSize: 14 }}
                                    value={phoneNumber}
                                    onChangeText={(e) => setPhoneNumber(e)}
                                    editable={true}
                                />
                                <View className="gap-x-1 flex-row items-center rounded" >
                                    <Text className="text-[10px] text-primary font-normal">verified</Text>
                                    <Image
                                        source={icons.verify}
                                        className="w-4  h-4 "
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>

                        </View>
                        <View className="flex-col gap-y-2">
                            <Text className="font-normal text-xs text-[#858585]" >Email Id</Text>
                            <View className="flex-row justify-between items-center px-4 py-3  rounded-md bg-[#F9F9F9]  ">
                                <TextInput
                                    className="text-black font-normal text-sm w-[65%] "
                                    placeholder="Amarish Sajwan"
                                    placeholderTextColor="#505050"
                                    style={{ fontSize: 14 }}
                                    value={email}
                                    onChangeText={value => setEmail(value)}
                                />
                                <TouchableOpacity className="bg-[#FFF0B5] p-1  rounded" >
                                    <Text className="text-[10px] text-[#4D3D02] font-normal">Verify your mail</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View className="flex-col gap-y-2.5">
                            <Text className="font-normal text-xs text-[#858585]" >Upload your Licence</Text>

                            <View className=" flex-col items-center justify-between bg-[#F9F9F9] px-3 py-4 rounded-md">
                                <View className=" flex-col items-center justify-center mb-3 ">
                                    <Image
                                        source={icons.docsUpload}
                                        className="w-7 h-7 "
                                    />
                                    <Text className="font-normal text-sm text-[#1A1401]">Upload front side </Text>
                                    <Text className="font-light text-[10px] text-[#9D9D9D]" >Only JPG, PNG with max sie 2MB</Text>

                                </View>
                                <View>
                                    <TouchableOpacity onPress={selectDoc}>
                                        <Text className="font-medium text-sm text-primary">Choose file </Text>
                                    </TouchableOpacity>
                                    {document && (
                                        <View>
                                            <Text>Document: {document.name}</Text>
                                        </View>
                                    )}
                                </View>

                            </View>
                            <View className=" flex-col items-center justify-between bg-[#F9F9F9] px-3 py-4 rounded-md">
                                <View className=" flex-col items-center justify-center mb-3 ">
                                    <Image
                                        source={icons.docsUpload}
                                        className="w-7 h-7 "
                                    />
                                    <Text className="font-normal text-sm text-[#1A1401]">Upload Back side </Text>
                                    <Text className="font-light text-[10px] text-[#9D9D9D]" >Only JPG, PNG with max sie 2MB</Text>

                                </View>
                                <TouchableOpacity>
                                    <View>
                                        <Text className="font-medium text-sm text-primary">Choose file </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default profile;

