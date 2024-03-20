import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, Button} from 'react-native';

const localImage = require('./../assets/MainBackground.jpeg');
const { width, height } = Dimensions.get('window');
const image = { uri: "https://docs.expo.dev/static/images/tutorial/splash.png" };

const MainScreen = () => (
    <View style={styles.container}>
        <ImageBackground source={localImage} style={styles.image}>
            <div style={styles.bcontainer}>
                <div style={styles.buttons}>
                    <button style={styles.button}>Button 1</button>
                    <button style={styles.button}>Button 2</button>
                    <button style={styles.button}>Button 3</button>
                </div>
            </div>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        width: "100%",
        height: "100%",
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000a0',
    },
    bcontainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
    },
    button: {
        margin: "5px",
        padding: "15px 30px", // Adjusted padding to make the buttons bigger
        fontSize: 60, // Adjusted font size to make the buttons bigger
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
    }
});



export default MainScreen;
