import React from 'react';
import {getNickname} from "../storage";
import '../font.css'
import TradeDescription from "./TradeDescription";
import PayButton from "./Buttons/PayButton";
import TradeButton from "./Buttons/TradeButton";
import {TextInput} from "react-native";
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, onTrade, currentPlayer, buyPrice, playersMoney, fieldOwners, tradeInfo, currentPlayerIndex, sendTrade, playersNames
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
        let yourCost = 0
        let hisCost = 0
        for(let i = 0; i < tradeInfo.playerFields.length; i++){
            if(fieldOwners[tradeInfo.playerFields[i]] === currentPlayerIndex){
                yourCost += buyPrice[tradeInfo.playerFields[i]]
            } else {
                hisCost += buyPrice[tradeInfo.playerFields[i]]
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
                            <TextInput onChangeText={(text) => {
                                let x = {
                                    clicked: tradeInfo.clicked,
                                    with: tradeInfo.with,
                                    playerFields: tradeInfo.playerFields,
                                    amount: tradeInfo.amount
                                }
                                x.amount = text
                                onTrade(x)
                            }} placeholder={"get(+) or give(-)"} style={{textAlign: "center"}}></TextInput>
                            {sectorName !== "Start" &&
                                <div style={descriptionContainerStyle}> <TradeDescription yourCost={yourCost} hisCost={hisCost}></TradeDescription> </div>}
                        </div>
                    </div>
                    {currentPlayer === getNickname() &&
                        <TradeButton sectorWidth={sectorWidth} sectorHeight={sectorHeight}
                                   clickAction={() => {
                                       let trade = {
                                           fields: tradeInfo.playerFields,
                                           player_id1: currentPlayer,
                                           player_id2: playersNames[tradeInfo.with],
                                       }
                                       let amount = parseInt(tradeInfo.amount, 10)
                                       if(isNaN(amount)){
                                           let x = {
                                               clicked: tradeInfo.clicked,
                                               with: tradeInfo.with,
                                               playerFields: tradeInfo.playerFields,
                                               amount: tradeInfo.amount
                                           }
                                           x.amount = "0"
                                           onTrade(x)
                                           return
                                       }

                                       if(amount < 0){
                                           if(playersMoney[currentPlayerIndex] < amount){
                                               let x = {
                                                   clicked: tradeInfo.clicked,
                                                   with: tradeInfo.with,
                                                   playerFields: tradeInfo.playerFields,
                                                   amount: tradeInfo.amount
                                               }
                                               x.amount = "-" + amount
                                               onTrade(x)
                                               return;
                                           }
                                           trade["money1"] = -amount;
                                           trade["money2"] = 0;

                                       } else {
                                           if(playersMoney[tradeInfo.with] < amount){
                                               let x = {
                                                   clicked: tradeInfo.clicked,
                                                   with: tradeInfo.with,
                                                   playerFields: tradeInfo.playerFields,
                                                   amount: tradeInfo.amount
                                               }
                                               x.amount = "" + amount
                                               onTrade(x)
                                               return;
                                           }
                                           trade["money1"] = 0;
                                           trade["money2"] = amount;
                                       }
                                       sendTrade(trade)
                                   }}/>}
                </div>
            </div>
        );
    }
}

export default SectorCard;
