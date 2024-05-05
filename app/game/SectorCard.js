import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";
import '../font.css'
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId,
                actionMoveBuy, actionMoveSell, actionMoveUpgrade, actionMovePay, sellField, upgradeField, buyField, payField,
                buyPrice, fees, sellPrice, upgradePrice, fieldLevel, currentPlayer
        } = this.props;

        const contentStyle = {
            width: sectorWidth,
            height: sectorHeight + sectorHeight * 0.5,
        }


        const cardStyle = {
            width: '100%',
            height: sectorHeight * 1.1,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'space-evenly', // Center children vertically
            borderTopRightRadius: '10%',
            borderTopLeftRadius: '10%',
            border: '2px solid black',
            alignItems: 'stretch'
        };

        const nameStyle = {
            fontFamily: "'Aller', sans-serif",
            fontWeight: 'bold',
            textAlign: 'center', // Center text horizontally
            borderBottom: '1px solid black'
        };

        const descriptionStyle = {
            textAlign: 'left',
            paddingLeft: '5px',
            borderBottom: '1px solid black',
        };

        const buttonTableStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        };

        const colorStyle = {
            backgroundColor: sectorColor,
            width: '100%',
            height: sectorHeight * 0.3, // Adjust accordingly
            borderBottomRightRadius: '10%',
            borderBottomLeftRadius: '10%',
            border: '2px solid black'
        };

        const buttonStyle = {
            fontFamily: "'Aller', sans-serif",
            flex: '1', // Allow button to grow and fill available space
            margin: '5px',// Space between buttons
        };

        const buttonRowStyle = {
            display: 'flex',
            justifyContent: 'stretch',
        };
        console.log(actionMoveUpgrade, currentPlayer === getNickname())
        return (
            <div className="sector-card" style={contentStyle} key={sectorId}>
                <div style={cardStyle}>
                    <div style={nameStyle}>{sectorName}</div>
                    {sectorName !== "Start" && <Description buyPrice={buyPrice} fees={fees} sellPrice={sellPrice} upgradePrice={upgradePrice} fieldLevel={fieldLevel}></Description>}
                    <table style={buttonTableStyle}>
                        <div style={buttonRowStyle}>
                            {actionMoveBuy === true && currentPlayer === getNickname() && <button style={buttonStyle} onClick={() => {buyField()}}>Buy</button>}
                            {actionMoveSell === true && currentPlayer === getNickname() && <button style={buttonStyle} onClick={() => {sellField(sectorId)}}>Sell</button>}
                        </div>
                        <div style={buttonRowStyle}>
                            {actionMoveUpgrade === true && currentPlayer === getNickname()  && <button style={buttonStyle} onClick={() => {upgradeField(sectorId)}}>Upgrade</button>}
                            {actionMovePay === true && currentPlayer === getNickname() && <button style={buttonStyle} onClick={() => {payField()}}>Pay Rent</button>}
                        </div>
                    </table>
                </div>
                <div style={colorStyle}></div>
            </div>
        );
    }
}

export default SectorCard;
