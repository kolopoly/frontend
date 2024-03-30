import React from "react";
import {View, StyleSheet} from "react-native";
import Canvas from "./Canvas";

const Builder = () => (

    <View style={styles.container}>
        <View style={styles.leftContainer}></View>
        <View style={styles.rightContainer}>
            <Canvas/>
        </View>
    </View>

);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    leftContainer: {
        flex: 1,
        backgroundColor: "white", // Example background color
    },
    rightContainer: {
        flex: 1,
        backgroundColor: "white", // Example background color
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

export default Builder;
