import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Explore")}>
                <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Properties", { id: 1 })}>
                <Text style={styles.buttonText}>Properties</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 24,
        fontFamily: "Rubik-Bold",
        marginBottom: 20,
        color: "#333",
    },
    button: {
        backgroundColor: "royalblue",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginVertical: 8,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "Rubik-Medium",
        color: "white",
    },
});

export default HomeScreen;
