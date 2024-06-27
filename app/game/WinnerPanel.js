import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WinnerPanel = ({ winner, lost }) => {
    if (!winner) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.panel}>
                {lost === false && <Text style={styles.winnerText}>Congratulations! You Win</Text> }
                {lost === true && <Text style={styles.winnerText}>You Lost!</Text> }
                <Text style={styles.winnerText}>{winner} has won the game!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    panel: {
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    winnerText: {
        fontFamily: "'Aller', sans-serif",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default WinnerPanel;
