import React from 'react'
import Feature from './FeatureItem'
import Chat from '../assets/img/icon-chat.png'
import Money from '../assets/img/icon-money.png'
import Security from '../assets/img/icon-security.png'


/**
 * Creation of the features component
 * @component
 * @returns {JSX.Element}
 */
const Features = () => {
  return (
    <div className="features">
      <Feature
        image={Chat}
        title="You are our #1 priority"
        text="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes"
      />
      <Feature
        image={Money}
        title="More savings means higher rates"
        text="The more you save with us, the higher your interest rate will be!"
      />
      <Feature
        image={Security}
        title="Security you can trust"
        text="We use top of the line encryption to make sure your data and money
            is always safe."
      />
    </div>
  )
}

export default Features
