import React from "react";
import { StyleSheet, View, Image, Dimensions, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useGlobalContext } from "../lib/global-provider";
import { login } from "../lib/appwrite";  // ✅ Ensure login function is correctly implemented
import * as WebBrowser from "expo-web-browser";  // ✅ Helps in opening the OAuth screen

const { width, height } = Dimensions.get("window");
const OnboardingImage = require("../assets/images/onboarding.png");
const googleIcon = require('../assets/icons/google.png');

const SignInScreen = ({ navigation }) => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    // ✅ Ensure WebBrowser is properly configured to handle authentication
    WebBrowser.maybeCompleteAuthSession();

    // ✅ Function to handle Google Login
    const handleLogin = async () => {
        try {
            // ✅ Call the Appwrite login function
            const result = await login();

            if (result) {
                // ✅ Refresh global state after successful login
                refetch();
            } else {
                Alert.alert("Login Failed", "Could not authenticate with Google.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Image source={OnboardingImage} style={styles.image} resizeMode="contain" />
                </View>

                {/* Text Section */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome To RealEstate</Text>
                    <Text style={styles.desc}>Let's Get You Closer To {'\n'}</Text>
                    <Text style={styles.desc2}>Your Ideal Home</Text>
                    <Text style={styles.loginText}>Login to ReState with Google</Text>

                    <View style={styles.shadowContainer}>
                        {/* ✅ Button to trigger Google Login */}
                        <TouchableOpacity onPress={handleLogin} style={styles.handleLoginButton}>
                            <Image source={googleIcon} style={styles.googleImage} />
                            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
                                Continue With Google
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageContainer: {
        width: "100%",
        height: height * 0.7,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        marginTop: '9%',
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 13,
        fontWeight: "normal",
        color: "gray",
        textTransform: "uppercase",
        fontFamily: "Rubik-Regular",
        textAlign: "center",
    },
    desc: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
        textAlign: 'center',
        lineHeight: 32,
        marginBottom: -5,
    },
    desc2: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
        color: 'royalblue',
        textAlign: 'center',
    },
    loginText: {
        fontSize: 13,
        fontFamily: 'Rubik-Regular',
        color: 'gray',
        textAlign: 'center',
        paddingTop: 50,
        marginBottom: 15,
    },
    shadowContainer: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 5,
    },
    handleLoginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
        alignSelf: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        flex: 1,
        textAlign: "center",
        minWidth: 200,
    },
    googleImage: {
        width: 24,
        height: 25,
        marginRight: 10,
        marginLeft: 10,
    },
});
