import React from 'react';
import {getNickname} from "../storage";
import '../font.css'
import TradeDescription from "./TradeDescription";
import PayButton from "./Buttons/PayButton";
import TradeButton from "./Buttons/TradeButton";
import {TextInput} from "react-native";
import RejectTradeButton from "./Buttons/RejectTradeButton";
import AcceptTradeDescription from "./AcceptTradeDescription";
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, scale, sectorWidth, sectorHeight, onTrade, currentPlayer, buyPrice, playersMoney, fieldOwners, tradeInfo, currentPlayerIndex, sendAccept
        } = this.props;

        const contentHolder = {
            width: sectorWidth * 1.4,
            height: sectorHeight * 1.57,
            justifyContent: 'center',
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
            boxShadow: `rgba(0, 0, 0, 0.19) 0px ${scale * 10}px ${scale * 20}px, rgba(0, 0, 0, 0.23) 0px ${scale * 6}px ${scale * 6}px`,
        };

        const insideCard = {
            width: "85%",
            height: "90%",
            paddingLeft: `${scale * 3}px`,
            paddingRight: `${scale * 3}px`,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: `${scale * 7}px`,
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
            borderTopRightRadius: `${scale * 15}px`,
            borderTopLeftRadius: `${scale * 15}px`,
            borderBottomLeftRadius: `${scale * 15}px`,
            borderBottomRightRadius: `${scale * 15}px`,
            backgroundColor: sectorColor, //change to actual color
        }

        const descriptionContainerStyle = {
            display: 'flex',
            justifyContent: 'flex-start', // Align to the start (left side)
            width: '100%', // Ensure it takes up full width of the parent
        };
        let yourCost = 0
        let hisCost = 0
        for(let i = 0; i < tradeInfo.fields.length; i++){
            if(fieldOwners[tradeInfo.fields[i]] === currentPlayerIndex){
                yourCost += buyPrice[tradeInfo.fields[i]]
            } else {
                hisCost += buyPrice[tradeInfo.fields[i]]
            }
        }
        // your

        return (
            <div style={contentHolder}>
                <div style={contentVerticalHolder}>
                    <div style={cardStyle}>
                        <div style={insideCard}>
                            <div style={titleField}>
                                <div style={nameStyle}>{sectorName}
                                </div>
                            </div>
                            {sectorName !== "Start" &&
                                <div style={descriptionContainerStyle}> <TradeDescription scale={scale} yourCost={yourCost} hisCost={hisCost}></TradeDescription> </div>}
                            {sectorName !== "Start" &&
                                <div style={descriptionContainerStyle}> <AcceptTradeDescription scale={scale} amount1={tradeInfo.money1} amount2={tradeInfo.money2}></AcceptTradeDescription> </div>}
                        </div>
                    </div>
                        <TradeButton sectorWidth={sectorWidth} sectorHeight={sectorHeight} scale={scale}
                                   clickAction={() => {
                                       console.log("HERE")
                                       sendAccept(tradeInfo, true)
                                   }}/>
                        <RejectTradeButton sectorWidth={sectorWidth} sectorHeight={sectorHeight} scale={scale}
                                 clickAction={() => {
                                     sendAccept(tradeInfo, false)
                                 }}/>
                </div>
            </div>
        );
    }
}

export default SectorCard;
