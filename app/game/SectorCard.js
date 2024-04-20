import React from 'react';

class SectorCard extends React.Component {
    render() {
        const { sectorColor, sectorName, sectorDescription, sectorWidth, sectorHeight } = this.props;

        const contentStyle = {
            width: sectorWidth,
            height: sectorHeight + sectorHeight * 0.3,
        }

        const cardStyle = {
            width: '100%',
            height: sectorHeight,
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
            justifyContent: 'space-between'
        };

        const colorStyle = {
            backgroundColor: sectorColor,
            width: '100%',
            height: sectorHeight * 0.3, // Adjust accordingly
            borderBottomRightRadius: '10%',
            borderBottomLeftRadius: '10%',
            border: '2px solid black'
        };

        const buttonStyle = {
            flex: '1', // Allow button to grow and fill available space
            margin: '5px' // Space between buttons
        };

        const buttonRowStyle = {
            display: 'flex',
            justifyContent: 'stretch'
        };

        return (
            <div className="sector-card" style={contentStyle}>
                <div style={cardStyle}>
                    <div style={nameStyle}>{sectorName}</div>
                    <div style={descriptionStyle}>{sectorDescription}</div>
                    <table style={buttonTableStyle}>
                        <div style={buttonRowStyle}>
                            <button style={buttonStyle}>Buy</button>
                            <button style={buttonStyle}>Sell</button>
                        </div>
                        <div style={buttonRowStyle}>
                            <button style={buttonStyle}>Update</button>
                            <button style={buttonStyle}>Delete</button>
                        </div>
                    </table>
                </div>
                <div style={colorStyle}></div>
            </div>
        );
    }
}

export default SectorCard;
