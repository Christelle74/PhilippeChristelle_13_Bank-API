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

    const {userInfos, isLoading,  isError, isSuccess,token, message} = useSelector(
      (state) => state.auth
    )

    const [rememberMe, setRememberMe]= useState(true)
    const [datas, setDatas] = useState({
      email:"",
      password:"",
    })

    useEffect(() => {
      if(isError){ 
        toast.error(message)
        dispatch(reset())
      }

      if (userInfos|| isSuccess) {
        navigate('/profile')
      }
      
    }, [userInfos,  isError, isSuccess, message, navigate,token, dispatch])
   

    const handleSubmit=(e)=>{
        e.preventDefault()
        //console.log(datas)
        if(datas){
        dispatch(login(datas), handleRememberMe)
      }
    }

    const handleRememberMe= ()=>{
          if(rememberMe){setRememberMe(false)}
          if(!rememberMe){setRememberMe(true)}
          console.log(rememberMe)
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
                <input type="checkbox" id="remember-me" onClick={handleRememberMe}/>
                <label htmlFor="remember-me" >Remember me</label>
            </div>
            <button className="signInButton" type="submit">Sign In</button>
            {isLoading && <><div className='error'>Utilisateur inexistant</div><Loader/></>}
        </form>
      </>
    );
};

export default LoginForm;