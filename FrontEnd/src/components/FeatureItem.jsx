import React from 'react';

const Feature = ({image, title, text}) => {
    return (
        <div className='featureItem'>
            <img src={image} alt="featureImage" className="featureIcon" />
            <h3 className="featureItemTitle">{title}</h3>
            <p>{text}</p>
        </div>
    );
};

export default Feature;