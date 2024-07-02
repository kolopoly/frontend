import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image, Dimensions
} from 'react-native';
const localImage = require('../assets/MainBackground.jpeg');
const gifImage = require('../assets/giphy.gif');

let widthGlobal = window.innerWidth
let heightGlobal = window.innerHeight

const MainScreen = ({width, height, scale}) => {
    console.log(width, height)
    return (
    <View style={[styles.container, {width, height}]} >
        <ImageBackground
            source={localImage}
            style={[styles.image]}
            blurRadius={5 * scale}
            resizeMode="stretch"
        >
            <View style={styles.contentContainer}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, {borderRadius: 20 * scale, paddingVertical: 20 * scale, paddingHorizontal: 20 * scale, marginVertical: 20 * scale}]} href="/game">
                        <Text style={[styles.buttonText, {fontSize: 20 * scale}]}>Games</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {borderRadius: 20 * scale, paddingVertical: 20 * scale, paddingHorizontal: 20 * scale, marginVertical: 20 * scale}]} href="/builder">
                        <Text style={[styles.buttonText,{fontSize: 20 * scale}]}>Builder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {borderRadius: 20 * scale, paddingVertical: 20 * scale, paddingHorizontal: 20 * scale, marginVertical: 20 * scale}]} href="/about">
                        <Text style={[styles.buttonText, {fontSize: 20 * scale}]}>About</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gifContainer}>
                    <Image
                        source={gifImage}
                        style={styles.gif}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </ImageBackground>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: `${widthGlobal}px`,
        height: `${heightGlobal}px`,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', // Adjusted for even spacing
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: '',
        maxWidth: '30%', // Adjust max width if needed to move buttons more to the left
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#007bff",
        width: '40%'
    },
    buttonText: {
        color: "#fff",
        textAlign: 'center',
    },
    gifContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
    }
});

export default MainScreen;
