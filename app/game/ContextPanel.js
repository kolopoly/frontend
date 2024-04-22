import React, { useState } from 'react';
import PlayerCircles from "./PlayerCircles";
import PlayersPanel from "./PlayersPanel";

const ContextPanel = ({playersNumber, playersMoney, playersNames, playersAvatar, lastRolls, width, height, currentPlayer, gameStarted}) => {
    const [dice, setDice] = useState({ die1: lastRolls[0], die2: lastRolls[1] });

    // Function to roll two dice
    const rollDice = () => {
        const newDie1 = Math.ceil(Math.random() * 6);
        const newDie2 = Math.ceil(Math.random() * 6);
        setDice({ die1: newDie1, die2: newDie2 });
    };

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
        display: 'flex', // use flexbox layout
        flexDirection: 'row', // stack children vertically
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems : 'center'
    }

    return (
        <div style={panelStyle}>
            {playersPanels}
            <div>
                <div style={TextName}>
                    {"Roll the Dice"}
                </div>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        rollDice()
                    }}
                >
                    <div style={diceStyle}>
                        {dice.die1}
                    </div>
                    <div style={diceStyle}>
                        {dice.die2}
                    </div>
                </button>
            </div>
            {gameStarted === false &&
            <button style={buttonStyle}
            >
                {"Start the Game"}
            </button>
            }
        </div>
    );
};

export default ContextPanel;
