import {createSlice} from "@reduxjs/toolkit";

const reviewSlice=createSlice({
  name:"review",
  initialState:{
   reviewData:[]
  
  },
  reducers:{
    setreviewData:(state,action)=>{
      state.reviewData=action.payload
    }
  }
})

export const {setreviewData}=reviewSlice.actions

export default reviewSlice.reducer