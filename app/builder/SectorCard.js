import React from 'react';
import {getNickname} from "../storage";
import {TextInput, View, Text} from "react-native";
import placeholderItem from "react-native-draggable-flatlist/src/components/PlaceholderItem";

class SectorCard extends React.Component {

    render() {
        const { sectorColor, sectorName, sectorWidth, sectorHeight, sectorId, updateSectorProperty, property} = this.props;

        const contentStyle = {
            width: sectorWidth,
            height: sectorHeight + sectorHeight * 0.5,
        }

        const nameStyle = {
            display: "flex",
            fontSize: sectorWidth * 0.15,
            fontFamily: "'Aller', sans-serif",
            textAlign: 'center',
            outlineStyle: 'none',
        };

        const feesStyle = {
            width: "50%",
            height: "100%",
            display: "flex",
            fontSize: sectorWidth * 0.08,
            fontFamily: "'Aller', sans-serif",
            textAlign: 'center',
            outlineStyle: 'none',
        };
        const titleField = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: "93%",
            height: "20%",
            borderTopRightRadius: '15px',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            backgroundColor: property.color, //change to actual color
        }

        const insideCard = {
            width: "85%",
            height: "90%",
            paddingLeft: "3px",
            paddingRight: "3px",
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: "7px",
            justifyContent: 'space-between',
            borderTopRightRadius: '8%',
            borderTopLeftRadius: '8%',
            borderBottomLeftRadius: '8%',
            borderBottomRightRadius: '8%',
            border: `5px solid ${property.color}`,
            alignItems: 'center',
        }
        const contentVerticalHolder = {
            width: sectorWidth,
            height: sectorHeight * 1.57,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        }

        const cardStyle = {
            flexOrder: '2',
            width: sectorWidth,
            height: sectorHeight * 1.37,
            backgroundColor: 'white',
            borderTopRightRadius: '8%',
            borderTopLeftRadius: '8%',
            borderBottomLeftRadius: '8%',
            borderBottomRightRadius: '8%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '2',
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        };

        const TypeSelector = {
            flexOrder: '3',
            width: sectorWidth * 0.8,
            height: sectorHeight * 0.2,
            backgroundColor:'rgba(93,147,246,255)',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1',
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            border: "0px",
            cursor: 'pointer',
            fontSize: sectorWidth * 0.1,
            fontFamily: "'Aller', sans-serif",
            color: "black",
            textAlign: 'center',
        };

        const colorSelector = {
            flexOrder: '3',
            width: sectorWidth * 0.8,
            height: sectorHeight * 0.2,
            backgroundColor: property.color,
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1',
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            border: "0px",
            cursor: 'pointer',
            fontSize: sectorWidth * 0.1,
            fontFamily: "'Aller', sans-serif",
            color: "black",
            textAlign: 'center',
        };

        const onChangeText = (text) => {
            updateSectorProperty(sectorId, "name", text)
        }
        const onChangeFees = (value, id) => {
            property.fees[id] = value
            updateSectorProperty(sectorId, "fees", property.fees)
        }

        const onChangeEscapePrice = (value) => {
            property.escape_price = value
            updateSectorProperty(sectorId, "escape_price", property.escape_price)
        }

        const rowStyle = {
            width: '100%',
            height: '20%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        };

        onChangeFees
        console.log(property)

        return (
            <div className="sector-card" style={contentStyle} key={sectorId}>
                <div style={contentVerticalHolder}>
                    { property.type === "street" &&
                        <select value={property.color} style={colorSelector} onChange={
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
                    <div style={cardStyle}>
                        <div style={insideCard}>
                            <div style={titleField}>
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={property.name}
                                    maxLength={9}
                                    style={nameStyle}
                                    caretHidden={false}
                                    contextMenuHidden={true}
                                    blurOnSubmit={true}
                                />
                            </div>

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
                                            <View style={{ alignItems: 'center', flex: 1 }}>
                                                <Text style={feesStyle}>{plh}</Text>
                                                <TextInput
                                                    key={index}
                                                    keyboardType="numeric"
                                                    onChangeText={(text) => onChangeFees(text, index )}
                                                    value={property.fees[index]}
                                                    style={feesStyle}
                                                    maxLength={4}
                                                    caretHidden={false}
                                                    contextMenuHidden={true}
                                                    blurOnSubmit={true}
                                                />
                                            </View>
                                        );
                                    })}
                                </div>
                            ))}

                            {property.type === 'prison' &&
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={feesStyle}>{"Escape Price"}</Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            onChangeText={(text) => onChangeEscapePrice(text)}
                                            value={property.escape_price}
                                            style={feesStyle}
                                            maxLength={4}
                                            caretHidden={false}
                                            contextMenuHidden={true}
                                            blurOnSubmit={true}
                                        />
                                    </View>
                                </View>
                            }
                        </div>
                    </div>
                    <select style={TypeSelector} value={property.type} onChange={
                        (event)=>{
                            property.type = event.target.value;
                            updateSectorProperty(sectorId, "type", event.target.value)
                            if(event.target.value === 'start') {
                                updateSectorProperty(sectorId, "color", 'purple')
                            }
                            if(event.target.value === 'prison') {
                                updateSectorProperty(sectorId, "color", 'yellow')
                            }
                            if(event.target.value === 'street') {
                                updateSectorProperty(sectorId, "color", 'white')
                            }
                        }
                    }>
                        <option value="street">street</option>
                        <option value="prison">prison</option>
                        <option value="start">start</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default SectorCard;
