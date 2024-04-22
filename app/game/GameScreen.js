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

const parseJsonPlayers = (gameData) => {

    console.log("Game data:", gameData)
    if(gameData !== null && gameData["players_positions"] !== undefined) {
        console.log("Players positions:", gameData.players_positions)
        const players = Object.values(gameData.players);
        const playersPositions = Object.values(gameData.players_positions);
        const playersMoney = Object.values(gameData.players_money);
        const lastRolls = gameData.last_rolls;
        const fieldLevels = Object.values(gameData.fields_owners_with_levels).map(field => field[1]);
        const fieldOwnersIndices = Object.values(gameData.fields_owners_with_levels).map(owner => owner[0]);
        const activePlayerIndex = players.indexOf(gameData.active_player);
        const activePlayer = gameData.active_player.toString();
        const actionBuy = gameData.actions.buy;
        const actionEndTurn = gameData.actions.end_turn;
        const actionRoll = gameData.actions.roll;
        const actionSell = gameData.actions.sell;
        const actionPay = gameData.actions.pay;
        const actionUpgrade = gameData.actions.upgrade;
        const actionSurrender = gameData.actions.surrender;
        return {players, playersPositions, playersMoney, lastRolls, fieldLevels, fieldOwnersIndices, activePlayerIndex, actionBuy, actionEndTurn, actionRoll, actionSell, actionPay, actionUpgrade, actionSurrender, activePlayer}

    } else {
        let players = [getNickname()]
        if(gameData !== null && gameData["players"] !== undefined && gameData["players"]){
            players = Object.values(gameData.players)
        }
        const playersMoney = Array(players.length).fill(0);
        const playersPositions =  Array(players.length).fill(0);
        const lastRolls = [0, 0]
        return {
            players, playersPositions, playersMoney, lastRolls,
        }
    }




}

const GameScreen = () => {
    const [state, setState] = useState({
        game_id: null,
        isGameStarted: false,
        isGameStartedByHost: false,
        field_data: null,
        field_number: null,
        field_colours: null,
        field_names: null,
    });

    const handleSectorClick = (sectorIndex) => {
        console.log(`Clicked sector ${sectorIndex + 1}`);
    };
    const [text, setText] = useState("");

    const handleInputChange = (text) => {
        setText(text);
    };

    const handleCreateGame = async () => {
        try {
            const response = await fetch(`http://localhost:8000/create/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            console.log(data);
            handleInputChange(data);
            return data;
        } catch (error) {
            return null
        }
    }

    const onStart = async () => {
        try {
            const response = await fetch(`http://localhost:8000/start_game/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //const data = await response.json();
            //return data
        } catch (error) {
            return null
        }
    }

    const rollDice = async () => {
        try {
            const response = await fetch(`http://localhost:8000/roll/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //const data = await response.json();
            //return data
        } catch (error) {
            return null
        }
    }

    const buyField = async () => {
        try {
            const response = await fetch(`http://localhost:8000/buy/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const upgradeField = async (fieldId) => {
        try {
            const response = await fetch(`http://localhost:8000/upgrade/${state.game_id}/${getNickname()}/${fieldId}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const sellField = async (fieldId) =>{
        try {
            const response = await fetch(`http://localhost:8000/upgrade/${state.game_id}/${getNickname()}/${fieldId}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const payField = async () =>{
        try {
            const response = await fetch(`http://localhost:8000/pay/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const endTurn = async () =>{
        try {
            const response = await fetch(`http://localhost:8000/end_turn/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const giveUp = async () =>{
        try {
            const response = await fetch(`http://localhost:8000/surrender/${state.game_id}/${getNickname()}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            return null
        }
    }

    const [message, setMessages] = useState(null);
    const [socket, setSocket] = useState(null);
    const [socketID, setSocketID] = useState(0);

    useEffect(() => {
        if(state.isGameStarted && state.game_id !== socketID) {
            setSocketID(state.game_id)
            const ws = new WebSocket(`ws://localhost:8000/connect/${getNickname()}/${state.game_id}`);

            ws.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.onmessage = (event) => {
                let data = JSON.parse(event.data)
                setMessages(data);
                console.log(data)
                console.log(data['players_positions'] != null)
                if(data['players_positions'] != null && !state.isGameStartedByHost){
                    console.log("HERE")
                   setState({
                       game_id: state.game_id,
                       isGameStarted: state.isGameStarted,
                       field_data: state.field_data,
                       field_number: state.field_number,
                       field_colours: state.field_colours,
                       field_names: state.field_names,
                       isGameStartedByHost: true,
                   })
                }
            };

            ws.onclose = () => {
                console.log('WebSocket closed');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            setSocket(ws);

            return () => {
                //ws.close();
            };
        }
    }, [state]);


    console.log(message)
    const startGame = async () => {
        console.log("Game ID:", text);
        const ruleData = await useFetchRule(1);
        const result = parserJson(ruleData);


        setState({
            game_id: text,
            isGameStarted: true,
            field_data: ruleData,
            field_number: result.field_amount,
            field_colours: result.streetColors,
            field_names: result.fieldNames,
            isGameStartedByHost: false,
        })


        console.log(state.field_number)
        console.log(state.field_colours)
        console.log(state.field_names)
    };

    const renderInputScreen = () => {
        console.log("HERE")
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Game ID"
                    value={text}
                    onChangeText={handleInputChange}
                />
                <Button
                    title="Start Game"
                    onPress={startGame}
                />
                <Button
                    title="Create Game"
                    onPress={handleCreateGame}
                />
            </View>
        );
    };

    const renderGameContent = () => {
        let game_id = getGameId();

        if(game_id != null){
            setState({
                game_id: game_id,
                isGameStarted: true,
                isGameStartedByHost: false,
                field_data: null,
                field_number: null,
                field_colours: null,
                field_names: null,
            });
        } else {
            if (!state.isGameStarted) {
                return renderInputScreen();
            }
        }

        const info = parseJsonPlayers(message)
        console.log("INFO:", info)
        console.log(info.players.length)
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <ContextPanel
                        playersNumber={info.players.length}
                        playersMoney={info.playersMoney}
                        playersAvatar={[null, null, null, null]}
                        playersNames={info.players}
                        width={150}
                        height={800}
                        lastRolls={info.lastRolls}
                        currentPlayer={info.activePlayer}
                        currentPlayerIndex={info.activePlayerIndex}
                        gameStarted={state.isGameStartedByHost}
                        onStart={onStart}
                        onGiveUp={giveUp}
                        giveUp={info.actionSurrender}
                        onEndTurn={endTurn}
                        endTurn={info.actionEndTurn}
                        rollDice={rollDice}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <GameRing
                        radius={350}
                        numSectors={state.field_number}
                        onClick={handleSectorClick}
                        playersNumber={info.players.length}
                        playersPositions={info.playersPositions}
                        sectorNames={state.field_names}
                        sectorColours={state.field_colours}
                        buyField={buyField}
                        sellField={sellField}
                        upgradeFiled={upgradeField}
                        payField={payField}
                        currentPlayer={info.activePlayer}
                        currentPlayerIndex={info.activePlayerIndex}
                        actionMovesSell={info.actionSell}
                        actionMoveUpgrade={info.actionUpgrade}
                        actionMoveBuy={info.actionBuy}
                        actionMovePay={info.actionPay}
                    />
                </View>
            </View>
        );
    };

    return renderGameContent();
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
