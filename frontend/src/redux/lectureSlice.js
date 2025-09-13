import {createSlice} from "@reduxjs/toolkit";

const lectureSlice=createSlice({
  name:"lecture",
  initialState:{
   lectureData:[],
   courseData:[]
  },
  reducers:{
    setLectureData:(state,action)=>{
      state.lectureData=action.payload
    },
    setCourseData:(state,action)=>{
      state.courseData=action.payload
    }
  }
})

export const {setLectureData}=lectureSlice.actions

export default lectureSlice.reducer