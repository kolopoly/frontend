import React from 'react';
import '../font.css';

class Description extends React.Component {

    render() {
        const { fieldType, buyPrice, fees, scale, sellPrice, upgradePrice, fieldLevel } = this.props;

        const descriptionStyle = {
            fontFamily: "'Aller', sans-serif",
            fontSize: `${scale * 20}px`,
            marginLeft: `${scale * 5}px`,
            marginRight: `${scale * 5}px`,
        };

        const centeredText = {
            textAlign: 'center',
            width: '100%', // Ensure that "RENT" takes up the full width and centers the content
        };

        const leftRightContainer = {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        };

        const descriptionStyleCurrentLevel = {
            color: "red",
        };

        // Function for applying field level styles
        const levelStyles = index => ({
            ...descriptionStyle,
            ...(index === fieldLevel ? descriptionStyleCurrentLevel : {}),
        });

        if(fieldType === 'street') {
            return (
                <div className="description" style={{width: '100%', fontsize: `${20 * scale}px`}}>
                    <div style={levelStyles(0)}>
                        <div style={centeredText}>RENT: ${fees[0]}</div>
                    </div>

                    {fees.slice(1).map((fee, index) => (
                        <div key={index} style={levelStyles(index + 1)}>
                            <div style={leftRightContainer}>
                                <span>{index === 0 ? 'whole street' : `${index} upgrade`}</span>
                                <span>${fee}</span>
                            </div>
                        </div>
                    ))}
                    <div style={descriptionStyle}>
                        <div style={centeredText}>Buy: {buyPrice}$</div>
                        <div style={centeredText}>Sell: {sellPrice}$</div>
                        <div style={centeredText}>Upgrade: {upgradePrice}$</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="description" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: `${scale * 10}px`,
                }}>
                    <div style={descriptionStyle}>
                        <div style={centeredText}>Price to Escape: {buyPrice}$</div>
                    </div>
                </div>
            );
        }
    }
}

export default Description;
