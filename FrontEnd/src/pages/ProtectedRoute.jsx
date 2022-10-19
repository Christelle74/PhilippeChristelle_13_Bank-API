import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


/**
 * Creation of a protected route that return to login page if there is a login error
 * @component
 * @returns {JSX.Element} ProtectedRoute component
 */
const ProtectedRoute = () => {
  
  //on vérifie que le token existe avant d'accorder l'accès à sa page
  const {token}= useSelector((state)=> state.auth)
  console.log(token)
  if(!token){ 
    return (
      <Navigate to="/login"/>
    )
  }

  return <Outlet/>//restitue les routes enfants
}
export default ProtectedRoute
