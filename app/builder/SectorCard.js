import React from 'react';
import Description from "./Description";
import {getNickname} from "../storage";

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
            borderBottom: '1px solid black'
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
        // make description here
        // {sectorName !== "Start" && <Description buyPrice={buyPrice} fees={fees} sellPrice={sellPrice} upgradePrice={upgradePrice} fieldLevel={fieldLevel}></Description>}
        return (
            <div className="sector-card" style={contentStyle} key={sectorId}>
                <div style={cardStyle}>
                    <div style={nameStyle}>{property.name}</div>
                    <div style={nameStyle}>{property.type}</div>
                </div>
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
            </div>
        );
    }
}

export default SectorCard;
