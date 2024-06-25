import React, { useState } from 'react';
import "../../font.css"

const StartTradeButton = ({ sectorWidth, sectorHeight, active, clickAction }) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '1',
        width: "10%",
        height: "70%",
        backgroundColor: active === true ? 'rgba(180,240,217,255)' : 'gray',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center', // Corrected spelling
        zIndex: '3',
        webkitBoxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        boxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        border: "0px",
        cursor: active === true ? 'pointer' : '',
        transition: 'background-color 0.2s',
    }

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(167,244,116,0.8)',
        webkitBoxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        boxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
    };

    const textStyle = {
        fontSize: `20px`,
        fontFamily: "'Aller', sans-serif",
        color: "black",
        transform: "rotate(90deg)",
        paddingRight: `${sectorWidth * 0.5}px`

    }

    let buttonStyle

    if (active === true) {
        buttonStyle = isPressed ? pressedStyle : defaultStyle;
    }
    else {
        buttonStyle = defaultStyle;
    }
    return (
        <button
            style={buttonStyle}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onClick={active === true ? clickAction : null}
        >
            <div style={textStyle}>
                Trade
            </div>
        </button>
    );
}

export default StartTradeButton;
