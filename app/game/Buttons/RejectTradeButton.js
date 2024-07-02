import React, { useState } from 'react';
import "../../font.css"

const PayButton = ({sectorWidth, sectorHeight, clickAction, scale}) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '3',
        width: sectorWidth * 0.8,
        height: sectorHeight * 0.2,
        backgroundColor:'rgba(250,30,31,255)',
        borderBottomRightRadius: `${scale * 10}px`,
        borderBottomLeftRadius: `${scale * 10}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1',
        boxShadow: `rgba(0, 0, 0, 0.19) 0px ${scale * 10}px ${scale * 20}px, rgba(0, 0, 0, 0.23) 0px ${scale * 6}px ${scale * 6}px`,
        border: "0px",
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(236,94,31,255)',
        boxShadow: `rgba(0, 0, 0, 0.1) 0px ${scale * 5}px ${scale * 1}px, rgba(0, 0, 0, 0.1) 0px ${scale * 3}px ${scale * 3}px`,
    };

    const textStyle = {
        fontSize: sectorWidth * 0.14,
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
                Reject
            </div>
        </button>
    );
}

export default PayButton;
