import React from "react";
import { StyleSheet, View, Image, Dimensions, Text, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../lib/global-provider";
import { login } from "../lib/appwrite";

const { width, height } = Dimensions.get("window");
const OnboardingImage = require("../assets/images/onboarding.png");
const googleIcon = require('../assets/icons/google.png')


const SignInScreen = ({ navigation }) => {

    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if (!loading && isLoggedIn) return <Redirect href="/" />;

    const handleLogin = async () => {
        try {
            const result = await login();
            if (result) {
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
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Image
                        source={OnboardingImage}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Section */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome To RealEstate</Text>
                    <Text style={styles.desc}>Let's Get You Closer To {'\n'}</Text>
                    <Text style={styles.desc2}>Your Ideal Home</Text>
                    <Text style={styles.loginText}>Login to ReState with Google</Text>

                    <View style={styles.shadowContainer}>

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
    scrollContainer: {
        // flexGrow: 1,  // ✅ Ensures scrolling works properly
    },
    imageContainer: {
        width: "100%",
        height: height * 0.7,  // ✅ Image occupies 60% of screen height
        overflow: "hidden",  // ✅ Ensures image doesn't stretch outside
    },
    image: {
        width: "100%",
        height: "100%",  // ✅ Slightly increased to shift the image up
        marginTop: '9%'
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
        paddingTop: 0,
        marginTop: -7,
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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

        // ✅ Shadow in all directions (For Android & iOS)
        backgroundColor: "white", // Transparent black for soft shadow
        borderRadius: 30, // Same as button to match shape
        padding: 5, // Extra padding to extend the shadow effect
    },
    handleLoginButton: {
        flexDirection: "row", // Align icon & text in a row
        alignItems: "center", // Center items vertically
        justifyContent: "center", // Center items horizontally
        backgroundColor: "white",
        borderRadius: 25, // Slightly smaller rounded edges
        paddingVertical: 12,
        paddingHorizontal: 20, // Adjust padding to make button compact
        width: "100%", // Make button as wide as possible
        alignSelf: "center", // Center the button

        // ✅ Prevent text from wrapping
        flexWrap: "nowrap",

        // ✅ Android shadow (all directions)
        elevation: 8, // Increased for a more noticeable shadow

        // ✅ iOS shadow (all directions)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 }, // Center shadow evenly
        shadowOpacity: 0.25, // Adjust opacity for a soft look
        shadowRadius: 10, // Increase for a more spread-out shadow
    },

    buttonText: {
        fontSize: 14, // Slightly smaller text
        fontWeight: "bold",
        color: "black",
        flex: 1, // Allow text to take up space
        textAlign: "center", // Keep text centered
        minWidth: 200, // Ensure text doesn’t shrink too much 
    },

    googleImage: {
        width: 24, // Adjust size for better proportion
        height: 25,
        marginRight: 10, // Space between icon and text
        marginLeft: 10,
    },


});