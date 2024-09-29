import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent2 = ({ placeHolder, icon, locations = [], onSelect = "" }) => {
    const [value, setValue] = useState(null);

    // Populate the dropdown with locations once they are available
    useEffect(() => {
        if (locations?.length > 0) {
            setValue(locations);  // Set an initial value if locations are available
        }
    }, [locations]);
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={locations}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={placeHolder}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.id);
                onSelect(item.id);
            }}
            renderLeftIcon={() => (
                <View style={styles.icon}>

                    <Image
                        source={icon}
                        className="w-5  h-5 "
                        resizeMode='contain'
                    />
                </View>
            )}
        />
    );
};

export default DropdownComponent2;

const styles = StyleSheet.create({
    dropdown: {
        margin: 8,
        height: 50,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        width: 270

    },
    icon: {
        marginLeft: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#9ca3af',
        marginLeft: 8,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,

    },
    iconStyle: {
        width: 20,
        height: 20,

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,

    },
});