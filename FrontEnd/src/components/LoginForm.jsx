import React from 'react';
import { useState } from 'react';
//import {useForm} from "react-hook-form";

const LoginForm = () => {

    const [formData, setFormData]= useState({
        username:"",
        password:""
    })
    const {username, password} = formData

    //récupération des données saisies dans un objet, mise à jour du state en appelant setFormData dans onChange
    const onChange=(e)=>{
       setFormData((prevState)=>({
        ...prevState,
        [e.target.name] :e.target.value
       }))
    }
    console.log(formData)//on voit la mise à jour du state au fur et à mesure de la saisie

    const onSubmit=(e)=>{
        e.preventDefault()
    }

    return (
        <form className='form' action="" method="post" onSubmit={onSubmit}>
                    <div className="inputWrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name='username' value={username} onChange={onChange}/>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className="inputRemember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="signInButton" type="submit">Sign In</button>
                </form>
    );
};

export default LoginForm;