import React, { useState } from 'react';
import './ring.css';
import SectorCard from './SectorCard';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { StyleSheet } from 'react-native';

const BuilderRing = ({ radius, onClick }) => {
    const [selectedSector, setSelectedSector] = useState(null);
    const [numSectors, setValue] = useState(15);
    const newRadius = radius;
    const sectorAngle = 360 / numSectors;
    const sectorWidth = (newRadius * 2 * 3.1415) / numSectors;
    const sectorHeight = (sectorWidth * 100) / 150 * (numSectors / 10);

    let x = []
    for(let i = 0; i < 35; i++){
        x.push({
            color: 'white',
            name: 'Sector',
            type: 'Street'
        })
    }
    const [sectorProperties, setSectorProperties] = useState(x);

    const updateSectorProperty = (index, property, value) => {
        const updatedProperties = [...sectorProperties];
        updatedProperties[index] = { ...updatedProperties[index], [property]: value };
        setSectorProperties(updatedProperties);
    };

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
    for (let i = 0; i < numSectors; i++) {
        const sectorStyle = {
            position: 'absolute',
            width: '0%',
            height: `${newRadius * 2}px`,
            transformOrigin: 'center',
            transform: `rotate(${sectorAngle * i}deg)`,
        };

        const buttonStyle = {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${sectorWidth}px`,
            height: `${sectorHeight}px`,
            backgroundColor: i === selectedSector ? 'gray' : 'white',
            borderColor: 'solid black',
            borderBottom: `${sectorHeight * 0.1}px solid ${prop[i].color}`,
            textAlign: 'center',
            lineHeight: '30px',
            cursor: 'pointer',
            clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
        };
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
                            position: 'absolute',
                            bottom: '0', // Position it at the bottom
                            left: '50%', // Start from the center horizontally
                            width: '70%', // Set the width of the text container to be 80% of its parent
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            fontSize: '70%',
                            lineHeight: '15px',
                            marginTop: `${sectorHeight * 0.5}px`,
                        }}
                    >
                        {''}
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div>
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
        </div>
    );
};

const styles = StyleSheet.create({
    slider: {
        width: '50%', // Set the width to 50% of the parent container
        alignSelf: 'center',
    },
});

export default BuilderRing;
