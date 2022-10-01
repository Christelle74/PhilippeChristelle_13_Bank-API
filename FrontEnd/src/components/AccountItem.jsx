import React from 'react'
import PropTypes from 'prop-types'


/**
 * Creation of AccountItem component
 * @component
 * @param {String} title 
 * @param {String} amount
 * @param {String} description
 * @param {Function} editBackground change the color of the button
 * @returns {JSX.Element} 
 */
const AccountItem = ({ title, amount, description, editBackground }) => {
    
  return (
    <section className="account">
      <div className="accountContentWrapper">
        <h3 className="accountTitle">{title}</h3>
        <p className="accountAmount">{amount}</p>
        <p className="accountAmountDescription">{description}</p>
      </div>
      <div className="accountContentWrapper cta">
        <button className={editBackground ? 'transactionButton violetBtn' : "transactionButton  greenBtn"}>View transactions</button>
      </div>
    </section>
  )
}

export default AccountItem


//Proptypes
AccountItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editBackground:PropTypes.func.isRequired,
}