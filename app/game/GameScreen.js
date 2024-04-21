import React from 'react';
import {View, StyleSheet} from "react-native";
import GameRing from './GameRing';
import ContextPanel from "./ContextPanel";



class GameScreen extends React.Component {

    handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <ContextPanel playersNumber={4} playersMoney={[100, 12, 3114, 15]} playersAvatar={[null, null, null, null]}
                                  playersNames={["NextB", "Andrew", "Lahunou", "AlSkvar"]} width={150} height={800} lastRolls={[1, 1]}
                                  currentPlayer={3}
                    ></ContextPanel>
                </View>
                <View style={styles.rightContainer}>
                    <GameRing radius={350} numSectors={20} onClick={this.handleSectorClick} playersNumber={4} playersPositions={[0, 0, 0, 0]} sectorNames={['Ulica Huilica 228 1347 sdas', 'Andrew', 'Denis', 'AlSkvar', 'Anton']} />
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
        flexGrow: 2,
        backgroundColor: "lightblue", // Example background color
        justifyContent: 'center',
        alignItems: "flex-end",
        paddingRight: '100px',
    },
    rightContainer: {
        flex: 1,
        flexGrow: 3,
        backgroundColor: "lightblue", // Example background color
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

export default GameScreen;
