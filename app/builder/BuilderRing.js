import React, {useEffect, useState} from 'react';
import './ring.css';
import SectorCard from './SectorCard';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { StyleSheet } from 'react-native';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveButton from "./SaveButton";
import {backend, wsbackend} from "../backend";
import {getNickname} from "../storage";

const BuilderRing = ({ radius, sectorProperties, setSectorProperties, updateSectorProperty, numSectors, setValue}) => {
    const [selectedSector, setSelectedSector] = useState(null);
    const newRadius = radius;
    const sectorAngle = 360 / numSectors;
    const sectorWidth = (newRadius * 2 * 3.1415) / numSectors;
    const sectorHeight = (sectorWidth * 100) / 150 * (numSectors / 10);

    console.log(sectorProperties)
    const handleSliderChange = (newValue) => {
        setValue(newValue);
        if(selectedSector >= newValue){
            setSelectedSector(newValue-1)
        }
    };

    const ringStyle = {
        width: radius * 2,
        height: radius * 2,
        position: 'relative',
    };

    const sectorButtons = [];
    const prop = sectorProperties
    console.log(prop)
    for (let i = 0; i < numSectors; i++) {

        const sectorStyle = {
            position: 'absolute',
            width: '0%',
            height: `${newRadius * 2}px`,
            transformOrigin: 'center',
            transform: `rotate(${sectorAngle * i}deg)`
        };
        const buttonStyle = {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${sectorWidth}px`,
            height: `${sectorHeight}px`,
            backgroundColor: i === 0 ? 'rgba(136,171,150,255)' : i % 2 === 0 ? 'rgba(182,219,186,255)' : 'rgba(197,232,201,255)',
            borderColor: 'solid black',
            borderTop: `${sectorHeight * 0.05}px solid rgba(136,171,150,255)`,
            borderBottom: `${sectorHeight * 0.2}px solid ${prop[i].color}`,
            textAlign: 'center',
            lineHeight: '30px',
            cursor: 'pointer',
            clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'
        };

        let whiter = {
            backgroundColor: 'transparent'
        }

        if(selectedSector === i){
            whiter = {
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${sectorWidth}px`,
                height: `${sectorHeight}px`,
                lineHeight: '30px',
                clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
                border: '4px solid white',
                backgroundColor: 'rgb(255,255,255,0.8)',
                pointerEvents: 'none',
            }
        }

        sectorButtons.push(
            <div key={i} style={sectorStyle}>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        //onClick(i);
                        if (selectedSector === i) {
                            setSelectedSector(null);
                        } else {
                            setSelectedSector(i);
                        }
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Aller', sans-serif",
                            position: 'absolute',
                            bottom: `-${sectorHeight * 0.2 - 5}px`,
                            left: '50%',
                            width: '70%',
                            transform: 'translate(-50%, 0)',
                            textAlign: 'center',
                            fontSize: '90%',
                            lineHeight: '15px',
                            marginTop: `${sectorHeight * 0.5}px`,
                            backgroundColor: 'rgba(255, 255, 255, 0)', // Optional: Set a background color if needed to cover the border
                            zIndex: '10' // Ensure the zIndex is higher than the button's border
                        }}
                    >
                        {prop[i].name}
                    </div>
                </button>
                <div style={whiter}></div>
            </div>
        );
    }

    const validateAndSave = async () => {
        let prop = sectorProperties
        let num = numSectors
        let json = {
            "field_amount": num,
            "start_balance": 500,
            "fields": []
        }
        for (let i = 0; i < num; i++) {
            let field_data = {
                "name": prop[i].name,
                "type": prop[i].type,
                "color": prop[i].color,
            }
            if(prop[i].type === "street"){
                field_data["fees"] = prop[i].fees.slice(2)
                field_data["buy_price"] = prop[i].fees[0]
                field_data["upgrade_price"] = prop[i].fees[1]
            } else if(prop[i].type === "start"){
                field_data["add_to_balance"] = 50
            } else if(prop[i].type === "prison"){
                field_data["escape_price"] = 20
            }
            json.fields.push(field_data)
        }
        console.log(json)
        try {
            console.log(`${backend}/save_rule`)
            const response = await fetch(`${backend}/save_rule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            console.log(`${backend}/save_rules`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
        } catch (error) {
            toast(error)
        }
        toast("OK")
    }


    return (
        <div style={styles.holder}>
            <Slider
                min={14}
                max={25}
                step={1}
                value={numSectors}
                onChange={handleSliderChange}
                range
                marks
                valueLabelDisplay="auto"
                style={styles.slider}

            />
            <div className="ring-field" style={ringStyle}>
                {selectedSector !== null && (
                    <SectorCard
                        sectorColor={'green'}
                        sectorName={'AA'}
                        sectorWidth={radius - sectorHeight * 1.15}
                        sectorHeight={sectorHeight * 1.3}
                        sectorId={selectedSector}
                        updateSectorProperty={updateSectorProperty}
                        property={sectorProperties[selectedSector]}
                    />
                )}
                {sectorButtons}
            </div>
            <SaveButton sectorWidth={100} sectorHeight={100} clickAction={validateAndSave}/>
            <ToastContainer/>
        </div>
    );
};

const styles = StyleSheet.create({
    slider: {
        width: '50%', // Set the width to 50% of the parent container
        alignSelf: 'center',
    },
    holder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    button:{

    }
});

export default BuilderRing;
