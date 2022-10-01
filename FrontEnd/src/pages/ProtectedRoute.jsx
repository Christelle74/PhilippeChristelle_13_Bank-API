import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


/**
 * Creation of a protected route that return to page 404 if there is a login error
 * @component
 * @returns {JSX.Element} ProtectedRoute component
 */
const ProtectedRoute = () => {

  const {userInfos}= useSelector((state)=>state.auth)

  if(!userInfos){
    return (
      <Navigate to="/login"/>
      // <div className="main error">
      //   <h1 className="error">404</h1>
      //   <p className="errorText">Sorry, an error has occurred</p>
      //   <NavLink to="/login" className="errorLink">
      //     Back to login page
      //   </NavLink>
      // </div>
    )
  }
  return <Outlet/>
}
export default ProtectedRoute
