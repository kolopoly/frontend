import React, { useState } from 'react';
import "../font.css"

const SaveButton = ({sectorWidth, sectorHeight, clickAction}) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '1',
        width: sectorWidth,
        height: "5%",
        marginTop: '10px',
        backgroundColor: 'rgba(167,244,116,255)',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'center',
        zIndex: '1',
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        border: "0px",
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    }

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(167,244,116,0.8)',
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 10px, rgba(0, 0, 0, 0.1) 0px 3px 3px",
    };

    const textStyle = {
        fontSize: sectorWidth * 0.18,
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
