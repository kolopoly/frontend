import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";
import '../font.css'
import SellButton from "./Buttons/SellButton";
import BuyButton from "./Buttons/BuyButton";
import PayButton from "./Buttons/PayButton";
class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorType, sectorWidth, sectorHeight, sectorId, scale,
                actionMoveBuy, actionMoveSell, actionMoveUpgrade, actionMovePay, sellField, upgradeField, buyField, payField,
                buyPrice, fees, sellPrice, upgradePrice, fieldLevel, currentPlayer
        } = this.props;

        let contentHolder = {
            width: sectorWidth * 1.4,
            height: sectorHeight * 1.57,
            justifyContent: 'start',
            display: 'flex',
            flexDirection: 'row',
        }
        if (sectorType !== 'street'){
            contentHolder = {
                width: sectorWidth * 1.4,
                height: sectorHeight * 1.57,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row',
            }
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
            boxShadow: `rgba(0, 0, 0, 0.19) 0px ${scale * 10}px ${scale * 2}px, rgba(0, 0, 0, 0.23) 0px ${scale * 6}px ${scale * 6}px`,
        };

        let insideCard = {
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

        let descriptionContainerStyle = {
            display: 'flex',
            justifyContent: 'flex-start', // Align to the start (left side)
            width: '100%', // Ensure it takes up full width of the parent
        };
        if (sectorType === 'prison'){
            descriptionContainerStyle = {
                ...descriptionContainerStyle,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }

        console.log(actionMoveUpgrade, currentPlayer === getNickname())
        return (
            <div style={contentHolder}>
                {sectorType === 'street' && <BuyButton sectorWidth={sectorWidth} sectorHeight={sectorHeight} scale={scale}
                    active={(actionMoveBuy || actionMoveUpgrade) && currentPlayer === getNickname()}
                    clickAction={actionMoveBuy === true ? () => {buyField()} : () => {upgradeField(sectorId)}}>
                </BuyButton> }
                <div style={contentVerticalHolder}>
                    <div style={cardStyle}>
                        <div style={insideCard}>
                            <div style={titleField}>
                                <div style={nameStyle}>{sectorName}
                                </div>
                            </div>
                            {(sectorType === 'street' || sectorType === 'prison') &&
                                <div style={descriptionContainerStyle}> <Description scale={scale} fieldType={sectorType} buyPrice={buyPrice} fees={fees} sellPrice={sellPrice} upgradePrice={upgradePrice} fieldLevel={fieldLevel}></Description> </div>}
                        </div>
                    </div>
                    {actionMovePay === true && currentPlayer === getNickname() &&
                        <PayButton sectorWidth={sectorWidth} sectorHeight={sectorHeight} scale = {scale}
                                   clickAction={() => {payField()}} payButtonText={sectorType === 'street' ? 'Pay Rent' : sectorType === 'prison' ? 'Pay to Escape' : 'undefined'}/>}
                </div>
                {sectorType === 'street' && <SellButton sectorWidth={sectorWidth} sectorHeight={sectorHeight} scale={scale}
                            active={(actionMoveSell) && currentPlayer === getNickname()}
                            clickAction={actionMoveSell === true ? () => {sellField(sectorId)} : null}>
                </SellButton>}
            </div>
        );
    }
}

export default SectorCard;
