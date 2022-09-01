import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserCircle} from "react-icons/fa"

const Navigation = () => {
    return (
        <div className='mainNav'>
            <NavLink className='mainNavLogo' to="/">
                <img
                className="mainNavLogoImage"
                src="./argentBankLogo.png"
                alt="Argent Bank Logo"
                />
            </NavLink>
            <div>
                <NavLink className="mainNavSignIn" to="/signIn">
                    <FaUserCircle className='fa'/>
                    Sign In
                </NavLink>
            </div> 
        </div>
    );
};

export default Navigation;