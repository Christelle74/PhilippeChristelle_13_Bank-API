import React, {useEffect} from 'react'
import AccountItem from '../components/AccountItem'
//import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { userProfile, updateUserData, reset} from "../features/auth/authSlice"
import { useState } from 'react'

/**
 * Display the profile page with account elements
 * @component
 * @returns {JSX.Element} Profile component
 */
const Profile = () => {
    const dispatch = useDispatch()
    //const navigate = useNavigate()

    const {userInfos,message, firstName, lastName, isError, } = useSelector((state)=> state.auth)
    const authFirstName =useSelector((state)=>state.auth.firstName)
    const authLastName =useSelector((state)=>state.auth.lastName)
    const token =useSelector((state)=>state.auth.userInfos.body.token)
    console.log(authFirstName, authLastName, token)
    

    useEffect(()=>{
      if(isError){
        toast.error(message);
        dispatch(reset())
        }

      dispatch(userProfile())
    }, [userInfos,  isError, message,firstName, lastName, dispatch])

    //Edit form mode
    const [editNameForm, setEditNameForm] = useState(false)
    const [editBackground, setEditBackground] =useState(false)

    const editForm=()=>{
      if(!editNameForm){setEditNameForm(true)}
      if(!editBackground){setEditBackground(true)}
    }

    //form values
    const [updateData, setUpdateData]= useState({
      userUpdateFirstName:"",
      userUpdateLastName:"",
    })
    const {userUpdateFirstName, userUpdateLastName} = updateData // destructuring 
    //console.log(email, password)

    const onChange=({currentTarget})=>{
      const {value, name} = currentTarget
      console.log(value, name)
      setUpdateData({
        ...updateData,//on garde les données saisies (components, hooks, state)
        [name]: value
      })
    }

    const onSave=(e)=>{
      e.preventDefault()
      const userUpdateData= {
        firstName: userUpdateFirstName? userUpdateFirstName: firstName,
        lastName: userUpdateLastName ? userUpdateLastName : lastName,
      }
      dispatch(updateUserData(userUpdateData))
      console.log(userUpdateData)
      if(editNameForm){setEditNameForm(false)}
      if(editBackground){setEditBackground(false)}
    }

    const onCancel=()=>{
      if(editNameForm){setEditNameForm(false)}
      if(editBackground){setEditBackground(false)}
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
                    <input type="text" id="firstName" name='firstName' placeholder='FirstName' required  onChange={onChange}/>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" name="lastName" placeholder='LastName' required onChange={onChange}/>
                </div>
                
                <div className="userButtons">
                  <button className="btn" type="submit" onClick={onSave}>Save</button>
                  <button className="btn" type="submit" onClick={onCancel}>Cancel</button>
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
