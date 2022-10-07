import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from "../features/auth/authSlice"
//import { useEffect } from 'react'


/**
 * Creation of the navigation barre or header
 * @component
 * @returns {JSX.Element} Navigation component
 */

const Navigation = () => {
  const dispatch = useDispatch()
  const  {userInfos, isSuccess, firstName} = useSelector((state) => state.auth)
  

  const onLogout = ()=>{ 
    dispatch(logout())
    dispatch(reset())
  }
  
  return (
    <div className="mainNav">
      <NavLink className="mainNavLogo" to="/">
        <img
          className="mainNavLogoImage"
          src="./argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="mainNavItem">
        {userInfos && isSuccess ? ( 
          <>
            <div className="mainNavItem">
              <FaUserCircle className="fa" />
              <span>{firstName}</span>
            </div>
            <Link to="/" className="mainNavItem"  onClick={onLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
          ) : ( 
          <Link to ='/login' className="mainNavSignIn" >
            <FaUserCircle className="fa" />
            Sign In
          </Link>
          )
        } 
      </div>
    </div>
  )
}

export default Navigation
