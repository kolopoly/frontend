import React, { useState, useRef, useEffect } from 'react';
import { Image, Animated, Easing } from 'react-native';

const DiceImages = [
    require('../../../assets/dice/dice0001.png'),
    require('../../../assets/dice/dice0002.png'),
    require('../../../assets/dice/dice0003.png'),
    require('../../../assets/dice/dice0004.png'),
    require('../../../assets/dice/dice0005.png'),
    require('../../../assets/dice/dice0006.png'),
];

const RollButton = ({ buttonWidth, scale,  buttonHeight, active, clickAction, diceOne, diceTwo }) => {
    const [isActive, setIsActive] = useState(false);
    const [rolling, setRolling] = useState(false);

    const rotationOne = useRef(new Animated.Value(0)).current;
    const rotationTwo = useRef(new Animated.Value(0)).current;
    const positionOne = new Animated.ValueXY({ x: 50 * scale, y: 0 });
    const positionTwo = new Animated.ValueXY({ x: -50 * scale, y: 0 });
    const [currentDiceOne, setCurrentDiceOne] = useState(diceOne);
    const [currentDiceTwo, setCurrentDiceTwo] = useState(diceTwo);

    useEffect(() => {
        setCurrentDiceOne(diceOne);
        setCurrentDiceTwo(diceTwo);
    }, [diceOne, diceTwo]);

    const ButtonStyle = {
        position: 'relative',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: active === true ? 'rgba(212,240,217,255)' : 'gray',
        borderBottomRightRadius: `${scale * 20}px`,
        borderBottomLeftRadius: `${scale * 20}px`,
        borderTopRightRadius: `${scale * 20}px`,
        borderTopLeftRadius: `${scale * 20}px`,
        padding: `${scale * 5}px`,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${scale * 20}px`,
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
        width: buttonHeight * 0.4,
        height: buttonHeight * 0.4,
    };

    const imageStyleTwo = {
        position: 'absolute',
        width: buttonHeight * 0.4,
        height: buttonHeight * 0.4,
    };

    let buttonStyle;

    if (active === true) {
        buttonStyle = isActive ? activeButtonStyle : ButtonStyle;
    } else {
        buttonStyle = ButtonStyle;
    }

    const rollDiceWithAnimation = () => {
        if (active) {
            setRolling(true);
            const x1 = ((Math.random() - 0.5) * 50 + 30) * scale;
            const x2 = -x1;
            const y1 = (Math.random() * 20 + 25) * scale;
            const y2 = -y1;
            const randomPositionOne = { x: x1, y: y1 };
            const randomPositionTwo = { x: x2, y: y2 };

            Animated.parallel([
                Animated.timing(rotationOne, {
                    toValue: 1 * scale,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotationTwo, {
                    toValue: 1 * scale,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(positionOne, {
                    toValue: randomPositionOne,
                    duration: 500,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                }),
                Animated.timing(positionTwo, {
                    toValue: randomPositionTwo,
                    duration: 500,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                rotationOne.setValue(0);
                rotationTwo.setValue(0);
                positionOne.setValue({ x: -50 * scale, y: 0 });
                positionTwo.setValue({ x: 50 * scale, y: 0 });
                setCurrentDiceOne(diceOne);
                setCurrentDiceTwo(diceTwo);
                setRolling(false);
                clickAction();
            });

            const interval = setInterval(() => {
                setCurrentDiceOne(Math.floor(Math.random() * 6) + 1);
                setCurrentDiceTwo(Math.floor(Math.random() * 6) + 1);
            }, 150);

            setTimeout(() => {
                clearInterval(interval);
            }, 1000);
        }
    };

    const interpolatedRotationOne = rotationOne.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const interpolatedRotationTwo = rotationTwo.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <button
            style={buttonStyle}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={rollDiceWithAnimation}
        >
            <Animated.Image
                source={DiceImages[currentDiceOne - 1]}
                style={[
                    imageStyleOne,
                    {
                        transform: [
                            { rotate: interpolatedRotationOne },
                            { translateX: positionOne.x },
                            { translateY: positionOne.y },
                        ],
                    },
                ]}
                resizeMode="contain"
            />
            <Animated.Image
                source={DiceImages[currentDiceTwo - 1]}
                style={[
                    imageStyleTwo,
                    {
                        transform: [
                            { rotate: interpolatedRotationTwo },
                            { translateX: positionTwo.x },
                            { translateY: positionTwo.y },
                        ],
                    },
                ]}
                resizeMode="contain"
            />
        </button>
    );
};

export default RollButton;
