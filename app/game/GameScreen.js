import React from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";
import GameRing from './GameRing';
import ContextPanel from "./ContextPanel";
import {getGameId, getNickname, setGameId} from "../storage";


class GameScreen extends React.Component {
    state = {
        game_id: null,
        isGameStarted: false,
    };

    handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };

    handleInputChange = (text) => {
        this.setState({ game_id: text });
    };

    startGame = () => {
        console.log("Game ID:", this.state.game_id);
        this.setState({ isGameStarted: true });
    };

    renderInputScreen = () => {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Game ID"
                    onChangeText={this.handleInputChange}
                />
                <Button
                    title="Start Game"
                    onPress={this.startGame}
                />
            </View>
        );
    };

    renderGameContent = () => {
        let game_id = getGameId();

        if(game_id != null){
            this.setState({ game_id: game_id });
            this.setState({ isGameStarted: true });
        } else {
            if (!this.state.isGameStarted) {
                return this.renderInputScreen();
            }
        }

        let nickname = getNickname(); // TODO: Get info from backend

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <ContextPanel
                        playersNumber={4}
                        playersMoney={[100, 12, 3114, 15]}
                        playersAvatar={[null, null, null, null]}
                        playersNames={["NextB", "Andrew", "Lahunou", "AlSkvar"]}
                        width={150}
                        height={800}
                        lastRolls={[1, 1]}
                        currentPlayer={3}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <GameRing
                        radius={350}
                        numSectors={20}
                        onClick={this.handleSectorClick}
                        playersNumber={4}
                        playersPositions={[0, 1, 0, 0]}
                        sectorNames={['Ulica Huilica 228 1347 sdas', 'Andrew', 'Denis', 'AlSkvar', 'Anton']}
                        moves={[[], [], [], []]}
                    />
                </View>
            </View>
        );
    };

    render() {
        return this.renderGameContent();
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
        backgroundColor: "lightblue",
        justifyContent: 'center',
        alignItems: "flex-start",
        paddingLeft: 10, // No need for quotes around numbers
    },
    rightContainer: {
        flex: 1,
        flexGrow: 3,
        backgroundColor: "lightblue",
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
});

export default GameScreen;
