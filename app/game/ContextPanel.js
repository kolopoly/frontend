import React, { useState } from 'react';
import PlayerCircles from "./PlayerCircles";
import PlayersPanel from "./PlayersPanel";
import {getNickname} from "../storage";
import '../font.css';
import RollButton from "./Buttons/RollButton";
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
        alignItems:'center',
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

    const TextName = {
        fontFamily: "'Aller', sans-serif",
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems : 'center'
    }

    const lowerButtons = {
        width: '90%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

    }

    const rightColumn = {
        height: '100%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const smallButtonStyle = {
        ...buttonStyle,
        width: '100px', // Adjust this value for your desired size
        height: '30px', // Adjust this value as well
        margin: '5px 0' // Adds some space between smaller buttons vertically
    }

    console.log(currentPlayer, getNickname(), currentPlayer === getNickname())
    return (
        <div style={panelStyle}>
            {playersPanels}
            <div style={lowerButtons}>
                <RollButton buttonHeight={height * 0.2} buttonWidth={width * 0.9}
                    clickAction={rollDice} active={getNickname() === currentPlayer && rollDiceMove} diceOne={lastRolls[0]} diceTwo={lastRolls[1]}/>
                <div style={rightColumn}>
                    {gameStarted === false &&
                        <button style={smallButtonStyle} onClick={() => {
                            onStart()
                        }}>
                            {"Start the Game"}
                        </button>
                    }
                    {endTurn === true && getNickname() === currentPlayer &&
                        <button style={smallButtonStyle} onClick={() => {
                            onEndTurn()
                        }}>
                            <div style={TextName}>
                                {"End Turn"}
                            </div>
                        </button>
                    }
                    {giveUp === true &&
                        <button style={smallButtonStyle} onClick={() => {
                            onGiveUp()
                        }}>
                            <div style={TextName}>
                                {"Give Up"}
                            </div>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ContextPanel;
