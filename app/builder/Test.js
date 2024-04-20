import React from 'react';
import './test.css';

class RingField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSector: null
        };
    }

    render() {
        const { radius, numSectors, onClick } = this.props;
        const { selectedSector } = this.state;
        const sectorAngle = 360 / numSectors;

        const ringStyle = {
            width: radius * 2,
            height: radius * 2,
            position: 'relative'
        };

        const sectorButtons = [];
        for (let i = 0; i < numSectors; i++) {
            const sectorStyle = {
                position: 'absolute',
                width: '0%',
                height: '100%',
                transformOrigin: 'center',
                transform: `rotate(${sectorAngle * i}deg)`
            };
            const buttonStyle = {
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '110px',
                height: '150px',
                backgroundColor: i === selectedSector ? 'blue' : 'lightblue',
                borderColor: 'lightblue',
                borderRadius: 0,
                borderWidth: 0,
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'pointer',
                clipPath: 'polygon(0% 0%, 100% 0%, 83% 100%, 17% 100%)'
            };
            sectorButtons.push(
                <div key={i} style={sectorStyle}>
                    <button
                        style={buttonStyle}
                        onClick={() => {
                            onClick(i);
                            this.setState({ selectedSector: i });
                        }}
                    >
                        Sector {i + 1}
                    </button>
                </div>
            );
        }

        return (
            <div className="ring-field" style={ringStyle}>
                {sectorButtons}
            </div>
        );
    }
}

export default RingField;
