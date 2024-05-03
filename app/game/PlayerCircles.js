import React from 'react';
import './Circle.css'; // Make sure to create the appropriate CSS file

const Circle = ({ color, number, radius }) => {
    const size = `${radius * 2}px`;
    const style = {
        backgroundColor: color,
        width: size,
        height: size,
        lineHeight: size
    };

    return (
        <div className="circle" style={style}>
            <span className="number">{number}</span>
        </div>
    );
};

export default Circle;
