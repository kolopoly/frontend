import React, { useState } from 'react';
import PlayerCircles from "./PlayerCircles";
import PlayersPanel from "./PlayersPanel";
import {getNickname} from "../storage";
import '../font.css';
const ContextPanel = ({playersNumber, playersMoney, playersNames, playersAvatar, lastRolls, width, height,
                          currentPlayer, gameStarted, onStart, rollDice, endTurn, onEndTurn, onGiveUp, giveUp, currentPlayerIndex, rollDiceMove}) => {

    const playersPanels = []

    for(let i = 0; i < playersNumber; i++){
       playersPanels.push(
           <div>
               <PlayersPanel playersNumber={i} playersName={playersNames[i]} playersMoney={playersMoney[i]} width={width} height={height / 7} currentPlayer={currentPlayer}>
               </PlayersPanel>
           </div>
       )
    }

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
    const TextName = {
        fontFamily: "'Aller', sans-serif",
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems : 'center'
    }
    console.log(currentPlayer, getNickname(), currentPlayer === getNickname())
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
                    <div style={TextName} >
                        {"End Turn"}
                    </div>
                </button>
            }
            {giveUp === true &&
                <button style={buttonStyle}  onClick={() => {
                    onGiveUp()
                }}>
                    <div style={TextName} >
                        {"Give Up"}
                    </div>
                </button>
            }
        </div>
    );
};

export default ContextPanel;
