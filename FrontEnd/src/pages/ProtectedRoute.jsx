import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


/**
 * Creation of a protected route that return to login page if there is no token
 * @component
 * @returns {JSX.Element} ProtectedRoute component
 */
const ProtectedRoute = () => {
  const {token}= useSelector((state)=> state.auth)

  if(!token){ 
    return (
      <Navigate to="/login"/>
    )
  }
  return <Outlet/>//restitue les routes enfants
}
export default ProtectedRoute
