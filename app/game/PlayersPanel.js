import React from 'react';
import Circle from './PlayerCircles';
import '../font.css';
import { Image } from "react-native";
import PanelButtons from "./Buttons/PanelButtons";
import {getNickname} from "../storage";
import StartTradeButton from "./Buttons/StartTradeButton";

const PlayersPanel = ({ playersNumber, playersMoney, playersName, playersAvatar, width, height, currentPlayer, showTradeButton, gameStarted, onTrade, tradeInfo, playerIndex, currentPlayerIndex}) => {
    const playersColors = ['blue', 'red', 'green', 'yellow'];
    const playersDefaultAvatars = [
        require('../../assets/defaultAvatars/icon0005.png'),
        require('../../assets/defaultAvatars/icon0002.png'),
        require('../../assets/defaultAvatars/icon0004.png'),
        require('../../assets/defaultAvatars/icon0003.png')
    ];

    let panelStyle = {
        flex: 1,
        width: width * 0.9,
        height: height,
        backgroundColor: 'rgba(212,240,217,255)',
        borderBottomLeftRadius: '25px',
        borderTopLeftRadius: '25px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: '2',
        border: '2px solid transparent',
        webkitBoxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        boxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
    };

    if (currentPlayer === playersNumber) {
        panelStyle.border = '2px solid red';
    }

    const elementsStyle = {
        fontFamily: "'Aller', sans-serif",
        padding: '5px',
        fontSize: width * 0.05,
    };

    const avatarContainerStyle = {
        backgroundColor: 'rgba(136,171,149,255)',
        display: 'flex',
        justifyContent: 'center',
        width: '35%', // Adjust width as needed
        height: '90%',
        borderBottomRightRadius: '25px',
        borderBottomLeftRadius: '25px',
        borderTopRightRadius: '25px',
        borderTopLeftRadius: '25px',
        marginLeft: width * 0.03,
    };

    const detailsContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        paddingLeft: '10px'
    };

    const detailsTopStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    };

    const tablePlaceholderStyle = {
        flex: 1,
        width: '100%',
    };

    const mainContainerStyle = {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    };

    const defaultAvatarStyle = {
        marginLeft: '15px',
        marginTop: '3px',

    }

    const wholeContainer = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }

    return (
        <div style={wholeContainer}>
            <div style={panelStyle}>
                <div style={mainContainerStyle}>
                    <div style={avatarContainerStyle}>
                        {!playersAvatar && (
                            <Image source={playersDefaultAvatars[playersNumber]} style={defaultAvatarStyle} resizeMode="contain"/>
                        )}
                    </div>
                    <div style={detailsContainerStyle}>
                        <div style={detailsTopStyle}>
                            <div style={elementsStyle}>{playersName}</div>
                            <div style={elementsStyle}>{playersMoney}$</div>
                        </div>
                        <div style={tablePlaceholderStyle}>
                            {/* Placeholder for the table */}
                        </div>
                    </div>
                </div>
            </div>
            {gameStarted === true && playersName[playerIndex] !== getNickname() &&
            <StartTradeButton buttonWidth={width}
                              buttonHeight={height}
                              active={showTradeButton && currentPlayer === getNickname()}
                              clickAction={() => {tradeInfo.clicked === true ? onTrade({clicked: false,
                                      with: 0,
                                      amount: 0,
                                      playerFields: [],}) :
                                  onTrade({clicked: true,
                                      with: playersNumber,
                                      amount: 0,
                                      playerFields: [],})}}
            />
            }
        </div>
    );
};

export default PlayersPanel;
