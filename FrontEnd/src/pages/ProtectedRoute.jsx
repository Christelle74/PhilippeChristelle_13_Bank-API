import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


/**
 * Creation of a protected route that return to login page if there is a login error
 * @component
 * @returns {JSX.Element} ProtectedRoute component
 */
 const ProtectedRoute = () => {
  const token = localStorage.getItem("token")
  console.log('token', token)
  
  if(!token){
    return (
      <Navigate to="/login"/>
    )
  }
  return <Outlet/>//restitue les routes enfants
}
export default ProtectedRoute
