import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='main error'>
            <h1 className='error'>404</h1>
            <p className='errorText'>Sorry, an error has occurred</p>
            <NavLink to='/' className='errorLink'>Back to home page</NavLink>
        </div>
    );
};

export default NotFound;