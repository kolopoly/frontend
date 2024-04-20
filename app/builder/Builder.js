import React from 'react';
import {View, StyleSheet} from "react-native";
import RingField from './Test';



class Builder extends React.Component {

    handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}></View>
                <View style={styles.rightContainer}>
                <RingField radius={350} numSectors={20} onClick={this.handleSectorClick} />
                </View>
            </View>
        );
    }
}


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
        resizeMode: 'cover',
        justifyContent: 'center',
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
