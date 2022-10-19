import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from "../features/auth/authSlice"




/**
 * Creation of the navigation barre 
 * @component
 * @returns {JSX.Element} Navigation component
 */

const Navigation = () => {
  const dispatch = useDispatch()
  const  {token, firstName} = useSelector((state) => state.auth)

  const onLogout = ()=>{ 
    dispatch(logout())
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
        {token ? ( 
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
