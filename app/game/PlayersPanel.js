import React, { useState } from 'react';
import Circle from "./PlayerCircles";

const PlayersPanel = ({playersNumber, playersMoney, playersName, playersAvatar, width, height, currentPlayer}) => {
    const playersColors = ['blue', 'red', 'green', 'yellow'];
    const playersPanels = []

    let panelStyle = {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        borderBottomRightRadius: '10%',
        borderBottomLeftRadius: '10%',
        borderTopRightRadius: '10%',
        borderTopLeftRadius: '10%',
        padding: '5px',
        display: 'flex', // use flexbox layout
        flexDirection: 'column', // stack children vertically
        flexWrap: 'wrap', // allow wrapping of children if needed
        justifyContent: 'center', // center children along the main axis
        alignItems: 'center',
        borderBottom: 'transparent',
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
    }

    if(currentPlayer === playersNumber){
        panelStyle.borderBottom = '2px solid red';
        panelStyle.borderTop = '2px solid red';
        panelStyle.borderLeft = '2px solid red';
        panelStyle.borderRight = '2px solid red';
    }

    const elementsStyle = {
        padding : '5px'
    }

    return (
        <div style={panelStyle}>
            <div style={elementsStyle}>
            {playersAvatar == null && (
                <Circle color={playersColors[playersNumber]} number={playersNumber + 1} radius={20}/>
            )}
            </div>
            <div style={elementsStyle}>
                {playersName }
            </div>
            <div style={elementsStyle}>
                {playersMoney + '$'}
            </div>
        </div>
    );
};

export default PlayersPanel;
