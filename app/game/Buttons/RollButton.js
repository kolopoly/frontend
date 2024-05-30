import React, { useState } from 'react';
import { Image } from 'react-native';

const DiceImages = [
    require('../../../assets/dice/dice0001.png'),
    require('../../../assets/dice/dice0002.png'),
    require('../../../assets/dice/dice0003.png'),
    require('../../../assets/dice/dice0004.png'),
    require('../../../assets/dice/dice0005.png'),
    require('../../../assets/dice/dice0006.png'),]

const RollButton = ({buttonWidth, buttonHeight, active, clickAction, diceOne, diceTwo}) => {
    const [isActive, setIsActive] = useState(false);

    const ButtonStyle = {
        position: 'relative',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: active === true ? 'rgba(212,240,217,255)' : 'gray',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        webkitBoxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        boxShadow: '9px 8px 0px 2px rgba(162, 195, 166, 1)',
        border: 'none',
        cursor: active === true ? 'pointer' : '',
        transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
    };

    const activeButtonStyle = {
        ...ButtonStyle,
        transform: 'scale(0.95)',
        boxShadow: '5px 4px 0px 1px rgba(162, 195, 166, 1)',
    };

    const imageStyleOne = {
        position: 'absolute',
        top: buttonWidth * 0.05,
        right: buttonWidth * 0.1,
        width: buttonWidth * 0.15,
        height: buttonWidth * 0.15,
    };

    const imageStyleTwo = {
        position: 'absolute',
        bottom: buttonWidth * 0.05,
        left: buttonWidth * 0.1,
        width: buttonWidth * 0.15,
        height: buttonWidth * 0.15,
    };

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
            <Image source={DiceImages[diceOne - 1]} style={imageStyleOne} resizeMode="contain"/>
            <Image source={DiceImages[diceTwo - 1]} style={imageStyleTwo} resizeMode="contain"/>
        </button>
    );
};

export default RollButton;
