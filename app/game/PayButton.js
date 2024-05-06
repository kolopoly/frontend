import React, { useState } from 'react';
import "../font.css"

const PayButton = ({sectorWidth, sectorHeight, clickAction}) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '3',
        width: sectorWidth * 0.8,
        height: sectorHeight * 0.2,
        backgroundColor:'rgba(236,94,31,255)',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1',
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        border: "0px",
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(236,94,31,255)',
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 10px, rgba(0, 0, 0, 0.1) 0px 3px 3px",
    };

    const textStyle = {
        fontSize: sectorWidth * 0.18,
        fontFamily: "'Aller', sans-serif",
        color: "white",
    }

    let buttonStyle

    buttonStyle = defaultStyle;

    return (
        <button
            style={buttonStyle}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onClick={clickAction}
        >
            <div style={textStyle}>
                Pay Rent
            </div>
        </button>
    );
}

export default PayButton;
