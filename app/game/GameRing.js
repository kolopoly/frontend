import React from 'react';
import Circle from './PlayerCircles';
import './ring.css';
import SectorCard from "./SectorCard";
import {getNickname} from "../storage";

class GameRing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSector: null
        };
    }

    playersColors = ['blue', 'red', 'green', 'yellow'];

    addingPlayers(currentSector, playersNumber, playersPositions){
        const playersCircles = []
        for (let i = 0; i < playersNumber; i++) {
            if (playersPositions[i] === currentSector) {
                playersCircles.push(<div>
                    <Circle color={this.playersColors[i]} number={i + 1} radius={12}/>
                </div>)
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
        const { radius, numSectors, onClick, playersNumber, playersPositions, sectorColours, sectorNames,
            buyField, upgradeField, sellField, actionMoveBuy, actionMovesSell, actionMoveUpgrade, actionMovePay,
            currentPlayer, payField, fees, fieldLevels, buyPrice, sellPrice, upgradePrice, currentPlayerIndex, fieldOwners
        } = this.props;
        const { selectedSector } = this.state;
        const newRadius = 350;
        const sectorAngle = 360 / numSectors;
        const sectorWidth = newRadius * 2 * 3.1415 / numSectors;
        const sectorHeight = sectorWidth * 100/150 * numSectors / 10

        const ringStyle = {
            width: radius * 2,
            height: radius * 2,
            position: 'relative'
        };

        const sectorButtons = [];
        for (let i = 0; i < numSectors; i++) {
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
                backgroundColor: i === selectedSector ? 'gray' : 'white',
                borderColor: 'solid black',
                borderTop: `${sectorHeight * 0.05}px solid ${this.playersColors[fieldOwners[i]]}`,
                borderRadius: 0,
                borderWidth: 0,
                borderBottom: `${sectorHeight * 0.2}px solid ${sectorColours[i]}`,
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'pointer',
                clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'
            };
            sectorButtons.push(
                <div key={i} style={sectorStyle}>
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
                        }}>{this.addingPlayers(i, playersNumber, playersPositions)}</div>
                        <div style={{
                            position: 'absolute',
                            bottom: '0', // Position it at the bottom
                            left: '50%', // Start from the center horizontally
                            width: '70%',  // Set the width of the text container to be 80% of its parent
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            fontSize: '70%',
                            lineHeight: '15px',
                            marginTop: `${sectorHeight * 0.5}px`
                        }}>
                            {sectorNames[i]}
                        </div>
                    </button>
                </div>
            );
        }

        return (
            <div className="ring-field" style={ringStyle}>
                {sectorButtons}
                {this.state.selectedSector !== null && (
                    <SectorCard sectorColor={sectorColours[this.state.selectedSector]} sectorName={sectorNames[this.state.selectedSector]}
                                sectorWidth={sectorWidth * 1.3}
                                sectorHeight={sectorHeight * 1.3}
                                actionMoveBuy={this.state.selectedSector === playersPositions[currentPlayerIndex] && actionMoveBuy && getNickname() === currentPlayer}
                                actionMoveSell={actionMovesSell[this.state.selectedSector][0]}
                                actionMoveUpgrade={actionMoveUpgrade[this.state.selectedSector[0]]}
                                buyField={buyField}
                                sellField={sellField}
                                upgradeField={upgradeField}
                                payField={payField}
                                fees={fees}
                                upgradePrice={upgradePrice}
                                buyPrice={buyPrice}
                                sellPrice={sellPrice}
                                fieldLevel={fieldLevels[this.state.selectedSector]}
                                actionMovePay={this.state.selectedSector === playersPositions[currentPlayerIndex] && actionMovePay && getNickname() === currentPlayer}
                                sectorId={this.state.selectedSector}
                    />
                )}
            </div>
        );
    }
}

export default GameRing;
