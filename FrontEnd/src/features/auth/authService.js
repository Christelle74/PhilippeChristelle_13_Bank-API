import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'


// Login user : va chercher les données du backend
const login = async (loginData) => {
    console.log(loginData)//retourne email et password
    const {data} = await axios.post(API_URL + 'login', loginData)
    console.log(data)//retourne la réponse au login : status, body/token, message
    return data
}


//profile user
const userProfile = async(profileData, token)=>{
   
    const config={
        headers: {
            Authorization:`Bearer` + token,
        }
    }
    const {data} = await axios.post(API_URL + 'profile', profileData, config)
    console.log(data, profileData, token)
    return data.body
}

//change user profile
const user = async(newData, token)=>{
    console.log(newData, token)
    const config={
        headers: {
            Authorization:`Bearer` + token,
        }
    }
    const {data} = await axios.put(API_URL + 'profile',newData, config)
    console.log(data, newData)
    return data.body
}

// Logout user
const logout = () => {
    localStorage.removeItem('token');
    localStorage.clear()
}

const authService = { logout, login, userProfile,user}

export default authService