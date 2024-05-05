import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";
import '../font.css'
import SellButton from "./SellButton";
import BuyButton from "./BuyButton";
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId,
                actionMoveBuy, actionMoveSell, actionMoveUpgrade, actionMovePay, sellField, upgradeField, buyField, payField,
                buyPrice, fees, sellPrice, upgradePrice, fieldLevel, currentPlayer
        } = this.props;

        const contentHolder = {
            width: sectorWidth * 1.4,
            height: sectorHeight * 1.37,
            justifyContent: 'start',
            display: 'flex',
            flexDirection: 'row',
        }

        const buttonBuy = {
            flexOrder: '1',
            width:sectorWidth * 0.2,
            height: "15%",
            marginTop: sectorHeight * 1.37 * 0.2,
            backgroundColor: 'rgba(167,244,116,255)',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'center',
            zIndex: '1',
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            border: "0px",
        }
        const textStyle = {
            fontSize: sectorWidth * 0.18,
            fontFamily: "'Aller', sans-serif",
            color: "white",
        }

        const cardStyle = {
            flexOrder: '2',
            width: sectorWidth,
            height: sectorHeight * 1.37,
            backgroundColor: 'white',
            borderTopRightRadius: '8%',
            borderTopLeftRadius: '8%',
            borderBottomLeftRadius: '8%',
            borderBottomRightRadius: '8%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '2',
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        };

        const insideCard = {
            width: "85%",
            height: "90%",
            paddingLeft: "3px",
            paddingRight: "3px",
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: "7px",
            justifyContent: 'space-between',
            borderTopRightRadius: '8%',
            borderTopLeftRadius: '8%',
            borderBottomLeftRadius: '8%',
            borderBottomRightRadius: '8%',
            border: `5px solid rgba(251,247,99,255)`,
            alignItems: 'center',
        }

        const nameStyle = {
            display: "flex",
            fontSize: sectorWidth * 0.15,
            fontFamily: "'Aller', sans-serif",
            textAlign: 'center',
        };

        const titleField = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: "93%",
            height: "20%",
            borderTopRightRadius: '15px',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            backgroundColor: 'rgba(251,247,99,255)', //change to actual color
        }

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
            <div style={contentHolder}>
                <BuyButton sectorWidth={sectorWidth} sectorHeight={sectorHeight}
                    active={(actionMoveBuy || actionMoveUpgrade) && currentPlayer === getNickname()}
                    clickAction={actionMoveBuy === true ? () => {buyField()} : () => {upgradeField(sectorId)}}>
                </BuyButton>
                <div style={cardStyle}>
                    <div style={insideCard}>
                        <div style={titleField}>
                            <div style={nameStyle}>{sectorName}
                            </div>
                        </div>
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
                </div>
                <SellButton sectorWidth={sectorWidth} sectorHeight={sectorHeight}
                            active={(actionMoveSell) && currentPlayer === getNickname()}
                            clickAction={actionMoveSell === true ? () => {sellField(sectorId)} : null}>
                </SellButton>
            </div>
        );
    }
}

export default SectorCard;
