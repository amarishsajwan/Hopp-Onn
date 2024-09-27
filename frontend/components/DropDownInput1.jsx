import { View, Text, TextInput, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { icons } from '../constants'


const DropdownComponent1 = ({ placeHolder, icon, locations, onSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState(placeHolder)
    const [isClicked, setIsClicked] = useState(false)
    const [data, setData] = useState([])
    const [oldData, setOldData] = useState([])
    const searchRef = useRef()
    console.log('data', data)
    useEffect(() => {
        setData(locations);
        setOldData(locations)
    }, [locations]);
    const onSearch = txt => {
        if (txt !== "") {
            let tempData = data.filter(item => {
                return item.name.toLowerCase().indexOf(txt.toLowerCase()) > -1
            })
            setData(tempData)
        }
        else {
            setData(oldData)
        }
    }
    // Close dropdown when clicking outside
    const handleOutsideClick = () => {
        if (isClicked) {
            setIsClicked(false); // Close dropdown
        }
    }
    const handleLocationSelect = (location) => {
        onSelect(location); // Call the callback with the selected location
    };
    return (

        <View className="flex">
            <TouchableOpacity className="w-[90%] h-12 rounded-md bg-[#F9F9F9] border-1 border-[#8e8e8e] mx-4 pl-2  items-center mt-3   flex-row"
                onPress={() => {
                    setIsClicked(!isClicked)
                    onSearch("")
                }}
            >
                <Image
                    source={icon}
                    className="w-5  h-5 "
                    resizeMode='contain'
                />
                <Text className="text-[#9ca3af] w-[80%] p-3 font-base  text-sm">{selectedLocation}</Text>
                {isClicked ? (<Image source={icons.up}
                    className="w-5 h-5"
                />) : (<Image source={icons.down}
                    className="w-5 h-5"
                />)}

            </TouchableOpacity>
            {isClicked ? (
                <View className="w-[90%] h-[300px] shadow-md mt-4 shadow-black bg-white self-center rounded-md">
                    {/* Search Input */}
                    <TextInput
                        className="w-[90%] h-12 rounded-lg border-[0.5px] border-[#8e8e8e] self-center mt-5 pl-4"
                        placeholder="Search"
                        onChangeText={txt => {
                            onSearch(txt.trim())
                        }}
                        ref={searchRef}
                    />
                    {/* FlatList for dropdown options */}
                    <FlatList
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedLocation(item.name)
                                        handleLocationSelect(item.name)
                                        setIsClicked(false)
                                        searchRef.current.clear()
                                        onSearch("")
                                    }}
                                    className="w-[85%] h-12 border-b-[0.2px] border-b-[#8e8e8e] self-center justify-center"
                                >
                                    <Text className="text-black pl-4">{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            ) : null}
        </View>
    )
}

export default DropdownComponent1