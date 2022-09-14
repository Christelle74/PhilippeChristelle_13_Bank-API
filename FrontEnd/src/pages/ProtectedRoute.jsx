import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

  const {userInfos}= useSelector((state)=>state.auth)

  if(!userInfos){
    return (
      <div className="main error">
        <h1 className="error">404</h1>
        <p className="errorText">Sorry, an error has occurred</p>
        <NavLink to="/login" className="errorLink">
          Back to login page
        </NavLink>
      </div>
    )
  }
  return <Outlet/>
}
export default ProtectedRoute
