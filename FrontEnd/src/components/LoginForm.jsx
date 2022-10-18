import React from 'react';
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,  isRememberMe } from "../features/auth/authSlice"
import Loader from './Loader';

/**
 * Creation of the login form for the signIn page
 * @component
 * @returns {JSX.Element} LoginForm component
 */
const LoginForm = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {isLoading, isError, isSuccess, rememberMe, token} = useSelector(
      (state) => state.auth
    )
    

    useEffect(() => {
      if(isSuccess) {
       console.log(isSuccess)
        navigate('/profile')
      }
    }, [isSuccess,navigate])
   
    const handleRememberMe =(e)=>{
      //console.log(e.target.checked)
      dispatch(isRememberMe(e.target.checked))
    }

    const submitForm=(datas)=>{
      //console.log(datas)
      dispatch(login(datas))
    }

    if(rememberMe===true){
      localStorage.setItem('token', token)
    }
   

    return (
      <>
        <form className='form'  onSubmit={handleSubmit(submitForm)}>
          {isError && <div>Connexion error </div>}
            <div className="inputWrapper">
                <label htmlFor="email">Username</label>
                <input type="email" id="email" name='email'  {...register('email', {required: true})} /> 
                </div>
            <div className="inputWrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" {...register('password', {required: true})}  />
                </div>
            <div className="inputRemember">
                <input type="checkbox" id="remember-me"  onChange={handleRememberMe}/>
                <label htmlFor="remember-me" >Remember me</label>
            </div>
            <button className="signInButton" type="submit">Sign In</button>
            {isLoading && <><div className='error'>Unexistant user....</div><Loader/></>}
        </form>
      </>
    );
};

export default LoginForm;