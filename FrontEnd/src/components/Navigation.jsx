import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from "../features/auth/authSlice"




const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  {userInfos, isSucces} = useSelector((state) => state.auth)
  
  
  const onLogout = ()=>{ 
    dispatch(logout())
    dispatch(reset())
    navigate('/')
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
      <div>
        {userInfos && isSucces ? ( 
          <>
            <NavLink className="mainNavSignIn" to="/profile">
              <FaUserCircle className="fa" />
              <span>{userInfos.firstName}</span>
            </NavLink>
            <NavLink className="mainNavSignIn"  onClick={onLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
          ) : ( 
          <NavLink className="mainNavSignIn" to="/login">
            <FaUserCircle className="fa" />
            Sign In
          </NavLink>
          )
        } 
      </div>
    </div>
  )
}

export default Navigation
