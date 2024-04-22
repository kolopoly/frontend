import React from 'react';

class Description extends React.Component {

    render() {
        const { buyPrice, fees, sellPrice, upgradePrice, fieldLevel,
        } = this.props;

        const descriptionStyle = {
            textAlign: 'left',
            paddingLeft: '5px',
            borderBottom: '1px solid black',
        };

        document.getElementById('buyPrice').textContent = buyPrice;
        document.getElementById('sellPrice').textContent = sellPrice;
        document.getElementById('upgradePrice').textContent = upgradePrice;

        for (let i = 0; i < fees.length; i++) {
            document.getElementById(`fee${i}`).textContent = fees[i];
            document.getElementById(`star${i}`).textContent = fieldLevel === i ? '*' : '';
        }

        return (
            <div className="description" style={descriptionStyle}>
                <span>Buy: <span id="buyPrice"></span>$</span>
                <span>Sell: <span id="sellPrice"></span>$</span>
                <span>Upgrade: <span id="upgradePrice"></span>$</span>
                <div>Fees:</div>
                <div>1. <span id="fee0"></span>$ <span id="star0"></span></div>
                <div>2. <span id="fee1"></span>$ <span id="star1"></span></div>
                <div>3. <span id="fee2"></span>$ <span id="star2"></span></div>
                <div>4. <span id="fee3"></span>$ <span id="star3"></span></div>
                <div>5. <span id="fee4"></span>$ <span id="star4"></span></div>
                <div>6. <span id="fee5"></span>$ <span id="star5"></span></div>
                <div>7. <span id="fee6"></span>$ <span id="star6"></span></div>
            </div>
        );
    }
}

export default Description;
