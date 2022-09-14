import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user token from localStorage

const initialState = {
  userInfos : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  token:null,
}

// Login user : login  appelle le service login
export const login = createAsyncThunk('auth/login', async (loginData, thunkAPI) => {
  try { 
    console.log(loginData)//ici on récupère l'email et le password
    return await authService.login(loginData)
    
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
    const token = thunkAPI.getState().auth.userInfos.body.token;
    console.log(token)
    return await authService.userProfile(profileData, token)
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
      //localStorage.removeItem('token')
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.token=""
    },
  },
  extraReducers: (builder) => {
    builder
    //login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfos = action.payload
        state.token= action.payload.body.token
        state.isError = false;
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userInfos = null
      })

      //logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token =null
      })

       //profile
       .addCase(userProfile.pending, (state) => {
         state.isLoading = true
       })
       .addCase(userProfile.fulfilled, (state, action) => {
         state.isLoading = false
         state.isSuccess = true
         state.isError=false
         state.message =''
         state.userInfos=action.payload
       })
       .addCase(userProfile.rejected, (state, action) => {
         state.isLoading = false
         state.isError = true
         state.message = action.payload
       })
      
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer

