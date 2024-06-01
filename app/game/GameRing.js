import React from 'react';
import Circle from './PlayerCircles';
import './ring.css';
import SectorCard from "./SectorCard";
import {getNickname} from "../storage";
import '../font.css';
import {Image} from "react-native";
import UpgradesBlock from "./UpgradesBlock";
class GameRing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSector: null
        };
    }

    playersColors = ['blue', 'red', 'green', 'yellow'];

    playersDefaultAvatars = [
        require('../../assets/defaultAvatars/icon0005.png'),
        require('../../assets/defaultAvatars/icon0002.png'),
        require('../../assets/defaultAvatars/icon0004.png'),
        require('../../assets/defaultAvatars/icon0003.png')
    ];



    addingPlayers(currentSector, playersNumber, playersPositions, playersAvatars){
        const playersCircles = []
        const avatarStyle = {
            width: '50px',
            height: '50px',
            marginRight: '30px',
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
                    <div key={index} style={{ flex: '1 0 50%', maxWidth: '50%', boxSizing: 'border-box', padding: '5px' }}>
                        {circle}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const { radius, numSectors, onClick, playersNumber, playersPositions, playersAvatars, sectorColours, sectorNames,
            buyField, upgradeField, sellField, actionMoveBuy, actionMovesSell, actionMoveUpgrade, actionMovePay,
            currentPlayer, payField, fees, fieldLevels, buyPrice, sellPrice, upgradePrice, currentPlayerIndex, fieldOwners
        } = this.props;
        const { selectedSector } = this.state;
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
                backgroundColor: sectorNames[i] === 'Start' ? 'rgba(136,171,150,255)' : i % 2 === 0 ? 'rgba(182,219,186,255)' : 'rgba(197,232,201,255)',
                borderColor: 'solid black',
                borderTop: `${sectorHeight * 0.05}px solid ${fieldOwners[i] !== -1 ? this.playersColors[fieldOwners[i]] : 'rgba(136,171,150,255)'}`,
                borderBottom: `${sectorHeight * 0.2}px solid ${sectorColours[i]}`,
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'pointer',
                clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'
            };

            let whiter = {
                backgroundColor: 'transparent'
            }

            if(selectedSector === i){
                whiter = {
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${sectorWidth}px`,
                    height: `${sectorHeight}px`,
                    lineHeight: '30px',
                    clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
                    border: '4px solid white',
                    backgroundColor: 'rgb(255,255,255,0.8)',
                    pointerEvents: 'none',
                }
            }

            sectorButtons.push(
                <div key={i} style={sectorStyle}>
                    <UpgradesBlock width={sectorWidth} height={sectorHeight} fees={fees[i]} fieldLevel={fieldLevels[i]}/>
                    <button
                        style={buttonStyle}
                        onClick={() => {
                            onClick(i);
                            if (this.state.selectedSector === i) {
                                this.setState({selectedSector: null})
                            }
                            else {
                                this.setState({selectedSector: i});
                            }
                        }}
                    >
                        <div style={{
                            position: 'absolute', // Position absolutely
                            top: '0', // Start from the top
                            left: '50%', // Center horizontally
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            marginTop: '1px',
                        }}>{this.addingPlayers(i, playersNumber, playersPositions, playersAvatars != null ? playersAvatars : null)}</div>
                        <div style={{
                            fontFamily: "'Aller', sans-serif",
                            position: 'absolute',
                            bottom: `-${sectorHeight * 0.2 - 5}px`,
                            left: '50%',
                            width: '70%',
                            transform: 'translate(-50%, 0)',
                            textAlign: 'center',
                            fontSize: '90%',
                            lineHeight: '15px',
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
                                sectorWidth={radius - sectorHeight * 1.15}
                                sectorHeight={sectorHeight * 1.3}
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
            </div>
        );
    }
}

export default GameRing;
