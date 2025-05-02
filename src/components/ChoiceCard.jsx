import React from 'react';
import '../styles/ChoiceCard.css';

const ChoiceCard = ({ title, content, onClick }) => {
    return (
        <div className="choice-card" onClick={onClick}>
            <div className="choice-card-title">{title}</div>
            <div className="choice-card-content">{content}</div>
        </div>
    );
};

export default ChoiceCard;
