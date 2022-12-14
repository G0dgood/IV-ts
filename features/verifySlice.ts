import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService' 


const initialState = { 
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  error: '',
  
}

 

// All Assigned Request
export const allassignedrequest = createAsyncThunk('auth/allassignedrequest', async (user:any, thunkAPI) => {
  try {
    return await authService.allassignedrequest(user)
  } catch (error:any) {
    const message =
      (error.response && 
			 error.response.data && 
			 error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

 

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    reset: (state) => { 
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
       
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(allassignedrequest.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(allassignedrequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(allassignedrequest.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = null
      }) 

       
  },
})

export const { reset } = verifySlice.actions
export default verifySlice.reducer
