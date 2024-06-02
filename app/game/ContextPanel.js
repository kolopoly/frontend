import React, { useState } from 'react';
import PlayerCircles from "./PlayerCircles";
import PlayersPanel from "./PlayersPanel";
import {getNickname} from "../storage";
import '../font.css';
import RollButton from "./Buttons/RollButton";
import PanelButtons from "./Buttons/PanelButtons";
const ContextPanel = ({playersNumber, playersMoney, playersNames, playersAvatars, lastRolls, width, height,
                          currentPlayer, gameStarted, onStart, rollDice, endTurn, onEndTurn, onGiveUp, giveUp, currentPlayerIndex, rollDiceMove, trade, onTrade, tradeInfo}) => {

    const playersPanels = []

    for(let i = 0; i < playersNumber; i++){
       playersPanels.push(
           <div>
               <PlayersPanel playersNumber={i}
                             playersName={playersNames[i]}
                             playersAvatar={playersAvatars != null ? playersAvatars[i] : null}
                             playersMoney={playersMoney[i]} width={width} height={height / 7}
                             currentPlayer={currentPlayer}
                             currentPlayerIndex={currentPlayerIndex}
                             playerIndex={i}
                             showTradeButton={trade && (tradeInfo.with === i || tradeInfo.clicked === false)}
                             gameStarted={gameStarted}
                             tradeInfo={tradeInfo}
                             onTrade={onTrade}>
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

    const lowerButtons = {
        width: '90%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
    }

    const rightColumn = {
        height: '100%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    }

    console.log(currentPlayer, getNickname(), currentPlayer === getNickname())
    return (
        <div style={panelStyle}>
            {playersPanels}
            <div style={lowerButtons}>
                <RollButton buttonHeight={height * 0.2} buttonWidth={width * 0.9}
                    clickAction={rollDice} active={getNickname() === currentPlayer && rollDiceMove && tradeInfo.clicked === false} diceOne={lastRolls[0]} diceTwo={lastRolls[1]}/>
                <div style={rightColumn}>
                    {gameStarted === false &&
                        <PanelButtons buttonWidth={width * 0.3}
                                      buttonHeight={height * 0.3 * 0.2}
                                      active={true}
                                      clickAction={() => {onStart()}}
                                      buttonColour={'rgba(212,240,217,255)'}
                                      buttonText={"Start the Game"}/>
                    }
                    {gameStarted === true &&
                        <PanelButtons buttonWidth={width * 0.3}
                                      buttonHeight={height * 0.3 * 0.2}
                                      active={endTurn === true && getNickname() === currentPlayer && tradeInfo.clicked === false}
                                      clickAction={() => {onEndTurn()}}
                                      buttonColour={'rgba(212,240,217,255)'}
                                      buttonText={"End Turn"}/>
                    }
                    {gameStarted === true &&
                        <PanelButtons buttonWidth={width * 0.3}
                                      buttonHeight={height * 0.3 * 0.2}
                                      active={giveUp === true && tradeInfo.clicked === false}
                                      clickAction={() => {onGiveUp()}}
                                      buttonColour={'rgba(244,150,151,255)'}
                                      buttonText={"Give Up"}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default ContextPanel;
