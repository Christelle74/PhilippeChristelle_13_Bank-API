import React from 'react'
import image from '../assets/img/bank-tree.jpeg'

const Banner = () => {
  return (
    <div className="hero">
      <img className="heroImg" src={image} alt="banner" />
      <section className="heroContent">
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  )
}

export default Banner
