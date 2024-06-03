import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";
import '../font.css'
import SellButton from "./Buttons/SellButton";
import BuyButton from "./Buttons/BuyButton";
import PayButton from "./Buttons/PayButton";
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId,
                actionMoveBuy, actionMoveSell, actionMoveUpgrade, actionMovePay, sellField, upgradeField, buyField, payField,
                buyPrice, fees, sellPrice, upgradePrice, fieldLevel, currentPlayer
        } = this.props;

        const contentHolder = {
            width: sectorWidth * 1.4,
            height: sectorHeight * 1.57,
            justifyContent: 'start',
            display: 'flex',
            flexDirection: 'row',
        }

        const contentVerticalHolder = {
            width: sectorWidth,
            height: sectorHeight * 1.57,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
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
            border: `5px solid ${sectorColor}`,
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
            backgroundColor: sectorColor, //change to actual color
        }

        const descriptionContainerStyle = {
            display: 'flex',
            justifyContent: 'flex-start', // Align to the start (left side)
            width: '100%', // Ensure it takes up full width of the parent
        };

        console.log(actionMoveUpgrade, currentPlayer === getNickname())
        return (
            <div style={contentHolder}>
                <BuyButton sectorWidth={sectorWidth} sectorHeight={sectorHeight}
                    active={(actionMoveBuy || actionMoveUpgrade) && currentPlayer === getNickname()}
                    clickAction={actionMoveBuy === true ? () => {buyField()} : () => {upgradeField(sectorId)}}>
                </BuyButton>
                <div style={contentVerticalHolder}>
                    <div style={cardStyle}>
                        <div style={insideCard}>
                            <div style={titleField}>
                                <div style={nameStyle}>{sectorName}
                                </div>
                            </div>
                            {sectorName !== "start" && sectorName !== "prison" &&
                                <div style={descriptionContainerStyle}> <Description buyPrice={buyPrice} fees={fees} sellPrice={sellPrice} upgradePrice={upgradePrice} fieldLevel={fieldLevel}></Description> </div>}
                        </div>
                    </div>
                    {actionMovePay === true && currentPlayer === getNickname() &&
                        <PayButton sectorWidth={sectorWidth} sectorHeight={sectorHeight}
                                   clickAction={() => {payField()}}/>}
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
