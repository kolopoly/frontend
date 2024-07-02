import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import BuilderRing from './BuilderRing';
import CardPanel from './CardPanel';
import {backend} from "../backend";

const Builder = ({width, height, scale}) => {

    const [rules, setRules] = useState(null);
    let x = []
    for(let i = 0; i < 35; i++){
        x.push({
            color: 'white',
            name: 'sector',
            type: 'street',
            fees: [100, 50, 3, 4, 5, 6, 7, 8],
            escape_price: '100'
        })
    }
    const [sectorProperties, setSectorProperties] = useState(x);
    const [numSectors, setValue] = useState(15);

    const clickCopy = async (rule_id) => {
        console.log(rules[rule_id])
        let y = sectorProperties
        for(let i = 0; i < rules[rule_id]["field_amount"]; i++){
            let x = rules[rule_id]["fields"][i]
            if(x["type"] === "prison" || x["type"] === "start"){
                x["fees"] = [100, 50, 3, 4, 5, 6, 7, 8]
            }
            y[i] = x
        }
        setSectorProperties(y)
        setValue(rules[rule_id]["field_amount"])

    }

    const updateSectorProperty = (index, property, value) => {
        const updatedProperties = [...sectorProperties];
        updatedProperties[index] = { ...updatedProperties[index], [property]: value };
        setSectorProperties(updatedProperties);
    };

    useEffect(() => {
        console.log(`${backend}/get_rules`)
        const fetchRules = async () => {
            const response = await fetch(`${backend}/get_rules`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(JSON.parse(data))
            setRules(JSON.parse(data));
        };

        fetchRules().then(() => {
            console.log(rules)
        })
    }, []); // Empty dependency array ensures this runs only once


    return (
        <View style={styles.container}>
            <View style={[styles.leftContainer, {paddingLeft: 10 * scale, marginRight: 40 * scale}]}>
                    <CardPanel clickCopy={clickCopy} scale={scale} amount={rules == null ? 0 : rules.length}/>
            </View>

            <View style={styles.rightContainer}>
                <BuilderRing radius={350 * scale} scale={scale} updateSectorProperty={updateSectorProperty} sectorProperties={sectorProperties} setSectorProperties={setSectorProperties} numSectors={numSectors} setValue={setValue}/>
                </View>
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(191,230,196,255)",
    },
    leftContainer: {
        flex: 1,
        flexGrow: 2,
        backgroundColor: "rgba(191,230,196,255)",
        justifyContent: 'center',
        alignItems: "center",
    },
    rightContainer: {
        flex: 1,
        flexGrow: 3,
        backgroundColor: "rgba(191,230,196,255)",
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: '50%', // Set the width to 50% of the parent container
        alignSelf: 'center',
    },
});


export default Builder;
