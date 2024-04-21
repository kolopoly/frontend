import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
const localImage = require('../assets/MainBackground.jpeg');
const gifImage = require('../assets/giphy.gif');

const MainScreen = () => (
    <View style={styles.container}>
        <ImageBackground
            source={localImage}
            style={styles.image}
            blurRadius={5}
            resizeMode="stretch"
        >
            <View style={styles.contentContainer}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} href="/game">
                        <Text style={styles.buttonText}>Games</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} href="/builder">
                        <Text style={styles.buttonText}>Builder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} href="/about">
                        <Text style={styles.buttonText}>About</Text>
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
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
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
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 45,
        marginVertical: 10,
        width: '25%'
    },
    buttonText: {
        fontSize: 20,
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
