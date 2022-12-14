import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService' 
import AsyncStorage from '@react-native-async-storage/async-storage';


 

const initialState = {
   

  user:   null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  userToken:null,
  message: '',
  error: '',
}
 

// Login user
export const login = createAsyncThunk('auth/login', async (  thunkAPI) => {
  try {
    return await authService.login( )
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
  }
})

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
    logoutUser: state => {
      AsyncStorage.removeItem('user')
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(login.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.userToken = action.payload
      })
      .addCase(login.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.userToken = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null 
        state.userToken = null 
      })
  },
})

export const { reset, setUserInfo, logoutUser } = authSlice.actions
export default authSlice.reducer