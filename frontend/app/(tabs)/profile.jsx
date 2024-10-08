import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import SearchInput from '../../components/SearchInput';
import RecentSearch from '../../components/RecentSearch';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useApi from '../../hook/useApi';  // Import the custom hook

const profile = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [document, setDocument] = useState(null);
    const [uploadImageUri, setUploadImageUri] = useState(null); // State to track image URI for upload
    const [uploadStatusImage, setUploadStatusImage] = useState({ loading: false, error: null, success: false }); // State to track upload status
    const [uploadStatusLicense, setUploadStatusLicense] = useState({ loading: false, error: null, success: false }); // State to track upload status
    const [licenseFrontImg, setLicenseFrontImg] = useState(null); // Driving License Front Image
    const [licenseBackImg, setLicenseBackImg] = useState(null); // Driving License Back Image
    const [locations, setLocations] = useState([])

    // Fetch user profile data
    const { data: userData, loading, error } = useApi('http://192.168.0.180:3000/api/v1/user/userProfile');



    useEffect(() => {
        if (userData) {
            setName(userData.username);
            setPhoneNumber(userData.contact);
            if (userData.profileImg) {
                setProfileImg(`http://192.168.0.180:3000/${userData.profileImg.replace(/\\/g, '/')}`);
            } else {
                // Fallback to default user icon if profileImg is not available
                setProfileImg(null);
            }
        }
    }, [userData]);

    useEffect(() => {
        const handleUploadProfileImg = async () => {
            if (!uploadImageUri) return;

            const formData = new FormData();
            const fileType = uploadImageUri.substring(uploadImageUri.lastIndexOf(".") + 1);
            formData.append('profileImg', {
                name: `profile-image.${fileType}`,
                uri: uploadImageUri,
                type: `image/${fileType}`,
            });
            console.log("formData", formData)
            setUploadStatusImage({ loading: true, error: null, success: false }); // Start upload

            try {
                const response = await axios.post('http://192.168.0.180:3000/api/v1/user/uploadProfileImg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                if (response.status === 200) {
                    setUploadStatusImage({ loading: false, error: null, success: true });
                    Alert.alert("Success", "Profile image uploaded successfully.");
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setUploadStatusImage({ loading: false, error: error.message, success: false });
                Alert.alert("Error", "Failed to upload the image.");
            }
        };

        handleUploadProfileImg(); // Trigger the upload
    }, [uploadImageUri]); // Depend on the uploadImageUri state



    if (error) {
        <Text>Error fetching data: {error.message}</Text>;
    }

    const handleImageSelectionAndUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setProfileImg(selectedImageUri);
            setUploadImageUri(selectedImageUri); // Set the URI for upload
        }
    };

    const handleLicenseImageSelection = async (type) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            if (type === 'front') {
                setLicenseFrontImg(selectedImageUri);
            } else if (type === 'back') {
                setLicenseBackImg(selectedImageUri);
            }
        }
    };

    const handleUploadLicense = async () => {
        if (!licenseFrontImg || !licenseBackImg) {
            Alert.alert('Error', 'Please select both front and back images');
            return;
        }

        const formData = new FormData();
        const frontFileType = licenseFrontImg.substring(licenseFrontImg.lastIndexOf(".") + 1);
        const backFileType = licenseBackImg.substring(licenseBackImg.lastIndexOf(".") + 1);

        formData.append('licenseImg', {
            name: `license-front.${frontFileType}`,
            uri: licenseFrontImg,
            type: `image/${frontFileType}`,
        });

        formData.append('licenseImg', {
            name: `license-back.${backFileType}`,
            uri: licenseBackImg,
            type: `image/${backFileType}`,
        });

        setUploadStatusLicense({ loading: true, error: null, success: false });

        try {
            const response = await axios.post('http://192.168.0.180:3000/api/v1/user/uploadDrivingLicense', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setUploadStatusLicense({ loading: false, error: null, success: true });
                Alert.alert("Success", "License images uploaded successfully.");
            }
        } catch (error) {
            setUploadStatusLicense({ loading: false, error: error.message, success: false });
            Alert.alert("Error", "Failed to upload the images.");
        }
    };


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
                                <Image
                                    source={profileImg ? { uri: profileImg } : icons.user}
                                    className="w-[100px]  h-[100px]  rounded-full"
                                    resizeMode='contain'
                                />

                                <TouchableOpacity onPress={handleImageSelectionAndUpload} >
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
                                    <TouchableOpacity onPress={() => { handleLicenseImageSelection('front') }}>
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
                                <TouchableOpacity onPress={() => { handleLicenseImageSelection('back') }}>
                                    <View>
                                        <Text className="font-medium text-sm text-primary">Choose file </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <CustomButton
                            title="Save Changes"
                            handlePress={handleUploadLicense}
                            containerStyles=" justify-center items-center w-full mt-6 bg-primary"
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default profile;
