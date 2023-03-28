import React from "react";

const Card = ({ value, color, imagePath }) => {
    return (
        <div className="card">
            <img src={imagePath} alt={`${value}${color}`} />
        </div>
    );
};

export default Card;
