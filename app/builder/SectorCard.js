import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";
import {TextInput} from "react-native";
import placeholderItem from "react-native-draggable-flatlist/src/components/PlaceholderItem";

class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId, updateSectorProperty, property} = this.props;

        const contentStyle = {
            width: sectorWidth,
            height: sectorHeight + sectorHeight * 0.5,
        }

        const cardStyle = {
            width: '100%',
            height: sectorHeight * 1.1,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'space-evenly', // Center children vertically
            borderTopRightRadius: '10%',
            borderTopLeftRadius: '10%',
            border: '2px solid black',
            alignItems: 'stretch'
        };

        const nameStyle = {
            fontWeight: 'bold',
            textAlign: 'center', // Center text horizontally
        };

        const descriptionStyle = {
            textAlign: 'left',
            paddingLeft: '5px',
            borderBottom: '1px solid black',
        };

        const buttonTableStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        };

        const colorStyle = {
            backgroundColor: property.color,
            width: '100%',
            height: sectorHeight * 0.3, // Adjust accordingly
            borderBottomRightRadius: '10%',
            borderBottomLeftRadius: '10%',
            border: '2px solid black'
        };

        const buttonStyle = {
            flex: '1', // Allow button to grow and fill available space
            margin: '5px',// Space between buttons
        };

        const buttonRowStyle = {
            display: 'flex',
            justifyContent: 'stretch',
        };

        const onChangeText = (text) => {
            updateSectorProperty(sectorId, "name", text)
        }
        const onChangeFees = (value, id) => {
            property.fees[id] = value
            updateSectorProperty(sectorId, "fees", property.fees)
        }

        const inputStyle = {
            margin: '5px',
           // padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1',
            width: '10px'
        };

        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            //justifyContent: 'space-between',
        };

        onChangeFees
        console.log(property)
        return (
            <div className="sector-card" style={contentStyle} key={sectorId}>
                <div style={cardStyle}>
                    <TextInput
                        onChangeText={onChangeText}
                        value={property.name}
                        style={nameStyle}
                    />
                    <select style={nameStyle} value={property.type} onChange={
                        (event)=>{
                            property.type = event.target.value;
                            updateSectorProperty(sectorId, "type", event.target.value)
                            if(event.target.value === 'start') {
                                updateSectorProperty(sectorId, "color", 'purple')
                            }
                            if(event.target.value === 'prison') {
                                updateSectorProperty(sectorId, "color", 'black')
                            }
                        }
                    }>
                    <option value="street">street</option>
                    <option value="prison">prison</option>
                    <option value="start">start</option>
                    </select>

                    {property.type === "street" && [...Array(4)].map((_, rowIndex) => (
                        <div key={rowIndex} style={rowStyle}>
                            {[0, 1].map(colIndex => {
                                const index = rowIndex * 2 + colIndex;
                                let plh = `Fee ${index}`
                                if(index === 0){
                                    plh = "Buy"
                                } if(index === 1){
                                    plh = "Upgrade"
                                }
                                return (
                                    <TextInput
                                        key={index}
                                        keyboardType="numeric"
                                        onChangeText={(text) => onChangeFees(text, index )}
                                        value={property.fees[index]}
                                        placeholder={plh}
                                        style={inputStyle}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                { property.type === "street" &&
                    <select value={property.color} style={colorStyle} onChange={
                        (event)=>{
                            property.color = event.target.value;
                            updateSectorProperty(sectorId, "color", event.target.value)
                        }
                    }>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="grey">Grey</option>
                        <option value="orange">Orange</option>
                    </select>
                }
                { property.type === "prison" &&
                    <div style={{backgroundColor: 'black', width: '100%',
                        height: sectorHeight * 0.3, // Adjust accordingly
                        borderBottomRightRadius: '10%',
                        borderBottomLeftRadius: '10%',
                        border: '2px solid black'}}> </div>
                }
                { property.type === "start" &&
                    <div style={{backgroundColor: 'purple', width: '100%',
                        height: sectorHeight * 0.3, // Adjust accordingly
                        borderBottomRightRadius: '10%',
                        borderBottomLeftRadius: '10%',
                        border: '2px solid black'}}> </div>
                }
            </div>
        );
    }
}

export default SectorCard;
