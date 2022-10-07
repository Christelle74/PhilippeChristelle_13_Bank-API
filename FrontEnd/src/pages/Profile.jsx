import React, {useEffect} from 'react'
import AccountItem from '../components/AccountItem'
import { useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { userProfile, updateUserData, reset} from "../features/auth/authSlice"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Display the profile page with account elements
 * @component
 * @returns {JSX.Element} Profile component
 */
const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfos,message, firstName, lastName, isError, } = useSelector((state)=> state.auth)
    const authFirstName =useSelector((state)=>state.auth.firstName)
    const authLastName =useSelector((state)=>state.auth.lastName)
        

    useEffect(()=>{
      if(isError){
        toast.error(message);
        dispatch(reset())
        }
      if(!userInfos){
        navigate ('/login')
      }
       
      dispatch(userProfile())
    }, [userInfos,  isError, message,firstName, lastName, navigate, dispatch])

    //Edit form mode
    const [editNameForm, setEditNameForm] = useState(false)
    const [editBackground, setEditBackground] =useState(false)

    const editForm=(e)=>{
      e.preventDefault()
      setEditNameForm((current)=>!current)
      setEditBackground((current)=>!current)
    }

    //form values
    const [updateFirstName, setUpdateFirstName] = useState("");
	  const [updateLastName, setUpdateLastName] = useState("");
    

    const onSave=(e)=>{
      e.preventDefault()
      const userUpdateData= {
        firstName: updateFirstName? updateFirstName: firstName,
        lastName: updateLastName ? updateLastName : lastName,
      }
      dispatch(updateUserData(userUpdateData))
      console.log(userUpdateData)
      setEditNameForm((current)=>!current)
      setEditBackground((current)=>!current)
    }


  return (
    <div className={editBackground? "main bgLight" : "main bgDark"}>
      <div className="accountHeader">
          <h1 className={editBackground ? 'blackTitle' : 'whiteTitle' }>Welcome back</h1>

          {
            editNameForm ? 
            (
              <form className='userForm'>
                <div className="inputWrapper">
                    <label htmlFor="firstName"></label>
                    <input type="text" id="firstName" name='firstName' placeholder={firstName} required  onChange={(e)=>setUpdateFirstName(e.target.value)}/>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" name="lastName" placeholder={lastName} required onChange={(e)=>setUpdateLastName(e.target.value)}/>
                </div>
                
                <div className="userButtons">
                  <button className="btn" type="submit" onClick={onSave}>Save</button>
                  <button className="btn" type="submit" onClick={editForm}>Cancel</button>
                </div>
              </form>
            ) :
            (
              <div>
                <h2>{authFirstName + ' ' +authLastName}</h2>
                <button className="editButton" onClick={editForm}>Edit Name</button>
              </div>

            )
          }

      </div> 
      <h2 className="sr-only">Accounts</h2>
      <AccountItem 
        editBackground={editBackground}
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <AccountItem
        editBackground={editBackground}
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <AccountItem
        editBackground={editBackground}
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </div>
  )
}

export default Profile
