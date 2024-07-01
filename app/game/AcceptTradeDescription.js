import React from 'react';
import '../font.css';
class Description extends React.Component {

    render() {
        const { amount1, amount2, scale } = this.props;

        const descriptionStyle = {
            fontFamily: "'Aller', sans-serif",
            fontSize: `${scale * 20}px`,
            marginLeft: `${scale * 5}px`,
            marginRight: `${scale * 5}px`,
        };

        const centeredText = {
            textAlign: 'center',
            width: '100%', // Ensure that "RENT" takes up the full width and centers the content
        };

        const leftRightContainer = {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        };

        const descriptionStyleCurrentLevel = {
            color: "red",
        };

        // Function for applying field level styles

        return (
            <div className="description" style={{ width: '100%' }}>
                <div style={descriptionStyle}>
                    {amount2 === 0 &&(
                    <div style={centeredText}>Your will get: {amount1}$</div>
                        )}
                    {amount1 === 0 &&(
                        <div style={centeredText}>Your will send: {amount2}$</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Description;
