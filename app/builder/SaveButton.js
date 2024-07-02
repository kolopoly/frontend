import React, { useState } from 'react';
import "../font.css"

const SaveButton = ({sectorWidth, sectorHeight, clickAction, scale}) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '1',
        width: sectorWidth,
        height: "5%",
        marginTop: '10px',
        backgroundColor: 'rgba(167,244,116,255)',
        borderTopLeftRadius: `${scale * 10}px`,
        borderBottomLeftRadius: `${scale * 10}px`,
        borderTopRightRadius: `${scale * 10}px`,
        borderBottomRightRadius: `${scale * 10}px`,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'center',
        zIndex: '1',
        boxShadow: `rgba(0, 0, 0, 0.19) 0px ${scale * 10}px ${scale * 20}px, rgba(0, 0, 0, 0.23) 0px ${scale * 6}px ${scale * 6}px`,
        border: "0px",
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    }

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(167,244,116,0.8)',
        boxShadow: `rgba(0, 0, 0, 0.1) 0px ${scale * 5}px ${scale * 1}px, rgba(0, 0, 0, 0.1) 0px ${scale * 3}px ${scale * 3}px`,
    };

    const textStyle = {
        fontSize: sectorWidth * 0.14,
        fontFamily: "'Aller', sans-serif",
        color: "white",
    }

    let buttonStyle
    buttonStyle = isPressed ? pressedStyle : defaultStyle;
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
                +
            </div>
        </button>
    );
}

export default SaveButton;
