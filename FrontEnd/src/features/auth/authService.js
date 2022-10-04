import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'

/**
 * @name API
 * @description links with backEnd 
 */

// Login user : get datas from backend
const login = async (formData) => {
    return  await axios.post(API_URL + 'login', formData)
    .then((res) => {
        //console.log(res.data.body.token)
        if(res.data){localStorage.setItem("token", res.data.body.token)}
        return res.data
    })
    .catch((error)=>console.log(error))
}


//profile user : get data user's profile with the token from backend
const userProfile = async(profileData, token)=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return await axios.post(API_URL + 'profile', profileData, config)
        .then((res)=> {
            return res.data.body})
        .catch((error)=>console.log(error))
}

//update user profile 
const updateUserData =async(newData, token)=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
        return await axios.put(API_URL + 'profile', newData, config)
        .then((res)=>{
            console.log(res.data.body)
            return res.data.body})
        .catch((error)=>console.log(error))
}

// Logout user
const logout = () => {
    localStorage.removeItem('token');
    localStorage.clear()
}

const authService = { logout, login, userProfile, updateUserData}

export default authService