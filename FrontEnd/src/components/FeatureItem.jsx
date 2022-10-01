import React from 'react'
import PropTypes from 'prop-types'


/**
 * Creation of a feature item for the profile page
 * @component
 * @param {string} image 
 * @param {string} title 
 * @param {string} text 
 * @returns {JSX.Element} feature component
 */
const Feature = ({ image, title, text }) => {
  return (
    <div className="featureItem">
      <img src={image} alt="featureImage" className="featureIcon" />
      <h3 className="featureItemTitle">{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default Feature


//Proptypes
Feature.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}