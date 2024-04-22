import React from 'react';

class SectorCard extends React.Component {
    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId,
                actionMoveBuy, actionMoveSell, actionMoveUpgrade, actionMovePay, sellField, upgradeField, buyField, payField,
                buyPrice, fees, sellPrice, upgradePrice, fieldLevel,
        } = this.props;

        const contentStyle = {
            width: sectorWidth,
            height: sectorHeight + sectorHeight * 0.3,
        }

        const description = `Buy:${buyPrice}$  Sell:${sellPrice}$ 
                                    Upgrade:${upgradePrice}$
                                    Fees:
                                    1.${fees[0]}$ ${fieldLevel === 0 ? '*' : ''}
                                    2.${fees[1]}$ ${fieldLevel === 1 ? '*' : ''}
                                    3.${fees[2]}$ ${fieldLevel === 2 ? '*' : ''}
                                    4.${fees[3]}$ ${fieldLevel === 3 ? '*' : ''}
                                    5.${fees[4]}$ ${fieldLevel === 4 ? '*' : ''}
                                    6.${fees[5]}$ ${fieldLevel === 5 ? '*' : ''}
                                    7.${fees[6]}$ ${fieldLevel === 6 ? '*' : ''}
                                    
                                    `

        const cardStyle = {
            width: '100%',
            height: sectorHeight,
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
            justifyContent: 'space-between'
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
            flex: '1', // Allow button to grow and fill available space
            margin: '5px' // Space between buttons
        };

        const buttonRowStyle = {
            display: 'flex',
            justifyContent: 'stretch'
        };

        return (
            <div className="sector-card" style={contentStyle} key={sectorId}>
                <div style={cardStyle}>
                    <div style={nameStyle}>{sectorName}</div>
                    <div style={descriptionStyle}>{description}</div>
                    <table style={buttonTableStyle}>
                        <div style={buttonRowStyle}>
                            {actionMoveBuy === true && <button style={buttonStyle} onClick={() => {buyField()}}>Buy</button>}
                            {actionMoveSell === true && <button style={buttonStyle} onClick={() => {sellField(sectorId)}}>Sell</button>}
                        </div>
                        <div style={buttonRowStyle}>
                            {actionMoveUpgrade === true && <button style={buttonStyle} onClick={() => {upgradeField(sectorId)}}>Upgrade</button>}
                            {actionMovePay === true && <button style={buttonStyle} onClick={() => {payField()}}>Pay Rent</button>}
                        </div>
                    </table>
                </div>
                <div style={colorStyle}></div>
            </div>
        );
    }
}

export default SectorCard;
