import React, { useState } from 'react';
import "../../font.css"

const SellButton = ({sectorWidth, scale, sectorHeight, active, clickAction}) => {

    const [isPressed, setIsPressed] = useState(false);

    const defaultStyle = {
        flexOrder: '3',
        width: sectorWidth * 0.2,
        height: "15%",
        marginTop: sectorHeight * 1.37 * 0.2,
        backgroundColor: active === true ? 'rgba(255,105,98,255)' : 'gray',
        borderTopRightRadius: `${scale * 10}px`,
        borderBottomRightRadius: `${scale * 10}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1',
        boxShadow: `rgba(0, 0, 0, 0.19) 0px ${scale * 10}px ${scale * 20}px, rgba(0, 0, 0, 0.23) 0px ${scale * 6}px ${scale * 6}px`,
        border: "0px",
        cursor: active === true ? 'pointer' : '',
        transition: 'background-color 0.2s',
    };

    const pressedStyle = {
        ...defaultStyle,
        backgroundColor: 'rgba(255,105,98,0.8)',
        boxShadow: `rgba(0, 0, 0, 0.1) 0px ${scale * 5}px ${scale * 1}px, rgba(0, 0, 0, 0.1) 0px ${scale * 3}px ${scale * 3}px`,
    };

    const textStyle = {
        fontSize: sectorWidth * 0.18,
        fontFamily: "'Aller', sans-serif",
        color: "white",
    }

    let buttonStyle

    if (active === true) {
        buttonStyle = isPressed ? pressedStyle : defaultStyle;
    }
    else{
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
                -
            </div>
        </button>
    );
}

export default SellButton;
