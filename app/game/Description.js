import React from 'react';
import '../font.css'
class Description extends React.Component {

    render() {
        const { buyPrice, fees, sellPrice, upgradePrice, fieldLevel,
        } = this.props;

        const descriptionStyle = {
            textAlign: 'center',
            paddingLeft: '5px',
            borderBottom: '1px solid black',
            fontSize: '70%',
            alignItems: 'center',
            fontFamily: "'Aller', sans-serif",
        };

        return (
            <div className="description" style={descriptionStyle}>
                <div><span>Rent: $<span> {buyPrice} </span></span></div>
                <div><span>Sell: <span>{sellPrice}</span>$</span></div>
                <div><span>Upgrade: <span>{upgradePrice}</span>$</span></div>
                <div>Fees:</div>
                <div>1. <span>{fees[0]}</span>$ <span>{fieldLevel === 0 ? '*' : ''}</span></div>
                <div>2. <span>{fees[1]}</span>$ <span>{fieldLevel === 1 ? '*' : ''}</span></div>
                <div>3. <span>{fees[2]}</span>$ <span>{fieldLevel === 2 ? '*' : ''}</span></div>
                <div>4. <span>{fees[3]}</span>$ <span>{fieldLevel === 3 ? '*' : ''}</span></div>
                <div>5. <span>{fees[4]}</span>$ <span>{fieldLevel === 4 ? '*' : ''}</span></div>
                <div>6. <span>{fees[5]}</span>$ <span>{fieldLevel === 5 ? '*' : ''}</span></div>
                <div>7. <span>{fees[6]}</span>$ <span>{fieldLevel === 6 ? '*' : ''}</span></div>
            </div>
        );
    }
}

export default Description;
