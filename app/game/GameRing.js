import React, {useState} from 'react';
import './ring.css';
import SectorCard from "./SectorCard";
import {getNickname} from "../storage";
import '../font.css';
import {Image} from "react-native";
import UpgradesBlock from "./UpgradesBlock";
import "./blink.css"
import TradeCard from "./TradeCard";
import AcceptTradeCard from "./AcceptTradeCard";

class GameRing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSector: null,
            tradeFields: [],
        };
    }

    playersColors = ['blue', 'red', 'green', 'yellow'];

    playersDefaultAvatars = [
        require('../../assets/defaultAvatars/icon0005.png'),
        require('../../assets/defaultAvatars/icon0002.png'),
        require('../../assets/defaultAvatars/icon0004.png'),
        require('../../assets/defaultAvatars/icon0003.png')
    ];



    addingPlayers(currentSector, playersNumber, playersPositions, playersAvatars, scale){
        const playersCircles = []
        const avatarStyle = {
            width: `${scale * 50}px`,
            height: `${scale * 50}px`,
            marginRight: `${scale * 50}px`,
        }
        for (let i = 0; i < playersNumber; i++) {
            if (playersPositions[i] === currentSector) {
                playersCircles.push(<Image source={this.playersDefaultAvatars[i]} style={avatarStyle} resizeMode="contain"/>);
            }
        }
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {playersCircles.map((circle, index) => (
                    <div key={index} style={{ flex: '1 0 50%', maxWidth: '50%', boxSizing: 'border-box', padding: `${scale * 5}px` }}>
                        {circle}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const { radius, numSectors, playersNumber, playersPositions, playersAvatars, sectorColours, sectorNames, sectorTypes, scale,
            buyField, upgradeField, sellField, actionMoveBuy, actionMovesSell, actionMoveUpgrade, actionMovePay, acceptTrade, acceptTradeTrade,
            currentPlayer, payField, fees, fieldLevels, buyPrice, sellPrice, upgradePrice, currentPlayerIndex, fieldOwners, trade, tradeInfo, playerNames, playersMoney, onTrade, sendTrade, sendAccept
        } = this.props;
        const newRadius = radius;
        const sectorAngle = 360 / numSectors;
        const sectorWidth = newRadius * 2 * 3.1415 / numSectors;
        const sectorHeight = sectorWidth * 100/150 * numSectors / 10

        const ringStyle = {
            width: radius * 2,
            height: radius * 2,
            position: 'relative'
        };
        console.log(fieldOwners)
        console.log(sectorHeight * 0.05)
        const sectorButtons = [];
        for (let i = 0; i < numSectors; i++) {
            console.log(fieldOwners[i] !== -1 ? this.playersColors[fieldOwners[i]] : 'white')
            const sectorStyle = {
                position: 'absolute',
                width: '0%',
                height: `${newRadius * 2}px`,
                transformOrigin: 'center',
                transform: `rotate(${sectorAngle * i}deg)`
            };
            const buttonStyle = {
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${sectorWidth}px`,
                height: `${sectorHeight}px`,
                backgroundColor: sectorTypes[i] === 'start' ? 'rgba(136,171,150,255)' : i % 2 === 0 ? 'rgba(182,219,186,255)' : 'rgba(197,232,201,255)',
                borderColor: 'solid black',
                borderTop: `${sectorHeight * 0.05}px solid ${fieldOwners[i] !== -1 ? this.playersColors[fieldOwners[i]] : 'rgba(136,171,150,255)'}`,
                borderBottom: `${sectorHeight * 0.2}px solid ${sectorColours[i]}`,
                textAlign: 'center',
                lineHeight: `${scale * 30}px`,
                cursor: 'pointer',
                clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'
            };

            let whiter = {
                backgroundColor: 'transparent'
            }

            if(this.state.selectedSector === i){
                whiter = {
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${sectorWidth}px`,
                    height: `${sectorHeight}px`,
                    lineHeight: `${scale * 30}px`,
                    clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
                    border: '4px solid white',
                    backgroundColor: 'rgb(255,255,255,0.8)',
                    pointerEvents: 'none',
                }
            }
            console.log("FIELD ACCEPT", acceptTradeTrade)
            sectorButtons.push(
                <div key={i} style={sectorStyle}>
                    {sectorTypes[i] === 'street' && <UpgradesBlock width={sectorWidth} height={sectorHeight} scale={scale} fees={fees[i]} fieldLevel={fieldLevels[i]}/> }
                    <button
                        style={buttonStyle}
                        onClick={() => {
                            if (this.state.selectedSector === i) {
                                this.setState({selectedSector: null})
                            }
                            else {
                                this.setState({selectedSector: i});
                            }
                        }}
                        onDoubleClick={() => {
                            if(!tradeInfo.clicked){
                                return
                            }
                            let x = {
                                clicked: tradeInfo.clicked,
                                with: tradeInfo.with,
                                playerFields: tradeInfo.playerFields,
                                amount: tradeInfo.amount
                            }
                            if (x.playerFields.indexOf(i) !== -1) {
                                x.playerFields.splice(x.playerFields.indexOf(i))
                                onTrade(x)
                            }
                            else {
                                x.playerFields.push(i)
                                onTrade(x)
                            }
                            console.log(x)
                        }}
                        disabled={tradeInfo.clicked && ((fieldOwners[i] !== tradeInfo.with && fieldOwners[i] !== currentPlayerIndex)  || fieldLevels[i] > 1) && !(this.state.selectedSector === i)}
                        className={tradeInfo.playerFields.indexOf(i) !== -1 || acceptTradeTrade.fields.indexOf(i) !== -1 ? "blinking" : null}
                    >
                        <div style={{
                            position: 'absolute', // Position absolutely
                            top: '0', // Start from the top
                            left: '50%', // Center horizontally
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            marginTop: '1px',
                        }}>{this.addingPlayers(i, playersNumber, playersPositions, playersAvatars != null ? playersAvatars : null, scale)}</div>
                        <div style={{
                            fontFamily: "'Aller', sans-serif",
                            position: 'absolute',
                            bottom: `-${sectorHeight * 0.2 - 5}px`,
                            left: '50%',
                            width: '70%',
                            transform: 'translate(-50%, 0)',
                            textAlign: 'center',
                            fontSize: '90%',
                            lineHeight: `${scale * 15}px`,
                            marginTop: `${sectorHeight * 0.5}px`,
                            backgroundColor: 'rgba(255, 255, 255, 0)', // Optional: Set a background color if needed to cover the border
                            zIndex: '10' // Ensure the zIndex is higher than the button's border
                        }}>
                            {sectorNames[i]}
                        </div>
                    </button>
                    <div style={whiter}></div>
                </div>
            );
        }
        console.log(actionMoveUpgrade)
        return (
            <div className="ring-field" style={ringStyle}>
                {sectorButtons}
                {this.state.selectedSector !== null && (
                    <SectorCard sectorColor={sectorColours[this.state.selectedSector]} sectorName={sectorNames[this.state.selectedSector]}
                                sectorType={sectorTypes[this.state.selectedSector]}
                                sectorWidth={radius - sectorHeight * 1.15}
                                sectorHeight={sectorHeight * 1.3}
                                scale={scale}
                                actionMoveBuy={this.state.selectedSector === playersPositions[currentPlayerIndex] && (actionMoveBuy === null ? false : actionMoveBuy) && getNickname() === currentPlayer}
                                actionMoveSell={actionMovesSell != null ? actionMovesSell[this.state.selectedSector][0] : false}
                                actionMoveUpgrade={actionMoveUpgrade != null ? actionMoveUpgrade[this.state.selectedSector][0] : false}
                                buyField={buyField}
                                sellField={sellField}
                                upgradeField={upgradeField}
                                payField={payField}
                                fees={fees[this.state.selectedSector]}
                                upgradePrice={upgradePrice[this.state.selectedSector]}
                                buyPrice={buyPrice[this.state.selectedSector]}
                                sellPrice={sellPrice[this.state.selectedSector]}
                                fieldLevel={fieldLevels[this.state.selectedSector]}
                                actionMovePay={this.state.selectedSector === playersPositions[currentPlayerIndex] && actionMovePay && getNickname() === currentPlayer}
                                sectorId={this.state.selectedSector}
                                currentPlayer={currentPlayer}
                    />
                )}
                {this.state.selectedSector === null && tradeInfo.clicked && (
                    <TradeCard sectorColor={"white"}
                        sectorName={"Trade with " + playerNames[tradeInfo.with]}
                        sectorWidth={radius - sectorHeight * 1.15}
                        sectorHeight={sectorHeight * 1.3}
                        scale={scale}
                        currentPlayer={currentPlayer}
                        currentPlayerIndex={currentPlayerIndex}
                        tradeInfo={tradeInfo}
                        fieldOwners={fieldOwners}
                        buyPrice={buyPrice}
                        playersMoney={playersMoney}
                        onTrade={onTrade}
                        sendTrade={sendTrade}
                        playersNames={playerNames}
                    />
                )}
                {this.state.selectedSector === null && acceptTrade && currentPlayer === getNickname() && (
                    <AcceptTradeCard sectorColor={"white"}
                                     tradeInfo={acceptTradeTrade}
                                     sectorName={"Trade with " + acceptTradeTrade.player_id1}
                                     sectorWidth={radius - sectorHeight * 1.15}
                                     scale={scale}
                                     sectorHeight={sectorHeight * 1.3}
                                     currentPlayer={currentPlayer}
                                     currentPlayerIndex={currentPlayerIndex}
                                     fieldOwners={fieldOwners}
                               buyPrice={buyPrice}
                               playersMoney={playersMoney}
                               onTrade={onTrade}
                                     sendAccept={sendAccept}
                               playersNames={playerNames}
                    />
                )}
            </div>
        );
    }
}
export default GameRing;
