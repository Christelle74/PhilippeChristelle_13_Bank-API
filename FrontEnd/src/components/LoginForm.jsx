import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { login, reset} from "../features/auth/authSlice"
import Loader from './Loader';


/**
 * Creation of the login form for the signIn page
 * @component
 * @returns {JSX.Element} LoginForm component
 */
const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfos, isLoading,  isError, isSuccess, message} = useSelector(
      (state) => state.auth
    )
       
    const [formData, setFormData]= useState({
        email:"",
        password:"",
    })
    const {email, password} = formData // destructuring 
    //console.log(email, password)

    useEffect(() => {
      if(isError){ 
      toast.error(message)}
      
      if (userInfos|| isSuccess) {
        localStorage.setItem("token", userInfos.body.token)
        navigate('/profile')
      }
      dispatch(reset())
    }, [userInfos,  isError, isSuccess, message, navigate, dispatch])

    //récupération des données saisies dans un objet, mise à jour du state en appelant setFormData dans onChange
    const onChange=({currentTarget})=>{
      const {value, name} = currentTarget
      setFormData({
        ...formData,//on garde les données saisies (components, hooks, state)
        [name]: value
      })
    }
   
    const onSubmit=(e)=>{
        e.preventDefault()
        const userData= {
          email, password, 
        }
        if(userData){
        dispatch(login(userData))
      }
    }

    return (
      <>
        <form className='form'  onSubmit={onSubmit}>
            <div className="inputWrapper">
                <label htmlFor="email">Username</label>
                <input type="email" id="email" name='email' required   onChange={onChange}/>
            </div>
            <div className="inputWrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required  onChange={onChange}/>
            </div>
            <div className="inputRemember">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me" >Remember me</label>
            </div>
            { !isLoading &&<button className="signInButton" type="submit">Sign In</button>}
            { isLoading && <><button className="signInButton" type="submit">Sign In</button>
            <div className='error'>Utilisateur inexistant</div><Loader/></>}
        </form>
      </>
    );
};

export default LoginForm;