import { View, Text, TextInput, FlatList, Image, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Pressable, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [LicenseModalVisible, setLicenseModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('front');

    // Fetch user profile data
    const fetchUserDetails = async () => {
        const { data: userData, loading, error } = useApi(`http://${process.env.IP_ADDRESS}:3000/api/v1/user/userProfile`);
        console.log('userData', userData)
    }


    const onRefresh = async () => {
        setRefreshing(true)
        //load data
        fetchUserDetails()
        setRefreshing(false)
    }
    const handleSaveChanges = async () => {
        const formData = new FormData();
        if (!name || !email || !phoneNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        if (!licenseFrontImg || !licenseBackImg) {
            Alert.alert('Error', 'Please select both front and back images');
            return;
        }

        // Append user details
        formData.append('username', name);
        formData.append('email', email);
        formData.append('contactNumber', phoneNumber);  // Match this with backend field

        const frontFileType = licenseFrontImg.substring(licenseFrontImg.lastIndexOf(".") + 1);
        const backFileType = licenseBackImg.substring(licenseBackImg.lastIndexOf(".") + 1);
        console.log('front and back file type', frontFileType, backFileType)

        formData.append('licenseImg', {
            name: `license-front.${frontFileType} `,
            uri: licenseFrontImg,
            type: `image/${frontFileType} `,
        });

        formData.append('licenseImg', {
            name: `license-back.${backFileType} `,
            uri: licenseBackImg,
            type: `image/${backFileType} `,
        });

        setUploadStatusLicense({ loading: true, error: null, success: false });
        console.log('license uplaod function', formData)

        try {
            // Send the form data to the backend
            const response = await axios.post(`http://${process.env.IP_ADDRESS}:3000/api/v1/user/uploadDrivingLicense`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success
            if (response.status === 200 || response.status === 201) {  // Check for both 200 and 201
                setUploadStatusLicense({ loading: false, error: null, success: true });
                Alert.alert("Success", "Details saved successfully.");
            } else {
                throw new Error("Failed to save details. Please try again.");
            }
        } catch (error) {
            // Handle error
            setUploadStatusLicense({ loading: false, error: error.message, success: false });
            console.log('Upload status:', uploadStatusLicense);
            Alert.alert("Error", "Failed to save the details.");
        }
    };


    const { data: userData, loading, error } = useApi(`http://${process.env.IP_ADDRESS}:3000/api/v1/user/userProfile`);
    useEffect(() => {

        if (userData) {
            setName(userData.username);
            setEmail(userData.email);
            setPhoneNumber(userData.contact);
            if (userData.profileImg) {
                const formattedProfileImg = `http://${process.env.IP_ADDRESS}:3000/${userData.profileImg.replace(/\\/g, '/')}`;
                setProfileImg(formattedProfileImg);
                console.log('profile image', formattedProfileImg);
            } else {
                setProfileImg(null);
            }

            if (userData?.licence) {
                const formattedFrontImg = `http://${process.env.IP_ADDRESS}:3000/${userData.licence.frontImg.replace(/\\/g, '/')}`;
                const formattedBackImg = `http://${process.env.IP_ADDRESS}:3000/${userData.licence.backImg.replace(/\\/g, '/')}`;

                setLicenseFrontImg(formattedFrontImg);
                setLicenseBackImg(formattedBackImg);
                console.log('licenseFrontImg', formattedFrontImg);
                console.log('licenseBackImg', formattedBackImg);
            } else {
                setLicenseFrontImg(null);
                setLicenseBackImg(null);
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
            console.log("formData uplaod profile img", formData)
            setUploadStatusImage({ loading: true, error: null, success: false }); // Start upload

            try {
                const response = await axios.post(`http://${process.env.IP_ADDRESS}:3000/api/v1/user/uploadProfileImg`, formData, {
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
            console.log('profile image uri', selectedImageUri)
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
        console.log('result upload license', result)
        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            console.log('license image uri', type, selectedImageUri)
            if (type === 'front') {
                setLicenseFrontImg(selectedImageUri);
            } else if (type === 'back') {
                setLicenseBackImg(selectedImageUri);
            }
        }
    };

    // const handleUploadLicense = async () => {
    //     if (!licenseFrontImg || !licenseBackImg) {
    //         Alert.alert('Error', 'Please select both front and back images');
    //         return;
    //     }

    //     const formData = new FormData();
    //     const frontFileType = licenseFrontImg.substring(licenseFrontImg.lastIndexOf(".") + 1);
    //     const backFileType = licenseBackImg.substring(licenseBackImg.lastIndexOf(".") + 1);
    //     console.log('front and back file type', frontFileType, backFileType)

    //     formData.append('licenseImg', {
    //         name: `license-front.${frontFileType} `,
    //         uri: licenseFrontImg,
    //         type: `image/${frontFileType} `,
    //     });

    //     formData.append('licenseImg', {
    //         name: `license-back.${backFileType} `,
    //         uri: licenseBackImg,
    //         type: `image/${backFileType} `,
    //     });

    //     setUploadStatusLicense({ loading: true, error: null, success: false });
    //     console.log('license uplaod function', formData)

    //     try {
    //         const response = await axios.post(`http://${process.env.IP_ADDRESS}:3000/api/v1/user/uploadDrivingLicense`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         if (response.status === 200) {
    //             setUploadStatusLicense({ loading: false, error: null, success: true });
    //             Alert.alert("Success", "License images uploaded successfully.");
    //         }
    //     } catch (error) {
    //         setUploadStatusLicense({ loading: false, error: error.message, success: false });
    //         console.log(uploadStatusLicense)
    //         Alert.alert("Error", "Failed to upload the License.");
    //     }
    // };
    if (loading) {
        // Render a loading screen or component while data is being fetched
        return (
            <SafeAreaView className="bg-white h-full flex-1 justify-center items-center">
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    console.log(userData)
    console.log('front and back license img ', licenseFrontImg, 'and', licenseBackImg)
    console.log('profile img ', profileImg)
    return (

        <SafeAreaView className="bg-white h-full flex-1  ">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
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
                                <TouchableOpacity onPress={() => setModalVisible(true)} className="rounded-full border-2 border-black">
                                    <Image
                                        source={profileImg ? { uri: profileImg } : icons.user}
                                        className="w-[100px]  h-[100px]  rounded-full"
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>

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
                    {/* Modal for full-screen profile image view */}
                    <Modal visible={modalVisible} transparent={true} animationType="fade">
                        <Pressable onPress={() => setModalVisible(false)}
                            className="flex-1 justify-center items-center bg-black/70 "
                        >
                            <View>
                                {/* Close Icon */}
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}>
                                    <Image
                                        source={icons.close}  // Add a close icon here
                                        style={{ width: 30, height: 30 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>

                                {/* Conditionally Render the Profile Image */}
                                {profileImg && profileImg !== "" ? (
                                    <Image
                                        source={{ uri: profileImg }}
                                        style={{ width: 300, height: 300, borderRadius: 150 }}
                                        resizeMode="contain"
                                        onError={() => {
                                            console.warn("Failed to load image");
                                            setProfileImg(null);
                                        }}
                                    />
                                ) : (
                                    <Image
                                        source={icons.user}
                                        style={{ width: 300, height: 300, borderRadius: 150 }}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        </Pressable>
                    </Modal>


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
                                    placeholder=""
                                    placeholderTextColor="#505050"
                                    style={{ fontSize: 14 }}
                                    value={email}
                                    onChangeText={e => setEmail(e)}
                                />
                                <TouchableOpacity className="bg-[#FFF0B5] p-1  rounded" >
                                    <Text className="text-[10px] text-[#4D3D02] font-normal">Verify your mail</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View className="flex-col gap-y-2.5">
                            <Text className="font-normal text-xs text-[#858585]" >Upload your Licence</Text>
                            <TouchableOpacity onPress={() => {
                                setCurrentImage("front")
                                setLicenseModalVisible(true)

                            }}>
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
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setCurrentImage("back")
                                setLicenseModalVisible(true)
                            }}>
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
                            </TouchableOpacity>

                        </View>
                        {/* Modal for showing driving license front and back image  */}
                        <Modal visible={LicenseModalVisible} transparent={true} animationType="fade">
                            <Pressable onPress={() => setLicenseModalVisible(false)} className="flex-1 justify-center items-center bg-black/70">
                                <View>
                                    <TouchableOpacity onPress={() => setLicenseModalVisible(false)} style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}>
                                        <Image
                                            source={icons.close}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>

                                    {/* Conditionally Render the License Image */}
                                    {currentImage === 'front' && licenseFrontImg ? (
                                        <Image
                                            source={licenseFrontImg ? { uri: licenseFrontImg } : icons.docsUpload}
                                            style={{ width: 300, height: 400 }}
                                            resizeMode="contain"
                                            onError={() => setLicenseFrontImg(null)}
                                        />
                                    ) : currentImage === 'back' && licenseBackImg ? (
                                        <Image
                                            source={licenseBackImg ? { uri: licenseBackImg } : icons.docsUpload}
                                            style={{ width: 300, height: 400 }}
                                            resizeMode="contain"
                                            onError={() => setLicenseBackImg(null)}
                                        />
                                    ) : (
                                        <Text style={{ color: 'white' }}>No Image</Text>
                                    )}
                                </View>
                            </Pressable>
                        </Modal>



                        <CustomButton
                            title="Save Changes"
                            handlePress={handleSaveChanges}
                            containerStyles=" justify-center items-center w-full mt-6 bg-primary"
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default profile;
