import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";
import GameRing from './GameRing';
import ContextPanel from "./ContextPanel";
import {getGameId, getNickname, setGameId} from "../storage";

const useFetchRule = async (ruleId) => {
    try {
        const response = await fetch(`/get_rule/${ruleId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    } catch (error) {
        return null
    } finally {
        return null
    }
};

const parserJson = (ruleData) => {
    const { field_amount, fields, streets } = ruleData;
    const fieldNames = fields.map(field => field.name);
    const streetIds = fields.map(field => field.street_id);
    const colors = Object.values(streets).map(street => street.color);
    let streetColors = []
    for (let i = 0; i < field_amount; i++){
        if(streetIds[i] === -1) {
            streetColors.push('white');
        }
        else{
            streetColors.push(colors[streetIds[i] - 1]);
        }

    }
    return {field_amount, fieldNames, streetColors};
}


class GameScreen extends React.Component {
    state = {
        game_id: null,
        isGameStarted: false,
        field_data: null,
        field_number: null,
        field_colours: null,
        field_names: null,
    };

    handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };

    handleInputChange = (text) => {
        this.setState({ game_id: text });
    };

    startGame = () => {
        console.log("Game ID:", this.state.game_id);
        const ruleData = useFetchRule(1);
        const result = parserJson(ruleData);
        this.setState({
            game_id : this.state.game_id,
            isGameStarted: true,
            field_data: ruleData,
            field_number: result.field_amount,
            field_colours: result.streetColors,
            field_names: result.fieldNames,
        })
        console.log(this.state.field_number)
        console.log(this.state.field_colours)
        console.log(this.state.field_names)
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

        if(game_id == null){
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
                        numSectors={this.state.field_number}
                        onClick={this.handleSectorClick}
                        playersNumber={4}
                        playersPositions={[0, 1, 0, 0]}
                        sectorNames={this.state.field_names}
                        sectorColours={this.state.field_colours}
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
