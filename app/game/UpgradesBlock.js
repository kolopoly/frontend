import React from 'react';
import '../font.css';

class UpgradeBlock extends React.Component {
    render() {
        const { width, height, fees, fieldLevel } = this.props;

        const topBlockStyle = {
            position: 'absolute',
            top: `-${height * 0.25}px`, // Adjust this value based on your design requirements
            width: `${width * 0.9}px`,
            height: `${height * 0.25}px`, // Adjust this value based on your design requirements
            left: '50%',
            transform: 'translateX(-50%)',
            lineHeight: '20px', // Match the height for central alignment
            paddingLeft: '10px',
        };

        const len = fees != null ? fees.slice(1).length : 1;

        const greenBlockStyle = {
            display: 'inline-block',
            width: `${width * 0.9 * 0.8 / (len - 2)}px`, // Width of the green block
            height: '100%',
            backgroundColor: 'rgba(116,236,21,255)',
            marginRight: '5px',
        };

        const redBlockStyle = {
            display: 'inline-block',
            width: `${width * 0.9 * 0.8}px`, // Width of the green block
            height: '100%',
            backgroundColor: 'rgba(237,93,32,255)',
            marginRight: '5px',
        };

        return (
            <div className="upgrades" style={topBlockStyle}>
                {fees != null && fieldLevel > 1 && fieldLevel !== (len) &&
                    fees.slice(1, fieldLevel).map((fee, index) => (
                        <div key={index} style={greenBlockStyle}></div>
                    ))
                }
                {fees != null && fieldLevel > 1 && fieldLevel === (len) &&
                    <div key={"all"} style={redBlockStyle}></div>
                }
            </div>
        );
    }
}

export default UpgradeBlock;
