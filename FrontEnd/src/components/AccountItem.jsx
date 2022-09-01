import React from 'react';
import TransactionButton from './TransactionButton';

const AccountItem = ({title, amount, description}) => {
    return (
        <section className='account'>
            <div className='accountContentWrapper'>
                <h3 className="accountTitle">{title}</h3>
                <p className="accountAmount">{amount}</p>
                <p className="accountAmountDescription">{description}</p>
            </div>
            <TransactionButton/>
        </section>
    );
};

export default AccountItem;