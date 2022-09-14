import React from 'react';
import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { login, reset} from "../features/auth/authSlice"
import Loader from './Loader';

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const { userInfos, isLoading,  isError, isSuccess,  message } = useSelector(
      (state) => state.auth
    )
    console.log(userInfos, isSuccess)
    
    const [formData, setFormData]= useState({
        email:"",
        password:""
    })
    const {email, password} = formData // destructuring 
    //console.log(email, password)

    useEffect(() => {
      if(isError){ 
      toast.error(message)}
      
      if (userInfos) {navigate('/profile')}
      
      dispatch(reset())
    }, [userInfos,  isError, isSuccess, message, navigate, dispatch])

    //récupération des données saisies dans un objet, mise à jour du state en appelant setFormData dans onChange
    const onChange=(e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name] :e.target.value
      }))
    }
   
    const onSubmit=(e)=>{
        e.preventDefault()
        const userData= {
          email, password, 
        }
        dispatch(login(userData))
        console.log(userData)
    }

    return (
      <>
        <form className='form'  onSubmit={onSubmit}>
            <div className="inputWrapper">
                <label htmlFor="email">Username</label>
                <input type="email" id="email" name='email' required  value={email} onChange={onChange}/>
            </div>
            <div className="inputWrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} onChange={onChange}/>
            </div>
            <div className="inputRemember">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {!isLoading && <button className="signInButton" type="submit" onClick={()=>{}}>Sign In</button>}
            { isLoading && <Loader/>}
        </form>
      </>
    );
};

export default LoginForm;