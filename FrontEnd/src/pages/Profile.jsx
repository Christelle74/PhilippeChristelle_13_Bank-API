import React, {useEffect} from 'react'
import AccountItem from '../components/AccountItem'
import { useNavigate } from "react-router-dom"
import { useSelector} from 'react-redux'
import { toast } from 'react-toastify'


const Account = () => {
    const navigate = useNavigate()

    const {userInfos, message, isError} = useSelector((state)=> state.auth)
    console.log(userInfos)

    useEffect(()=>{
      if(isError){toast.error(message)}
      if(!userInfos){ navigate("/login")}
      
    }, [userInfos, navigate, isError, message])


  return (
    <div className="main bgDark">
      <div className="accountHeader">
          <h1>Welcome back</h1>
          <h2>{userInfos.firstName} {userInfos.lastName}</h2>
          <button className="editButton">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountItem
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <AccountItem
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <AccountItem
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </div>
  )
}

export default Account
