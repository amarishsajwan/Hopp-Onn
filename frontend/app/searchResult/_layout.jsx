import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[query]"
          options={{
            headerShown: true,
            title: "Search Results",
          }}
        />
      </Stack>
      <StatusBar />
    </>
  );
};

export default AuthLayout;
