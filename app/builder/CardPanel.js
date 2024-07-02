import React, { useState } from 'react';
import {ScrollView, View, StyleSheet, Text} from "react-native";

const CardPanel = ({amount, clickCopy, scale}) => {
    const ClassCard = ({ className, id, scale }) => {
        return (
            <View style={[styles.classCard, {height: 250 * scale, borderRadius: 8 * scale, margin: 5 * scale}]}>
                <Text>{className}</Text>
                <button onClick={() => {clickCopy(id)}}>Copy</button>
            </View>
        );
    };

    const cards = []

    return (
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                {Array.from({ length: amount }, (_, i) => (
                    <ClassCard key={i} className={`Class ${i + 1}`} id = {i} scale={scale} />
                ))}
            </ScrollView>
    );
};
const styles = StyleSheet.create({
    scrollContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        //justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    classCard: {
        width: '35%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default CardPanel;
