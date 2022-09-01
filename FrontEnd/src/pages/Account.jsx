import React from 'react';
import AccountItem from '../components/AccountItem';

const Account = () => {
    return (
        <div className='main bgDark'>
            <div className='accountHeader'>
                <h1>Welcome back</h1> 
                <h2>name</h2>
                <button className="editButton">Edit Name</button>
            </div>
                    <AccountItem title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance"/>
                    <AccountItem title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance"/>
                    <AccountItem title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance"/>
        </div>
    );
};

export default Account;