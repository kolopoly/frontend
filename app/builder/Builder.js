import React, {useState} from 'react';
import {View, StyleSheet} from "react-native";
import BuilderRing from './BuilderRing';
import Slider from "rc-slider";
import CardPanel from './CardPanel';
import ContextPanel from "../game/ContextPanel";
import GameRing from "../game/GameRing";

const Builder = () => {



    const handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>

                    <CardPanel amount={15}/>
            </View>

            <View style={styles.rightContainer}>
                <BuilderRing radius={350} onClick={handleSectorClick} />
                </View>
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(191,230,196,255)",
    },
    leftContainer: {
        flex: 1,
        flexGrow: 2,
        backgroundColor: "rgba(191,230,196,255)",
        justifyContent: 'center',
        alignItems: "center",
        paddingLeft: 10,
        marginRight: 40,
    },
    rightContainer: {
        flex: 1,
        flexGrow: 3,
        backgroundColor: "rgba(191,230,196,255)",
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    slider: {
        width: '50%', // Set the width to 50% of the parent container
        alignSelf: 'center',
    },
});


export default Builder;
