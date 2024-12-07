import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
const SearchInput = ({ value, placeHolder, icon, handleTextChange }) => {
  return (
    <View className="flex-row mx-4 pl-2  items-center mt-3  rounded-md  bg-[#F9F9F9]">
      <Image source={icon} className="w-5  h-5 " resizeMode="contain" />

      <TextInput
        className="text-black w-[80%] p-3 font-base text-base"
        placeholder={placeHolder}
        placeholderTextColor="#9ca3af"
        style={{ fontSize: 14 }}
        value={value}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default SearchInput;
