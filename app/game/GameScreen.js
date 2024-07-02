import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity, Text } from "react-native"; // Убедитесь, что Text импортирован из 'react-native'
import GameRing from './GameRing';
import ContextPanel from "./ContextPanel";
import {getGameId, getNickname, setGameId} from "../storage";
import {backend, wsbackend} from "../backend"
import WinnerPanel from "./WinnerPanel";
const localImage = require('../../assets/MainBackground.jpeg');

const useFetchRule = async (gameId) => {
    try {
        const response = await fetch(`${backend}/get_rule_by_game_id/${gameId}`);
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
    const { field_amount, fields } = ruleData;
    const fieldNames = fields.map(field => field.name);
    const fieldTypes = fields.map(field => field.type)
    const fieldsColors = fields.map(field => field.color);
    const fees = fields.map(fields => fields.fees);
    const sellPrice = fields.map(fields => fields.sell_price ?? 0);
    const buyPrice = fields.map(fields => fields.escape_price != null ? fields.escape_price : fields.buy_price);
    const upgradePrice = fields.map(fields => fields.upgrade_price);

    return {field_amount, fieldNames, fieldTypes, fieldsColors, sellPrice, fees, buyPrice, upgradePrice};
}

const parseJsonPlayers = (gameData, field_amount) => {
    console.log(gameData)
    if(gameData !== null && gameData["players_positions"] !== undefined) {
        console.log("Players positions:", gameData.players_positions)
        const players = Object.values(gameData.players);
        const playersPositions = Object.values(gameData.players_positions);
        const playersMoney = Object.values(gameData.players_money);
        var lastRolls = gameData.last_rolls;
        const fieldLevels = Object.values(gameData.fields_owners_with_levels).map(field => field[1]);
        const fieldOwners = Object.values(gameData.fields_owners_with_levels).map(owner => owner[0] != null ? players.indexOf(owner[0]) : -1);
        const activePlayerIndex = players.indexOf(gameData.active_player);
        const activePlayer = gameData.active_player.toString();
        const actionBuy = gameData.actions.buy;
        const actionTrade = gameData.actions.action_trade;
        const actionAcceptTrade = gameData.actions.action_answer_trade;
        console.log(gameData)
        console.log("gameData.trade", gameData.trade)
        let trade = gameData.trade;
        if(!actionAcceptTrade) {
            trade = {
                fields: []
            }
        }
        if(lastRolls[0] === 0){
            lastRolls = [1, 1]
        }
        const actionEndTurn = gameData.actions.end_turn;
        const actionRoll = gameData.actions.roll;
        const actionSell = gameData.actions.sell;
        const actionPay = gameData.actions.pay;
        const actionUpgrade = gameData.actions.upgrade;
        const actionSurrender = gameData.actions.surrender;
        return {players, playersPositions, playersMoney, lastRolls, fieldLevels, fieldOwners, activePlayerIndex, actionBuy, actionEndTurn, actionRoll, actionSell, actionPay, actionUpgrade, actionSurrender, activePlayer, actionAcceptTrade, actionTrade, trade}
    } else {
        let players = [getNickname()]
        if(gameData !== null && gameData["players"] !== undefined && gameData["players"]){
            players = Object.values(gameData.players)
        }
        const playersMoney = Array(players.length).fill(0);
        const playersPositions =  Array(players.length).fill(0);
        const lastRolls = [1, 1]
        return {
            players, playersPositions, playersMoney, lastRolls,
        }
    }




}

const GameScreen = ({width, height, scale}) => {
    const audioRef = useRef(null);
    const [winner, setWinner] = useState(null);

    const [state, setState] = useState({
        game_id: null,
        isGameStarted: false,
        isGameStartedByHost: false,
        field_data: null,
        field_number: 0,
        field_colours: null,
        field_names: null,
        field_types: null,
        fees: null,
        sell_price: null,
        buy_price: null,
        upgrade_price: null,
    });
    const [trade, setTrade] = useState({
        clicked: false,
        with: 0,
        amount: "",
        playerFields: [],
    })


    const [text, setText] = useState("");
    const [textRuleID, setTextRuleID] = useState("");


    const handleInputChange = (text) => {
        setText(text);
    };

    const handleRuleInputChange = (text) => {
        setTextRuleID(text);
    };
    const handleCreateGame = async () => {
        try {
            let rule = textRuleID
            if(rule === "") {
                rule = "1"
            }
            const response = await fetch(`${backend}/create/${getNickname()}/${rule}`);
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
            const response = await fetch(`${backend}/start_game/${state.game_id}/${getNickname()}`);
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

    const sendTrade = async (trade) => {
        trade['game_id'] = state.game_id
        try {
            const response = await fetch(`${backend}/request_trade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trade)
            });
            setTrade({clicked: false,
                with: 0,
                amount: "",
                playerFields: [],})
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

    const sendAccept = async (trade, answer) => {
        try {
            const response = await fetch(`${backend}/answer_trade/${state.game_id}/${getNickname()}/${trade["trade_id"]}/${answer}`);
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

    const onTrade = async (trade) => {
        setTrade(trade)
    }

    const rollDice = async () => {
        const x = new Audio(`${backend}/assets/dice.mp3`)
        x.play()

        try {
            const response = await fetch(`${backend}/roll/${state.game_id}/${getNickname()}`);
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
            const response = await fetch(`${backend}/buy/${state.game_id}/${getNickname()}`);
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
            const response = await fetch(`${backend}/upgrade/${state.game_id}/${getNickname()}/${fieldId}`);
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
            const response = await fetch(`${backend}/sell/${state.game_id}/${getNickname()}/${fieldId}`);
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
            const response = await fetch(`${backend}/pay/${state.game_id}/${getNickname()}`);
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
            const response = await fetch(`${backend}/end_turn/${state.game_id}/${getNickname()}`);
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
            const response = await fetch(`${backend}/surrender/${state.game_id}/${getNickname()}`);
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
    const [retr, setRetr] = useState(0);

    useEffect(() => {
        if(state.isGameStarted && state.game_id !== socketID) {
            setSocketID(state.game_id)
            const ws = new WebSocket(`${wsbackend}/connect/${getNickname()}/${state.game_id}`);
            console.log("reconnect")
            ws.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.onmessage = (event) => {
                let data = JSON.parse(event.data)
                setMessages(data);
                if(data['players_positions'] != null && !state.isGameStartedByHost){
                   setState({
                       game_id: state.game_id,
                       isGameStarted: state.isGameStarted,
                       field_data: state.field_data,
                       field_number: state.field_number,
                       field_colours: state.field_colours,
                       field_names: state.field_names,
                       field_types: state.field_types,
                       isGameStartedByHost: true,
                       fees: state.fees,
                       upgrade_price: state.upgrade_price,
                       buy_price: state.buy_price,
                       sell_price: state.sell_price,
                   })
                }
                console.log(data['winner'])
                if(data['winner'] !== -1){
                    setWinner(data['winner']);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket closed');
                if(state.isGameStarted && state.game_id !== socketID) {
                    setRetr(retr + 1)
                    console.error('Retry to connect:', retr);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                if(state.isGameStarted && state.game_id !== socketID) {
                    setRetr(retr + 1)
                    console.error('Retry to connect:', retr);
                }
            };

            setSocket(ws);

            return () => {
                //ws.close();
            };
        }
    }, [state, retr]);

    const startGame = async () => {
        console.log("Game ID:", text);
        const ruleData = await useFetchRule(text);
        const result = parserJson(ruleData);

        setState({
            game_id: text,
            isGameStarted: true,
            field_data: ruleData,
            field_number: result.field_amount,
            field_colours: result.fieldsColors,
            field_names: result.fieldNames,
            field_types: result.fieldTypes,
            fees: result.fees,
            upgrade_price: result.upgradePrice,
            buy_price: result.buyPrice,
            sell_price: result.sellPrice,
            isGameStartedByHost: false,
        })

    };

    const renderInputScreen = () => {
        return (
            <View style={[styles.inputScreenContainer, {width: width, height: height}]}>
                <ImageBackground
                    source={localImage}
                    style={styles.image}
                    blurRadius={5}
                    resizeMode="stretch"
                >
                    <View style={[styles.contentContainer, {padding: 20 * scale, margin: 20 * scale, borderRadius: 20 * scale}]}>
                        <TextInput
                            style={[styles.input, {width: 250 * scale, height: 50 * scale, marginBottom: 20 * scale, paddingHorizontal: 20 * scale, borderRadius: 25 * scale, fontSize: 16 * scale, }]}
                            placeholder="Enter Rule ID"
                            value={textRuleID}
                            onChangeText={handleRuleInputChange}
                        />
                        <TouchableOpacity style={[styles.button, {paddingVertical: 15 * scale, paddingHorizontal: 25 * scale, borderRadius: 25 * scale, marginBottom: 28 * scale}]} onPress={handleCreateGame}>
                            <Text style={[styles.buttonText, { fontSize: 18 * scale}]}>Create Game</Text>
                        </TouchableOpacity>
                        <View style={{margin: 10 * scale}} />
                        <TextInput
                            style={[styles.input, {width: 250 * scale, height: 50 * scale, marginBottom: 20 * scale, paddingHorizontal: 20 * scale, borderRadius: 25 * scale, fontSize: 16 * scale, }]}
                            placeholder="Enter Game ID"
                            value={text}
                            onChangeText={handleInputChange}
                        />
                        <TouchableOpacity style={[styles.button, {paddingVertical: 15 * scale, paddingHorizontal: 25 * scale, borderRadius: 25 * scale, marginBottom: 28 * scale}]} onPress={startGame}>
                            <Text style={[styles.buttonText, { fontSize: 18 * scale}]}>Join Game</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    let container ={
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(191,230,196,255)",
    }

    let  globalContainer= {
        backgroundColor: "rgba(191,230,196,255)",
        alignItems: "center",
        width: width,
        height: height,
    }

    const renderGameContent = () => {
        let game_id = getGameId();

        if(game_id != null){
            setState({
                game_id: game_id,
                isGameStarted: true,
                isGameStartedByHost: false,
                field_data: null,
                field_number: 0,
                field_colours: null,
                field_names: null,
                field_types: null,
            });
        } else {
            if (!state.isGameStarted) {
                return renderInputScreen();
            }
        }

        const info = parseJsonPlayers(message, state.field_number)
        console.log(info.players.length)
        return (
            <div style={globalContainer}>
                <WinnerPanel winner={winner} lost={winner != null && winner.toString() !== getNickname()} scale={scale}/>
                <View style={container}>
                    <View style={[styles.leftContainer, {paddingLeft: 10 * scale, marginRight: 40 * scale}]}>
                        <ContextPanel
                            gameId={state.game_id}
                            playersNumber={info.players.length}
                            playersMoney={info.playersMoney}
                            playersAvatar={[null, null, null, null]}
                            playersNames={info.players}
                            width={width * 0.3}
                            height={height}
                            scale={scale}
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
                            rollDiceMove={info.actionRoll}
                            trade={info.actionTrade}
                            onTrade={onTrade}
                            tradeInfo={trade}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        {state.isGameStartedByHost && <GameRing
                            radius={width * 0.25}
                            scale={scale}
                            numSectors={state.field_number}
                            playersNumber={info.players.length}
                            playersPositions={info.playersPositions}
                            sectorNames={state.field_names}
                            sectorTypes={state.field_types}
                            sectorColours={state.field_colours}
                            fees={state.fees}
                            buyPrice={state.buy_price}
                            sellPrice={state.sell_price}
                            upgradePrice={state.upgrade_price}
                            fieldLevels={info.fieldLevels}
                            fieldOwners={info.fieldOwners}
                            buyField={buyField}
                            sellField={sellField}
                            upgradeField={upgradeField}
                            payField={payField}
                            currentPlayer={info.activePlayer}
                            currentPlayerIndex={info.activePlayerIndex}
                            actionMovesSell={info.actionSell}
                            actionMoveUpgrade={info.actionUpgrade}
                            actionMoveBuy={info.actionBuy}
                            actionMovePay={info.actionPay}
                            tradeInfo={trade}
                            trade={info.trade}
                            playerNames={info.players}
                            playersMoney={info.playersMoney}
                            onTrade={onTrade}
                            sendTrade={sendTrade}
                            sendAccept={sendAccept}
                            acceptTrade={info.actionAcceptTrade}
                            acceptTradeTrade={info.trade}
                        />
                        }
                    </View>
                </View>
            </div>
        );
    };

    return renderGameContent();
}

const styles = StyleSheet.create({
    globalContainer: {
        backgroundColor: "rgba(191,230,196,255)",
        alignItems: "center",
    },
    leftContainer: {
        flex: 1,
        flexGrow: 2,
        backgroundColor: "rgba(191,230,196,255)",
        justifyContent: 'center',
        alignItems: "center",
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
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    button: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
    },

    inputScreenContainer: {
        flex: 1,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    },
    spacer: {
        margin: 10,
    },
});

export default GameScreen;
