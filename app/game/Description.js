import React from 'react';
import '../font.css';
class Description extends React.Component {

    render() {
        const { buyPrice, fees, sellPrice, upgradePrice, fieldLevel } = this.props;

        const descriptionStyle = {
            fontFamily: "'Aller', sans-serif",
            marginLeft: '5px',
            marginRight: '5px',
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

        return (
            <div className="description" style={{ width: '100%' }}>
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
                    <div style={centeredText}>Sell: {sellPrice}$</div>
                    <div style={centeredText}>Upgrade: {upgradePrice}$</div>
                </div>
            </div>
        );
    }
}

export default Description;
