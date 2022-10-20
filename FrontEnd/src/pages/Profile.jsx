import React, {useEffect} from 'react'
import AccountItem from '../components/AccountItem'
import { useDispatch, useSelector} from 'react-redux'
import { userProfile, updateUserData} from "../features/auth/authSlice"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Display the profile page with account elements and access to edit form
 * @component
 * @returns {JSX.Element} Profile component
 */
const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token,  firstName, lastName } = useSelector((state)=> state.auth)
    const authFirstName =useSelector((state)=>state.auth.firstName)
    const authLastName =useSelector((state)=>state.auth.lastName)
        

    useEffect(()=>{
      if(!token){
        navigate ('/login')
      }
      navigate ('/profile')
      dispatch(userProfile())
    }, [token, navigate, dispatch])


    //Edit form mode
    const [editNameForm, setEditNameForm] = useState(false)
    const [editBackground, setEditBackground] =useState(false)

    const editForm=(e)=>{
      e.preventDefault()
      setEditNameForm(!editNameForm)
      setEditBackground(!editBackground)
    }

    //form values
    const [updateUserName, setUpdateUserName]=useState({firstName:'', lastName:''})
    
    const inputHandle = (e) => {
      setUpdateUserName(() => ({
        ...updateUserName,
        [e.target.name]: e.target.value,
      }))
    }
    const onSave=(e)=>{
      e.preventDefault()
      dispatch(updateUserData(updateUserName))
      console.log(updateUserName)
      setEditNameForm()
      setEditBackground()
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
                    <input type="text" id="firstName" name='firstName' placeholder={firstName} required  onChange={inputHandle}/>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" name="lastName" placeholder={lastName} required onChange={inputHandle}/>
                </div>
                
                <div className="userButtons">
                  <button className="btn" type="submit" onClick={onSave}>Save</button>
                  <button className="btn" type="submit" onClick={editForm}>Cancel</button>
                </div>
              </form>
            ) :
            (
              <div>
                <h2>{authFirstName + ' ' + authLastName}</h2>
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
