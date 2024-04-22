import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";
import GameRing from './GameRing';
import ContextPanel from "./ContextPanel";
import {getGameId, getNickname, setGameId} from "../storage";
import io from 'socket.io-client';

const useFetchRule = async (ruleId) => {
    try {
        const response = await fetch(`http://localhost:8000/get_rule/${ruleId}`);
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    } catch (error) {
        return null
    }
};
let socket = null;
const webSocket = async (userId, gameId) => {
    const [message, setMessages] = useState(null);

    useEffect(() => {
        // Connect to WebSocket server
        socket = io(`ws://localhost:8000/connect/${userId}/${gameId}`);

        socket.on('message', (message) => {
            setMessages(message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return message.json();
}


const parserJson = (ruleData) => {
    console.log(ruleData)
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

const parseJsonPlayers = (playersData) => {
    const playersPositions = Object.values(gameData.players_positions);
    const playersMoney = Object.values(gameData.players_money);
    const lastRolls = gameData.last_rolls;
    const fieldLevels = Object.values(gameData.fields_owners_with_levels).map(field => field[1]);
    const fieldOwnersIndices = Object.values(gameData.fields_owners_with_levels).map(owner => owner[0]);
    const activePlayerIndex = Object.keys(gameData.players).indexOf(gameData.active_player.toString());
    const actionBuy = gameData.actions.buy;
    const actionEndTurn = gameData.actions.end_turn;
    const actionRoll = gameData.actions.roll;
    const actionSell = gameData.actions.sell;
    const actionPay = gameData.actions.pay;
    const actionUpgrade = gameData.actions.upgrade;

    return {playersPositions, playersMoney, lastRolls, fieldLevels, fieldOwnersIndices, activePlayerIndex, actionBuy, actionEndTurn, actionRoll, actionSell, actionPay, actionUpgrade}

}

class GameScreen extends React.Component {
    state = {
        game_id: null,
        isGameStarted: false,
        isGameStartedByHost: false,
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

    startGame = async () => {
        console.log("Game ID:", this.state.game_id);
        const ruleData = await useFetchRule(1);
        const result = parserJson(ruleData);

        const backendMessage = await webSocket(getNickname(), this.state.game_id)
        let gameStarted = false;
        if(backendMessage.players_position){
            gameStarted = true;
        }



        this.setState({
            game_id: this.state.game_id,
            isGameStarted: true,
            field_data: ruleData,
            field_number: result.field_amount,
            field_colours: result.streetColors,
            field_names: result.fieldNames,
            isGameStartedByHost: gameStarted,
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
                        gameStarted={this.state.isGameStartedByHost}
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
