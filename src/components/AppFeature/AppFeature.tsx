import React from 'react';
import './AppFeature.css';

interface PropsGrid {
    children?: React.ReactNode | React.ReactNode[];
}

const Grid: React.FC<PropsGrid> = ({ children }) => {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {Array.isArray(children) ? children : [children]}
        </section>
    );
};

interface PropsItem {
    imgSrc: string;
    imgAlt?: string;
    title: string;
    description: string;
}

const Item: React.FC<PropsItem> = ({ imgSrc, imgAlt, title, description }) => {
    return (
        <div className="feature-item">
            <img src={imgSrc} alt={imgAlt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default { Grid, Item };
