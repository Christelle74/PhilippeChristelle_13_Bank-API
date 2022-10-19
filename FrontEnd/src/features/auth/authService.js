import axios from 'axios'
const API_URL = 'http://localhost:3001/api/v1/user/'

/**
 * @name API
 * @description links with backEnd 
 */

// Login user : (login est la route de connexion) , requête POST envoyé au serveur backEnd, arguments email et password
// le BackEnd renverra un JWT après une authentification réussie , permet d'accéder aux infos du backend
const login = async ({email, password}) => {
    return  await axios.post(API_URL + 'login', {email, password})
        .then((res) => {
            //console.log(res.data)//renvoi la réponse du serveur avec status, message et body
            //console.log(email, password)//retourne bien l'email et le password 
            return res.data
        })
        .catch((error)=>console.log(error))
}


//profile user : accès aux ressources protégées du backend, entête Authorization nécessaire avec un token
const userProfile = async(profileData, token)=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return await axios.post(API_URL + 'profile', profileData, config)
        .then((res)=> {
            //console.log(res.data.body)//retourne les infos du user nom, prenom, mail...
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
            //console.log(res.data.body)//retourne nom prénom mis à jour
            return res.data.body})
        .catch((error)=>console.log(error))
}

const authService = {login, userProfile, updateUserData}

export default authService