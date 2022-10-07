import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


//createSlice : methode d'assistance qui simplifie le processus de creation d'actions et de reducteurs
//createAsyncThunk : ecrit la logique asynchrone

//const token = localStorage.getItem("token") ? localStorage.getItem('token') : null

const initialState = {
  userInfos : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  firstName:'',
  lastName:'',
  //token,
}

// Login user : login  appelle le service login
export const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try { 
    //console.log(formData)//ici on récupère l'email et le password
    return await authService.login(formData)
    
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


 //profile user
 //createAsyncThunk génère les 3 types d'action de cyle de vie pending, fulfilled et rejected
export const userProfile = createAsyncThunk('auth/userProfile', async (profileData, thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.userInfos.body.token ;
    //console.log(token)
    return await authService.userProfile(profileData, token)
  }catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//update user profile data
export const updateUserData = createAsyncThunk('auth/updateUserData', async (newData, thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.userInfos.body.token;
    //console.log(token)
    return await authService.updateUserData(newData, token)
  }catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
      state.firstName = ""
      state.lastName = ""
    }
  },
  extraReducers: (builder) => {
    builder
    //login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError=false
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.message=""
        state.userInfos = payload
        //state.token =payload.body.token
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      //logout
      .addCase(logout.fulfilled, (state) => {
        state.userInfos = null
        //state.token=null
      })

       //profile
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userProfile.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError=false
        state.message =''
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
      })
      .addCase(userProfile.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
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
        state.isError=false
        state.message =''
      })
      .addCase(updateUserData.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer

