import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ExploreScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore Screen</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Properties")}>
                <Text style={styles.buttonText}>Go to Properties</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "Rubik-Bold",
        color: "#333",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "royalblue",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 2 },
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "Rubik-Medium",
        color: "#fff",
    },
});
