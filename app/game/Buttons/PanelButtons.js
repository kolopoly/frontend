import React, { useState } from 'react';
import '../../font.css';
import { Image } from 'react-native';

const RollButton = ({buttonWidth, scale, buttonHeight, active, clickAction, buttonColour, buttonText}) => {
    const [isActive, setIsActive] = useState(false);

    const ButtonStyle = {
        position: 'relative',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: active === true ? buttonColour : 'gray',
        borderBottomRightRadius: `${scale * 5}px`,
        borderBottomLeftRadius: `${scale * 5}px`,
        borderTopRightRadius: `${scale * 5}px`,
        borderTopLeftRadius: `${scale * 5}px`,
        padding: `${scale * 5}px`,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${scale * 10}px`,
        webkitBoxShadow: '5px 4px 0px 2px rgba(162, 195, 166, 1)',
        boxShadow: '5px 4px 0px 2px rgba(162, 195, 166, 1)',
        border: 'none',
        cursor: active === true ? 'pointer' : '',
        transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
    };

    const activeButtonStyle = {
        ...ButtonStyle,
        transform: 'scale(0.95)',
        boxShadow: '5px 4px 0px 1px rgba(162, 195, 166, 1)',
    };

    const textStyle = {
        fontSize: buttonText.toString().length < 10 ? buttonWidth * 0.15 * scale :  buttonWidth * 0.1 * scale,
        fontFamily: "'Aller', sans-serif",
        color: "black",
    }

    let buttonStyle

    if (active === true) {
        buttonStyle = isActive ? activeButtonStyle : ButtonStyle;
    }
    else{
        buttonStyle = ButtonStyle;
    }

    return (
        <button
            style={buttonStyle}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={active === true ? clickAction : null}
        >
            <div style={textStyle}>
                {buttonText}
            </div>
        </button>
    );
};

export default RollButton;
