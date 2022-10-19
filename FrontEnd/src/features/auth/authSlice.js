import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//initialize token from local storage
const token = localStorage.getItem('token') ? localStorage.getItem("token") : null
console.log(token)

//Jwt ou JSON web token gère l'authentification et le controle d'accès côté client (système de sécurité)
//createSlice : methode d'assistance qui simplifie le processus de creation d'actions et de reducteurs
//slice : collection de logique et d'actions de reducer pour une fonctionnalité
//createAsyncThunk : API qui envoie les requêtes asynchrones au backend, les paramètres sont : nom de la tranche/nom de l'action (auth/login)+fonction asynchrone
//createAsyncThunk génère les 3 types d'action de cyle de vie pending, fulfilled et rejected
//thunkAPi : action creator, contient des paramètres comme 'getstate, dispatch, rejectwithvalue' 
//Initiale state  : définir les propriétés d'état avec les valeurs initiales
const initialState = {
  isError: null,
  isSuccess: false,
  isLoading: false,
  token,
  firstName:'',
  lastName:'',
  rememberMe: false,
}

// Login user : login  appelle le service login
export const login = createAsyncThunk('auth/login', async ({email, password}, {rejectWithValue}) => {
  try { 
    //console.log(email, password)//ici on récupère l'email et le password
    return await authService.login({email, password})
    
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return rejectWithValue(message)
  }
})


 //profile user
export const userProfile = createAsyncThunk('auth/userProfile', async (profileData, {getState, rejectWithValue})=>{
  try {
    //console.log(getState())
    const token = getState().auth.token ;
       
    return await authService.userProfile(profileData, token)
  }catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return rejectWithValue(message)
  }
})

//update user profile data
export const updateUserData = createAsyncThunk('auth/updateUserData', async (newData, thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.token;
  
    return await authService.updateUserData(newData, token)
  }catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// createSlice gère les changements d'état
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout :(state)=> {
      localStorage.removeItem('token')
      localStorage.clear()
      state.isLoading=false
      state.token= null
      state.isError= null
      state.firstName=''
      state.lastName=''
      state.isSuccess= false
      state.rememberMe=false
    },

    isRememberMe : (state, {payload})=> {
       state.rememberMe = payload
     },
  },
  //méthodes mettant à jour chacune des 3 étapes différentes des actions asynchrones (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
    //login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError=null
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.token = payload.body.token
        state.isSuccess= true
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = payload
      })

       //user profile
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userProfile.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError=null
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
      })
      .addCase(userProfile.rejected, (state) => {
        state.isLoading = false
      })
      

      //update profile
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserData.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.firstName= payload.firstName;
        state.lastName = payload.lastName;
        state.isError=null
      })
      .addCase(updateUserData.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export const { logout, isRememberMe, getEmail } = authSlice.actions
export default authSlice.reducer

