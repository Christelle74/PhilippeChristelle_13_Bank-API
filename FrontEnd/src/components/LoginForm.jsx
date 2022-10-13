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

    const {userInfos,isLoading,  isError,  message} = useSelector(
      (state) => state.auth
    )
    
    const [datas, setDatas] = useState({
      email:"",
      password:"",
      rememberMe:false,
    })

    useEffect(() => {
      //console.log(userInfos)
      if(isError){ 
        toast.error(message)
        dispatch(reset())
      }
      // if(datas.rememberMe){
      //   localStorage.setItem('token', userInfos.body.token);
      //   navigate('/profile')
      //   }
      if(userInfos) {
        localStorage.setItem('token', userInfos.body.token)
        navigate('/profile')
      }
      
    }, [isError, message, userInfos, navigate, datas, dispatch])
   

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        if(datas){
        dispatch(login(datas))
        }
    }

    return (
      <>
        <form className='form'  onSubmit={handleSubmit}>
            <div className="inputWrapper">
                <label htmlFor="email">Username</label>
                <input type="email" id="email" name='email' required   onChange={(e)=>setDatas({...datas, email: e.target.value})}/>
            </div>
            <div className="inputWrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required  onChange={(e)=>setDatas({...datas, password: e.target.value})}/>
            </div>
            <div className="inputRemember">
                <input type="checkbox" id="remember-me" onChange={(e)=>setDatas({...datas, rememberMe: e.target.checked})}/>
                <label htmlFor="remember-me" >Remember me</label>
            </div>
            <button className="signInButton" type="submit">Sign In</button>
            {isLoading && <><div className='error'>Loading in progress....</div><Loader/></>}
        </form>
      </>
    );
};

export default LoginForm;