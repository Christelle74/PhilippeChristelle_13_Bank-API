import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


/**
 * Creation of a protected route that return to login page if there is a login error
 * @component
 * @returns {JSX.Element} ProtectedRoute component
 */
 const ProtectedRoute = () => {

  const {userInfos}= useSelector((state)=>state.auth)

  if(!userInfos){
    return (
      <Navigate to="/login"/>
    )
  }
  return <Outlet/>
}
export default ProtectedRoute
