import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';
const localImage = require('../../assets/MainBackground.jpeg');

const AboutScreen = () => (
    <View style={styles.container}>
        <ImageBackground
            source={localImage}
            style={styles.image}
            blurRadius={5}
            resizeMode="stretch"
        >
            <View style={styles.contentContainer}>
                <Text style={styles.title}>About Monopoly</Text>
                <Text style={styles.text}>
                    Monopoly is a classic board game where players roll two six-sided dice to move around the game board, buying and trading properties, and developing them with houses and hotels. Players collect rent from their opponents, with the goal being to drive them into bankruptcy. Money can also be gained or lost through Chance and Community Chest cards, and tax squares, players can end up in jail.
                </Text>
                <Text style={styles.text}>
                    The game has many variations, and players can set their own house rules to make it more interesting.
                </Text>
                <Text style={styles.subtitle}>Our Features</Text>
                <Text style={styles.text}>
                    In our custom Monopoly game, you can create your own custom game fields and rules. This allows for endless possibilities and variations to suit your preferences. Whether you want to add new properties, change the board layout, or introduce new cards, our builder tool makes it easy to customize and enjoy Monopoly in your own unique way.
                </Text>
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
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        margin: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'justify',
    },
});

export default AboutScreen;
