import React from 'react';
import LoginForm from '../components/LoginForm';
import {FaUserCircle} from "react-icons/fa"

const LoginPage = () => {
    
    
    return (
        <div className='bgDark main'>
            <div className='signInContent'>
                <FaUserCircle className='fa'/>
                {/* <i className="fa fa-user-circle signInIcon"></i> */}
                <h1>Sign In</h1>
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;