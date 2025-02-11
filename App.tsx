import React, { useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import HomeScreen from "./components/homescreen";
import SignInScreen from "./components/signinscreen";
import ExploreScreen from "./components/explorescreen";
import ProfileScreen from "./components/profilescreen";
import PropertiesScreen from "./components/propertiesscreen";
import GlobalProvider from "./lib/global-provider";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Semibold": require("./assets/fonts/Rubik-SemiBold.ttf"),
  });

  // Hide splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GlobalProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Properties" component={PropertiesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
