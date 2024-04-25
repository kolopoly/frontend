import React, { useState } from 'react';
import Card from "./Card";
import {ScrollView, View, StyleSheet, Text} from "react-native";

const CardPanel = ({amount}) => {
    const ClassCard = ({ className }) => {
        return (
            <View style={styles.classCard}>
                <Text>{className}</Text>
            </View>
        );
    };

    const cards = []

    /*
    const panelStyle = {
        display: 'flex', // use flexbox layout
        flexDirection: 'column', // stack children vertically
        flexWrap: 'wrap', // allow wrapping of children if needed
        justifyContent: 'center', // center children along the main axis
        gap: '25px', // space between playersPanels
        width: width,
        height: height,
        backgroundColor: 'transparent'
    }
    */
    /*
    const buttonStyle = {
        width: width,
        height: height / 8,
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        borderBottomRightRadius: '10%',
        borderBottomLeftRadius: '10%',
        borderTopRightRadius: '10%',
        borderTopLeftRadius: '10%',
        padding: '5px',
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap', // allow wrapping of children if needed
        justifyContent: 'center', // center children along the main axis
        alignItems:'center',
        gap: '10px',
    }
    */
    /*
    const diceStyle = {
        width: width /4,
        height: width /4,
        backgroundColor: 'white',
        borderBottomRightRadius: '10%',
        borderBottomLeftRadius: '10%',
        borderTopRightRadius: '10%',
        borderTopLeftRadius: '10%',
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap', // allow wrapping of children if needed
        justifyContent: 'center', // center children along the main axis
        alignItems:'center',
    }
     */
    /*
    const TextName = {
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems : 'center'
    }
    */
    return (
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                {Array.from({ length: amount }, (_, i) => (
                    <ClassCard key={i} className={`Class ${i + 1}`} />
                ))}
            </ScrollView>
    );
    /*
    return (
        <div style={panelStyle}>
            {playersPanels}
            <div>
                <div style={TextName} >
                    {"Roll the Dice"}
                </div>

                <button
                    style={buttonStyle}
                    onClick={() => {
                        rollDice()
                    }}
                    disabled={getNickname() !== currentPlayer || !rollDiceMove}
                >
                    <div style={diceStyle}>
                        {lastRolls[0]}
                    </div>
                    <div style={diceStyle}>
                        {lastRolls[1]}
                    </div>
                </button>
            </div>
            {gameStarted === false &&
            <button style={buttonStyle}  onClick={() => {
                onStart()
            }}>
                {"Start the Game"}
            </button>
            }
            {endTurn === true && getNickname() === currentPlayer &&
                <button style={buttonStyle}  onClick={() => {
                    onEndTurn()
                }}>
                    {"End Turn"}

                </button>
            }
            {giveUp === true &&
                <button style={buttonStyle}  onClick={() => {
                    onGiveUp()
                }}>
                    {"Give Up"}
                </button>
            }
        </div>
    );
    */
};
const styles = StyleSheet.create({
    scrollContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        //justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    classCard: {
        width: '35%',
        height: 250,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default CardPanel;
